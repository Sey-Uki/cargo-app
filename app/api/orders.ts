import { db } from "@/firebase-config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Alert } from "react-native";
import { OrderItem } from "../types/orders";

export const getOrdersByUserId = async (
  userId: string
): Promise<OrderItem[]> => {
  try {
    const ordersCollection = collection(db, "orders");

    const ordersSnapshot = await getDocs(ordersCollection);

    const ordersList = ordersSnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return ordersList.filter((order) => {
      return userId === order.userId;
    });
  } catch (error: any) {
    Alert.alert("Ошибка", "Что-то пошло не так");

    console.error("Ошибка при получении данных о заказах: ", error);

    return [];
  }
};

export const getOrderById = async (
  orderId: string
) => {
  try {
    const docRef = doc(db, "orders", orderId);

    return (await getDoc(docRef)).data();
  } catch (error: any) {
    Alert.alert("Ошибка", "Что-то пошло не так");

    console.error("Ошибка при получении данных о заказе: ", error);

    return ;
  }
};
