import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'

const Store = () => (
    {
        services: '',
        home: '',
        SingleService: '',
        userid: '',
        firstName: '',
        lastName: '',
        loginToken: '',
        purchasedService: '',
        planType: '',
        serviceType: '',
        initiatepayments:'',
        resetConfirm: '',
        portfolio: '',
        setMpesaInitializer: (initiaterResults) => set((state) => ({ initiatepayments: initiaterResults })),
    }
)
export const useStore = create(

    devtools(
        persist(Store, {
            name: "statedata"
        })
    )
);
