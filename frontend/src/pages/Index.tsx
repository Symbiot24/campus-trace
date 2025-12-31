import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CommunityValuesSection from "@/components/CommunityValuesSection";
import ItemGrid from "@/components/ItemGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import CallToActionSection from "@/components/CallToActionSection";
import ReportModal, { ReportFormData } from "@/components/ReportModal";
import SearchModal from "@/components/SearchModal";
import ItemDetailModal from "@/components/ItemDetailModal";
import Footer from "@/components/Footer";
import { Item } from "@/components/ItemCard";
import { itemsApi } from "@/lib/api";
import { toast } from "sonner";

const Index = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

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

  const handleReportSubmit = async (formData: ReportFormData) => {
    try {
      const newItem = await itemsApi.create({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=400&h=300&fit=crop",
        status: formData.status,
      });
      setItems([newItem, ...items]);
    } catch (error) {
      toast.error("Failed to report item. Please try again.");
      console.error("Error creating item:", error);
      throw error;
    }
  };

  return (
    <>
      <Helmet>
        <title>Campus-Trace</title>
        <meta
          name="description"
          content="Find your lost items on campus with AI-powered semantic search. ReTrace helps students reunite with their belongings quickly and efficiently."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar
          onOpenReport={() => setIsReportOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        <main className="flex-1">
          <HeroSection
            onOpenReport={() => setIsReportOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
          />

          <HowItWorksSection />

          <CommunityValuesSection onOpenReport={() => setIsReportOpen(true)} />

          <ItemGrid
            items={items.filter((item) => item.status !== "claimed")}
            onViewItem={setSelectedItem}
            title="Recently Reported Items"
          />

          <TestimonialsSection />

          <CallToActionSection
            onOpenReport={() => setIsReportOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
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
