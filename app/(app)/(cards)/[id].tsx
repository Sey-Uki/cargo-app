import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Image } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import * as Clipboard from "expo-clipboard";

import { MaterialIcons } from "@expo/vector-icons";

import {
  Button,
  ButtonText,
  Heading,
  Icon,
  Modal,
  ModalContent,
  Pressable,
  Text,
  View,
  Spinner,
  ArrowRightIcon,
  InfoIcon,
  ScrollView,
  Divider,
} from "@gluestack-ui/themed";

import { getOrderById } from "@/app/api/orders";
import { TRACKING, TRACKING_STATUSES } from "@/app/data/orders";
import { OrderItem } from "@/app/types/orders";

import { localizeDate } from "@/utils";

import { ImageList } from "@/components/ImageList";
import { InvoiceItem } from "@/components/InvoiceItem";
import { Tracking } from "@/components/Tracking";
import { Accordion } from "@/components/Accordion";
import { OrderPayment } from "@/components/OrderPayment";
import { TopBar } from "@/components/TopBar";
import { ImageModal } from "@/components/ImageModal";
import { RefreshControl } from "react-native";

export default function Card() {
  const { id } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<OrderItem | undefined>();

  const [showInvoice, setShowInvoice] = useState(false);

  const [showImg, setShowImg] = useState(false);
  const [imgUri, setImgUri] = useState({ uri: "", alt: "" });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    if (!id) return;

    setRefreshing(true);

    getOrderById(id as string)
      .then((data) => setOrder(data as OrderItem))
      .finally(() => setRefreshing(false));
  }, [id]);

  const ref = useRef(null);

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    getOrderById(id as string)
      .then((data) => setOrder(data as OrderItem))
      .finally(() => setIsLoading(false));
  }, [id]);

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

  const onCopy = useCallback(async () => {
    await Clipboard.setStringAsync(`#${order?.code}`);
  }, [order?.code]);

  if (isLoading) {
    return (
      <>
        <View style={{ height: 70 }} />
        <View height="100%" backgroundColor="#F2F2F7">
          <Spinner color="#1A64CB" paddingTop={50} size="large" />
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
    <ScrollView
      flex={1}
      contentContainerStyle={{
        paddingVertical: 50,
      }}
      showsVerticalScrollIndicator={false}
      backgroundColor="white"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <TopBar
        left={{ onPress: router.back }}
        right={{
          icon: <MaterialIcons name="file-copy" size={22} color="#007AFF" />,
          onPress: onCopy,
        }}
        title={`#${order.code}`}
        text={`от ${localizeDate(new Date(order.createdate))}`}
      />
      <Divider style={{ backgroundColor: "#E6E6E6", height: 1 }} />

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

              <View flexWrap="wrap" flexDirection="row" gap={5}>
                <View flexDirection="row" alignItems="center" gap={5}>
                  <Text fontWeight={500} size="md" color="$black">
                    {currentStatus}
                  </Text>

                  <Icon as={ArrowRightIcon} color="#939090" />
                </View>

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

            {order.magicTransImage && (
              <>
                <Divider
                  marginVertical={12}
                  style={{ backgroundColor: "#E6E6E6", height: 1 }}
                />

                <Pressable onPress={onShowInvoice} ref={ref}>
                  <Text color="#0070FF" fontWeight={500} size="sm">
                    Открыть накладную от Magic Trans
                  </Text>
                </Pressable>
              </>
            )}
          </View>
        </View>

        <View borderRadius={8} padding={16} backgroundColor="white">
          {!order.paymentDate ? unpaidOrder : paidOrder}
        </View>

        {order.tracking && <Tracking orderTracking={order.tracking} />}

        {order.images && (
          <View backgroundColor="white" borderRadius={8} padding={16}>
            <Text color="black" fontWeight={500} size="lg">
              Товары
            </Text>
            <ImageList
              images={order.images}
              setShowImgInfo={setImgUri}
              showModal={setShowImg}
            />
          </View>
        )}

        <ImageModal
          title="Накладная"
          text="от Magic Trans"
          showModal={showInvoice}
          onHideModal={onHideInvoice}
          img={{
            uri: order.magicTransImage?.src,
            alt: order.magicTransImage?.title,
          }}
        />

        <ImageModal
          title="Товары"
          showModal={showImg}
          onHideModal={() => setShowImg(false)}
          img={imgUri}
        />
      </View>
    </ScrollView>
  );
}
