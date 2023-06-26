"use client";
import { useRef } from "react";
import { useStore } from "@/store/store";
function StoreInitializer({ services, home, SingleService, purchasedService, planType, serviceType, portfolio }) {
    const initialized = useRef(false);
    if (!initialized.current) {
        useStore.setState({ services, home, SingleService, purchasedService, planType, serviceType, portfolio });
        initialized.current = true;
    }
    return null;
}
export default StoreInitializer;