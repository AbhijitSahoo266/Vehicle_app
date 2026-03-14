import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,Dimensions
} from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

// Define FormInput component since it's being used but not defined
const FormInput = ({
  label,
  name,
  control,
  error,
  placeholder,
  keyboardType,
  multiline,
  ...props
}) => {
  // You need to implement this component properly
  return (
    <View className="mb-4">
      <Text className="text-gray-600 mb-1 font-medium">{label}</Text>
      <TextInput
        className={`bg-gray-50 border ${error ? "border-red-500" : "border-gray-200"} p-4 rounded-lg ${multiline ? "min-h-[100px]" : ""}`}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        {...props}
      />
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};
const { height } = Dimensions.get('window');
const schema = yup.object().shape({
  date: yup.date().required("Date is required"),
  from: yup.string().nullable(),
  to: yup.string().nullable(),
  driver: yup.string().required("Driver is required"),
  fare: yup.number().typeError("Must be number").nullable(),
  fuel: yup.number().typeError("Must be number").nullable(),
  maintenance: yup.number().typeError("Must be number").nullable(),
  other: yup.number().typeError("Must be number").nullable(),
  passengerName: yup.string().nullable(),
  passengerNumber: yup.string().nullable(),
  note: yup.string().nullable(),
});

const AddTripModal = ({ visible, onClose, onSubmit }) => {
  const [showDate, setShowDate] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date: new Date(),
      fare: 0,
      fuel: 0,
      maintenance: 0,
      other: 0,
    },
  });

  // Renamed the function to avoid conflict with prop
  const handleFormSubmit = (data) => {
    console.log("Trip Data:", data);
    onSubmit?.(data); // Call the onSubmit prop if provided
  };

  const handleCancel = () => {
    onClose?.(); // Call the onClose prop if provided
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl" style={{ height: height * 0.85 }}>

          {/* Header */}
          <View className="flex-row justify-between items-center p-5 border-b border-gray-200">
            <Text className="text-2xl font-bold">Add New Trip</Text>
            <TouchableOpacity onPress={handleCancel}>
              <Ionicons name="close" size={24} color="#4b5563" />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="p-5">
              {/* Date (Mandatory) */}
              <View className="mb-4">
                <Text className="text-gray-600 mb-1 font-medium">Date *</Text>
                <TouchableOpacity
                  onPress={() => setShowDate(true)}
                  className={`bg-gray-50 border ${errors.date ? "border-red-500" : "border-gray-200"} p-4 rounded-lg`}
                >
                  <View className="flex-row justify-between items-center">
                    <Text className="text-gray-800">
                      {watch("date")?.toDateString?.() || "Select date"}
                    </Text>
                    <Ionicons name="calendar" size={20} color="#6b7280" />
                  </View>
                </TouchableOpacity>
                {showDate && (
                  <DateTimePicker
                    value={watch("date") || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDate(false);
                      if (selectedDate) setValue("date", selectedDate);
                    }}
                  />
                )}
                {errors.date && <Text className="text-red-500 text-sm mt-1">{errors.date.message}</Text>}
              </View>

              {/* Two-column layout for From/To */}
              <View className="flex-row mb-4 space-x-3">
                <View className="flex-1">
                  <FormInput
                    label="From"
                    name="from"
                    control={control}
                    placeholder="Starting point"
                  />
                </View>
                <View className="flex-1">
                  <FormInput
                    label="To"
                    name="to"
                    control={control}
                    placeholder="Destination"
                  />
                </View>
              </View>

              {/* Driver */}
              <FormInput
                label="Driver Name *"
                name="driver"
                control={control}
                error={errors.driver?.message}
                placeholder="Enter driver name"
              />

              {/* Cost Section */}
              <View className="mb-4">
                <Text className="text-gray-600 mb-2 font-medium">Cost Details</Text>
                <View className="bg-gray-50 rounded-lg p-3">
                  <View className="flex-row mb-2">
                    <View className="flex-1 mr-2">
                      <FormInput
                        label="Fare"
                        name="fare"
                        control={control}
                        keyboardType="numeric"
                        placeholder="0"
                      />
                    </View>
                    <View className="flex-1 ml-2">
                      <FormInput
                        label="Fuel"
                        name="fuel"
                        control={control}
                        keyboardType="numeric"
                        placeholder="0"
                      />
                    </View>
                  </View>
                  <View className="flex-row">
                    <View className="flex-1 mr-2">
                      <FormInput
                        label="Maintenance"
                        name="maintenance"
                        control={control}
                        keyboardType="numeric"
                        placeholder="0"
                      />
                    </View>
                    <View className="flex-1 ml-2">
                      <FormInput
                        label="Other"
                        name="other"
                        control={control}
                        keyboardType="numeric"
                        placeholder="0"
                      />
                    </View>
                  </View>
                </View>
              </View>

              {/* Passenger Details */}
              <View className="mb-4">
                <Text className="text-gray-600 mb-2 font-medium">Passenger Details</Text>
                <FormInput
                  label="Name"
                  name="passengerName"
                  control={control}
                  placeholder="Optional"
                />
                <FormInput
                  label="Phone Number"
                  name="passengerNumber"
                  control={control}
                  keyboardType="phone-pad"
                  placeholder="Optional"
                />
              </View>

              {/* Notes */}
              <FormInput
                label="Notes"
                name="note"
                control={control}
                multiline={true}
                placeholder="Any additional notes..."
              />

              {/* Buttons */}
              <View className="flex-row space-x-3 mt-6">
                <TouchableOpacity
                  onPress={handleCancel}
                  className="flex-1 py-4 border border-gray-300 rounded-xl"
                >
                  <Text className="text-gray-700 text-center font-semibold text-lg">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit(handleFormSubmit)}
                  className="flex-1 bg-blue-600 py-4 rounded-xl"
                >
                  <Text className="text-white text-center font-semibold text-lg">
                    Save Trip
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddTripModal;