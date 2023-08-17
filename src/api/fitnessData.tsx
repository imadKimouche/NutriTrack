import firestore from '@react-native-firebase/firestore';
import {UserFitnessData} from '../store/onboarding';

export async function getFitnessData(userId: string) {
  try {
    const userDataSnap = await firestore().collection('users').doc(userId).get();
    if (userDataSnap.exists) {
      const userData = userDataSnap.data();
      if (userData) {
        return userData.fitnessData as UserFitnessData;
      }
      return undefined;
    }
  } catch (err) {
    console.log('getFitnessData(): ', err);
  }
}

export async function setFitnessData(userId: string, data: UserFitnessData) {
  try {
    const userDataSnap = await firestore().collection('users').doc(userId).get();
    if (userDataSnap.exists) {
      await firestore().collection('users').doc(userId).update({fitnessData: data});
    }
    // else {
    //   await firestore().collection('users').doc(userId).set({fitnessData: data});
    // }
  } catch (err) {
    console.log('setFitnessData(): ', err);
  }
}

//TODO FIX (documentPath must point to a document)
export async function setUserBMR(userId: string, bmr: number) {
  try {
    const userFitnessDataRef = firestore().doc(`users/${userId}/fitnessData`);

    return userFitnessDataRef.set({bmr}, {merge: true});
  } catch (err) {
    console.log('setUserBMR(): ', err);
  }
}

export async function setUserTDEE(userId: string, tdee: number) {
  try {
    const userFitnessDataRef = firestore().doc(`users/${userId}/fitnessData`);

    return userFitnessDataRef.set({tdee}, {merge: true});
  } catch (err) {
    console.log('setUserTDEE(): ', err);
  }
}
