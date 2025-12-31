import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterButtonsProps {
  activeFilter: "all" | "lost" | "found";
  onFilterChange: (filter: "all" | "lost" | "found") => void;
}

const FilterButtons = ({ activeFilter, onFilterChange }: FilterButtonsProps) => {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      <Button
        variant={activeFilter === "all" ? "default" : "outline"}
        onClick={() => onFilterChange("all")}
        className={cn(
          "transition-all",
          activeFilter === "all" && "shadow-md"
        )}
      >
        All Items
      </Button>
      <Button
        variant={activeFilter === "found" ? "default" : "outline"}
        onClick={() => onFilterChange("found")}
        className={cn(
          "transition-all",
          activeFilter === "found" && "shadow-md bg-success hover:bg-success/90 text-white"
        )}
      >
        Found Items
      </Button>
      <Button
        variant={activeFilter === "lost" ? "default" : "outline"}
        onClick={() => onFilterChange("lost")}
        className={cn(
          "transition-all",
          activeFilter === "lost" && "shadow-md bg-destructive hover:bg-destructive/90"
        )}
      >
        Lost Items
      </Button>
    </div>
  );
};

export default FilterButtons;
