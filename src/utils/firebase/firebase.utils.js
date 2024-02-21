import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCCtT5Bk4Kdtv_KpeQN6egecNUGmXLszTk",
    authDomain: "crwn-clothing-db-32859.firebaseapp.com",
    projectId: "crwn-clothing-db-32859",
    storageBucket: "crwn-clothing-db-32859.appspot.com",
    messagingSenderId: "265144178692",
    appId: "1:265144178692:web:d4c384e5817fef62817d51"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const db = getFirestore();
  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {displayName, email, createdAt});
        } catch(err) {
            console.log(err.message);
        }
    }

    return userDocRef;
  }
