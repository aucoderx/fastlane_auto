import { Stack } from 'expo-router';

export default function DetailLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTransparent: true,
        headerTintColor: 'transparent',
      }}
    >
      <Stack.Screen
        name="detail"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
} 