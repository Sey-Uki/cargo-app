import {
  GluestackUIProvider,
  Box,
  View,
  Text,
  HStack,
  FormControl,
  Input,
  InputField,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

export default function HomeScreen() {
  return (
    <View>
      <GluestackUIProvider config={config}>
        <Box width="100%" justifyContent="center" alignItems="center">
          <HStack
            height="100%"
            justifyContent="center"
            space="lg"
            flexDirection="column"
            width="100%"
            padding={20}
          >
            <Text size="xl" bold>
              Введите свой номер телефона
            </Text>
            <FormControl>
              <Input>
                <InputField placeholder="Телефон" />
              </Input>
            </FormControl>
            <FormControl>
              <Button bg="$darkBlue600">
                <ButtonText fontSize="$sm" fontWeight="$medium">
                  Отправить
                </ButtonText>
              </Button>
            </FormControl>
          </HStack>
        </Box>
      </GluestackUIProvider>
    </View>
  );
}
