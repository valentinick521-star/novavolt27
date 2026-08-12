import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import DogCognitiveLayout from "@/components/dog-cognitive/SiteLayout";
import DogCognitiveSupplements from "@/pages/DogCognitiveSupplements";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <DogCognitiveLayout>
      <DogCognitiveSupplements />
    </DogCognitiveLayout>
  </BrowserRouter>,
);
