import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, Tag, Mail, Phone, MessageCircle, ImageOff } from "lucide-react";
import { Item } from "./ItemCard";
import { cn } from "@/lib/utils";

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

  const handleWhatsAppContact = () => {
    if (!item.contactPhone) return;
    
    // Remove all non-digit characters
    const cleanPhone = item.contactPhone.replace(/\D/g, '');
    
    // Create WhatsApp message
    const message = encodeURIComponent(
      `Hi! I'm contacting you about the ${item.status} item "${item.title}" on Campus-Trace.`
    );
    
    // WhatsApp deep link (works on mobile and desktop)
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{item.title}</DialogTitle>
        </DialogHeader>

        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mt-2">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Hide image if it fails to load and show placeholder
                e.currentTarget.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.className = 'w-full h-full flex items-center justify-center';
                placeholder.innerHTML = '<svg class="h-24 w-24 text-muted-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>';
                e.currentTarget.parentElement?.insertBefore(placeholder, e.currentTarget);
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageOff className="h-24 w-24 text-muted-foreground/40" />
            </div>
          )}
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

          {item.status !== "claimed" && item.contactPhone && (
            <>
              <Separator />
              <div>
                <h4 className="text-sm font-semibold mb-3">Contact Information</h4>
                <div className="space-y-3">
                  {item.contactName && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{item.contactName}</span>
                    </div>
                  )}
                  {item.contactEmail && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Email:</span>
                      <a 
                        href={`mailto:${item.contactEmail}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {item.contactEmail}
                      </a>
                    </div>
                  )}
                  {item.contactPhone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="font-medium">{item.contactPhone}</span>
                    </div>
                  )}
                  
                  <Button
                    onClick={handleWhatsAppContact}
                    className="w-full gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Contact via WhatsApp
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Click to start a WhatsApp chat with the {item.status === "lost" ? "owner" : "finder"}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t border-border/50">
          <Button variant="outline" className="w-full" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDetailModal;
