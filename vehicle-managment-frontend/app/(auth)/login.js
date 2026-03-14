import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import useAuthStore from "../../store/useAuthStore";
import { Eye, EyeOff, Mail, Lock } from "lucide-react-native";

export default function Login() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleLogin = async () => {
  console.log("Login button clicked"); // 👈 ADD

  if (!validateForm()) return;

  try {
    setIsLoading(true);
    const result = await login(email, password);

    if (result.success) {
      // console.log("Navigation to dashboard"); // 👈 ADD
      router.replace("/(app)/(drawer)/dashboard");
    } else {
      Alert.alert("Login Failed", result.message);
    }
  } catch (error) {
    console.log("Login error:", error); 
    Alert.alert("Error", "Something went wrong");
  } finally {
    setIsLoading(false);
  }
};

  // Clear errors when input changes
  const handleEmailChange = (text) => {
    setEmail(text);
    if (errors.email) setErrors({ ...errors, email: "" });
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (errors.password) setErrors({ ...errors, password: "" });
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-50 to-white justify-center px-6">
      <View className="bg-white p-8 rounded-3xl shadow-lg shadow-blue-100 border border-gray-100">
        {/* Header */}
        <View className="items-center mb-8">
          <View className="w-16 h-16 bg-blue-100 rounded-2xl items-center justify-center mb-4">
            <Text className="text-3xl">🔐</Text>
          </View>
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </Text>
          <Text className="text-gray-500 text-center">
            Sign in to continue to your account
          </Text>
        </View>

        {/* Email Input */}
        <View className="mb-5">
          <Text className="text-sm font-medium text-gray-700 mb-2 ml-1">
            Email Address
          </Text>
          <View className="relative">
            <View className="absolute left-4 top-3.5 z-10">
              <Mail size={20} color="#9CA3AF" />
            </View>
            <TextInput
              placeholder="Enter your email"
              className="border border-gray-300 rounded-xl px-12 py-4 text-base bg-white"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />
          </View>
          {errors.email && (
            <Text className="text-red-500 text-sm mt-1 ml-1">{errors.email}</Text>
          )}
        </View>

        {/* Password Input */}
        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-700 mb-2 ml-1">
            Password
          </Text>
          <View className="relative">
            <View className="absolute left-4 top-3.5 z-10">
              <Lock size={20} color="#9CA3AF" />
            </View>
            <TextInput
              placeholder="Enter your password"
              className="border border-gray-300 rounded-xl px-12 py-4 text-base bg-white"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry={!showPassword}
              editable={!isLoading}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff size={20} color="#9CA3AF" />
              ) : (
                <Eye size={20} color="#9CA3AF" />
              )}
            </Pressable>
          </View>
          {errors.password && (
            <Text className="text-red-500 text-sm mt-1 ml-1">
              {errors.password}
            </Text>
          )}
        </View>

        {/* Forgot Password */}
        <Pressable 
          className="self-end mb-8"
          disabled={isLoading}
        >
          <Text className="text-blue-600 font-medium">Forgot Password?</Text>
        </Pressable>

        {/* Login Button */}
        <Pressable
          onPress={handleLogin}
          disabled={isLoading}
          className={`py-4 rounded-xl ${
            isLoading ? "bg-blue-400" : "bg-blue-600"
          } shadow-lg shadow-blue-200`}
        >
          <Text className="text-white text-center font-semibold text-lg">
            {isLoading ? "Signing In..." : "Sign In"}
          </Text>
        </Pressable>

       

        {/* Sign Up Link - FIXED */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-600">Dont have an account? </Text>
          <Pressable onPress={() => router.push("/register")} disabled={isLoading}>
            <Text className="text-blue-600 font-semibold">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}