import firestore from '@react-native-firebase/firestore';
import {Meal} from '../hooks/meal';
import {MealType} from '../store/dashboard';

export async function pushUserMeal(userId: string, date: string, mealType: MealType, meal: Meal, portion: number, unit: string) {
  try {
    const dailyMealsRef = firestore().doc(`users/${userId}/dailyMeals/${date}`);
    const docSnapshot = await dailyMealsRef.get();

    if (docSnapshot.exists) {
      return dailyMealsRef.update({
        [mealType]: firestore.FieldValue.arrayUnion({...meal, portion, unit}),
      });
    } else {
      return dailyMealsRef.set(
        {
          [mealType]: [{...meal, portion, unit}],
        },
        {merge: true},
      );
    }
  } catch (err) {
    console.log('pushUserMeal(): ', err);
  }
}

export async function updateUserDailyMacros(
  userId: string,
  date: string,
  calories?: number,
  proteins?: number,
  carbs?: number,
  fat?: number,
) {
  try {
    const dailyMealsRef = firestore().doc(`users/${userId}/dailyMeals/${date}`);
    const docSnapshot = await dailyMealsRef.get();

    if (docSnapshot.exists) {
      const currentData = docSnapshot.data() as DailyMeals;
      const updatedMacros: Partial<DailyMeals> = {};

      if (calories !== undefined) {
        updatedMacros.currentCalories = (currentData.currentCalories || 0) + calories;
      }

      if (proteins !== undefined) {
        updatedMacros.currentProt = (currentData.currentProt || 0) + proteins;
      }

      if (carbs !== undefined) {
        updatedMacros.currentCarbs = (currentData.currentCarbs || 0) + carbs;
      }

      if (fat !== undefined) {
        updatedMacros.currentFat = (currentData.currentFat || 0) + fat;
      }

      return dailyMealsRef.update(updatedMacros);
    } else {
      const newMacros: DailyMeals = {
        currentCalories: calories || 0,
        currentProt: proteins || 0,
        currentCarbs: carbs || 0,
        currentFat: fat || 0,
      };

      return dailyMealsRef.set(newMacros, {merge: true});
    }
  } catch (err) {
    console.log('updateUserDailyMacros():', err);
  }
}

export type DailyMeals = {
  currentCalories: number;
  currentProt: number;
  currentFat: number;
  currentCarbs: number;
  breakfast?: Meal[];
  lunch?: Meal[];
  dinner?: Meal[];
  snack?: Meal[];
};

const dailyMealsConverter = {
  toFirestore: (dailyMeals: DailyMeals) => {
    return {
      currentCalories: dailyMeals.currentCalories,
      currentProt: dailyMeals.currentProt,
      currentFat: dailyMeals.currentFat,
      currentCarbs: dailyMeals.currentCarbs,
      breakfast: dailyMeals.breakfast || [],
      lunch: dailyMeals.lunch || [],
      dinner: dailyMeals.dinner || [],
      snack: dailyMeals.snack || [],
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    if (data !== undefined) {
      return {
        currentCalories: data.currentCalories,
        currentProt: data.currentProt,
        currentFat: data.currentFat,
        currentCarbs: data.currentCarbs,
        breakfast: data.breakfast || [],
        lunch: data.lunch || [],
        dinner: data.dinner || [],
        snack: data.snack || [],
      } as DailyMeals;
    }
    return {
      currentCalories: 0,
      currentProt: 0,
      currentFat: 0,
      currentCarbs: 0,
    };
  },
};

export async function fetchUserDailyMeals(userId: string, date: string) {
  if (userId.trim().length === 0 || date.trim().length === 0) {
    return undefined;
  }
  try {
    const dailyMealsRef = firestore().doc(`users/${userId}/dailyMeals/${date}`);
    const docSnapshot = await dailyMealsRef.get();

    if (docSnapshot.exists) {
      return docSnapshot.data();
    }
    return undefined;
  } catch (err) {
    console.log('fetchUserDailyMeals(): ', err);
  }
}

export async function deleteUserMeal(userId: string, date: string, mealType: MealType, mealId: number) {
  if (userId.trim().length === 0 || date.trim().length === 0) {
    return undefined;
  }

  const dailyMealsRef = firestore().doc(`users/${userId}/dailyMeals/${date}`);
  const docSnapshot = await dailyMealsRef.get();

  if (docSnapshot.exists) {
    const mealTypeData = docSnapshot.get(mealType) as Meal[] | undefined;

    if (mealTypeData) {
      const mealToDelete = mealTypeData.find(meal => meal.id === mealId);

      if (mealToDelete) {
        const {calories: mealCalories = 0, proteins: mealProteins = 0, carbs: mealCarbs = 0, fat: mealFat = 0} = mealToDelete;

        const {currentCalories = 0, currentProt = 0, currentCarbs = 0, currentFat = 0} = docSnapshot.data() as DailyMeals;

        const updatedCalories = currentCalories - mealCalories;
        const updatedProt = currentProt - mealProteins;
        const updatedCarbs = currentCarbs - mealCarbs;
        const updatedFat = currentFat - mealFat;

        const updatedMeals = mealTypeData.filter(meal => meal.id !== mealId);

        return dailyMealsRef.set({
          [mealType]: updatedMeals,
          currentCalories: updatedCalories,
          currentProt: updatedProt,
          currentCarbs: updatedCarbs,
          currentFat: updatedFat,
        });
      }
    }
  }
}

export async function setUserBMR(userId: string, bmr: number) {
  try {
    const userDataRef = firestore().doc(`users/${userId}`);
    const snapshot = await userDataRef.get();

    if (snapshot.exists) {
      return userDataRef.set({bmr});
    } else {
      return userDataRef.set({bmr}, {merge: true});
    }
  } catch (err) {
    console.log('setUserBMR(): ', err);
  }
}

export async function setUserTDEE(userId: string, tdee: number) {
  try {
    const userDataRef = firestore().doc(`users/${userId}`);
    const snapshot = await userDataRef.get();

    if (snapshot.exists) {
      return userDataRef.set({tdee});
    } else {
      return userDataRef.set({tdee}, {merge: true});
    }
  } catch (err) {
    console.log('setUserTDEE(): ', err);
  }
}
