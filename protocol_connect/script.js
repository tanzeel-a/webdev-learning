// Reviews array - 5 people who gave reviews of the website and product
const reviews = [
    {
        name: "Dr. Priya Sharma",
        affiliation: "IIT Delhi, Research Lab",
        review: "ProtocolApp has revolutionized how we manage protocols in our lab. The India-specific reagents feature is a game-changer - no more hunting for substitutes!",
        rating: 5
    },
    {
        name: "Prof. Rajesh Kumar",
        affiliation: "AIIMS, Biochemistry Department",
        review: "Finally, a protocol database that understands Indian lab constraints. The standardized format makes it so easy to reproduce experiments. Highly recommended!",
        rating: 5
    },
    {
        name: "Dr. Anjali Mehta",
        affiliation: "CSIR-NCL, Pune",
        review: "The quality variability handling is brilliant. Our experiments are now more reproducible thanks to ProtocolApp's attention to batch-to-batch differences.",
        rating: 5
    },
    {
        name: "Dr. Vikram Singh",
        affiliation: "IISc Bangalore, Molecular Biology Lab",
        review: "ProtocolApp's equipment-specific protocols saved us months of troubleshooting. The upload and search features are intuitive and the database keeps growing!",
        rating: 5
    },
    {
        name: "Dr. Sneha Patel",
        affiliation: "TIFR Mumbai, Cell Biology Lab",
        review: "As a researcher working with limited resources, ProtocolApp's realistic substitutes and vendor information have been invaluable. It's become an essential tool in our lab.",
        rating: 5
    }
];

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
            
            // Pause for 1 second after "A Proto" (after index 6)
            if (index === 7) {
                setTimeout(typeLetter, 1000);
            } else {
                // Start slow (300ms) for first 6 chars, then faster (150ms) after pause
                const delay = index <= 6 ? 300 : 150;
                setTimeout(typeLetter, delay);
            }
        }
    }
    
    // Start typing effect
    typeLetter();
    
    // Fast typewriter effect for about heading - triggers on scroll
    const aboutHeading = document.querySelector('.about-heading');
    const aboutSection = document.querySelector('.about-section');
    
    if (aboutHeading && aboutSection) {
        const aboutText = aboutHeading.textContent;
        aboutHeading.textContent = '';
        let hasStarted = false;
        
        // Intersection Observer to detect when section comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasStarted) {
                    hasStarted = true;
                    
                    let aboutIndex = 0;
                    function typeAboutLetter() {
                        if (aboutIndex < aboutText.length) {
                            aboutHeading.textContent += aboutText[aboutIndex];
                            aboutIndex++;
                            setTimeout(typeAboutLetter, 40); // Fast typing speed
                        }
                    }
                    
                    typeAboutLetter();
                    observer.unobserve(aboutSection); // Stop observing after it starts
                }
            });
        }, {
            threshold: 0.3 // Trigger when 30% of the section is visible
        });
        
        observer.observe(aboutSection);
    }
    
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const questionWrapper = item.querySelector('.faq-question-wrapper');
        const toggle = item.querySelector('.faq-toggle');
        
        function toggleFAQ() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        }
        
        // Add click event to both question wrapper and toggle button
        questionWrapper.addEventListener('click', toggleFAQ);
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFAQ();
        });
    });
    
    // Reviews Slider functionality with auto-scroll
    const sliderTrack = document.getElementById('reviewsSliderTrack');
    const sliderDots = document.getElementById('sliderDots');
    
    if (sliderTrack && reviews && reviews.length > 0) {
        let currentSlide = 0;
        let autoScrollInterval;
        
        // Render reviews
        function renderReviews() {
            sliderTrack.innerHTML = '';
            sliderDots.innerHTML = '';
            
            reviews.forEach((review, index) => {
                // Create slide
                const slide = document.createElement('div');
                slide.className = 'review-slide';
                
                const stars = '★'.repeat(review.rating);
                
                slide.innerHTML = `
                    <p class="review-text">"${review.review}"</p>
                    <div class="review-author">${review.name}</div>
                    <div class="review-affiliation">${review.affiliation}</div>
                    <div class="review-rating">${stars}</div>
                `;
                
                sliderTrack.appendChild(slide);
                
                // Create dot
                const dot = document.createElement('button');
                dot.className = 'slider-dot';
                if (index === 0) dot.classList.add('active');
                dot.setAttribute('aria-label', `Go to review ${index + 1}`);
                dot.addEventListener('click', () => {
                    goToSlide(index);
                    resetAutoScroll();
                });
                sliderDots.appendChild(dot);
            });
        }
        
        // Update slider position
        function updateSlider() {
            sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            const dots = sliderDots.querySelectorAll('.slider-dot');
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Go to specific slide
        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
        }
        
        // Next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % reviews.length;
            updateSlider();
        }
        
        // Start auto-scroll
        function startAutoScroll() {
            autoScrollInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
        }
        
        // Reset auto-scroll (when user clicks a dot)
        function resetAutoScroll() {
            clearInterval(autoScrollInterval);
            startAutoScroll();
        }
        
        // Initialize
        renderReviews();
        updateSlider();
        startAutoScroll();
    }
});
