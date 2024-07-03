import {
  GluestackUIProvider,
  Box,
  View,
  Text,
  FormControl,
  Input,
  InputField,
  Button,
  ButtonText,
  ButtonSpinner,
  KeyboardAvoidingView,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import { Image } from "react-native";
import { router } from "expo-router";
import { useAppDispatch } from "@/store";
import { logIn } from "@/store/slices/auth";
import { setUserData } from "@/store/slices/user";

const USERS_API_URL = process.env.EXPO_PUBLIC_USERS_API_URL as string;

export default function signIn() {
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
    <KeyboardAvoidingView behavior="padding">
      <GluestackUIProvider config={config}>
        <Box width="100%" justifyContent="center" alignItems="center">
          <View
            height="100%"
            justifyContent="center"
            width="100%"
            paddingHorizontal={20}
            gap={20}
          >
            <View alignItems="center" width="100%">
              <Image
                source={require("@/assets/images/logo.png")}
                style={{ marginBottom: 100 }}
              />
              <Text fontSize="$lg" bold color="$black">
                Войти в профиль
              </Text>
            </View>

            <View width="100%" gap={20}>
              <FormControl width="100%">
                <Input borderRadius="$md">
                  <InputField
                    fontSize="$sm"
                    placeholder="email@domain.com"
                    value={email}
                    onChangeText={setemail}
                    inputMode="email"
                    keyboardType="email-address"
                  />
                </Input>
              </FormControl>

              <FormControl width="100%">
                <Input borderRadius="$md">
                  <InputField
                    fontSize="$sm"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChangeText={setPassword}
                  />
                </Input>
              </FormControl>

              <FormControl width="100%">
                {isLoading && (
                  <Button isDisabled bg="$black" borderRadius="$md">
                    <ButtonSpinner mr="$1" />
                    <ButtonText fontWeight="$medium" fontSize="$sm">
                      Загрузка...
                    </ButtonText>
                  </Button>
                )}

                {!isLoading && (
                  <Button bg="$black" borderRadius="$md" onPress={onAuth}>
                    <ButtonText fontSize="$sm" fontWeight="$medium">
                      Войти
                    </ButtonText>
                  </Button>
                )}
              </FormControl>
            </View>
          </View>
        </Box>
      </GluestackUIProvider>
    </KeyboardAvoidingView>
  );
}
