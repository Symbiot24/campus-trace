import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Filter } from "lucide-react";

interface FilterButtonsProps {
  activeFilter: "all" | "lost" | "found";
  onFilterChange: (filter: "all" | "lost" | "found") => void;
}

const FilterButtons = ({ activeFilter, onFilterChange }: FilterButtonsProps) => {
  return (
    <div className="inline-flex items-center gap-2 p-1 rounded-lg bg-muted/50 border border-border">
      <div className="flex items-center gap-1 px-2 text-sm text-muted-foreground">
        <Filter className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Filter:</span>
      </div>
      <Button
        variant={activeFilter === "all" ? "default" : "ghost"}
        size="sm"
        onClick={() => onFilterChange("all")}
        className={cn(
          "transition-all relative",
          activeFilter === "all" && "shadow-sm"
        )}
      >
        {activeFilter === "all" && <Check className="h-3.5 w-3.5 mr-1" />}
        All Items
      </Button>
      <Button
        variant={activeFilter === "found" ? "default" : "ghost"}
        size="sm"
        onClick={() => onFilterChange("found")}
        className={cn(
          "transition-all relative",
          activeFilter === "found" && "shadow-sm bg-emerald-600 hover:bg-emerald-700 text-white"
        )}
      >
        {activeFilter === "found" && <Check className="h-3.5 w-3.5 mr-1" />}
        Found
      </Button>
      <Button
        variant={activeFilter === "lost" ? "default" : "ghost"}
        size="sm"
        onClick={() => onFilterChange("lost")}
        className={cn(
          "transition-all relative",
          activeFilter === "lost" && "shadow-sm bg-destructive hover:bg-destructive/90"
        )}
      >
        {activeFilter === "lost" && <Check className="h-3.5 w-3.5 mr-1" />}
        Lost
      </Button>
    </div>
  );
};

export default FilterButtons;
