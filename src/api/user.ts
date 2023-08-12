import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function storeUser(fireUser: FirebaseAuthTypes.User) {
  try {
    await firestore().collection('users').doc(fireUser.uid).update({email: fireUser.email});
  } catch (err) {
    console.log('storeUser(): ', err);
  }
}
