export function PengesahanComponent() {
  return `
    <div 
      class="w-full relative overflow-hidden" 
      style="width: 210mm; height: 297mm; margin: 0 auto; page-break-after: always; page-break-inside: avoid;"
    >
      <img
        src="./public/lembar-pengesahan.jpg"
        class="absolute top-0 left-0 w-full h-full object-fill print:object-fill"
        alt="Lembar Pengesahan Full Halaman"
      />
    </div>
  `;
}