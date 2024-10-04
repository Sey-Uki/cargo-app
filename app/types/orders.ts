export type ImageItem = {
  src: string;
  title: string;
};

export type OrderItem = {
  userId: string;
  code: string;
  createdate: string;
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
  magicTransImage?: ImageItem;
  images?: ImageItem[];
};
