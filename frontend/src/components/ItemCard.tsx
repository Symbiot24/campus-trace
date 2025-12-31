import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Eye, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  imageUrl: string;
  status: "lost" | "found" | "claimed";
  date: string;
}

interface ItemCardProps {
  item: Item;
  onView: (item: Item) => void;
  className?: string;
  style?: React.CSSProperties;
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

const ItemCard = ({ item, onView, className, style }: ItemCardProps) => {
  const status = statusConfig[item.status];

  return (
    <article
      className={cn(
        "group relative bg-card rounded-xl border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20",
        className
      )}
      style={style}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // Hide image if it fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageOff className="h-16 w-16 text-muted-foreground/40" />
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
        <Badge
          variant="secondary"
          className="absolute top-3 right-3"
        >
          {item.category}
        </Badge>
      </div>

      <div className="p-4">
        <h3 className="font-display font-semibold text-lg text-foreground line-clamp-1 mb-1">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {item.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span className="line-clamp-1">{item.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{item.date}</span>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          className="w-full gap-2"
          onClick={() => onView(item)}
        >
          <Eye className="h-4 w-4" />
          View Details
        </Button>
      </div>
    </article>
  );
};

export default ItemCard;
