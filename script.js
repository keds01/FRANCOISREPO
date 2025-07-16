document.addEventListener('DOMContentLoaded', function() {
    // Navigation mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Créer un menu mobile si il n'existe pas déjà
            let mobileMenu = document.querySelector('.mobile-menu');
            
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                
                // Cloner les liens de navigation et les boutons d'authentification
                const navClone = navLinks.cloneNode(true);
                const authClone = authButtons.cloneNode(true);
                
                mobileMenu.appendChild(navClone);
                mobileMenu.appendChild(authClone);
                
                document.body.appendChild(mobileMenu);
                
                // Ajouter des styles pour le menu mobile
                const style = document.createElement('style');
                style.textContent = `
                    .mobile-menu {
                        position: fixed;
                        top: 80px;
                        left: 0;
                        right: 0;
                        background-color: #fff;
                        padding: 20px;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                        display: none;
                        flex-direction: column;
                        align-items: center;
                        z-index: 999;
                    }
                    
                    .mobile-menu.active {
                        display: flex;
                    }
                    
                    .mobile-menu .nav-links {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-bottom: 20px;
                    }
                    
                    .mobile-menu .auth-buttons {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        width: 100%;
                    }
                    
                    .mobile-menu .auth-buttons a {
                        width: 100%;
                        text-align: center;
                    }
                    
                    .hamburger.active span:nth-child(1) {
                        transform: rotate(45deg) translate(5px, 5px);
                    }
                    
                    .hamburger.active span:nth-child(2) {
                        opacity: 0;
                    }
                    
                    .hamburger.active span:nth-child(3) {
                        transform: rotate(-45deg) translate(5px, -5px);
                    }
                `;
                
                document.head.appendChild(style);
            }
            
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Slider de témoignages
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialSlider && testimonialCards.length > 0) {
        let currentIndex = 0;
        
        // Fonction pour afficher un témoignage spécifique
        function showTestimonial(index) {
            if (index < 0) {
                index = testimonialCards.length - 1;
            } else if (index >= testimonialCards.length) {
                index = 0;
            }
            
            currentIndex = index;
            testimonialSlider.scrollTo({
                left: testimonialCards[currentIndex].offsetLeft,
                behavior: 'smooth'
            });
        }
        
        // Événements pour les boutons de navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                showTestimonial(currentIndex - 1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                showTestimonial(currentIndex + 1);
            });
        }
        
        // Défilement automatique toutes les 5 secondes
        setInterval(function() {
            showTestimonial(currentIndex + 1);
        }, 5000);
    }
    
    // Animation au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.step-card, .benefit-card, .testimonial-card, .partner-logo');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Ajouter des styles pour les animations
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .step-card, .benefit-card, .testimonial-card, .partner-logo {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .step-card.animate, .benefit-card.animate, .testimonial-card.animate, .partner-logo.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .step-card:nth-child(2), .benefit-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .step-card:nth-child(3), .benefit-card:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .benefit-card:nth-child(4) {
            transition-delay: 0.6s;
        }
    `;
    
    document.head.appendChild(animationStyle);
    
    // Exécuter l'animation au chargement et au défilement
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Exécuter une fois au chargement
    
    // Effet de parallaxe sur la section hero
    const heroSection = document.querySelector('.hero-section');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroSection && heroImage) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < heroSection.offsetHeight) {
                heroImage.style.transform = `translateY(${scrollPosition * 0.2}px)`;
            }
        });
    }
    
    // Animation des statistiques (compteur)
    const statItems = document.querySelectorAll('.stat-item h3');
    
    statItems.forEach(item => {
        const finalValue = parseFloat(item.textContent);
        let startValue = 0;
        const duration = 2000; // 2 secondes
        const increment = finalValue / (duration / 16); // 60 FPS
        
        function updateCounter() {
            startValue += increment;
            if (startValue < finalValue) {
                item.textContent = startValue.toFixed(1);
                requestAnimationFrame(updateCounter);
            } else {
                item.textContent = finalValue.toFixed(1);
            }
        }
        
        // Observer pour démarrer l'animation quand l'élément est visible
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(item);
    });
    
    // Bascule entre tarifs mensuels et annuels
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const pricingPlans = document.querySelectorAll('.pricing-plan');
    
    // Données de prix (mensuel et annuel avec 15% de réduction)
    const priceData = {
        monthly: {
            base: '1 000 FCFA',
            pro: '5 000 FCFA',
            enterprise: '10 000 FCFA'
        },
        yearly: {
            base: '10 200 FCFA',
            pro: '51 000 FCFA',
            enterprise: '102 000 FCFA'
        }
    };
    
    // Périodes correspondantes
    const periodText = {
        monthly: '/mois',
        yearly: '/an (économisez 15%)'
    };
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Mettre à jour l'état actif des boutons
            toggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Récupérer la période sélectionnée
            const period = this.getAttribute('data-period');
            
            // Mettre à jour les prix et périodes
            const prices = document.querySelectorAll('.price');
            const periods = document.querySelectorAll('.period');
            
            // Mettre à jour les prix selon le plan
            prices[0].textContent = priceData[period].base;
            prices[1].textContent = priceData[period].pro;
            prices[2].textContent = priceData[period].enterprise;
            
            // Mettre à jour les périodes
            periods.forEach(p => {
                p.textContent = periodText[period];
            });
            
            // Ajouter une animation
            pricingPlans.forEach(plan => {
                plan.classList.add('price-change');
                setTimeout(() => {
                    plan.classList.remove('price-change');
                }, 500);
            });
        });
    });
});
