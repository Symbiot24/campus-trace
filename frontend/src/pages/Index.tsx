import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CommunityValuesSection from "@/components/CommunityValuesSection";
import ItemGrid from "@/components/ItemGrid";
import FilterButtons from "@/components/FilterButtons";
import CallToActionSection from "@/components/CallToActionSection";
import ReportModal, { ReportFormData } from "@/components/ReportModal";
import SearchModal from "@/components/SearchModal";
import ItemDetailModal from "@/components/ItemDetailModal";
import Footer from "@/components/Footer";
import { Item } from "@/components/ItemCard";
import { itemsApi } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Index = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | "lost" | "found">("all");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setIsLoading(true);
      const data = await itemsApi.getAll();
      setItems(data);
    } catch (error) {
      toast.error("Failed to load items. Please try again.");
      console.error("Error loading items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenReport = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to report an item");
      navigate("/login");
      return;
    }
    setIsReportOpen(true);
  };

  const handleOpenSearch = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to search for items");
      navigate("/login");
      return;
    }
    setIsSearchOpen(true);
  };

  const handleReportSubmit = async (formData: ReportFormData) => {
    try {
      const newItem = await itemsApi.create({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        imageUrl: formData.imageUrl || "",
        status: formData.status,
        contactPhone: formData.contactPhone,
      });
      setItems([newItem, ...items]);
    } catch (error) {
      toast.error("Failed to report item. Please try again.");
      console.error("Error creating item:", error);
      throw error;
    }
  };

  const getFilteredItems = () => {
    let filtered = items.filter((item) => item.status !== "claimed");
    
    if (statusFilter === "lost") {
      filtered = filtered.filter((item) => item.status === "lost");
    } else if (statusFilter === "found") {
      filtered = filtered.filter((item) => item.status === "found");
    }
    
    return filtered;
  };

  return (
    <>
      <Helmet>
        <title>Campus-Trace</title>
        <meta
          name="description"
          content="Find your lost items on campus with AI-powered semantic search. Campus-Trace helps students reunite with their belongings quickly and efficiently."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar
          onOpenReport={handleOpenReport}
          onOpenSearch={handleOpenSearch}
        />

        <main className="flex-1">
          <HeroSection
            onOpenReport={handleOpenReport}
            onOpenSearch={handleOpenSearch}
          />

          <HowItWorksSection />

          <CommunityValuesSection onOpenReport={handleOpenReport} />

          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-display font-bold mb-3">Recently Reported Items</h2>
                <p className="text-muted-foreground mb-6">
                  Browse through items that have been found or reported as lost
                </p>
                <FilterButtons
                  activeFilter={statusFilter}
                  onFilterChange={setStatusFilter}
                />
              </div>
              <ItemGrid
                items={getFilteredItems()}
                onViewItem={setSelectedItem}
                title=""
              />
            </div>
          </section>

          <CallToActionSection
            onOpenReport={handleOpenReport}
            onOpenSearch={handleOpenSearch}
          />
        </main>

        <Footer />

        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          onSubmit={handleReportSubmit}
        />

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          allItems={items}
          onViewItem={setSelectedItem}
        />

        <ItemDetailModal
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    </>
  );
};

export default Index;
