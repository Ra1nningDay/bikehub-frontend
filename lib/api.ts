export async function createBooking(bookingData: any): Promise<{ id: string }> {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
            id: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
        };
    } catch (error) {
        throw new Error("Failed to create booking");
    }
}
