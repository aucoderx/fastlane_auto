import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { TabBarIcon } from '~/components/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarButtonTestID: 'tab-one-button',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        } as BottomTabNavigationOptions}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarButtonTestID: 'tab-two-button',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        } as BottomTabNavigationOptions}
      />
    </Tabs>
  );
}
