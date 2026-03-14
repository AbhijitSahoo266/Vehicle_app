import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text, TouchableOpacity } from "react-native"; // 添加 TouchableOpacity
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Custom Drawer Content
function CustomDrawerContent(props) {
  const router = useRouter();

  return (
    <DrawerContentScrollView {...props}>
      <View className="p-4 border-b border-gray-200 mb-4">
        <Text className="text-xl font-bold">Vehicle Manager</Text>
        <Text className="text-gray-500">Admin Dashboard</Text>
      </View>
      <DrawerItem
        label="Dashboard"
        icon={({ color, size }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        )}
        onPress={() => router.navigate("/(app)/(drawer)/dashboard")}
      />

      <DrawerItem
        label="Vehicle List"
        icon={({ color, size }) => (
          <Ionicons name="car-outline" size={size} color={color} />
        )}
        onPress={() => router.navigate("/(app)/(drawer)/vehicles")}
      />

      <DrawerItem
        label="Trips"
        icon={({ color, size }) => (
          <Ionicons name="map-outline" size={size} color={color} />
        )}
        onPress={() => router.navigate("/(app)/(drawer)/trips")}
      />

      <DrawerItem
        label="Drivers"
        icon={({ color, size }) => (
          <Ionicons name="person-outline" size={size} color={color} />
        )}
        onPress={() => router.navigate("/(app)/(drawer)/drivers")}
      />
{/* 
      <DrawerItem
        label="Earnings"
        icon={({ color, size }) => (
          <Ionicons name="wallet-outline" size={size} color={color} />
        )}
        onPress={() => router.navigate("/(app)/(drawer)/earnings")}
      /> */}

      {/* <DrawerItem
        label="Maintenance"
        icon={({ color, size }) => (
          <Ionicons name="build-outline" size={size} color={color} />
        )}
        onPress={() => router.navigate("/(app)/(drawer)/maintenance")}
      /> */}
{/* 
      <DrawerItem
        label="Reports"
        icon={({ color, size }) => (
          <Ionicons name="bar-chart-outline" size={size} color={color} />
        )}
        onPress={() => router.navigate("/(app)/(drawer)/reports")}
      /> */}

      <DrawerItem
        label="Settings"
        icon={({ color, size }) => (
          <Ionicons name="settings-outline" size={size} color={color} />
        )}
        onPress={() => router.navigate("/(app)/(drawer)/settings")}
      />


      <View className="mt-auto border-t border-gray-200 pt-4">
        <DrawerItem
          label="Logout"
          icon={({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          )}
          onPress={() => router.replace("/(auth)/login")}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: '600',
        },

        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{ marginLeft: 15 }}
          >
            <Ionicons name="menu" size={28} color="#000000" />
          </TouchableOpacity>
        ),

        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
            <TouchableOpacity style={{ marginRight: 15 }}>
              <Ionicons name="notifications-outline" size={24} color="#4b5563" />
            </TouchableOpacity>
            <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center">
              <Text className="font-bold text-blue-600">A</Text>
            </View>
          </View>
        ),
        drawerStyle: {
          backgroundColor: '#ffffff',
          width: 280,
        },
        drawerActiveTintColor: '#2563eb',
        drawerInactiveTintColor: '#4b5563',
        drawerActiveBackgroundColor: '#eff6ff',
      })}
    >
      <Drawer.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="vehicles"
        options={{
          title: "Vehicle List",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="car-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}