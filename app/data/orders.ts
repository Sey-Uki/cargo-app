import { FilterType, TrackingType } from "@/app/types/orders";

export const TRACKING_STATUSES: Record<TrackingType, string> = {
  toMoscow: "Выехал из Китая в Москву",
  inMoscow: "На складе в Москве",
  toRecipient: "Выехал к получателю",
};

export const FILTER_HASH: Record<FilterType, string> = {
  active: "Активный",
  finished: "Завершенный",
  wait: "Ждут оплаты",
  paid: "Оплаченый",
};

export const FILTERS = ["active", "finished", "wait", "paid"] as const;
