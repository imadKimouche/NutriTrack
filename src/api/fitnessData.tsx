import {doc, DocumentSnapshot, getDoc, setDoc, SnapshotOptions} from 'firebase/firestore';
import {db} from '../config/firebase';
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
  fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    if (data !== undefined) {
      return {
        fitnessGoal: data.fitnessGoal,
        activityLevel: data.activityLevel,
        gender: data.gender,
        age: data.age,
        height: data.height,
        weight: data.weight,
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
  const docRef = doc(db, 'users', userId).withConverter(userFitnessDataConverter);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return snapshot.data();
  }
}

export async function setFitnessData(userId: string, data: UserFitnessData) {
  return setDoc(doc(db, 'users', userId), data);
}
