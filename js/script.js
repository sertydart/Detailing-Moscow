        const BOOKING_URL = 'https://dikidi.net/ru/owner/journal/?company=2146841';
        document.querySelectorAll('[data-booking-link]').forEach((link) => {
            link.setAttribute('href', BOOKING_URL);
        });

        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 40);
        });

        const nav = document.getElementById('nav');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');

        function toggleMenu() {
            const isOpen = nav.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
            mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
        }

        function closeMenu() {
            nav.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.setAttribute('aria-label', 'Открыть меню');
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                closeMenu();
                mobileMenuBtn.focus();
            }
        });

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px', threshold: 0.1 });

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

        document.querySelectorAll('a[href^="#"]:not([data-booking-link])').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId.length <= 1) return;
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
