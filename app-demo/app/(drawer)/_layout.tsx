import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import { HeaderButton } from '../../components/HeaderButton';

const DrawerLayout = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="detail"
        options={{
          headerTitle: '资讯详情',
          drawerLabel: '资讯详情',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
