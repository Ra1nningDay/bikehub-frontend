import { useState, useRef, type ChangeEvent, useEffect } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { MotorbikeBrand } from "@/types";

// ปรับ interface ให้รองรับ image
interface MotorbikeFormData {
    id: number;
    brand_id: number;
    name: string;
    price: string;
    image?: File | string; // เพิ่ม image เข้าไปใน type
}

interface MotorbikeFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    form: MotorbikeFormData;
    setForm: (form: MotorbikeFormData) => void;
    brands: MotorbikeBrand[];
    currentImage?: string;
    onAdd: () => void; // ใช้เฉพาะ onAdd และ onEdit
    onEdit: () => void;
    isEditing: boolean;
}

export function MotorbikeForm({
    open,
    onOpenChange,
    form,
    setForm,
    brands,
    isEditing,
    currentImage,
    onAdd,
    onEdit,
}: MotorbikeFormProps) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (currentImage && !imageFile) {
            setImagePreview(currentImage);
        } else if (!imageFile) {
            setImagePreview(null);
        }
    }, [currentImage, imageFile]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            // อัพเดท form ด้วย image file
            setForm({
                ...form,
                image: file,
            });
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setForm({
            ...form,
            image: undefined,
        });
    };

    const handleSave = () => {
        // เรียกฟังก์ชันตามสถานะ isEditing
        if (isEditing) {
            onEdit();
        } else {
            onAdd();
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Edit Motorbike" : "Add New Motorbike"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? "Update the motorbike details below."
                            : "Fill in the details to add a new motorbike."}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="motorcycle-name">Motorbike Name</Label>
                        <Input
                            id="motorcycle-name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            placeholder="e.g. CBR500R, MT-07"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="motorcycle-brand">Brand</Label>
                        <Select
                            value={form.brand_id.toString()}
                            onValueChange={(value) =>
                                setForm({
                                    ...form,
                                    brand_id: Number.parseInt(value),
                                })
                            }
                            required
                        >
                            <SelectTrigger id="motorcycle-brand">
                                <SelectValue placeholder="Select a brand" />
                            </SelectTrigger>
                            <SelectContent>
                                {brands.map((brand) => (
                                    <SelectItem
                                        key={brand.id}
                                        value={brand.id.toString()}
                                    >
                                        {brand.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="motorcycle-price">Price ($)</Label>
                        <Input
                            id="motorcycle-price"
                            type="number"
                            min="0"
                            step="0.01"
                            value={form.price}
                            onChange={(e) =>
                                setForm({ ...form, price: e.target.value })
                            }
                            placeholder="e.g. 6799.00"
                            required
                        />
                    </div>

                    {/* Image Upload Section */}
                    <div className="grid gap-2">
                        <Label>Motorbike Image</Label>
                        <div className="flex flex-col items-center gap-4">
                            {imagePreview ? (
                                <div className="relative w-full h-48 rounded-md overflow-hidden border">
                                    <Image
                                        src={imagePreview || "/placeholder.svg"}
                                        alt="Motorbike preview"
                                        fill
                                        className="object-cover"
                                    />
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                                        onClick={handleRemoveImage}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <div
                                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
                                    onClick={triggerFileInput}
                                >
                                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground">
                                        Click to upload an image
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        PNG, JPG or WEBP (max. 5MB)
                                    </p>
                                </div>
                            )}

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/png, image/jpeg, image/webp"
                                className="hidden"
                                id="fileInput" // แก้ typo จาก fileIntput เป็น fileInput
                                onChange={handleFileChange}
                            />

                            {imagePreview && (
                                <Button
                                    variant="outline"
                                    type="button"
                                    className="w-full"
                                    onClick={triggerFileInput}
                                >
                                    <Upload className="mr-2 h-4 w-4" />
                                    Change Image
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSave}
                        disabled={!form.name || !form.price || !form.brand_id}
                    >
                        {isEditing ? "Update" : "Add"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
