import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {UserFitnessData} from '../store/onboarding';

const userFitnessDataConverter = {
  toFirestore: (userFitnessData: UserFitnessData) => {
    return {
      fitnessGoal: userFitnessData.fitnessGoal,
      activityLevel: userFitnessData.activityLevel,
      gender: userFitnessData.gender,
      age: userFitnessData.age,
      height: userFitnessData.height,
      weight: userFitnessData.weight,
    };
  },
  fromFirestore: (snapshot: FirebaseFirestoreTypes.DocumentSnapshot) => {
    const data = snapshot.data();
    if (data !== undefined && Object.keys(data).length !== 0) {
      return {
        fitnessGoal: data.fitnessGoal,
        activityLevel: data.activityLevel,
        gender: data.gender,
        age: data.age,
        height: data.height,
        weight: data.weight,
        bmr: data.bmr,
        tdee: data.tdee,
      } as UserFitnessData;
    }
    return undefined;
  },
};

export async function getFitnessData(userId: string) {
  try {
    const result = await firestore().collection('users').doc(userId).get();
    if (result.exists) {
      return userFitnessDataConverter.fromFirestore(result);
    }
  } catch (err) {
    console.log('getFitnessData(): ', err);
  }
}

export async function setFitnessData(userId: string, data: UserFitnessData) {
  try {
    return firestore().collection('users').doc(userId).set(userFitnessDataConverter.toFirestore(data));
  } catch (err) {
    console.log('setFitnessData(): ', err);
  }
}
