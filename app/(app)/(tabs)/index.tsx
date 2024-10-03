import { Card, Heading, Spinner, Text, View } from "@gluestack-ui/themed";
import { TopBar } from "@/components/TopBar";
import { useAppSelector } from "@/store";
import { Pressable, FlatList, Alert } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { selectUserData } from "@/store/slices/user";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase-config";
import { TRACKING_STATUSES } from "@/assets/data";
import { Image } from "@gluestack-ui/themed";

type OrderItem = {
  userId: string;
  code: string;
  deliveryDate: string;
  paymentDate: Date | null;
  tracking: {
    status: "toMoscow" | "inMoscow" | "toRecipient";
    date: string;
  }[];
  orderStatus: "active" | "finished";
  invoice: {
    title: string;
    weight: number;
    volume: number;
    price: number;
    goods: number;
    insurance: number;
    package: number;
    finalPrice: number;
  };
  hiddenInvoice: {
    density: number;
    transAmount: number;
    elevenRate: number;
    orderIncome: number;
  };
  magicTransImage?: any;
  images?: any;
};

const filters = ["active", "finished", "wait", "paid"] as const;

type FilterType = (typeof filters)[number];

const filtersHash: Record<FilterType, string> = {
  active: "Активный",
  finished: "Завершенный",
  wait: "Ждут оплаты",
  paid: "Оплаченый",
};

export default function Index() {
  const user = useAppSelector(selectUserData);

  const [selectedFilter, setSelectedFilter] = useState<FilterType>("active");

  const [isLoading, setIsLoading] = useState(false);
  const [ordersDataState, setOrdersDataState] = useState<OrderItem[]>([]);

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
              data={filters}
              renderItem={({ item }) =>
                selectedFilter === item ? (
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
                      {filtersHash[item]}
                    </Text>
                  </View>
                ) : (
                  <Pressable onPress={() => setSelectedFilter(item)}>
                    <View
                      borderRadius={8}
                      borderColor="#79747E"
                      borderWidth={1}
                      marginRight={6}
                    >
                      <Text
                        color="#49454F"
                        paddingHorizontal={12}
                        paddingVertical={6}
                        size="sm"
                      >
                        {filtersHash[item]}
                      </Text>
                    </View>
                  </Pressable>
                )
              }
              keyExtractor={(item) => item}
            />
            <FlatList
              style={{ height: "100%" }}
              data={ordersDataState}
              renderItem={({ item }) => {
                if (
                  selectedFilter === item.orderStatus ||
                  (selectedFilter === "wait" && !item.paymentDate) ||
                  (selectedFilter === "paid" && item.paymentDate)
                ) {
                  return (
                    <Pressable
                      onPress={() => {
                        router.navigate({
                          pathname: "/(cards)/[id]",
                          params: { id: item.code },
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
                          <View>
                            <Text size="md" color="$black" fontWeight={500}>
                              Статус доставки:
                            </Text>
                            <Text size="sm" color="#605E5E">
                              {
                                TRACKING_STATUSES[
                                  item.tracking?.[item.tracking.length - 1]
                                    .status
                                ]
                              }
                            </Text>
                          </View>
                          <Text
                            size="md"
                            color={item.paymentDate ? "$black" : "#FF3B30"}
                            fontWeight={500}
                          >
                            {item.paymentDate ? "Оплачен" : "Не оплачен"}
                          </Text>
                        </View>
                        <View flexDirection="row" gap={6}>
                          {item.images.map((image: any) => (
                            <Image
                              size="md"
                              source={{
                                uri: image.src,
                              }}
                              alt={image.title}
                              borderRadius={8}
                            />
                          ))}
                        </View>
                      </Card>
                    </Pressable>
                  );
                }
                return null;
              }}
              keyExtractor={(item) => item.code}
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
