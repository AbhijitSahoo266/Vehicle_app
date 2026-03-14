import { View, Text, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Dashboard() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        {/* A. Total Overview Section */}
        <View className="mb-4">
          <Text className="text-xl font-bold mb-3">Total Overview</Text>
          <View className="flex-row flex-wrap justify-between">
            {/* Total Earnings Card */}
            <View className="bg-white p-4 rounded-xl shadow-sm w-[48%] mb-4">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-gray-500 text-sm">Total Earnings</Text>
                <Ionicons name="cash-outline" size={20} color="#10b981" />
              </View>
              <Text className="text-2xl font-bold">₹85,240</Text>
              <Text className="text-gray-500 text-sm mt-1">Cumulative Fare Amount</Text>
              {/* <Text className="text-green-600 text-xs mt-1">↑ 15% from last month</Text> */}
            </View>

            {/* Total Maintenance Card */}
            <View className="bg-white p-4 rounded-xl shadow-sm w-[48%] mb-4">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-gray-500 text-sm">Total Maintenance</Text>
                <Ionicons name="construct-outline" size={20} color="#f59e0b" />
              </View>
              <Text className="text-2xl font-bold">₹12,500</Text>
              <Text className="text-gray-500 text-sm mt-1">Cumulative Maintenance Cost</Text>
              {/* <Text className="text-red-600 text-xs mt-1">↑ 8% from last month</Text> */}
            </View>

            {/* Total Driver Salary Card */}
            <View className="bg-white p-4 rounded-xl shadow-sm w-[48%] mb-4">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-gray-500 text-sm">Total Driver Salary</Text>
                <Ionicons name="people-outline" size={20} color="#3b82f6" />
              </View>
              <Text className="text-2xl font-bold">₹28,300</Text>
              <Text className="text-gray-500 text-sm mt-1">Cumulative Driver Salary</Text>
              {/* <Text className="text-blue-600 text-xs mt-1">↑ 5% from last month</Text> */}

            </View>

            {/* Total Profit Card */}
            <View className="bg-white p-4 rounded-xl shadow-sm w-[48%] mb-4">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-gray-500 text-sm">Total Profit</Text>
                <Ionicons name="trending-up-outline" size={20} color="#8b5cf6" />
              </View>
              <Text className="text-2xl font-bold text-green-600 ">₹44,440</Text>
            </View>
          </View>
        </View>

        {/* B. Earnings Overview Section */}
        <View className="mb-8">
          <Text className="text-xl font-bold mb-4">Earnings Overview</Text>
          <View className="flex-row flex-wrap justify-between">
            {/* Weekly Earnings Card */}
            <View className="bg-white p-4 rounded-xl shadow-sm w-[32%] mb-4">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-gray-500 text-xs">Weekly</Text>
                <Ionicons name="calendar-outline" size={16} color="#10b981" />
              </View>
              <Text className="text-xl font-bold">₹4,200</Text>
                   <Text className="text-gray-500 text-xs mt-1">Weekly reset</Text>
              {/* <Text className="text-green-600 text-xs mt-1">+₹420 this week</Text> */}

            </View>

            {/* Monthly Earnings Card */}
            <View className="bg-white p-4 rounded-xl shadow-sm w-[32%] mb-4">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-gray-500 text-xs">Monthly</Text>
                <Ionicons name="calendar-outline" size={16} color="#3b82f6" />
              </View>
              <Text className="text-xl font-bold">₹18,500</Text>
                  <Text className="text-gray-500 text-xs mt-1">Monthly reset</Text>
              {/* <Text className="text-green-600 text-xs mt-1">+₹2,300 this month</Text> */}

            </View>

            {/* Yearly Earnings Card */}
            <View className="bg-white p-4 rounded-xl shadow-sm w-[32%] mb-4">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-gray-500 text-xs">Yearly</Text>
                <Ionicons name="calendar-outline" size={16} color="#8b5cf6" />
              </View>
              <Text className="text-xl font-bold">₹85,240</Text>
 <Text className="text-gray-500 text-xs mt-1">Yearly reset</Text>
              {/* <Text className="text-green-600 text-xs mt-1">+₹12,800 this year</Text> */}
            </View>
          </View>
        </View>

        {/* C. Profit Overview Section */}
        <View className="mb-8">
          <Text className="text-xl font-bold mb-4">Profit Overview</Text>
          <View className="flex-row flex-wrap justify-between">
            {/* Weekly Profit Card */}
            <View className="bg-white p-4 rounded-xl shadow-sm w-[32%] mb-4">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-gray-500 text-xs">Weekly Profit</Text>
                <Ionicons name="trending-up-outline" size={16} color="#10b981" />
              </View>
              <Text className="text-xl font-bold">₹2,150</Text>
              <Text className="text-gray-500 text-xs mt-1">Weekly reset</Text>
              {/* <Text className="text-green-600 text-xs mt-1">+₹315 this week</Text> */}

            </View>

            {/* Monthly Profit Card */}
            <View className="bg-white p-4 rounded-xl shadow-sm w-[32%] mb-4">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-gray-500 text-xs">Monthly Profit</Text>
                <Ionicons name="trending-up-outline" size={16} color="#3b82f6" />
              </View>
              <Text className="text-xl font-bold">₹9,800</Text>
                <Text className="text-gray-500 text-xs mt-1">Monthly reset</Text>
              {/* <Text className="text-green-600 text-xs mt-1">+₹1,200 this month</Text> */}
              

            </View>

            {/* Yearly Profit Card */}
            <View className="bg-white p-4 rounded-xl shadow-sm w-[32%] mb-4">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-gray-500 text-xs">Yearly Profit</Text>
                <Ionicons name="trending-up-outline" size={16} color="#8b5cf6" />
              </View>
              <Text className="text-xl font-bold">₹44,440</Text>
                   <Text className="text-gray-500 text-xs mt-1">Yearly reset</Text>
              {/* <Text className="text-green-600 text-xs mt-1">+₹8,400 this year</Text> */}

            </View>
          </View>
        </View>

        {/* Original Stats Grid (Keeping for reference) */}
        <View className="flex-row flex-wrap justify-between mb-6">
          <View className="bg-white p-4 rounded-xl shadow-sm w-[48%] mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-gray-500 text-sm">Total Vehicles</Text>
              <Ionicons name="car-outline" size={20} color="#2563eb" />
            </View>
            <Text className="text-2xl font-bold">24</Text>

          </View>

          <View className="bg-white p-4 rounded-xl shadow-sm w-[48%] mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-gray-500 text-sm">Active Rentals</Text>
              <Ionicons name="time-outline" size={20} color="#2563eb" />
            </View>
            <Text className="text-2xl font-bold">12</Text>
          </View>

          <View className="bg-white p-4 rounded-xl shadow-sm w-[48%]">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-gray-500 text-sm">Revenue</Text>
              <Ionicons name="cash-outline" size={20} color="#2563eb" />
            </View>
            <Text className="text-2xl font-bold">₹15,240</Text>

          </View>

          <View className="bg-white p-4 rounded-xl shadow-sm w-[48%]">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-gray-500 text-sm">Users</Text>
              <Ionicons name="people-outline" size={20} color="#2563eb" />
            </View>
            <Text className="text-2xl font-bold">48</Text>

          </View>
        </View>

        {/* Quick Actions */}
        <View className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <Text className="text-xl font-bold mb-4">Quick Actions</Text>
          <View className="flex-row flex-wrap justify-between">
            <View className="items-center w-1/4 mb-4">
              <View className="bg-blue-100 p-3 rounded-full mb-2">
                <Ionicons name="add-circle-outline" size={24} color="#2563eb" />
              </View>
              <Text className="text-xs text-center">Add Vehicle</Text>
            </View>
            <View className="items-center w-1/4 mb-4">
              <View className="bg-green-100 p-3 rounded-full mb-2">
                <Ionicons name="create-outline" size={24} color="#16a34a" />
              </View>
              <Text className="text-xs text-center">New Rental</Text>
            </View>
            <View className="items-center w-1/4 mb-4">
              <View className="bg-yellow-100 p-3 rounded-full mb-2">
                <Ionicons name="document-text-outline" size={24} color="#ca8a04" />
              </View>
              <Text className="text-xs text-center">Reports</Text>
            </View>
            <View className="items-center w-1/4 mb-4">
              <View className="bg-purple-100 p-3 rounded-full mb-2">
                <Ionicons name="settings-outline" size={24} color="#9333ea" />
              </View>
              <Text className="text-xs text-center">Settings</Text>
            </View>
          </View>
        </View>
        {/* Vehicle List Section (New Design) */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">Vehicle List</Text>
            <Text className="text-blue-600 font-medium">View All</Text>
          </View>

          {[
            {
              id: 1,
              image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400",
              number: "OD 02 AB 1234",
              model: "Toyota Innova Crysta",
              type: "SUV",
              status: "Available",
              rate: "₹2,500",
              location: "Bhubaneswar"
            },
            {
              id: 2,
              image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w-400",
              number: "OD 05 CD 5678",
              model: "Maruti Suzuki Swift",
              type: "Hatchback",
              status: "Rented",
              rate: "₹1,200",
              location: "Cuttack"
            },
            {
              id: 3,
              image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400",
              number: "OD 07 EF 9012",
              model: "Hyundai Creta",
              type: "SUV",
              status: "Maintenance",
              rate: "₹2,200",
              location: "Puri"
            },
            {
              id: 4,
              image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400",
              number: "OD 01 GH 3456",
              model: "Honda City",
              type: "Sedan",
              status: "Available",
              rate: "₹1,800",
              location: "Rourkela"
            }
          ].map((vehicle) => (
            <View key={vehicle.id} className="bg-white rounded-2xl shadow-lg p-4 mb-4 flex-row items-center">
              {/* Left Side - Image */}
              <View className="w-20 h-20 rounded-xl overflow-hidden mr-4">
                <Image
                  source={{ uri: vehicle.image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                {/* <View className={`absolute top-1 right-1 px-2 py-0.5 rounded-full ${vehicle.status === 'Available' ? 'bg-green-100' : vehicle.status === 'Rented' ? 'bg-blue-100' : 'bg-yellow-100'}`}>
                  <Text className={`text-xs font-medium ${vehicle.status === 'Available' ? 'text-green-800' : vehicle.status === 'Rented' ? 'text-blue-800' : 'text-yellow-800'}`}>
                    {vehicle.status}
                  </Text>
                </View> */}
              </View>

              {/* Middle - Vehicle Details */}
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-800">{vehicle.number}</Text>
                <View className="flex-row items-center mt-1">
                  <Ionicons name="document-text" size={14} color="#6b7280" />
                  <Text className="text-gray-600 text-sm ml-1 font-mono">{vehicle.model}</Text>
                </View>
              </View>

              {/* Right Side - Amount */}
              <View className="items-end">
                <Text className="text-lg font-bold text-blue-600">{vehicle.rate}</Text>
                <View className="bg-blue-50 px-3 py-1.5 rounded-lg mt-2">
                  <Text className="text-blue-700 text-xs font-medium">View Details</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

      </View>
    </ScrollView>

  );
}