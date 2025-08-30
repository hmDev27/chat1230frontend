import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001"
    : "https://c9093134-dfde-48fc-8111-d6c92a2aff0e-00-11l4cpgtjwwmj.sisko.replit.dev";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/api/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/api/auth/signup", data);
      set({ authUser: res.data });
      setTimeout(() => {
        toast.success("အကောင့်တည်ဆောက်ခြင်းအောင်မြင်သည်", {duration: 4000 });
      }, 100);
      get().connectSocket();
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/api/auth/login", data);
      set({ authUser: res.data });
      toast.success("Log in ဝင်ပြီးပါပြီ");
      get().connectSocket();
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
      set({ authUser: null });
      toast.success("Log out ထွက်လိုက်ပါပြီ");
      get().disconnectSocket();
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/api/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("ပရိုဖိုင်ပုံတင်ခြင်းအောင်မြင်သည်");
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser, socket: existingSocket } = get();
    if (!authUser || existingSocket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true,
      auth: { token: authUser?.token },
      query: { userId: authUser?._id },
    });

    // Remove previous listener to avoid duplicates
    socket.off("getOnlineUsers");
    socket.on("getOnlineUsers", (userIds) => set({ onlineUsers: userIds }));

    set({ socket });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) socket.disconnect();
    set({ socket: null }); // Clear socket reference
  },
}));
