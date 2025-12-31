import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: ReportFormData) => Promise<void>;
}

export interface ReportFormData {
  title: string;
  description: string;
  category: string;
  location: string;
  imageUrl: string;
  status: "lost" | "found";
}

const categories = [
  "Electronics",
  "Books",
  "Personal Items",
  "Clothing",
  "ID Cards",
  "Keys",
  "Bags",
  "Accessories",
  "Other",
];

const locations = [
  "Library",
  "Cafeteria",
  "Main Building",
  "Science Block",
  "Sports Complex",
  "Parking Lot",
  "Hostel Area",
  "Computer Lab",
  "Other",
];

const ReportModal = ({ isOpen, onClose, onSubmit }: ReportModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ReportFormData>({
    title: "",
    description: "",
    category: "",
    location: "",
    imageUrl: "",
    status: "found",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.category || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        imageUrl: "",
        status: "found",
      });
      toast.success("Item reported successfully!");
      onClose();
    } catch (error) {
      // Error is already handled in parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Report an Item</DialogTitle>
          <DialogDescription>
            Fill in the details about the item you found or lost.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="flex gap-3">
            <Button
              type="button"
              variant={formData.status === "found" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setFormData({ ...formData, status: "found" })}
            >
              I Found Something
            </Button>
            <Button
              type="button"
              variant={formData.status === "lost" ? "destructive" : "outline"}
              className="flex-1"
              onClick={() => setFormData({ ...formData, status: "lost" })}
            >
              I Lost Something
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Item Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Blue Water Bottle"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the item in detail (color, brand, distinguishing features...)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Location *</Label>
              <Select
                value={formData.location}
                onValueChange={(value) => setFormData({ ...formData, location: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL (optional)</Label>
            <div className="flex gap-2">
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />
              <Button type="button" variant="outline" size="icon" disabled>
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Image upload coming soon. For now, paste a direct image URL.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="hero" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Report"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;
