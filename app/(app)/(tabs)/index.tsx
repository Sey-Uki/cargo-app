import {
  Card,
  GluestackUIProvider,
  Heading,
  Spinner,
  Text,
  View,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { ArrowRight } from "@/components/ArrowRight";
import { TopBar } from "@/components/TopBar";
import { useAppDispatch, useAppSelector } from "@/store";
import { OrderItem, selectOrders, setOrders } from "@/store/slices/orders";
import { Pressable, FlatList, Alert } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { selectUserData } from "@/store/slices/user";

const apiUrl = process.env.EXPO_PUBLIC_API_URL as string;

export default function index() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserData);
  const ordersList = useAppSelector(selectOrders);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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

          dispatch(
            setOrders(jsonData.filter((item) => user?.email === item.email))
          );
        }
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Ошибка", err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GluestackUIProvider config={config}>
      <View flex={1} backgroundColor="#fff">
        <View style={{ height: 70 }} />

        <TopBar text="Все заказы" />
        <View>
          {isLoading && (
            <Spinner color="$emerald600" paddingTop={50} size="large" />
          )}

          {!isLoading && ordersList.length > 0 && (
            <FlatList
              style={{ height: "100%", paddingTop: 14 }}
              data={ordersList}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    router.navigate({
                      pathname: "/(cards)/[id]",
                      params: { id: item.id },
                    });
                  }}
                >
                  <Card
                    bgColor={
                      item.status === "paid"
                        ? "rgba(21, 124, 19, 0.15)"
                        : "#FFFFFF"
                    }
                    size="lg"
                    variant="filled"
                    m="$0.5"
                    borderColor={item.status === "paid" ? "#157C13" : "#81838F"}
                    borderWidth="$1"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    borderRadius={4}
                  >
                    <View gap={3}>
                      <Heading size="md">{item.id}</Heading>
                      <Text size="sm" color="$black">
                        {item.location}
                      </Text>
                      {item.status !== "transit" && (
                        <Text
                          size="sm"
                          color={item.status === "paid" ? "#157C13" : "#000000"}
                          fontWeight={500}
                        >
                          {item.status === "paid" ? "Оплачено" : "Ждет оплаты"}
                        </Text>
                      )}
                    </View>

                    <ArrowRight />
                  </Card>
                </Pressable>
              )}
              keyExtractor={(item) => item.id}
            />
          )}

          {!isLoading && ordersList.length === 0 && (
            <Text paddingTop={4}>Нет данных</Text>
          )}
        </View>
      </View>
    </GluestackUIProvider>
  );
}
