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
import { Search, Sparkles, Loader2 } from "lucide-react";
import ItemCard, { Item } from "./ItemCard";
import { itemsApi } from "@/lib/api";
import { toast } from "sonner";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allItems: Item[];
  onViewItem: (item: Item) => void;
}

const SearchModal = ({ isOpen, onClose, allItems, onViewItem }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<Item[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setHasSearched(true);

    try {
      const filtered = await itemsApi.search(query);
      setResults(filtered);
    } catch (error) {
      toast.error("Failed to search items. Please try again.");
      console.error("Error searching items:", error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClose = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            AI Smart Search
          </DialogTitle>
          <DialogDescription>
            Describe what you're looking for naturally. The search focuses on clarity over flair.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder='Try "blue water bottle" or "academic notebook"...'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch} disabled={isSearching || !query.trim()}>
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Search"
            )}
          </Button>
        </div>

        {!hasSearched && (
          <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border/50">
            <h4 className="font-medium text-sm mb-2">Search tips</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Combine a color and item type, like "blue water bottle" or "black backpack".</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Add details such as material, engravings, or stickers for quicker matches.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>If you do not see results, try a synonym (bottle/flask, laptop/macbook).</span>
              </li>
            </ul>
          </div>
        )}

        {hasSearched && (
          <div className="flex-1 overflow-y-auto mt-4 -mx-6 px-6">
            {isSearching ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Analyzing with AI...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-4 pb-4">
                <p className="text-sm text-muted-foreground">
                  Found {results.length} matching item{results.length !== 1 ? "s" : ""}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onView={(item) => {
                        onViewItem(item);
                        handleClose();
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No items found matching "{query}"
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try different keywords or check back later
                </p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
