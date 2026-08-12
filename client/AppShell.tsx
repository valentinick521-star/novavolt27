import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import DogCognitiveLayout from "./components/dog-cognitive/SiteLayout";
import Index from "./pages/Index";
import DogCognitiveSupplements from "./pages/DogCognitiveSupplements";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import AffiliateDisclosure from "./pages/AffiliateDisclosure";
import NotFound from "./pages/NotFound";

const DOG_COGNITIVE_PATH = "/best-dog-cognitive-supplements";

function ScrollToTopOnRouteChange() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) return;

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [location.pathname, location.search, location.hash]);

  return null;
}

function RoutedContent() {
  const { pathname } = useLocation();

  if (pathname === DOG_COGNITIVE_PATH || pathname === `${DOG_COGNITIVE_PATH}/`) {
    return (
      <DogCognitiveLayout>
        <DogCognitiveSupplements />
      </DogCognitiveLayout>
    );
  }

  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SiteLayout>
  );
}

export default function AppShell() {
  return (
    <>
      <ScrollToTopOnRouteChange />
      <RoutedContent />
    </>
  );
}
