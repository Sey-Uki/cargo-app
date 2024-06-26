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
import { OrderItem, setOrders } from "@/store/slices/orders";

const apiUrl = process.env.EXPO_PUBLIC_API_URL as string;

export default function signIn() {
  const dispatch = useAppDispatch();

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const onAuth = () => {
    setIsLoading(true);

    axios
      .get(apiUrl)
      .then(({ data: { values } }) => {
        if (values.length) {
          const headers: keyof OrderItem = values[0];
          const jsonData: OrderItem[] = [];

          for (let i = 1; i < values.length; i++) {
            const temp: Record<string, string> = {};

            for (let j = 0; j < headers.length; j++) {
              temp[headers[j]] = values[i][j];
            }

            jsonData.push(temp as OrderItem);
          }

          const user = jsonData.find(
            (item) => item.password === password && item.email === email
          );

          if (!user) {
            throw Error("Пользователь не найден");
          }

          dispatch(setUserData(user));
          dispatch(
            setOrders(jsonData.filter((item) => user.email === item.email))
          );

          dispatch(logIn());

          router.replace("/");
        }
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
