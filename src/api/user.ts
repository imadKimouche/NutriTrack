import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ActivityLevel, FitnessGoal, UserFitnessData} from '../store/onboarding';
import {calculateBMR} from '../utils';

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  minimal: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  extreme: 1.9,
};

const CALORIES_MODIFIERS: Record<FitnessGoal, number> = {
  gain: 200,
  lose: -200,
  maintain: 0,
  recomposition: -100,
};

export async function storeUser(fireUser: FirebaseAuthTypes.User, userFitnessData: UserFitnessData) {
  try {
    const userDocRef = firestore().collection('users').doc(fireUser.uid);
    const user = await userDocRef.get();

    if (!user.exists) {
      await userDocRef.set({
        email: fireUser.email,
        displayName: fireUser.displayName,
        photoURL: fireUser.photoURL,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    }
    // keep from userFitnessData only the fields that are not undefined
    Object.keys(userFitnessData).forEach(
      key => userFitnessData[key as keyof UserFitnessData] === undefined && delete userFitnessData[key as keyof UserFitnessData],
    );
    if (
      userFitnessData.gender &&
      userFitnessData.age &&
      userFitnessData.height &&
      userFitnessData.weight &&
      userFitnessData.activityLevel &&
      userFitnessData.fitnessGoal
    ) {
      const {gender, age, height, weight} = userFitnessData;
      const bmr = calculateBMR(gender, age, height, weight);
      const tdee = bmr * ACTIVITY_MULTIPLIERS[userFitnessData.activityLevel] + CALORIES_MODIFIERS[userFitnessData.fitnessGoal];
      userFitnessData.tdee = tdee;
    }
    await userDocRef.update({fitnessData: userFitnessData});
  } catch (err) {
    console.log('storeUser(): ', err);
  }
}
