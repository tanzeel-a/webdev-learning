// Typewriter effect for hero heading
document.addEventListener('DOMContentLoaded', function() {
    // Get the heading element
    const heading = document.querySelector('.hero-heading');
    // Store the original text
    const text = heading.textContent;
    // Clear the heading initially
    heading.textContent = '';
    
    // Type each letter with a delay
    let index = 0;
    function typeLetter() {
        if (index < text.length) {
            heading.textContent += text[index];
            index++;
            // Wait 100ms before typing next letter
            setTimeout(typeLetter, 100);
        }
    }
    
    // Start typing effect
    typeLetter();
});
