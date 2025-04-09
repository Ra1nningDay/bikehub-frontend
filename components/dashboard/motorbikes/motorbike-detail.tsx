import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Motorbike, MotorbikeUnit } from "@/types";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  motorbike: Motorbike | null;
}

export function MotorbikeDetailModal({ open, onOpenChange, motorbike }: Props) {
  const [units, setUnits] = useState<MotorbikeUnit[]>([]);

  useEffect(() => {
    if (motorbike) {
      // จำลองการดึง motorbike-unit จาก API หรือดาต้า
      fetch(`/api/motorbike-units?motorbike_id=${motorbike.id}`)
        .then((res) => res.json())
        .then(setUnits);
    }
  }, [motorbike]);

  if (!motorbike) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Motorbike Detail</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {motorbike.name}
          </p>
          <p>
            <strong>Brand:</strong> {motorbike.brand_id}
          </p>
          <p>
            <strong>Price:</strong> ฿{motorbike.price}
          </p>
          <hr />
          <p className="font-semibold">Units:</p>
          {units.length > 0 ? (
            <ul className="list-disc pl-5">
              {units.map((unit) => (
                <li key={unit.id}>{unit.detail}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No units available</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
