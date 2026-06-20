document.addEventListener('DOMContentLoaded', () => {
    const menuContent = document.getElementById('menu-content');
    const pills = document.querySelectorAll('.category-pill');
    const detailOverlay = document.getElementById('detail-overlay');
    const detailHeroImage = document.getElementById('detail-hero-image');
    const detailContent = document.getElementById('detail-content');
    const closeDetailBtn = document.getElementById('close-detail-btn');

    const categories = ['Starters', 'Mains', 'Drinks', 'Desserts'];
    let isScrollingToSection = false;
    let activeCardImg = null;

    // Check for user reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // ── IntersectionObserver for Card Entrance ──
    const cardObserver = new IntersectionObserver((entries, observer) => {
        let delay = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                observer.unobserve(card);

                if (prefersReducedMotion.matches) {
                    card.classList.remove('card-hidden');
                    card.classList.add('card-visible');
                    return;
                }

                setTimeout(() => {
                    card.classList.remove('card-hidden');
                    card.classList.add('card-visible');
                }, delay);
                delay += 80;
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // ── Render Menu Grid ──
    function renderMenu() {
        if (!menuContent || typeof MENU_DATA === 'undefined') return;

        categories.forEach(category => {
            const categoryItems = MENU_DATA.filter(item => item.category === category);
            if (categoryItems.length === 0) return;

            const section = document.createElement('section');
            section.id = category.toLowerCase();
            section.className = 'menu-section';

            const title = document.createElement('h2');
            title.className = 'section-title';
            title.textContent = category;
            section.appendChild(title);

            categoryItems.forEach(item => {
                const card = document.createElement('div');
                card.className = 'dish-card card-hidden';
                card.setAttribute('data-id', item.id);

                card.innerHTML = `
                    <div class="dish-image-wrapper">
                        <img class="dish-image" src="${item.image}" alt="${item.name}" loading="lazy">
                    </div>
                    <div class="dish-details">
                        <div class="dish-header">
                            <h3 class="dish-name">${item.name}</h3>
                            <span class="dish-price">${item.price}</span>
                        </div>
                        <p class="dish-description">${item.description.split('.')[0]}.</p>
                    </div>
                    <div class="dish-card-arrow">
                        <svg viewBox="0 0 24 24">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                `;

                card.addEventListener('click', () => {
                    const cardImg = card.querySelector('.dish-image');
                    openDetailView(item, cardImg);
                });

                section.appendChild(card);
                cardObserver.observe(card);
            });

            menuContent.appendChild(section);
        });
    }

    // ── Render Detail Content ──
    function renderDetailContent(item) {
        // Build tags HTML
        const tagsHTML = (item.tags || []).map(tag =>
            `<span class="detail-tag">${tag}</span>`
        ).join('');

        // Build ingredients HTML
        const ingredientsHTML = (item.ingredients || []).map(ing =>
            `<li class="detail-ingredient">${ing}</li>`
        ).join('');

        // Build prep note HTML
        const prepNoteHTML = item.prepNote ? `
            <div class="detail-prep-note">
                <svg class="prep-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                </svg>
                <p class="detail-prep-text">${item.prepNote}</p>
            </div>
        ` : '';

        detailContent.innerHTML = `
            <div class="detail-header">
                <h2 class="detail-name">${item.name}</h2>
                <span class="detail-price">${item.price}</span>
            </div>

            ${tagsHTML ? `<div class="detail-tags">${tagsHTML}</div>` : ''}

            <p class="detail-description">${item.description}</p>

            <hr class="detail-divider">

            ${ingredientsHTML ? `
                <h3 class="detail-section-label">Ingredients</h3>
                <ul class="detail-ingredients">${ingredientsHTML}</ul>
                <hr class="detail-divider">
            ` : ''}

            ${prepNoteHTML ? `
                <h3 class="detail-section-label">How It's Made</h3>
                ${prepNoteHTML}
            ` : ''}

            <div class="detail-footer">
                <p class="detail-footer-text">resturent · Digital Menu</p>
            </div>
        `;

        // Animate detail content in
        if (!prefersReducedMotion.matches) {
            detailContent.style.opacity = '0';
            detailContent.style.transform = 'translateY(20px)';
            requestAnimationFrame(() => {
                setTimeout(() => {
                    detailContent.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                    detailContent.style.opacity = '1';
                    detailContent.style.transform = 'translateY(0)';
                }, 200);
            });
        }
    }

    // ── Open Detail View ──
    function openDetailView(item, cardImg) {
        activeCardImg = cardImg;

        detailHeroImage.src = item.image;
        detailHeroImage.alt = item.name;

        // Render the full detail content
        renderDetailContent(item);

        const openOverlay = () => {
            detailOverlay.classList.remove('hidden');
            detailOverlay.scrollTop = 0;
            document.body.style.overflow = 'hidden';
        };

        if (prefersReducedMotion.matches) {
            openOverlay();
            detailHeroImage.style.transform = 'none';
            return;
        }

        cardImg.style.viewTransitionName = 'dish-hero-image';
        detailHeroImage.style.viewTransitionName = 'dish-hero-image';

        if (document.startViewTransition) {
            const transition = document.startViewTransition(() => {
                openOverlay();
            });

            transition.finished.then(() => {
                cardImg.style.viewTransitionName = '';
                detailHeroImage.style.viewTransitionName = '';
            });
        } else {
            detailOverlay.classList.add('fallback-fade-in');
            openOverlay();
            setTimeout(() => {
                detailOverlay.classList.remove('fallback-fade-in');
                cardImg.style.viewTransitionName = '';
                detailHeroImage.style.viewTransitionName = '';
            }, 320);
        }
    }

    // ── Close Detail View ──
    function closeDetailView() {
        if (!activeCardImg) return;

        // Reset detail content animation state
        detailContent.style.transition = '';
        detailContent.style.opacity = '';
        detailContent.style.transform = '';

        const closeOverlay = () => {
            detailOverlay.classList.add('hidden');
            document.body.style.overflow = '';
            detailHeroImage.style.transform = '';
        };

        if (prefersReducedMotion.matches) {
            closeOverlay();
            activeCardImg = null;
            return;
        }

        activeCardImg.style.viewTransitionName = 'dish-hero-image';
        detailHeroImage.style.viewTransitionName = 'dish-hero-image';

        if (document.startViewTransition) {
            const transition = document.startViewTransition(() => {
                closeOverlay();
            });

            transition.finished.then(() => {
                activeCardImg.style.viewTransitionName = '';
                detailHeroImage.style.viewTransitionName = '';
                activeCardImg = null;
            });
        } else {
            detailOverlay.classList.add('fallback-fade-out');
            setTimeout(() => {
                closeOverlay();
                detailOverlay.classList.remove('fallback-fade-out');
                activeCardImg.style.viewTransitionName = '';
                detailHeroImage.style.viewTransitionName = '';
                activeCardImg = null;
            }, 280);
        }
    }

    // ── Close Button ──
    if (closeDetailBtn) {
        closeDetailBtn.addEventListener('click', closeDetailView);
    }

    // ── Swipe-Down-to-Close ──
    let touchStartY = 0;
    let touchCurrentY = 0;
    let isDragging = false;

    detailOverlay.addEventListener('touchstart', (e) => {
        if (prefersReducedMotion.matches) return;
        if (detailOverlay.scrollTop <= 0) {
            touchStartY = e.touches[0].clientY;
            touchCurrentY = touchStartY;
            isDragging = true;
            detailOverlay.style.transition = 'none';
        } else {
            isDragging = false;
        }
    }, { passive: true });

    detailOverlay.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        touchCurrentY = e.touches[0].clientY;
        const deltaY = touchCurrentY - touchStartY;

        if (deltaY > 0) {
            if (e.cancelable) e.preventDefault();
            detailOverlay.style.transform = `translate(-50%, ${deltaY}px)`;
            const opacity = Math.max(0.5, 1 - (deltaY / 500));
            detailOverlay.style.backgroundColor = `color-mix(in srgb, var(--bg-deep) ${opacity * 100}%, transparent)`;
        } else {
            detailOverlay.style.transform = '';
            detailOverlay.style.backgroundColor = '';
            isDragging = false;
        }
    }, { passive: false });

    detailOverlay.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;

        const deltaY = touchCurrentY - touchStartY;
        detailOverlay.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s';

        if (deltaY > 120) {
            detailOverlay.style.transform = '';
            detailOverlay.style.backgroundColor = '';
            closeDetailView();
        } else {
            detailOverlay.style.transform = '';
            detailOverlay.style.backgroundColor = '';
        }
    });

    // ── Parallax on Detail Scroll ──
    detailOverlay.addEventListener('scroll', () => {
        if (prefersReducedMotion.matches) {
            detailHeroImage.style.transform = 'none';
            return;
        }
        const scrollTop = detailOverlay.scrollTop;
        if (scrollTop > 0) {
            detailHeroImage.style.transform = `scale(1.15) translateY(${scrollTop * 0.2}px)`;
        } else {
            detailHeroImage.style.transform = 'scale(1.15) translateY(0)';
        }
    }, { passive: true });

    // ── Active Pill Utility ──
    function setActivePill(activePill) {
        pills.forEach(p => p.classList.remove('active'));
        activePill.classList.add('active');

        const nav = document.querySelector('.category-nav');
        if (!nav) return;

        const navRect = nav.getBoundingClientRect();
        const pillRect = activePill.getBoundingClientRect();
        const scrollTarget = nav.scrollLeft + (pillRect.left - navRect.left) - (navRect.width / 2) + (pillRect.width / 2);
        nav.scrollTo({ left: scrollTarget, behavior: 'smooth' });
    }

    // ── Scroll Spy ──
    const sectionObserver = new IntersectionObserver((entries) => {
        if (isScrollingToSection) return;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const categoryId = entry.target.id;
                const correspondingPill = document.querySelector(`.category-pill[data-category="${capitalizeFirstLetter(categoryId)}"]`);
                if (correspondingPill) {
                    setActivePill(correspondingPill);
                }
            }
        });
    }, {
        root: null,
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0
    });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // ── Delayed Init (after logo animation) ──
    setTimeout(() => {
        renderMenu();

        document.querySelectorAll('.menu-section').forEach(section => {
            sectionObserver.observe(section);
        });

        pills.forEach(pill => {
            pill.addEventListener('click', (e) => {
                e.preventDefault();
                const targetCategory = pill.getAttribute('data-category').toLowerCase();
                const targetSection = document.getElementById(targetCategory);

                if (targetSection) {
                    isScrollingToSection = true;
                    setActivePill(pill);

                    // Smooth section highlight animation
                    const allSections = document.querySelectorAll('.menu-section');
                    
                    if (!prefersReducedMotion.matches) {
                        // Briefly fade all sections to draw attention to scroll
                        allSections.forEach(sec => {
                            sec.style.transition = 'opacity 0.2s ease-out';
                            sec.style.opacity = '0.3';
                        });

                        // After a brief dim, scroll and then highlight the target
                        setTimeout(() => {
                            targetSection.scrollIntoView({ behavior: 'smooth' });
                            
                            setTimeout(() => {
                                // Fade all sections back in
                                allSections.forEach(sec => {
                                    sec.style.transition = 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
                                    sec.style.opacity = '1';
                                });

                                // Give the target section a gentle pulse
                                targetSection.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                                targetSection.style.transform = 'translateY(6px)';
                                targetSection.style.opacity = '0.5';

                                requestAnimationFrame(() => {
                                    setTimeout(() => {
                                        targetSection.style.transform = 'translateY(0)';
                                        targetSection.style.opacity = '1';
                                    }, 30);
                                });

                                // Clean up inline styles
                                setTimeout(() => {
                                    allSections.forEach(sec => {
                                        sec.style.transition = '';
                                        sec.style.opacity = '';
                                        sec.style.transform = '';
                                    });
                                    isScrollingToSection = false;
                                }, 600);
                            }, 350);
                        }, 180);
                    } else {
                        targetSection.scrollIntoView({ behavior: 'auto' });
                        setTimeout(() => {
                            isScrollingToSection = false;
                        }, 100);
                    }
                }
            });
        });
    }, 600);
});
