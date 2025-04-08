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

export function MotorcycleForm({
  open,
  onOpenChange,
  form,
  setForm,
  onSave,
  brands,
  isEditing,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Motorcycle" : "Add New Motorcycle"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the motorcycle details below."
              : "Fill in the details to add a new motorcycle."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="motorcycle-name">Motorcycle Name</Label>
            <Input
              id="motorcycle-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. CBR500R, MT-07"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="motorcycle-brand">Brand</Label>
            <Select
              value={form.brand_id.toString()}
              onValueChange={(value) =>
                setForm({ ...form, brand_id: parseInt(value) })
              }
            >
              <SelectTrigger id="motorcycle-brand">
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
            <Label htmlFor="motorcycle-price">Price ($)</Label>
            <Input
              id="motorcycle-price"
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
