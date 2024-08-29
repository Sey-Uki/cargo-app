import { ArrowRight } from "@/components/ArrowRight";
import { TopBar } from "@/components/TopBar";
import { useAppDispatch, useAppSelector } from "@/store";
import { logOut } from "@/store/slices/auth";
import { selectUserData } from "@/store/slices/user";
import { Button, ButtonText, Text, View } from "@gluestack-ui/themed";
import { router } from "expo-router";

export default function Profile() {
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  return (
    <View flex={1} backgroundColor="#fff">
      <View style={{ height: 70 }} />
      <TopBar text="Профиль" />
      <View justifyContent="space-between" backgroundColor="#F2F2F7" flex={1}>
        <View>
          <View alignItems="center" padding={20}>
            <View
              width={64}
              height={64}
              style={{ backgroundColor: "#828282" }}
              borderRadius={100}
            />
          </View>
          <View>
            <View
              flexDirection="row"
              justifyContent="space-between"
              height={48}
              alignItems="center"
              padding={14}
            >
              <Text color="$black" fontWeight={500}>
                Имя
              </Text>
              <Text color="$black">
                {userData?.firstName} {userData?.lastName}
              </Text>
              <ArrowRight />
            </View>
            <View
              flexDirection="row"
              justifyContent="space-between"
              height={48}
              alignItems="center"
              padding={14}
            >
              <Text color="$black" fontWeight={500}>
                Email
              </Text>
              <Text color="$black">{userData?.email}</Text>
              <ArrowRight />
            </View>
          </View>
        </View>
        <Button
          margin={14}
          marginBottom={21}
          size="lg"
          borderRadius={8}
          bgColor="#CE1D1D"
          onPress={() => {
            dispatch(logOut());
            router.replace("/sign_in");
          }}
        >
          <ButtonText>Выйти</ButtonText>
        </Button>
      </View>
    </View>
  );
}
