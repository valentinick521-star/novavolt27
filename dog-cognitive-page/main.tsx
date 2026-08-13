import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import DogCognitiveLayout from "@/components/dog-cognitive/SiteLayout";
import DogCognitiveSupplements from "@/pages/DogCognitiveSupplements";

function DogCognitivePage() {
  useEffect(() => {
    const summary = document.querySelector<HTMLElement>(".hero-pick-best");
    if (!summary) return;

    summary.innerHTML =
      "<strong>Why it stood out:</strong> PawPrint takes a different approach from most products we reviewed. Its formula centers on NMN and NAD+, which are involved in normal cellular-energy processes, rather than making phosphatidylserine or SAMe the main focus.";
  }, []);

  return (
    <DogCognitiveLayout>
      <DogCognitiveSupplements />
    </DogCognitiveLayout>
  );
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <DogCognitivePage />
  </BrowserRouter>,
);
