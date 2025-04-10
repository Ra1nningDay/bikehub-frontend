import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash2, Eye, RefreshCw } from "lucide-react";
import { Motorbike } from "@/types";

interface MotorbikeListProps {
    motorbikes: Motorbike[];
    getBrandName: (brandId: number) => string;
    onEdit: (motorbike: Motorbike) => void;
    onDelete: (motorbikeId: number) => void;
    onViewDetail: (motorbike: Motorbike) => void;
    onRefresh: () => void; // เพิ่มฟังก์ชันสำหรับรีเฟรชข้อมูล
}

export function MotorbikeList({
    motorbikes,
    getBrandName,
    onEdit,
    onDelete,
    onViewDetail,
    onRefresh, // รับฟังก์ชันที่รีเฟรชจาก props
}: MotorbikeListProps) {
    return (
        <div className="rounded-md border">
            {/* เพิ่มปุ่ม Refresh ด้านบนของตาราง */}
            <div className="flex justify-end p-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onRefresh} // เมื่อกดปุ่มจะเรียกฟังก์ชัน onRefresh
                >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                </Button>
            </div>
            <table className="w-full caption-bottom text-sm">
                <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                        <th className="h-12 px-4 text-left font-medium">ID</th>
                        <th className="h-12 px-4 text-left font-medium">
                            Name
                        </th>
                        <th className="h-12 px-4 text-left font-medium">
                            Brand
                        </th>
                        <th className="h-12 px-4 text-left font-medium">
                            Price
                        </th>
                        <th className="h-12 px-4 text-right font-medium">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {motorbikes.map((motorbike, index) => (
                        <tr
                            key={`${motorbike.id}`}
                            className="border-b transition-colors hover:bg-muted/50"
                        >
                            <td className="p-4">{motorbike.id}</td>
                            <td className="p-4 font-medium">
                                {motorbike.name || "N/A"}
                            </td>
                            <td className="p-4">
                                {getBrandName(motorbike.brand_id)}
                            </td>
                            <td className="p-4">
                                $
                                {motorbike.price !== undefined &&
                                motorbike.price !== null
                                    ? motorbike.price.toLocaleString(
                                          undefined,
                                          { minimumFractionDigits: 2 }
                                      )
                                    : "N/A"}
                            </td>
                            <td className="p-4 text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>
                                            Actions
                                        </DropdownMenuLabel>
                                        <DropdownMenuItem
                                            className="cursor-pointer"
                                            onClick={() => onEdit(motorbike)}
                                        >
                                            <Edit className="mr-2 h-4 w-4" />{" "}
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="cursor-pointer"
                                            onClick={() =>
                                                onViewDetail(motorbike)
                                            }
                                        >
                                            <Eye className="mr-2 h-4 w-4" />{" "}
                                            View
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="text-red-600 cursor-pointer"
                                            onClick={() =>
                                                onDelete(motorbike.id)
                                            }
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />{" "}
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </td>
                        </tr>
                    ))}
                    {motorbikes.length === 0 && (
                        <tr key="no-motorbikes">
                            <td
                                colSpan={5}
                                className="p-4 text-center text-muted-foreground"
                            >
                                No motorbikes found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
