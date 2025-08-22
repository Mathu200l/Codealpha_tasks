document.addEventListener('DOMContentLoaded', () => {

    // --- Hamburger Menu Functionality ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        // Toggle Nav
        navLinks.classList.toggle('nav-active');

        // Animate Hamburger Icon
        hamburger.classList.toggle('toggle');
    });
    
    // Close nav when a link is clicked
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
            }
        });
    });

    // --- Section Fade-in on Scroll ---
    const sections = document.querySelectorAll('.content-section');

    const revealSection = (entries, observer) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing after it's visible
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Active Nav Link Highlighting on Scroll ---
    const navLinksList = document.querySelectorAll('nav a');
    const allSections = document.querySelectorAll('section[id]');
    
    const highlightNav = () => {
        let scrollY = window.pageYOffset;
        
        allSections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Adjusted offset
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('nav a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('nav a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNav);

});