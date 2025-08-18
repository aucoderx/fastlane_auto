import { Stack } from 'expo-router';
import { View } from 'react-native';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
      <View testID="tab-one">
        <Stack.Screen options={{ title: 'Tab One' }} />
        <Container>
          <ScreenContent path="app/(drawer)/(tabs)/index.tsx" title="Tab One" />
        </Container>
      </View>
    </>
  );
}
