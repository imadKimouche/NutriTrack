import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function storeUser(fireUser: FirebaseAuthTypes.User) {
  try {
    const user = await firestore().collection('users').doc(fireUser.uid).get();
    if (user.exists) {
      return;
    } else {
      await firestore().collection('users').doc(fireUser.uid).set({
        email: fireUser.email,
        displayName: fireUser.displayName,
        photoURL: fireUser.photoURL,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    }
  } catch (err) {
    console.log('storeUser(): ', err);
  }
}
