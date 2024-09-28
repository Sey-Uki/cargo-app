import { Card, Heading, Spinner, Text, View } from "@gluestack-ui/themed";
import { ArrowRight } from "@/components/ArrowRight";
import { TopBar } from "@/components/TopBar";
import { useAppSelector } from "@/store";
import { Pressable, FlatList, Alert } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { selectUserData } from "@/store/slices/user";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase-config";

export default function Index() {
  const user = useAppSelector(selectUserData);

  const [isLoading, setIsLoading] = useState(false);
  const [ordersDataState, setOrdersDataState] = useState<any>([]);

  const getOrders = async () => {
    try {
      const ordersCollection = collection(db, "orders");

      const ordersSnapshot = await getDocs(ordersCollection);

      const ordersList = ordersSnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const ordersData = ordersList.filter((array) => {
        return user?.userId === array.userId;
      });

      setIsLoading(false);

      if (ordersData === undefined) {
        throw new Error("Пользователь с такими кодом и паролем не существует");
      }

      setOrdersDataState(ordersData);
    } catch (error: any) {
      setIsLoading(false);

      Alert.alert("Ошибка", error?.message || "Что-то пошло не так");

      console.error("Ошибка при получении данных из о пользователе: ", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getOrders();
  }, []);

  return (
    <View flex={1} backgroundColor="#fff">
      <View style={{ height: 70 }} />

      <TopBar text="Все заказы" />
      <View>
        {isLoading && (
          <Spinner color="$emerald600" paddingTop={50} size="large" />
        )}
        {!isLoading && ordersDataState.length > 0 && (
          <FlatList
            style={{ height: "100%", paddingTop: 14 }}
            data={ordersDataState}
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
                    <Text size="sm" color="$black"></Text>
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

        {!isLoading && ordersDataState.length === 0 && (
          <Text paddingTop={4}>Нет данных</Text>
        )}
      </View>
    </View>
  );
}
