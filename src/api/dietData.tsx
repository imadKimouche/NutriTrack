import {doc, getDoc, setDoc, updateDoc} from 'firebase/firestore';
import {db} from '../config/firebase';

export async function setUserBMR(userId: string, bmr: number) {
  const userDataRef = doc(db, 'users', userId);
  const snapshot = await getDoc(userDataRef);

  if (snapshot.exists()) {
    return updateDoc(userDataRef, {bmr});
  } else {
    return setDoc(userDataRef, {bmr}, {merge: true});
  }
}

export async function setUserTDEE(userId: string, tdee: number) {
  const userDataRef = doc(db, 'users', userId);
  const snapshot = await getDoc(userDataRef);

  if (snapshot.exists()) {
    return updateDoc(userDataRef, {tdee});
  } else {
    return setDoc(userDataRef, {tdee}, {merge: true});
  }
}
