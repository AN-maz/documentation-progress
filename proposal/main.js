import { CoverComponent } from "./src/components/Cover.js";
import { PageLayout } from "./src/components/PageLayout.js";
import { DaftarIsiComponent } from "./src/components/DaftarIsi.js";
import { SectionComponent } from "./src/components/Section.js";
import { PendahuluanComponent } from "./src/components/Pendahuluan.js";
import { RABComponent } from "./src/components/RABComponent.js";
import { DeskripsiComponent } from "./src/components/Deskripsi.js";
import { LandasanComponent } from "./src/components/Landasan.js";
import { TemaComponent } from "./src/components/Tema.js";
import { TujuanComponent } from "./src/components/Tujuan.js";
import { SasaranComponent } from "./src/components/Sasaran.js";
import { WaktuTempatComponent } from "./src/components/WaktuTempat.js";
import { KepanitiaanComponent } from "./src/components/Kepanitiaan.js";
import { proposalContent } from "./src/data/proposal.data.js";

const componentRegistry = {
  pendahuluan: PendahuluanComponent,
  deskripsi: DeskripsiComponent,
  landasan: LandasanComponent,
  tema: TemaComponent,
  tujuan: TujuanComponent,
  sasaran: SasaranComponent,
  waktutempat: WaktuTempatComponent,
  kepanitiaan: KepanitiaanComponent,
  rab: RABComponent,
};

const app = document.getElementById("app");
let htmlRender = "";
let currentPage = 1;

htmlRender += CoverComponent();
currentPage++;

htmlRender += PageLayout(DaftarIsiComponent(), currentPage);
currentPage++;

proposalContent.forEach((sectionData) => {
  if (sectionData.id === "kepanitiaan") {
    htmlRender += PageLayout(KepanitiaanComponent(sectionData, 1), currentPage);
    currentPage++;
    htmlRender += PageLayout(KepanitiaanComponent(sectionData, 2), currentPage);
    currentPage++;
  } else if (sectionData.id === "rab") {
    const chunkSize = 3;
    const grandTotal = 4849000;
    // PENTING: Akses ke sectionData.content.categories
    const allCategories = sectionData.content.categories;

    for (let i = 0; i < allCategories.length; i += chunkSize) {
      const chunk = allCategories.slice(i, i + chunkSize);
      const isLast = i + chunkSize >= allCategories.length;

      htmlRender += PageLayout(
        RABComponent(chunk, isLast, grandTotal),
        currentPage,
      );
      currentPage++;
    }
  } else {
    const ComponentToRender =
      componentRegistry[sectionData.id] || SectionComponent;
    const sectionHTML = ComponentToRender(sectionData);
    htmlRender += PageLayout(sectionHTML, currentPage);
    currentPage++;
  }
});

app.innerHTML = htmlRender;
