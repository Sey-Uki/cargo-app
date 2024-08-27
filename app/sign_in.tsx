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
import { useState } from "react";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import axios from "axios";
import { Image } from "react-native";
import { router } from "expo-router";
import { useAppDispatch } from "@/store";
import { logIn } from "@/store/slices/auth";
import { setUserData } from "@/store/slices/user";
import { SafeAreaView } from "react-native-safe-area-context";

const USERS_API_URL = process.env.EXPO_PUBLIC_USERS_API_URL as string;

export default function SignIn() {
  const dispatch = useAppDispatch();

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const onAuth = () => {
    setIsLoading(true);

    axios
      .get<{ values: string[][] }>(USERS_API_URL)
      .then(({ data: { values } }) => {
        if (!values.length) {
          throw Error("Данные не найдены");
        }

        const userData = values.find((array) => {
          const [userEmail, userPassword] = array;

          return email === userEmail && password === userPassword;
        });

        if (userData === undefined) {
          throw Error("Пользователь не найден");
        }

        dispatch(
          setUserData({
            email: userData[0],
            password: userData[1],
            firstName: userData[2],
            lastName: userData[3],
          })
        );

        dispatch(logIn());

        router.replace("/");
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Ошибка", err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View paddingHorizontal={20} gap={20} marginTop={20} height="100%">
            <View>
              <Image
                source={require("@/assets/images/logo.png")}
                style={{ marginBottom: 46 }}
              />
              <Text fontFamily="SFProText-Medium" fontSize={22} color="$black">
                Войти в профиль
              </Text>
            </View>

            <View gap={12}>
              <FormControl gap={8}>
                <Text fontFamily="SFProText-Regular" fontSize="$md" color="$black">
                  Код пользователя
                </Text>
                <Input borderRadius="$lg">
                  <InputField fontSize="$sm" placeholder="code" />
                </Input>
              </FormControl>

              <FormControl gap={8}>
                <Text fontFamily="SFProText-Regular" fontSize="$md" color="$black">
                  Пароль
                </Text>
                <Input borderRadius="$lg">
                  <InputField
                    fontSize="$sm"
                    placeholder="******"
                    type="password"
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
                    // onPress={onAuth}
                  >
                    <ButtonText fontFamily="SFProText-Medium"  fontWeight="$medium" fontSize={16}>
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
