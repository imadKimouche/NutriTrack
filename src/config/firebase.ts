import {initializeApp} from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  DocumentSnapshot,
  SnapshotOptions,
  deleteDoc,
  deleteField,
} from 'firebase/firestore';
import {Meal} from '../hooks/meal';
import {UserData} from '../hooks/userData';
import {MealType} from '../store/dashboard';

const firebaseConfig = {
  apiKey: 'AIzaSyC1VPYajPNE1OcNoQjdQAuL6-cGoFSbuBI',
  authDomain: 'leftover-fe99c.firebaseapp.com',
  databaseURL: 'https://leftover-fe99c.firebaseio.com',
  projectId: 'leftover-fe99c',
  storageBucket: 'leftover-fe99c.appspot.com',
  messagingSenderId: '1086106979278',
  appId: '1:1086106979278:web:12aae4b5615d20a0adb99f',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function fetchUserData(userId: string) {
  const docRef = doc(db, 'users', userId);
  return getDoc(docRef);
}

export function pushUserData(userId: string, userData: UserData) {
  return setDoc(doc(db, 'users', userId), userData);
}

export async function pushUserMeal(userId: string, date: string, mealType: MealType, meal: Meal, portion: number, unit: string) {
  const dailyMealsRef = doc(db, 'users', userId, 'dailyMeals', date);
  const docSnapshot = await getDoc(dailyMealsRef);

  if (docSnapshot.exists()) {
    return updateDoc(dailyMealsRef, {
      [mealType]: arrayUnion({...meal, portion, unit}),
    });
  } else {
    return setDoc(
      dailyMealsRef,
      {
        [mealType]: [{...meal, portion, unit}],
      },
      {merge: true},
    );
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
  // TODO share same ref across functions ?
  const dailyMealsRef = doc(db, 'users', userId, 'dailyMeals', date);
  const docSnapshot = await getDoc(dailyMealsRef);

  if (docSnapshot.exists()) {
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

    return updateDoc(dailyMealsRef, updatedMacros);
  } else {
    const newMacros: DailyMeals = {
      currentCalories: calories || 0,
      currentProt: proteins || 0,
      currentCarbs: carbs || 0,
      currentFat: fat || 0,
    };

    return setDoc(dailyMealsRef, newMacros, {merge: true});
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
  const dailyMealsDocRef = doc(db, 'users', userId, 'dailyMeals', date).withConverter(dailyMealsConverter);
  const dailyMeals = await getDoc(dailyMealsDocRef);

  if (dailyMeals.exists()) {
    return dailyMeals.data();
  }
  return undefined;
}

export async function deleteUserMeal(userId: string, date: string, mealType: MealType, mealId: number) {
  console.log('delete', mealId);

  if (userId.trim().length === 0 || date.trim().length === 0) {
    return undefined;
  }

  const dailyMealsRef = doc(db, 'users', userId, 'dailyMeals', date);
  const docSnapshot = await getDoc(dailyMealsRef);

  if (docSnapshot.exists()) {
    const mealTypeData = docSnapshot.get(mealType) as Meal[] | undefined;

    if (mealTypeData) {
      const updatedMeals = mealTypeData.filter(meal => meal.id !== mealId);

      return updateDoc(dailyMealsRef, {
        [mealType]: updatedMeals,
      });
    }
  }
}

// export async function fetchUserDailyMeals(userId: string, startDate: string, endDate: string) {
//   const dailyMealsRef = collection(db, 'users', userId, 'dailyMeals');
//   const mealsQuery = query(dailyMealsRef, where('date', '>=', startDate), where('date', '<=', endDate));
//
//   return getDocs(mealsQuery);
// }

export default app;
