import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const fbapp = getApp();
const fbStorage = getStorage();

export const uploadImageToFirebase = async ({
  uri,
  fileName,
  onProgress,
}: {
  uri: string;
  fileName: string | null | undefined;
  onProgress?: (value: number) => void;
}) => {
  const fetchResponse = await fetch(uri);
  const blob = await fetchResponse.blob();

  const imageRef = ref(getStorage(), `receipts/${fileName}`);

  const uploadTask = uploadBytesResumable(imageRef, blob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        onProgress?.(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        resolve({
          downloadURL,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};

export const getImage = async (fileName: string | undefined) => {
  if (fileName === undefined) return null;

  const storage = getStorage();

  const pathReference = ref(storage, `receipts/${fileName}`);

  return await getDownloadURL(pathReference);
};

const db = getFirestore(app);

export { db, fbapp, fbStorage };
