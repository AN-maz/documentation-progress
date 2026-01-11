document.addEventListener("DOMContentLoaded", () => {
    const comingSoonButtons = document.querySelectorAll(".btn-coming-soon");

    comingSoonButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault(); 
            
            alert("Fitur ini akan segera hadir! (Coming Soon)");
        });
    });
});
