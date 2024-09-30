import {
  Button,
  ButtonText,
  Card,
  Heading,
  Spinner,
  Text,
  View,
} from "@gluestack-ui/themed";
import { ArrowRight } from "@/components/ArrowRight";
import { TopBar } from "@/components/TopBar";
import { useAppSelector } from "@/store";
import { Pressable, FlatList, Alert } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { selectUserData } from "@/store/slices/user";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase-config";
import { TRACKING_STATUSES } from "@/assets/data";

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

  const filter = [
    { title: "Активный", status: true },
    { title: "Ждут оплаты", status: false },
    { title: "Оплаченый", status: false },
    { title: "Завершенный", status: false },
  ];

  return (
    <View flex={1} backgroundColor="#fff">
      <View style={{ height: 70 }} />
      <TopBar text="Все заказы" />
      {isLoading && (
        <View height="100%" backgroundColor="#F2F2F7">
          <Spinner color="$emerald600" paddingTop={50} size="large" />
        </View>
      )}
      <View height="100%" backgroundColor="#F2F2F7">
        {!isLoading && ordersDataState.length > 0 && (
          <>
            <FlatList
              style={{ flexDirection: "row", marginTop: 16, marginLeft: 16 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={filter}
              renderItem={({ item }) =>
                item.status ? (
                  <View
                    borderRadius={8}
                    backgroundColor="#007AFF"
                    marginRight={6}
                  >
                    <Text
                      color={"$white"}
                      paddingHorizontal={12}
                      paddingVertical={6}
                      size="sm"
                    >
                      {item.title}
                    </Text>
                  </View>
                ) : (
                  <View borderRadius={8} borderColor="#79747E" borderWidth={1}  marginRight={6}>
                    <Text
                      color="#49454F"
                      paddingHorizontal={12}
                      paddingVertical={6}
                      size="sm"
                    >
                      {item.title}
                    </Text>
                  </View>
                )
              }
              keyExtractor={(item) => item.title}
            />
            <FlatList
              style={{ height: "100%" }}
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
                    bgColor="#FFFFFF"
                    variant="filled"
                    marginTop={12}
                    marginRight={16}
                    marginLeft={16}
                    borderColor="#E5E1E1"
                    borderWidth={1}
                    borderRadius={16}
                    padding={12}
                  >
                    <View gap={12}>
                      <View>
                        <Heading size="lg">Заказ от ТЕСТ</Heading>
                        <Text size="sm" color="#605E5E">
                          #{item.code}
                        </Text>
                      </View>

                      <View
                        width="100%"
                        flexDirection="row"
                        justifyContent="space-between"
                      >
                        <View>
                          <Text size="md" color="$black" fontWeight={500}>
                            Статус доставки:
                          </Text>
                          <Text size="sm" color="#605E5E">
                            {
                              TRACKING_STATUSES[
                                item.tracking[item.tracking.length - 1].status
                              ]
                            }
                          </Text>
                        </View>
                        <View marginRight={33}>
                          <Text size="md" color="$black" fontWeight={500}>
                            Дата доставки:
                          </Text>
                          <Text size="sm" color="#605E5E">
                            ТЕСТ
                          </Text>
                        </View>
                      </View>
                      {item.paymentStatus === "paid" ? (
                        <Text size="md" color="$black" fontWeight={500}>
                          Оплачен
                        </Text>
                      ) : (
                        <View
                          backgroundColor="#FDE9E4"
                          padding={10}
                          borderRadius={12}
                        >
                          <Text size="sm" color="$black" fontWeight={500}>
                            Заказ не оплачен
                          </Text>
                          <Text size="sm" color="$black">
                            Оплатите в течение 14 дней (до 23 августа)
                          </Text>
                          <Button marginTop={12} borderRadius={100} height={35}>
                            <ButtonText fontWeight={500} size="md">
                              Перейти к оплате
                            </ButtonText>
                          </Button>
                        </View>
                      )}
                    </View>
                  </Card>
                </Pressable>
              )}
              keyExtractor={(item) => item.id}
            />
          </>
        )}

        {!isLoading && ordersDataState.length === 0 && (
          <Text paddingTop={4}>Нет данных</Text>
        )}
      </View>
    </View>
  );
}
