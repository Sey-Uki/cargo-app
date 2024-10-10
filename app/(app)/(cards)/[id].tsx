import { getOrderById } from "@/app/api/orders";
import { TRACKING, TRACKING_STATUSES } from "@/app/data/orders";
import { OrderItem } from "@/app/types/orders";
import { Accordion } from "@/components/Accordion";
import { ArrowLeft } from "@/components/ArrowLeft";
import { OrderPayment } from "@/components/OrderPayment";
import { TopBar } from "@/components/TopBar";
import { localizeDate } from "@/utils";

import {
  Button,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalContent,
  Pressable,
  Text,
  ModalCloseButton,
  View,
  Spinner,
  ArrowRightIcon,
  InfoIcon,
} from "@gluestack-ui/themed";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Image } from "react-native";
import Timeline from "react-native-timeline-flatlist";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { ImageList } from "@/components/ImageList";
import { Divider } from "@gluestack-ui/themed";
import { InvoiceItem } from "@/components/InvoiceItem";

export default function Card() {
  const { id } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<OrderItem | undefined>();

  const [showInvoice, setShowInvoice] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    getOrderById(id as string)
      .then((data) => setOrder(data as OrderItem))
      .finally(() => setIsLoading(false));
  }, [id]);

  const dataTracking = useMemo(() => {
    if (order?.tracking?.length === 0) return [];

    return order?.tracking.map((item, index) => {
      if (index === order?.tracking.length - 1) {
        return {
          title: item.status,
          icon: <Entypo name="location" size={24} color="#1A64CB" />,
        };
      }

      return {
        title: item.status,
        icon: <FontAwesome6 name="plane-up" size={24} color="#1A64CB" />,
      };
    });
  }, [order?.tracking]);

  const unpaidOrder = useMemo(() => {
    if (!order?.invoice) return null;

    return (
      <>
        <View gap={6} flexDirection="row" alignItems="center" marginBottom={16}>
          <Icon as={InfoIcon} color="#FF0F0F" />
          <Text color="black" fontWeight={500} size="lg">
            Заказ не оплачен
          </Text>
        </View>
        <OrderPayment
          paymentText="К оплате"
          order={{
            goods: order.invoice.goods,
            insurance: order.invoice.insurance,
            package: order.invoice.package,
            finalPrice: order.invoice.finalPrice,
          }}
        />
        <Button bg="#1A64CB" borderRadius={100} height={40} marginTop={7}>
          <ButtonText fontSize="$sm" fontWeight="$medium">
            Перейти к оплате
          </ButtonText>
        </Button>
      </>
    );
  }, [order?.invoice]);

  const paidOrder = useMemo(() => {
    if (!order?.invoice) return null;

    return (
      <Accordion
        list={[
          {
            id: "1",
            text: "Заказ оплачен",
            content: (
              <OrderPayment
                paymentText="Итого"
                order={{
                  goods: order.invoice.goods,
                  insurance: order.invoice.insurance,
                  package: order.invoice.package,
                  finalPrice: order.invoice.finalPrice,
                }}
              />
            ),
          },
        ]}
      />
    );
  }, [order?.invoice]);

  if (isLoading) {
    return (
      <>
        <View style={{ height: 70 }} />
        <View height="100%" backgroundColor="#F2F2F7">
          <Spinner color="$emerald600" paddingTop={50} size="large" />
        </View>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <View style={{ height: 70 }} />
        <Text color="$black">Нет данных</Text>
      </>
    );
  }

  const onShowInvoice = () => setShowInvoice(true);
  const onHideInvoice = () => setShowInvoice(false);

  const lastTrackingStatus =
    order.tracking?.[order.tracking.length - 1]?.status || "";
  const currentStatus = TRACKING_STATUSES[lastTrackingStatus];
  const nextStatusIndex = TRACKING.indexOf(lastTrackingStatus) + 1;
  const nextStatus = TRACKING_STATUSES[TRACKING[nextStatusIndex]] || "";

  return (
    <View flex={1} backgroundColor="white">
      <View style={{ height: 70 }} />
      <TopBar
        button={{
          jsx: <ArrowLeft />,
          onPress: () => router.back(),
        }}
        text={`#${order.code} от ${localizeDate(new Date(order.createdate))}`}
      />

      <View flex={1} backgroundColor="#F2F2F7" gap={8}>
        <View
          borderBottomRightRadius={8}
          borderBottomLeftRadius={8}
          padding={16}
          backgroundColor="white"
        >
          <View>
            <Heading marginBottom={12} size="xl">
              Отправка
            </Heading>
            <View>
              <Text color="#939090" size="sm">
                Статус
              </Text>

              <View flexDirection="row" justifyContent="space-between">
                <Text fontWeight={500} size="md" color="$black">
                  {currentStatus}
                </Text>
                <Icon as={ArrowRightIcon} color="#939090" />
                <Text color="#797676">{nextStatus}</Text>
              </View>
              <Divider
                marginVertical={12}
                style={{ backgroundColor: "#E6E6E6", height: 1 }}
              />
            </View>
            <View gap={10}>
              <View flexDirection="row">
                <InvoiceItem
                  label="Вес"
                  value={`${order.invoice.weight} кг`}
                  marginRight={139}
                />
                <InvoiceItem
                  label="Объем"
                  value={`${order.invoice.volume} м³`}
                />
              </View>
              <InvoiceItem
                label="Стоимость за 1 кг"
                value={`${order.invoice.price} ₽`}
              />
            </View>
            <Divider
              marginVertical={12}
              style={{ backgroundColor: "#E6E6E6", height: 1 }}
            />
            {order.magicTransImage && (
              <Pressable onPress={onShowInvoice} ref={ref}>
                <Text color="#0070FF" fontWeight={500} size="sm">
                  Открыть накладную от Magic Trans
                </Text>
              </Pressable>
            )}
          </View>
        </View>
        <View borderRadius={8} padding={16} backgroundColor="white">
          {!order.paymentDate ? unpaidOrder : paidOrder}
        </View>

        <View backgroundColor="white" borderRadius={8} padding={16}>
          <Text color="black" fontWeight={500} size="lg">
            История перемещений
          </Text>
          <Timeline
            style={{ paddingTop: 50 }}
            data={dataTracking}
            isUsingFlatlist={true}
            titleStyle={{ fontSize: 20, marginTop: -11, marginBottom: 50 }}
            innerCircle={"icon"}
            circleStyle={{
              backgroundColor: "none",
              width: 24,
              height: 24,
              marginLeft: -3,
            }}
            lineColor="#1A64CB"
          />
        </View>

        {order.images && (
          <View backgroundColor="white" borderRadius={8} padding={16}>
            <Text color="black" fontWeight={500} size="lg">
              Товары
            </Text>
            <ImageList images={order.images} />
          </View>
        )}

        <Modal isOpen={showInvoice} onClose={onHideInvoice} finalFocusRef={ref}>
          <ModalBackdrop />
          <ModalContent style={{ flex: 0.5 }}>
            <ModalCloseButton alignSelf="flex-end">
              <Icon as={CloseIcon} width={30} height={30} />
            </ModalCloseButton>
            <Image
              source={{ uri: order.magicTransImage?.src }}
              style={{ width: "100%", objectFit: "cover", flex: 1 }}
              alt={order.magicTransImage?.title}
            />
          </ModalContent>
        </Modal>
      </View>
    </View>
  );
}
