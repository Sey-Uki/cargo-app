import {
  GluestackUIProvider,
  Box,
  View,
  Text,
  HStack,
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

const apiUrl = process.env.EXPO_PUBLIC_API_URL as string;

export default function HomeScreen() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(apiUrl)
      .then(({ data }) => setData(data.values))
      .catch((err) => {
        console.log(err);
        Alert.alert("Ошибка", "Нет данных");
      });
  }, []);
  return (
    <View>
      <GluestackUIProvider config={config}>
        <Box width="100%" justifyContent="center" alignItems="center">
          <HStack
            height="100%"
            justifyContent="center"
            space="lg"
            flexDirection="column"
            width="100%"
            padding={20}
          >
            <Text size="xl" bold>
              Введите свой номер телефона
            </Text>
            <FormControl>
              <Input>
                <InputField placeholder="Телефон" />
              </Input>
            </FormControl>
            <FormControl>
              <Button bg="$darkBlue600">
                <ButtonText fontSize="$sm" fontWeight="$medium">
                  Отправить
                </ButtonText>
              </Button>
            </FormControl>
            <Text>{data}</Text>
          </HStack>
        </Box>
      </GluestackUIProvider>
    </View>
  );
}
