import { create } from "zustand";
import {persist} from 'zustand/middleware'

export const useAuthStore = create(
    persist(
        (set) => ({
            user:null,
            token:null,
            isAuthenticated: false,

            setAuth: (user, token) => set({user, token, isAuthenticated: true}),
            updatedUser: (updatedData) => set((state) => ({user: {...state.user,...updatedData}})),
            logout: () => set({user: null, token: null, isAuthenticated: false}),
        }),
        {name: 'lms-auth-storage'}
    )
)