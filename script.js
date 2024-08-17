const name= prompt("Whats your name")
document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for navigation
    const smoothScroll = (target, duration) => {
        const targetPosition = document.querySelector(target).offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = currentTime => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    };

    // Event listeners for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'), 1000);
        });
    });

    // Animate header geometric shapes
    const headerShapes = document.querySelectorAll('header::before, header::after');
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        headerShapes.forEach(shape => {
            shape.style.transform = `translateX(${scrollPos * 0.2}px) translateY(${scrollPos * 0.2}px)`;
        });
    });

    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial call

});
