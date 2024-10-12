import React, { useMemo, } from "react";

import {
  Text,
  View,
} from "@gluestack-ui/themed";
import Timeline from "react-native-timeline-flatlist";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";

import { localizeDateTime } from "@/utils";

import { TRACKING, TRACKING_STATUSES } from "@/app/data/orders";
import type { TrackingItem } from "@/app/types/orders";

type TrackingProps = {
  orderTracking: TrackingItem[]
}

export const Tracking = React.memo(({ orderTracking }: TrackingProps) => {
  const trackingData = useMemo(() => {
    return TRACKING.map((status, index) => {
      const orderStatus = orderTracking[index]?.status
      const orderDate = orderTracking[index]?.date

      if (status !== orderStatus) {
        return {
          title: TRACKING_STATUSES[status],
          icon: <FontAwesome name="circle" size={12} color="#E1EBF9" />,
          color: "#939090",
          lineColor: "#E1EAF9",
        };
      }

      if (index === orderTracking.length - 1) {
        return {
          title: TRACKING_STATUSES[status],
          icon: <FontAwesome6 name="location-dot" size={12} color="#1A64CB" />,
          description: localizeDateTime(new Date(orderDate)),
          color: "#1A64CB",
          lineColor: "#1A64CB",
        };
      }

      return {
        title: TRACKING_STATUSES[status],
        icon: <FontAwesome name="circle" size={12} color="#1A64CB" />,
        description: localizeDateTime(new Date(orderDate)),
        color: "#000000",
        descriptionColor: "#605E5E",
        lineColor: "#1A64CB",
      };
    });
  }, [orderTracking]);

  return (
    <View
      backgroundColor="white"
      borderRadius={8}
      padding={16}
      gap={20}
    >
      <Text
        color="black"
        fontWeight={500}
        size="lg"
      >
        История перемещений
      </Text>
      
      <Timeline
        data={trackingData}
        innerCircle="icon"
        circleStyle={{
          backgroundColor: "none",
          width: 12,
          height: 12,
          marginLeft: 2.5,

          marginTop: -15,
        }}
        rowContainerStyle={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          
          marginTop: 18,
        }}
        showTime={false}
        renderDetail={(data: any) => {
          return (
            <View
              style={{
                marginTop: -25,
              }}
            >
              <Text color={data.color} size="md" fontWeight={500}>
                {data.title}
              </Text>

              {data.description && (
                <Text
                  color={data.descriptionColor ?? data.color}
                  size="sm"
                >
                  {data.description}
                </Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
})

Tracking.displayName = 'Tracking'
