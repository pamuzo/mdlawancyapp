// import { initializeApp, getApps, FirebaseApp } from "firebase/app";
// import {
//   getMessaging,
//   getToken,
//   onMessage,
//   Messaging,
// } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// // Initialize Firebase
// let app: FirebaseApp;
// let messaging: Messaging;

// if (typeof window !== "undefined") {
//   app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
//   messaging = getMessaging(app);
// }

// // Request notification permission and get FCM token
// export const requestNotificationPermission = async (): Promise<
//   string | null
// > => {
//   try {
//     const permission = await Notification.requestPermission();
//     if (permission === "granted") {
//       const token = await getToken(messaging, {
//         vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
//       });
//       console.log("FCM Token:", token);
//       return token;
//     } else {
//       console.log("Notification permission denied");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error getting FCM token:", error);
//     return null;
//   }
// };

// // Listen for foreground messages
// export const onMessageListener = (): Promise<any> =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       console.log("Message received:", payload);
//       resolve(payload);
//     });
//   });

import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);
