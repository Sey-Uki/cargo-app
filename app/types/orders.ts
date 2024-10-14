export type ImageItem = {
  src: string;
  title: string;
};

export type FilterType = "active" | "finished" | "wait" | "paid";

export type TrackingType = "toMoscow" | "inMoscow" | "toRecipient";

export type OrderStatusType = "active" | "finished";

export type TrackingItem = {
  status: TrackingType;
  date: string;
}

export type OrderItem = {
  id: string;
  userId: string;
  code: string;
  createdate: string;
  paymentDate: Date | null;
  tracking: TrackingItem[];
  orderStatus: OrderStatusType;
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
  magicTransImage: ImageItem | null;
  images: ImageItem[] | null;
};
