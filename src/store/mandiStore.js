import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useMandiStore = create(
    persist(
        (set, get) => ({
            // User state
            language: 'en',
            userRole: null, // 'vendor' or 'buyer'

            // Market data
            commodities: [],
            negotiations: [],

            // Actions
            setLanguage: (language) => set({ language }),
            setUserRole: (role) => set({ userRole: role }),

            addCommodity: (commodity) =>
                set((state) => ({
                    commodities: [...state.commodities, { ...commodity, id: Date.now() }],
                })),

            removeCommodity: (id) =>
                set((state) => ({
                    commodities: state.commodities.filter((c) => c.id !== id),
                })),

            startNegotiation: (commodityId, buyerId, vendorId) =>
                set((state) => ({
                    negotiations: [
                        ...state.negotiations,
                        {
                            id: Date.now(),
                            commodityId,
                            buyerId,
                            vendorId,
                            messages: [],
                            status: 'active', // 'active', 'accepted', 'rejected'
                            currentPrice: null,
                        },
                    ],
                })),

            addNegotiationMessage: (negotiationId, message) =>
                set((state) => ({
                    negotiations: state.negotiations.map((n) =>
                        n.id === negotiationId
                            ? { ...n, messages: [...n.messages, message] }
                            : n
                    ),
                })),

            updateNegotiationPrice: (negotiationId, price) =>
                set((state) => ({
                    negotiations: state.negotiations.map((n) =>
                        n.id === negotiationId ? { ...n, currentPrice: price } : n
                    ),
                })),

            closeNegotiation: (negotiationId, status) =>
                set((state) => ({
                    negotiations: state.negotiations.map((n) =>
                        n.id === negotiationId ? { ...n, status } : n
                    ),
                })),
        }),
        {
            name: 'mandi-storage',
        }
    )
);
