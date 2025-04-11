// components/dashboard/bookings/booking-form.tsx
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Booking {
    id: number;
    user_id: number;
    motorbike_id: number;
    start_date: string;
    end_date: string;
    status: "pending" | "confirmed" | "canceled";
}

interface User {
    id: number;
    name: string;
}

interface Motorbike {
    id: number;
    name: string;
    brand_id: number;
}

interface BookingFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    form: Booking;
    setForm: (form: Booking) => void;
    onSave: () => void;
    isEditing: boolean;
    motorbikes: Motorbike[];
    users: User[];
}

export function BookingForm({
    open,
    onOpenChange,
    form,
    setForm,
    onSave,
    isEditing,
    motorbikes,
    users,
}: BookingFormProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Edit Booking" : "Add Booking"}
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div>
                        <label className="text-sm font-medium">User</label>
                        <Select
                            value={form.user_id.toString()}
                            onValueChange={(value) =>
                                setForm({ ...form, user_id: parseInt(value) })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select user" />
                            </SelectTrigger>
                            <SelectContent>
                                {users.map((user) => (
                                    <SelectItem
                                        key={user.id}
                                        value={user.id.toString()}
                                    >
                                        {user.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Motorbike</label>
                        <Select
                            value={form.motorbike_id.toString()}
                            onValueChange={(value) =>
                                setForm({
                                    ...form,
                                    motorbike_id: parseInt(value),
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select motorbike" />
                            </SelectTrigger>
                            <SelectContent>
                                {motorbikes.map((motorbike) => (
                                    <SelectItem
                                        key={motorbike.id}
                                        value={motorbike.id.toString()}
                                    >
                                        {motorbike.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="text-sm font-medium">
                            Start Date
                        </label>
                        <Input
                            type="date"
                            value={form.start_date}
                            onChange={(e) =>
                                setForm({ ...form, start_date: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">End Date</label>
                        <Input
                            type="date"
                            value={form.end_date}
                            onChange={(e) =>
                                setForm({ ...form, end_date: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Status</label>
                        <Select
                            value={form.status}
                            onValueChange={(value) =>
                                setForm({
                                    ...form,
                                    status: value as
                                        | "pending"
                                        | "confirmed"
                                        | "canceled",
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">
                                    Confirmed
                                </SelectItem>
                                <SelectItem value="canceled">
                                    Canceled
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button onClick={onSave}>
                    {isEditing ? "Save Changes" : "Add Booking"}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
