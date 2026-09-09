// List of target fonts to loop through
const fonts = ['Wingdings', 'Wingdings 2', 'Wingdings 3'];
let currentIndex = 0;

setInterval(() => {
    // Target all elements (using querySelectorAll works for duplicate IDs or classes)
    const elements = document.querySelectorAll('#wingding, .wingding');

    // Update the font family on each element
    elements.forEach(el => {
        el.style.fontFamily = `"${fonts[currentIndex]}", sans-serif`;
    });

    // Cycle to the next font index (0 -> 1 -> 2 -> 0)
    currentIndex = (currentIndex + 1) % fonts.length;
}, 500);