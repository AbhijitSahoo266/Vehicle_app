import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";
import AddTripModal from "./trips/tripsDrawer";
const initialTrips = [
  {
    id: "1",
    date: "12-01-2026",
    vehicle: "OD-02-AB-1234",
    driver: "Ramesh Kumar",
    from: "Bhubaneswar",
    to: "Cuttack",
    fare: 2500,
    fuel: 600,
    maintenance: 0,
    other: 0,
    note: "Morning trip",
  },
  {
    id: "2",
    date: "13-01-2026",
    vehicle: "OD-02-AB-1234",
    driver: "Ramesh Kumar",
    from: "-",
    to: "-",
    fare: 0,              // no trip
    fuel: 800,            // fuel only
    maintenance: 0,
    other: 200,
    note: "Fuel refill only",
  },
];

export default function Trips() {
  const [trips, setTrips] = useState(initialTrips);
    const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const calculateProfit = (item) => {
    return (
      item.fare -
      (item.fuel + item.maintenance + item.other)
    );
  };

  const renderTrip = ({ item }) => {
    const profit = calculateProfit(item);
    const profitColor = profit >= 0 ? "text-green-600" : "text-red-600";

    return (
      <View className="bg-white p-4 rounded-xl mb-3 shadow-sm">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-2">
          <Text className="font-bold text-lg">{item.vehicle}</Text>
          <Text className="text-gray-500">{item.date}</Text>
        </View>

        {/* Route */}
        <Text className="text-gray-600 mb-1">
          {item.from} → {item.to}
        </Text>

        <Text className="text-gray-500 mb-3">
          Driver: {item.driver}
        </Text>

        {/* Amounts */}
        <View className="flex-row justify-between mb-2">
          <Text>Fare</Text>
          <Text className="font-semibold">₹{item.fare}</Text>
        </View>

        <View className="flex-row justify-between mb-2">
          <Text>Fuel</Text>
          <Text className="font-semibold">₹{item.fuel}</Text>
        </View>

        <View className="flex-row justify-between mb-2">
          <Text>Maintenance</Text>
          <Text className="font-semibold">₹{item.maintenance}</Text>
        </View>

        <View className="flex-row justify-between mb-2">
          <Text>Other</Text>
          <Text className="font-semibold">₹{item.other}</Text>
        </View>

        <View className="flex-row justify-between border-t pt-2 mt-2">
          <Text className="font-bold">Profit</Text>
          <Text className={`font-bold ${profitColor}`}>
            ₹{profit}
          </Text>
        </View>

        {/* Note */}
        {item.note ? (
          <Text className="text-gray-500 mt-2">
            📝 {item.note}
          </Text>
        ) : null}

        {/* Actions */}
        <View className="flex-row justify-end space-x-2 mt-3">
          <TouchableOpacity className="p-2 bg-blue-100 rounded-lg">
            <Ionicons name="pencil-outline" size={18} color="#2563eb" />
          </TouchableOpacity>

          <TouchableOpacity className="p-2 bg-red-100 rounded-lg">
            <Ionicons name="trash-outline" size={18} color="#dc2626" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-50 p-5">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold"></Text>

        <TouchableOpacity className="flex-row items-center bg-blue-600 px-4 py-2 rounded-lg" onPress={() => setShowModal(true)}
         >
          <Ionicons name="add-outline" size={20} color="#fff" />
          <Text className="text-white ml-1 font-semibold" >
            Add Trip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Trip List */}
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={renderTrip}
        showsVerticalScrollIndicator={false}
      />
       <AddTripModal 
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(data) => console.log(data)}
      />
    </View>
  );
}
