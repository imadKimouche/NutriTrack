import {initializeApp} from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  QueryDocumentSnapshot,
  DocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import {MealType} from '../hooks/dailyTracker';
import {Meal} from '../hooks/meal';
import {UserData} from '../hooks/userData';

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

export async function pushUserMeal(userId: string, date: string, type: MealType, meal: Meal, portion: number, unit: string) {
  const dailyMealsRef = doc(db, 'users', userId, 'dailyMeals', date);
  const docSnapshot = await getDoc(dailyMealsRef);

  if (docSnapshot.exists()) {
    return updateDoc(dailyMealsRef, {
      [type]: arrayUnion({...meal, portion, unit}),
    });
  } else {
    return setDoc(
      dailyMealsRef,
      {
        [type]: [{...meal, portion, unit}],
      },
      {merge: true},
    );
  }
}

type DailyMeals = {
  currentCalories: number;
  currentProt: number;
  currentFat: number;
  currentCarbs: number;
  breakfast?: Meal[];
  lunch?: Meal[];
  diner?: Meal[];
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
      diner: dailyMeals.diner || [],
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
        diner: data.diner || [],
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
  const dailyMealsDocRef = doc(db, 'users', userId, 'dailyMeals', date).withConverter(dailyMealsConverter);
  const dailyMeals = await getDoc(dailyMealsDocRef);

  if (dailyMeals.exists()) {
    return dailyMeals.data();
  }
  return [];
}

// export async function fetchUserDailyMeals(userId: string, startDate: string, endDate: string) {
//   const dailyMealsRef = collection(db, 'users', userId, 'dailyMeals');
//   const mealsQuery = query(dailyMealsRef, where('date', '>=', startDate), where('date', '<=', endDate));
//
//   return getDocs(mealsQuery);
// }

export default app;
