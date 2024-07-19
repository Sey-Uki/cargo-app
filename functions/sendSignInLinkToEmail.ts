import AsyncStorage from '@react-native-async-storage/async-storage';

import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, getAuth } from 'firebase/auth';
import { Alert } from 'react-native';

import * as Linking from 'expo-linking';

const actionCodeSettings = {
  url: 'http://localhost', // Замените на ваш URL
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios',
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12',
  },
};

export const sendSignInLink = async (email: string) => {
  try {
    await sendSignInLinkToEmail(getAuth(), email, actionCodeSettings);
    await AsyncStorage.setItem('emailForSignIn', email);

    Alert.alert('Письмо отправлено! Проверьте ваш почтовый ящик.');
  } catch (error) {
    console.error('Ошибка отправки письма: ', error);
  }
};

export const handleEmailLinkSignIn = async () => {
  const emailLink = await Linking.getInitialURL();

  console.log(emailLink)

  // if (emailLink) {
  //   if (isSignInWithEmailLink(auth, emailLink)) {
  //     const email = await AsyncStorage.getItem('emailForSignIn');
  //     if (!email) {
  //       Alert.alert('Не найден email. Пожалуйста, введите ваш email для подтверждения.');
  //       return;
  //     }

  //     try {
  //       await signInWithEmailLink(auth, email, emailLink);
  //       await AsyncStorage.removeItem('emailForSignIn');
  //       Alert.alert('Вы успешно вошли в систему!');
  //     } catch (error) {
  //       console.error('Ошибка входа: ', error);
  //     }
  //   }
  // }
};