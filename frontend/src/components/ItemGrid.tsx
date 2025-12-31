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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              No items yet
            </h3>
            <p className="text-muted-foreground">
              Be the first to report a found item!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            {title}
          </h2>
          <span className="text-sm text-muted-foreground">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <ItemCard
              key={item.id}
              item={item}
              onView={onViewItem}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItemGrid;
