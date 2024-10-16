import { Card, Heading, Spinner, Text, View } from "@gluestack-ui/themed";
import { useAppSelector } from "@/store";
import { Pressable, FlatList, RefreshControl } from "react-native";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { selectUserData } from "@/store/slices/user";
import { FILTER_HASH, FILTERS, TRACKING_STATUSES } from "@/app/data/orders";
import { ImageList } from "@/components/ImageList";
import { localizeDate } from "@/utils";
import { FilterType, OrderItem } from "@/app/types/orders";
import { getOrdersByUserId } from "@/app/api/orders";

export default function Index() {
  const user = useAppSelector(selectUserData);

  const [selectedFilter, setSelectedFilter] = useState<FilterType>("active");

  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderItem[]>([]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    if (!user?.userId) return;

    setRefreshing(true);

    getOrdersByUserId(user.userId)
      .then((data) => setOrders(data))
      .finally(() => setRefreshing(false));
  }, [user?.userId]);

  useEffect(() => {
    if (!user?.userId) return;

    setIsLoading(true);

    getOrdersByUserId(user.userId)
      .then((data) => setOrders(data))
      .finally(() => setIsLoading(false));
  }, [user?.userId]);

  return (
    <View flex={1} backgroundColor="#fff">
      <View style={{ height: 70 }} />

      <Heading textAlign="center" paddingBottom={9}>
        Все заказы
      </Heading>

      {isLoading && (
        <View height="100%" backgroundColor="#F2F2F7">
          <Spinner color="#1A64CB" paddingTop={50} size="large" />
        </View>
      )}
      <View height="100%" backgroundColor="#F2F2F7">
        {!isLoading && orders.length > 0 && (
          <>
            <FlatList
              style={{ flexDirection: "row", marginTop: 16, marginLeft: 16 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={FILTERS}
              renderItem={({ item }) => {
                if (selectedFilter === item) {
                  return (
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
                        {FILTER_HASH[item]}
                      </Text>
                    </View>
                  );
                }

                return (
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
                        {FILTER_HASH[item]}
                      </Text>
                    </View>
                  </Pressable>
                );
              }}
              keyExtractor={(item) => item}
            />
            <FlatList
              style={{ height: "100%" }}
              data={orders}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              renderItem={({ item }) => {
                if (
                  selectedFilter === item.orderStatus ||
                  (selectedFilter === "wait" && !item.paymentDate) ||
                  (selectedFilter === "paid" && item.paymentDate)
                ) {
                  return (
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
                      <Pressable
                        onPress={() => {
                          router.navigate({
                            pathname: "/(cards)/[id]",
                            params: { id: item.id },
                          });
                        }}
                      >
                        <View gap={12}>
                          <View>
                            <Heading size="lg">
                              Заказ от {localizeDate(new Date(item.createdate))}
                            </Heading>
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
                      </Pressable>

                      {item.images && <ImageList images={item.images} />}
                    </Card>
                  );
                }
                return null;
              }}
              keyExtractor={(item) => item.code}
            />
          </>
        )}

        {!isLoading && orders.length === 0 && (
          <Text paddingTop={4}>Нет данных</Text>
        )}
      </View>
    </View>
  );
}
