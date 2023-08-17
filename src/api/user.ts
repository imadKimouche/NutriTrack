import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function storeUser(fireUser: FirebaseAuthTypes.User) {
  try {
    const userDocRef = firestore().collection('users').doc(fireUser.uid);
    const user = await userDocRef.get();

    console.log('storeUser(): ', user.id);
    if (!user.exists) {
      console.log('user does not exist', user.id);
      await userDocRef.set({
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
