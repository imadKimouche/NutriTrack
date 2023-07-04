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
