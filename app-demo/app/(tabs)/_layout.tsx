import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import SearchHeader from '../../components/SearchHeader';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // 所有页面都使用自定义 header
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: '#FFFFFF',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '资讯列表',
          tabBarLabel: '资讯',
          tabBarButtonTestID: 'tab-index',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="card-list"
        options={{
          title: '卡片视图',
          tabBarLabel: '卡片',
          tabBarButtonTestID: 'tab-card-list',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="user-center"
        options={{
          title: '个人中心',
          tabBarLabel: '我的',
          tabBarButtonTestID: 'tab-user-center',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
} 