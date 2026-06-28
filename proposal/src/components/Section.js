export const SectionComponent = (data) => {
  // Jika konten berupa List (Array)
  let contentHTML = '';
  
  if (data.isList) {
    const listItems = data.content.map(item => `<li class="mb-2">${item}</li>`).join('');
    contentHTML = `<ul class="list-decimal pl-5 text-gray-700 text-justify leading-relaxed">${listItems}</ul>`;
  } else {
    // Jika konten berupa paragraf biasa
    contentHTML = `<p class="text-gray-700 text-justify leading-relaxed">${data.content}</p>`;
  }

  return `
    <div class="mb-8 page-break-inside-avoid">
      <h2 class="text-xl font-bold text-[#001452] mb-3 border-b-2 border-[#D81B2B] pb-2 inline-block">
        ${data.title}
      </h2>
      ${contentHTML}
    </div>
  `;
};