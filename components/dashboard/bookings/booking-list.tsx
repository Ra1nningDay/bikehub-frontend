// components/dashboard/bookings/booking-list.tsx
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Booking {
    id: number;
    user_id: number;
    motorbike_id: number;
    start_date: string;
    end_date: string;
    status: "pending" | "confirmed" | "canceled";
}

interface BookingListProps {
    bookings: Booking[];
    getUserName: (userId: number) => string;
    getMotorbikeName: (motorbikeId: number) => string;
    onEdit: (booking: Booking) => void;
    onDelete: (id: number) => void;
}

export function BookingList({
    bookings,
    getUserName,
    getMotorbikeName,
    onEdit,
    onDelete,
}: BookingListProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Motorbike</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bookings.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={7} className="text-center">
                            No bookings found
                        </TableCell>
                    </TableRow>
                ) : (
                    bookings.map((booking) => (
                        <TableRow key={booking.id}>
                            <TableCell>{booking.id}</TableCell>
                            <TableCell>
                                {getUserName(booking.user_id)}
                            </TableCell>
                            <TableCell>
                                {getMotorbikeName(booking.motorbike_id)}
                            </TableCell>
                            <TableCell>{booking.start_date}</TableCell>
                            <TableCell>{booking.end_date}</TableCell>
                            <TableCell>{booking.status}</TableCell>
                            <TableCell className="space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onEdit(booking)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => onDelete(booking.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
