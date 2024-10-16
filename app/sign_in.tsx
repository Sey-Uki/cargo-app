import {
  View,
  Text,
  FormControl,
  Input,
  InputField,
  Button,
  ButtonText,
  KeyboardAvoidingView,
  ButtonSpinner,
} from "@gluestack-ui/themed";
import { useCallback, useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native";
import { router } from "expo-router";
import { useAppDispatch } from "@/store";
import { logIn } from "@/store/slices/auth";
import { setUserData } from "@/store/slices/user";
import { SafeAreaView } from "react-native-safe-area-context";

import { db } from "@/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { Alert } from "react-native";

export default function SignIn() {
  const dispatch = useAppDispatch();

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const onAuth = useCallback(async () => {
    setIsLoading(true);

    try {
      const usersCollection = collection(db, "users");

      const usersSnapshot = await getDocs(usersCollection);

      const usersList = usersSnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const userData = usersList.find((array) => {
        const userCode = array.code;
        const userPassword = array.password;

        return code === userCode && password === userPassword;
      });

      setIsLoading(false);

      if (userData === undefined) {
        throw new Error("Пользователь с такими кодом и паролем не существует")
      }

      dispatch(
        setUserData({
          email: userData.email,
          phone: userData.phone,
          code: userData.code,
          password: userData.password,
          firstName: userData.firstname,
          lastName: userData.lastname,
          userId: userData.id,
        })
      );

      dispatch(logIn());

      router.replace("/");
    } catch (error: any) {
      setIsLoading(false);
      
      Alert.alert("Ошибка", error?.message || "Что-то пошло не так")

      console.error("Ошибка при получении данных из о пользователе: ", error);
    }
  }, [code, password])

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View paddingHorizontal={20} gap={20} marginTop={20} height="100%">
            <View>
              <Image
                source={require("@/assets/images/logo.png")}
                style={{
                  marginBottom: 46,
                  width: 170,
                  height: 46,
                  objectFit: 'contain'
                }}
              />
              <Text fontFamily="SFProText-Medium" fontSize={22} color="$black">
                Войти в профиль
              </Text>
            </View>

            <View gap={12}>
              <FormControl gap={8}>
                <Text
                  fontFamily="SFProText-Regular"
                  fontSize="$md"
                  color="$black"
                >
                  Код пользователя
                </Text>
                <Input borderRadius="$lg">
                  <InputField
                    fontSize="$sm"
                    placeholder="code"
                    value={code}
                    onChangeText={setCode}
                  />
                </Input>
              </FormControl>

              <FormControl gap={8}>
                <Text
                  fontFamily="SFProText-Regular"
                  fontSize="$md"
                  color="$black"
                >
                  Пароль
                </Text>
                <Input borderRadius="$lg">
                  <InputField
                    fontSize="$sm"
                    placeholder="******"
                    type="password"
                    value={password}
                    onChangeText={setPassword}
                  />
                </Input>
              </FormControl>

              <FormControl>
                {isLoading && (
                  <Button isDisabled bg="#1A64CB" borderRadius={12} height={44}>
                    <ButtonSpinner mr="$1" />
                    <ButtonText fontWeight="$medium" fontSize={16}>
                      Загрузка...
                    </ButtonText>
                  </Button>
                )}

                {!isLoading && (
                  <Button
                    bg="#1A64CB"
                    borderRadius={12}
                    height={44}
                    onPress={() => {
                      onAuth();
                    }}
                  >
                    <ButtonText
                      fontFamily="SFProText-Medium"
                      fontWeight="$medium"
                      fontSize={16}
                    >
                      Войти
                    </ButtonText>
                  </Button>
                )}
              </FormControl>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
