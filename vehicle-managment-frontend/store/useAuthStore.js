import { create } from "zustand";
import { loginUser } from "../src/api/services/authService";

import { saveToken ,removeToken} from "../src/services/storage/secureStorage";

const useAuthStore = create((set) => ({
  user: null,
  token: null,

  login: async (email, password) => {
    try {
      const data = await loginUser(email, password);

      const token = data.token;

      // ✅ save securely
      await saveToken(token);

      set({
        token,
        user: data.user,
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.error || "Login failed",
      };
    }
  },

  logout: async () => {
    await removeToken();
    set({ token: null, user: null });
  },
}));

export default useAuthStore;