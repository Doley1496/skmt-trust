/* */

/* Pasting all the default code given in the firebase website.*/

import { initializeApp } from "firebase/app";

/* In vite we use the env as import.meta.env.name_of_the env_variable. */

/* Our web app's Firebase configuration : */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_API_ID,
};

/* Initialize Firebase and exporting it. */
export const app = initializeApp(firebaseConfig);

/*

   1. Install firebase in the client-side by writing    ->   npm install firebase

   2. Then make a file ex. firebase.js and paste the firebase code from firebase.com as it is inside it.

   3. Then by importing inbuilt methods of firebase we can create many things according to our need.
        Ex: 
          To work with firebase storage we have to import from "firebase/storage"
          To work with firebase authentication we have to import from "firebase/auth"

   4. To use storage of firebase we have to do some changes in our firebase account such as.
        allow read;
        allow write: if 
        request.resource.size < 2 * 1024 * 1024 && 
        request.resource.contentType.matches("image/.*")
  
  5. Add domain name in the authentication -> settings -> Authorised domains -> add the domain 
     if using with a live domain.

*/
