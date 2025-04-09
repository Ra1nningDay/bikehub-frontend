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
 * Extracts unique brands from an array of motorbikes
 */
export function extractUniqueBrands(
    motorbikes: Motorbike[] | undefined
): string[] {
    if (!motorbikes?.length) return [];

    return [
        ...new Set(
            motorbikes.map((bike) => getBrandName(bike)).filter(Boolean)
        ),
    ].sort();
}

/**
 * Formats price with currency symbol
 */
export function formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
}
