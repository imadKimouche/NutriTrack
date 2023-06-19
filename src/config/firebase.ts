import {initializeApp} from 'firebase/app';
import {getFirestore, doc, getDoc, setDoc, query, collection, where, getDocs} from 'firebase/firestore';
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

export async function fetchMealsContaining(value: string) {
  // TODO fix strict equal should be turned into contain
  const q = query(collection(db, 'meals'), where('name', '==', value));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map(docElement => docElement.data());
  return data;
}

export default app;
