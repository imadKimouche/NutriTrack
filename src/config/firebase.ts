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

export async function fetchUserDailyMeals(userId: string, date: string) {
  const dailyMealsDocRef = doc(db, 'users', userId, 'dailyMeals', date);
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
