import { ArrowLeft } from "@/components/ArrowLeft";
import { TopBar } from "@/components/TopBar";
import { useAppSelector } from "@/store";
import { selectOrders } from "@/store/slices/orders";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { Text, View } from "@gluestack-ui/themed";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import Timeline from "react-native-timeline-flatlist";

export default function Traking() {
  const { id } = useLocalSearchParams();

  const orders = useAppSelector(selectOrders);

  const order = useMemo(() => {
    const temp = orders.find((item) => item.id === id)?.location.split("-");

    const data = temp?.map((item, index) => {
      if (index === temp.length - 1)
        return {
          title: item.trim(),
          icon: <Entypo name="location" size={24} color="#4B0082" />,
        };

      return {
        title: item.trim(),
        icon: <FontAwesome6 name="plane-up" size={24} color="#4B0082" />,
      };
    });
    return data;
  }, [id, orders]);

  if (!order) {
    return <Text>Нет данных</Text>;
  }

  return (
    <View flex={1}>
      <View style={{ height: 70 }} />
      <TopBar
        button={{
          jsx: <ArrowLeft />,
          onPress: () => router.back(),
        }}
        title="Отслеживание груза"
      />
      <Timeline
        style={{ paddingTop: 50 }}
        data={order}
        isUsingFlatlist={true}
        titleStyle={{ fontSize: 20, marginTop: -11, marginBottom: 50 }}
        innerCircle={"icon"}
        circleStyle={{
          backgroundColor: "none",
          width: 24,
          height: 24,
          marginLeft: -3,
        }}
        lineColor="#4B0082"
      />
    </View>
  );
}
