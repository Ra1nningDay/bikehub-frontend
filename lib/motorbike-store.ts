// // store.ts
// import create from "zustand";
// import axios from "axios";
// import { Motorbike } from "@/types";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// interface MotorbikeStore {
//     motorbikes: Motorbike[];
//     loading: boolean;
//     error: string | null;
//     searchMotorbike: string;
//     fetchMotorbikes: () => void;
//     createMotorbike: (formData: FormData) => void;
//     updateMotorbike: (id: number, formData: FormData) => void;
//     deleteMotorbike: (id: number) => void;
//     setSearchMotorbike: (search: string) => void;
// }

// export const useMotorbikeStore = create<MotorbikeStore>((set) => ({
//     motorbikes: [],
//     loading: false,
//     error: null,
//     searchMotorbike: "",
//     setSearchMotorbike: (search) => set({ searchMotorbike: search }),

//     // ฟังก์ชันดึงข้อมูลมอเตอร์ไซค์
//     fetchMotorbikes: async () => {
//         set({ loading: true });
//         try {
//             const { data } = await axios.get<Motorbike[]>(
//                 `${API_URL}/motorbikes`
//             );
//             set({
//                 motorbikes: data,
//                 loading: false,
//             });
//         } catch (err) {
//             set({ error: "Error fetching motorbikes", loading: false });
//         }
//     },

//     // ฟังก์ชันสร้างมอเตอร์ไซค์ใหม่
//     createMotorbike: async (formData: FormData) => {
//         try {
//             const { data } = await axios.post<Motorbike>(
//                 `${API_URL}/motorbikes`,
//                 formData,
//                 {
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                     },
//                 }
//             );
//             set((state) => ({
//                 motorbikes: [...state.motorbikes, data],
//             }));
//         } catch (error) {
//             set({ error: "Error creating motorbike" });
//         }
//     },

//     // ฟังก์ชันอัปเดตมอเตอร์ไซค์
//     updateMotorbike: async (id: number, formData: FormData) => {
//         try {
//             const { data } = await axios.put<Motorbike>(
//                 `${API_URL}/motorbikes/${id}`,
//                 formData,
//                 {
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                     },
//                 }
//             );
//             set((state) => ({
//                 motorbikes: state.motorbikes.map((motorbike) =>
//                     motorbike.id === id ? data : motorbike
//                 ),
//             }));
//         } catch (error) {
//             set({ error: "Error updating motorbike" });
//         }
//     },

//     // ฟังก์ชันลบมอเตอร์ไซค์
//     deleteMotorbike: async (id: number) => {
//         try {
//             await axios.delete(`${API_URL}/motorbikes/${id}`);
//             set((state) => ({
//                 motorbikes: state.motorbikes.filter(
//                     (motorbike) => motorbike.id !== id
//                 ),
//             }));
//         } catch (error) {
//             set({ error: "Error deleting motorbike" });
//         }
//     },
// }));
