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
    if (data !== undefined) {
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
    return {
      fitnessGoal: 'maintain',
      activityLevel: 'minimal',
      gender: 'male',
      age: 13,
      height: 150,
      weight: 50,
    } as UserFitnessData;
  },
};

export async function getFitnessData(userId: string) {
  const result = await firestore().collection('users').doc(userId).get();
  if (result) {
    return userFitnessDataConverter.fromFirestore(result);
  }
}

export async function setFitnessData(userId: string, data: UserFitnessData) {
  return firestore().collection('users').doc(userId).set(userFitnessDataConverter.toFirestore(data));
}
