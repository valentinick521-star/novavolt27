import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import DogCognitiveLayout from "@/components/dog-cognitive/SiteLayout";
import DogCognitiveSupplements from "@/pages/DogCognitiveSupplements";

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <DogCognitiveLayout>
        <DogCognitiveSupplements />
      </DogCognitiveLayout>
    </StaticRouter>,
  );
}
