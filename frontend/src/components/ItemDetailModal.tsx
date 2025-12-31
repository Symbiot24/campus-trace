import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Tag, MessageSquare } from "lucide-react";
import { Item } from "./ItemCard";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ItemDetailModalProps {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusConfig = {
  lost: {
    label: "Lost",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  found: {
    label: "Found",
    className: "bg-success/10 text-success border-success/20",
  },
  claimed: {
    label: "Claimed",
    className: "bg-muted text-muted-foreground border-muted",
  },
};

const ItemDetailModal = ({ item, isOpen, onClose }: ItemDetailModalProps) => {
  if (!item) return null;

  const status = statusConfig[item.status];

  const handleClaim = () => {
    toast.success("Claim request submitted! The finder will be notified.");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{item.title}</DialogTitle>
        </DialogHeader>

        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mt-2">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <Badge
            variant="outline"
            className={cn(
              "absolute top-3 left-3 border font-medium",
              status.className
            )}
          >
            {status.label}
          </Badge>
        </div>

        <div className="space-y-4 mt-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
            <p className="text-foreground">{item.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Category:</span>
              <span className="font-medium">{item.category}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Location:</span>
              <span className="font-medium">{item.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm col-span-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Reported:</span>
              <span className="font-medium">{item.date}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t border-border/50">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Close
          </Button>
          {item.status !== "claimed" && (
            <Button
              variant="hero"
              className="flex-1 gap-2"
              onClick={handleClaim}
            >
              <MessageSquare className="h-4 w-4" />
              {item.status === "lost" ? "I Found This" : "This is Mine"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDetailModal;
