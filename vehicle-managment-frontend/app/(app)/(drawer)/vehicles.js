import { View, Text, FlatList, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";

const initialVehicles = [
  { 
    id: '1', 
    number: 'ABC-123',
    model: 'Toyota Camry', 
    type: 'Sedan', 
    status: 'Available', 
    rate: '45',
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400",
  },
  { 
    id: '2', 
    number: 'DEF-456',
    model: 'Honda Civic', 
    type: 'Sedan', 
    status: 'Rented', 
    rate: '40',
    image: 'https://via.placeholder.com/100x100?text=Honda' 
  },
  { 
    id: '3', 
    number: 'GHI-789',
    model: 'Ford F-150', 
    type: 'Truck', 
    status: 'Available', 
    rate: '75',
    image: 'https://via.placeholder.com/100x100?text=Ford' 
  },
  { 
    id: '4', 
    number: 'JKL-012',
    model: 'BMW X5', 
    type: 'SUV', 
    status: 'Maintenance', 
    rate: '90',
    image: 'https://via.placeholder.com/100x100?text=BMW' 
  },
  { 
    id: '5', 
    number: 'MNO-345',
    model: 'Tesla Model 3', 
    type: 'Electric', 
    status: 'Available', 
    rate: '85',
    image: 'https://via.placeholder.com/100x100?text=Tesla' 
  },
  { 
    id: '6', 
    number: 'PQR-678',
    model: 'Mercedes C-Class', 
    type: 'Luxury', 
    status: 'Rented', 
    rate: '95',
    image: 'https://via.placeholder.com/100x100?text=Mercedes' 
  },
  { 
    id: '7', 
    number: 'STU-901',
    model: 'Chevrolet Tahoe', 
    type: 'SUV', 
    status: 'Available', 
    rate: '80',
    image: 'https://via.placeholder.com/100x100?text=Chevrolet' 
  },
  { 
    id: '8', 
    number: 'VWX-234',
    model: 'Nissan Altima', 
    type: 'Sedan', 
    status: 'Available', 
    rate: '35',
    image: 'https://via.placeholder.com/100x100?text=Nissan' 
  },
];

export default function Vehicles() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const router = useRouter();

  const getStatusColor = (status) => {
    switch(status) {
      case 'Available': return { bg: 'bg-green-100', text: 'text-green-800' };
      case 'Rented': return { bg: 'bg-blue-100', text: 'text-blue-800' };
      case 'Maintenance': return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-800' };
    }
  };

  const renderVehicleItem = ({ item }) => {
    const statusColors = getStatusColor(item.status);
    
    return (
      <View className="bg-white rounded-2xl shadow-lg p-4 mb-4">
        {/* Main Row with Image and Details */}
        <View className="flex-row items-center">
          {/* Left Side - Image with Status Badge */}
          <View className="w-20 h-20 rounded-xl overflow-hidden mr-4 relative">
            <Image
              source={{ uri: item.image }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <View className={`absolute top-1 right-1 px-2 py-0.5 rounded-full ${statusColors.bg}`}>
              <Text className={`text-xs font-medium ${statusColors.text}`}>
                {item.status}
              </Text>
            </View>
          </View>

          {/* Middle - Vehicle Details */}
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-800">{item.number}</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="document-text" size={14} color="#6b7280" />
              <Text className="text-gray-600 text-sm ml-1 font-mono">{item.model}</Text>
            </View>
            <View className="flex-row items-center mt-1">
              <Ionicons name="car-sport-outline" size={14} color="#6b7280" />
              <Text className="text-gray-600 text-sm ml-1">{item.type}</Text>
            </View>
          </View>

          {/* Right Side - Amount */}
          <View className="items-end">
            <Text className="text-lg font-bold text-blue-600">{item.rate}/day</Text>
          </View>
        </View>

        {/* Action Buttons - Below the main row */}
        <View className="flex-row justify-end items-center mt-3 pt-3 border-t border-gray-100">
          <TouchableOpacity 
            className="flex-row items-center mr-4 p-2 bg-gray-100 rounded-lg"
            onPress={() => router.push(`/(app)/(drawer)/vehicles/${item.id}`)}
          >
            <Ionicons name="eye-outline" size={18} color="#4b5563" />
            <Text className="text-gray-700 text-sm ml-1">View</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-row items-center mr-4 p-2 bg-blue-100 rounded-lg"
            onPress={() => router.push(`/(app)/(drawer)/vehicles/edit/${item.id}`)}
          >
            <Ionicons name="pencil-outline" size={18} color="#2563eb" />
            <Text className="text-blue-700 text-sm ml-1">Edit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-row items-center p-2 bg-red-100 rounded-lg"
            onPress={() => {
              Alert.alert(
                "Delete Vehicle",
                "Are you sure you want to delete this vehicle?",
                [
                  { text: "Cancel", style: "cancel" },
                  { 
                    text: "Delete", 
                    onPress: () => {
                      setVehicles(vehicles.filter(v => v.id !== item.id));
                    },
                    style: "destructive"
                  }
                ]
              );
            }}
          >
            <Ionicons name="trash-outline" size={18} color="#dc2626" />
            <Text className="text-red-700 text-sm ml-1">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="p-6 pb-4">
        {/* Page Title */}
        <Text className="text-2xl font-bold text-gray-800 mb-4">Vehicles</Text>
        
        {/* Add Vehicle Button */}
        <TouchableOpacity 
          className="flex-row items-center justify-center bg-blue-600 py-3 rounded-xl mb-2" 
          onPress={() => router.push("/(app)/(drawer)/vehicles/add")}
        >
          <Ionicons name="add-circle-outline" size={20} color="#ffffff" />
          <Text className="text-white font-semibold ml-2">Add New Vehicle</Text>
        </TouchableOpacity>
      </View>

      {/* Vehicle List - Shows ALL vehicles without filtering */}
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id}
        renderItem={renderVehicleItem}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}