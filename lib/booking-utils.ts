import type { Motorbike } from "@/types";

/**
 * Extracts the brand name from a motorbike object
 */
export function getBrandName(bike: Motorbike): string {
    return typeof bike.brand === "object" && bike.brand !== null
        ? (bike.brand as unknown as { name: string }).name
        : typeof bike.brand === "string"
        ? bike.brand
        : "Unknown brand";
}

/**
 * Calculates the total price for a rental
 */
export function calculateTotalPrice(price: number, days: number): number {
    return price * days;
}

/**
 * Formats a date to a readable string
 */
export function formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

/**
 * Formats a time string (HH:MM) to a more readable format
 */
export function formatTime(time: string): string {
    const [hours, minutes] = time.split(":");
    const hour = Number.parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
}
