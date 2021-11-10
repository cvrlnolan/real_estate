import firebase from "firebase/app"
import "firebase/storage"
import "firebase/analytics"
import "firebase/performance"


const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials)
    // Check that `window` is in scope for the analytics module!
    if (typeof window !== "undefined") {
        // Enable analytics. https://firebase.google.com/docs/analytics/get-started
        if ("measurementId" in clientCredentials) {
            firebase.analytics()
            firebase.performance()
        }
    }
    console.log("Firebase was successfully init.")
}

export default firebase