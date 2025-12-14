// Typewriter effect for hero heading
document.addEventListener('DOMContentLoaded', function() {
    // Get the heading element
    const heading = document.querySelector('.hero-heading');
    const text = heading.textContent; // Store original text: "A Protocol Repository"
    
    // Clear the heading initially
    heading.textContent = '';
    
    let index = 0;
    
    // Function to type each letter
    function typeWriter() {
        if (index < text.length) {
            heading.textContent += text.charAt(index); // Add one letter at a time
            index++;
            setTimeout(typeWriter, 100); // Delay of 100ms between each letter
        }
    }
    
    // Start the typewriter effect
    typeWriter();
});
