import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState,useEffect } from "react";
import { getDrivers } from "../../../src/api/services/driverService";

// Demo image URLs for drivers
const demoImages = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w-400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
];



export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
const [loading, setLoading] = useState(true);
  useEffect(() => {
  fetchDrivers();
}, []);

const fetchDrivers = async () => {
  try {
    const data = await getDrivers();
console.log(`data`,data)
    // API data → UI format convert
    const formattedDrivers = data.map((d) => ({
      id: d.id.toString(),
      name: d.name,
      phone: d.phoneNumber,
      salary: Number(d.currentSalary),
      status: d.isActive ? "Active" : "Inactive",
      image:
        d.imageUrl ||
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    }));

    setDrivers(formattedDrivers);
  } catch (error) {
    console.log("Driver fetch error:", error);
  } finally {
    setLoading(false);
  }
};

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return { bg: "bg-green-100", text: "text-green-700", icon: "checkmark-circle" };
      case "On Leave":
        return { bg: "bg-yellow-100", text: "text-yellow-700", icon: "time" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-700", icon: "help-circle" };
    }
  };

  const renderDriver = ({ item }) => {
    const status = getStatusStyle(item.status);
    if (loading) {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Loading Drivers...</Text>
    </View>
  );
}

    return (
      <View className="bg-white p-4 rounded-xl mb-3 shadow-sm">
        <View className="flex-row justify-between items-center">
          {/* Left side: Profile image and driver info */}
          <View className="flex-row items-center flex-1">
            {/* Profile Image */}
            <View className="relative mr-3">
              <Image
                source={{ uri: item.image }}
                className="w-14 h-14 rounded-full"
                resizeMode="cover"
              />
              {/* Online indicator for active drivers */}
              {item.status === "Active" && (
                <View className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
              )}
            </View>
            
            <View className="flex-1">
              <Text className="text-lg font-bold">{item.name}</Text>
              <Text className="text-gray-500 mt-0.5">📞 {item.phone}</Text>
              
              {/* Salary info moved here */}
              <View className="flex-row items-center mt-2">
                <Ionicons name="wallet-outline" size={16} color="#6b7280" />
                <Text className="ml-2 text-gray-700 font-semibold">
                  ₹{item.salary.toLocaleString()}/month
                </Text>
              </View>
            </View>
          </View>

          {/* Right side: Status badge */}
          <View className={`px-3 py-1.5 rounded-full flex-row items-center ${status.bg}`}>
            <Ionicons name={status.icon} size={14} color={status.text.includes('green') ? "#15803d" : status.text.includes('yellow') ? "#ca8a04" : "#6b7280"} />
            <Text className={`ml-1 text-sm font-medium ${status.text}`}>
              {item.status}
            </Text>
          </View>
        </View>

        {/* Action buttons row - moved to bottom */}
        <View className="flex-row justify-between items-center mt-4 border-t border-gray-100 pt-3">
          <View className="flex-row items-center">
            {/* Optional: Additional info can go here */}
          </View>

          <View className="flex-row space-x-2">
            <TouchableOpacity className="p-2 bg-blue-100 rounded-lg">
              <Ionicons name="call-outline" size={18} color="#2563eb" />
            </TouchableOpacity>

            <TouchableOpacity className="p-2 bg-gray-100 rounded-lg">
              <Ionicons name="pencil-outline" size={18} color="#4b5563" />
            </TouchableOpacity>

            <TouchableOpacity className="p-2 bg-red-100 rounded-lg">
              <Ionicons name="trash-outline" size={18} color="#dc2626" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-50 p-5">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <View>
          <Text className="text-2xl font-bold">Drivers</Text>
          <Text className="text-gray-500 mt-1">{drivers.length} drivers found</Text>
        </View>

        <TouchableOpacity className="flex-row items-center bg-blue-600 px-4 py-2.5 rounded-lg active:bg-blue-700">
          <Ionicons name="add-outline" size={20} color="#fff" />
          <Text className="text-white ml-1 font-semibold">Add Driver</Text>
        </TouchableOpacity>
      </View>

      {/* Driver List */}
      <FlatList
        data={drivers}
        keyExtractor={(item) => item.id}
        renderItem={renderDriver}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}