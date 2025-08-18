import { Stack } from 'expo-router';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

import { Text } from 'tamagui';
import { View } from 'react-native';

export default function Home() {
  return (
    <>
      <View testID="index-page">
        <Stack.Screen options={{ title: 'Home' }} />
        <Container>
          <ScreenContent path="app/(drawer)/index.tsx" title="Home" />
          <Text>test text</Text>
        </Container>
      </View>
    </>
  );
}
