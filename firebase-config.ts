import { initializeApp, getApp, getApps } from 'firebase/app';

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const fbapp = getApp();
const fbStorage = getStorage();

export const uploadImageToFirebase = async ({
  uri,
  fileName,
  onProgress
}: {
  uri: string
  fileName: string | null | undefined
  onProgress?: (value: number) => void
}) => {
  const fetchResponse = await fetch(uri)
  const blob = await fetchResponse.blob()

  const imageRef = ref(getStorage(), `receipts/${fileName}`);

  const uploadTask = uploadBytesResumable(imageRef, blob);

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        onProgress?.(progress)
      },
      (error) => {
        reject(error)
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

        resolve({
          downloadURL,
          metadata: uploadTask.snapshot.metadata,
        })
      }
    )
  })
}

export {
  fbapp,
  fbStorage,
}
