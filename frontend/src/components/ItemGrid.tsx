import ItemCard, { Item } from "./ItemCard";
import { Package } from "lucide-react";

interface ItemGridProps {
  items: Item[];
  onViewItem: (item: Item) => void;
  title?: string;
}

const ItemGrid = ({ items, onViewItem, title = "Recent Items" }: ItemGridProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 lg:py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 border border-border mb-4">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
          No items found
        </h3>
        <p className="text-muted-foreground text-sm sm:text-base">
          {title ? "Try changing the filter or check back later" : "Be the first to report an item!"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            {title}
          </h2>
          <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {items.map((item, index) => (
          <ItemCard
            key={item.id}
            item={item}
            onView={onViewItem}
            className="animate-fade-up h-full"
            style={{ animationDelay: `${index * 0.05}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemGrid;
