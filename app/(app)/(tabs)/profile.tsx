import { ProfileText } from "@/components/ProfileText";
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
      <View
        justifyContent="space-between"
        backgroundColor="#F2F2F7"
        flex={1}
        paddingHorizontal={16}
      >
        <View gap={32} marginTop={32}>
          <ProfileText
            infoText={"Имя"}
            userText={`${userData?.firstName} ${userData?.lastName}`}
          />
          <View>
            <Text
              color="#797676"
              paddingBottom={7}
              paddingLeft={16}
              fontFamily="SFProText-Regular"
              fontSize={14}
            >
              E-MAIL И ТЕЛЕФОН
            </Text>
            <ProfileText infoText={"Email"} userText={userData?.email} />

            <ProfileText infoText={"Телефон"} userText={"+7 (999) 999 99-99"} />
          </View>
          <ProfileText infoText={"Код"} userText={"6438819"} />
        </View>

        <Button
          marginBottom={21}
          size="lg"
          borderRadius={12}
          bgColor="#ffffff"
          onPress={() => {
            dispatch(logOut());
            router.replace("/sign_in");
          }}
        >
          <ButtonText
            color="#FF3B30"
            fontFamily="SFProText-Medium"
            fontSize={16}
          >
            Выйти
          </ButtonText>
        </Button>
      </View>
    </View>
  );
}
