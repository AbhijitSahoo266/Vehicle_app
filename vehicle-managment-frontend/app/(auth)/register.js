import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useAuthStore from "../../store/useAuthStore";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, clearError, error } = useAuthStore();

  // Clear errors when component mounts
  useEffect(() => {
    clearError();
  }, []);

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field-specific error
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const result = await register({
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
    });
    
    setIsSubmitting(false);
    
    if (result.success) {
      Alert.alert(
        "Success!", 
        "Account created successfully!",
        [
          { 
            text: "Continue", 
            onPress: () => router.replace("/login") 
          }
        ]
      );
    } else {
      Alert.alert("Registration Failed", error || "Something went wrong");
    }
  };

  // Fill demo data for testing
  const fillDemoData = () => {
    setFormData({
      name: "Demo User",
      email: "demo@example.com",
      password: "demo123",
      confirmPassword: "demo123"
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pt-12 pb-8">
          {/* Back Button */}
          <TouchableOpacity
            className="flex-row items-center mb-8"
            onPress={() => router.back()}
            disabled={isSubmitting}
          >
            <Ionicons name="arrow-back" size={24} color="#374151" />
            <Text className="ml-2 text-gray-700">Back</Text>
          </TouchableOpacity>

          {/* Register Form */}
          <View className="mb-8">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </Text>
            <Text className="text-gray-500 mb-8">
              Join ShopEasy today!
            </Text>

            {/* Store Error Message */}
            {error && (
              <View className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                <Text className="text-red-600 text-center font-medium">
                  {error}
                </Text>
              </View>
            )}

            {/* Name Field */}
            <View className="mb-5">
              <Text className="text-gray-700 font-medium mb-2">Full Name</Text>
              <View className={`border rounded-xl px-4 py-3 flex-row items-center ${
                errors.name ? "border-red-400" : "border-gray-300"
              }`}>
                <Ionicons name="person-outline" size={20} color="#6B7280" />
                <TextInput
                  className="flex-1 ml-3 text-gray-900"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChangeText={(text) => handleChange("name", text)}
                  editable={!isSubmitting}
                  autoCapitalize="words"
                />
              </View>
              {errors.name && (
                <Text className="text-red-500 text-sm mt-1 ml-1">{errors.name}</Text>
              )}
            </View>

            {/* Email Field */}
            <View className="mb-5">
              <Text className="text-gray-700 font-medium mb-2">Email</Text>
              <View className={`border rounded-xl px-4 py-3 flex-row items-center ${
                errors.email ? "border-red-400" : "border-gray-300"
              }`}>
                <Ionicons name="mail-outline" size={20} color="#6B7280" />
                <TextInput
                  className="flex-1 ml-3 text-gray-900"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!isSubmitting}
                />
              </View>
              {errors.email && (
                <Text className="text-red-500 text-sm mt-1 ml-1">{errors.email}</Text>
              )}
            </View>

            {/* Password Field */}
            <View className="mb-5">
              <Text className="text-gray-700 font-medium mb-2">Password</Text>
              <View className={`border rounded-xl px-4 py-3 flex-row items-center ${
                errors.password ? "border-red-400" : "border-gray-300"
              }`}>
                <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                <TextInput
                  className="flex-1 ml-3 text-gray-900"
                  placeholder="Create a password (min. 6 characters)"
                  value={formData.password}
                  onChangeText={(text) => handleChange("password", text)}
                  secureTextEntry={!showPassword}
                  editable={!isSubmitting}
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text className="text-red-500 text-sm mt-1 ml-1">{errors.password}</Text>
              )}
            </View>

            {/* Confirm Password Field */}
            <View className="mb-8">
              <Text className="text-gray-700 font-medium mb-2">Confirm Password</Text>
              <View className={`border rounded-xl px-4 py-3 flex-row items-center ${
                errors.confirmPassword ? "border-red-400" : "border-gray-300"
              }`}>
                <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                <TextInput
                  className="flex-1 ml-3 text-gray-900"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChangeText={(text) => handleChange("confirmPassword", text)}
                  secureTextEntry={!showPassword}
                  editable={!isSubmitting}
                />
              </View>
              {errors.confirmPassword && (
                <Text className="text-red-500 text-sm mt-1 ml-1">{errors.confirmPassword}</Text>
              )}
            </View>

            {/* Demo Data Button */}
            <TouchableOpacity
              onPress={fillDemoData}
              className="py-3 rounded-xl border border-gray-300 mb-4"
              disabled={isSubmitting}
            >
              <Text className="text-gray-600 text-center font-medium">
                Fill Demo Data
              </Text>
            </TouchableOpacity>

            {/* Register Button */}
            <TouchableOpacity
              className={`py-4 rounded-xl ${isSubmitting ? 'bg-sky-400' : 'bg-sky-600'} mb-6`}
              onPress={handleRegister}
              disabled={isSubmitting}
            >
              <View className="flex-row items-center justify-center">
                {isSubmitting ? (
                  <>
                    <Ionicons name="refresh" size={20} color="white" />
                    <Text className="text-white text-center font-bold text-lg ml-2">
                      Creating Account...
                    </Text>
                  </>
                ) : (
                  <Text className="text-white text-center font-bold text-lg">
                    Create Account
                  </Text>
                )}
              </View>
            </TouchableOpacity>

            {/* Sign In Link */}
            <View className="flex-row items-center justify-center">
              <Text className="text-gray-600">Already have an account? </Text>
              <TouchableOpacity 
                onPress={() => router.push("/login")} 
                disabled={isSubmitting}
              >
                <Text className="text-blue-600 font-bold">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms and Privacy */}
          <View className="mt-4">
            <Text className="text-gray-500 text-xs text-center">
              By creating an account, you agree to our{" "}
              <Text className="text-blue-500">Terms</Text> and{" "}
              <Text className="text-blue-500">Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}