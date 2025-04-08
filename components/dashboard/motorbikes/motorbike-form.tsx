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
import { MotorbikeBrand } from "@/types";

interface MotorbikeFormData {
  id: number;
  brand_id: number;
  name: string;
  price: string;
}

interface MotorbikeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: MotorbikeFormData;
  setForm: (form: MotorbikeFormData) => void;
  onSave: () => void;
  brands: MotorbikeBrand[];
  isEditing: boolean;
}

export function MotorbikeForm({
  open,
  onOpenChange,
  form,
  setForm,
  onSave,
  brands,
  isEditing,
}: MotorbikeFormProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
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
            <Label htmlFor="motorbike-name">Motorbike Name</Label>
            <Input
              id="motorbike-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. CBR500R, MT-07"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="motorbike-brand">Brand</Label>
            <Select
              value={form.brand_id.toString()}
              onValueChange={(value) =>
                setForm({ ...form, brand_id: parseInt(value) })
              }
            >
              <SelectTrigger id="motorbike-brand">
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id.toString()}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="motorbike-price">Price ($)</Label>
            <Input
              id="motorbike-price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="e.g. 6799.00"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onSave}
            disabled={!form.name || !form.price || !form.brand_id}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
