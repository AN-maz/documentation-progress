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
import { RundownComponent } from "./src/components/Rundown.js";
import { OutputComponent } from "./src/components/Output.js";
import { EvaluasiComponent } from "./src/components/Evaluasi.js";
import { PenutupComponent } from "./src/components/Penutup.js";

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
  rundown: RundownComponent,
  output: OutputComponent,
  evaluasi: EvaluasiComponent,
  penutup: PenutupComponent,
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
    const totals = {
      totalKeseluruhan: sectionData.content.totalKeseluruhan,
      biayaTakTerduga: sectionData.content.biayaTakTerduga,
      grandTotal: sectionData.content.grandTotal,
    };

    const allCategories = sectionData.content.categories;

    // PEMBAGIAN HALAMAN MANUAL YANG IDEAL UNTUK A4:
    // Halaman 1: Sekretaris (1 item) & Show Director (7 item)
    // Halaman 2: Logging (22 item - Hampir 1 full page)
    // Halaman 3: Art Director (3 item), Consumption (5 item) + Bagian Grand Total
    const chunks = [
      [allCategories[0], allCategories[1]],
      [allCategories[2]],
      [allCategories[3], allCategories[4]],
    ];

    chunks.forEach((chunk, index) => {
      const isFirst = index === 0;
      const isLast = index === chunks.length - 1;

      htmlRender += PageLayout(
        RABComponent(chunk, isFirst, isLast, totals),
        currentPage,
      );
      currentPage++;
    });
  } else if (sectionData.id === "rundown") {
    const chunkSize = 15; // Sesuaikan jumlah baris per halaman
    for (let i = 0; i < sectionData.content.length; i += chunkSize) {
      const chunk = sectionData.content.slice(i, i + chunkSize);
      htmlRender += PageLayout(RundownComponent(chunk), currentPage);
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
