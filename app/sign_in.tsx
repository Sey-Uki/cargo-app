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
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import { Image } from "react-native";
import { router } from "expo-router";

const apiUrl = process.env.EXPO_PUBLIC_API_URL as string;

type Item = {
  id: string;
  weight: string;
  volume: string;
  cost: string;
  login: string;
  password: string;
};

export default function signIn() {
  const [data, setData] = useState<Item[]>([]);

  const [login, setLogin] = useState("admin");
  const [password, setPassword] = useState("123");

  useEffect(() => {
    axios
      .get(apiUrl)
      .then(({ data: { values } }) => {
        if (values.length) {
          const headers: keyof Item = values[0];
          const jsonData: Item[] = [];

          for (let i = 1; i < values.length; i++) {
            const temp: Record<string, string> = {};

            for (let j = 0; j < headers.length; j++) {
              temp[headers[j]] = values[i][j];
            }

            jsonData.push(temp as Item);
          }

          setData(jsonData);
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Ошибка", "Нет данных");
      });
  }, []);

  const auth = () => {
    const element = data.find(
      (item) => item.password === password && item.login === login
    );

    if (!element) return;

    router.navigate("/home");

    router.setParams({ user: element.id });
  };

  return (
    <View>
      <GluestackUIProvider config={config}>
        <Box width="100%" justifyContent="center" alignItems="center">
          <View
            height="100%"
            justifyContent="center"
            width="100%"
            padding={20}
            alignItems="center"
            gap={20}
          >
            <Image
              source={require("@/assets/images/logo.png")}
              style={{ marginBottom: 100 }}
            />
            <Text fontSize="$lg" bold color="$black">
              Войти в профиль
            </Text>
            <FormControl width="100%">
              <Input borderRadius="$md">
                <InputField
                  fontSize="$sm"
                  placeholder="email@domain.com"
                  value={login}
                  onChangeText={setLogin}
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
              <Button bg="$black" borderRadius="$md" onPress={() => auth()}>
                <ButtonText fontSize="$sm" fontWeight="$medium">
                  Войти
                </ButtonText>
              </Button>
            </FormControl>
            <Text
              color="#828282"
              width="100%"
              textAlign="center"
              fontSize="$xs"
            >
              By clicking continue, you agree to our{" "}
              <Text color="$black" fontSize="$xs">
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text color="$black" fontSize="$xs">
                Privacy Policy
              </Text>
            </Text>
          </View>
        </Box>
      </GluestackUIProvider>
    </View>
  );
}
