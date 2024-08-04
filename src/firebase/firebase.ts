import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const firebase_app = !getApps.length ? getApp(): initializeApp(firebaseConfig);
// const firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// const firebase_app = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase_app);
const auth = getAuth(firebase_app);
const firestore = getFirestore(firebase_app);
const storage = getStorage(firebase_app)


export { auth, firestore, storage, firebase_app, analytics };


// let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// export default firebase_app;



