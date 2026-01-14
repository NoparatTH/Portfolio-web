// ========================================
// Noparat Portfolio - Main Script
// Refactored and optimized
// ========================================

// Loader / Splash Screen Logic (combined handler)

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // Custom Cursor
    // ========================================
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 50);
        });

        // Add hover effect to links to expand cursor
        const interactiveElements = document.querySelectorAll('a, .work-card, button');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                follower.classList.add('active');
                cursor.classList.add('active');
            });
            element.addEventListener('mouseleave', () => {
                follower.classList.remove('active');
                cursor.classList.remove('active');
            });
        });
    }

    // ========================================
    // Smooth Scroll for Anchors
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // Only prevent default and scroll if target exists
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Intersection Observer for Scroll Animations
    // ========================================
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.section-title, .about-text, .work-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Add class for in-view elements via JS logic injection to CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .in-view {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // Lazy Loading Image Detection
    // ========================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        // Add loading class to parent work-card if exists
        const workCard = img.closest('.work-card');
        if (workCard) {
            workCard.classList.add('loading');
        }

        // Check if already loaded
        if (img.complete) {
            img.classList.add('loaded');
            if (workCard) {
                workCard.classList.remove('loading');
            }
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
                if (workCard) {
                    workCard.classList.remove('loading');
                }
            });
        }
    });

    // ========================================
    // Back to Top Button
    // ========================================
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top on click
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // Interactive Background Parallax (using CSS Variables)
    // ========================================
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 50;
        const y = (e.clientY / window.innerHeight - 0.5) * 50;

        document.body.style.setProperty('--mouse-x', `${x}px`);
        document.body.style.setProperty('--mouse-y', `${y}px`);
    });

    // ========================================
    // Works Page: Filtering Logic
    // ========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const emptyState = document.querySelector('.empty-state');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');
                let visibleCount = 0;

                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                        visibleCount++;
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });

                // Handle Empty State
                if (emptyState) {
                    if (visibleCount === 0) {
                        setTimeout(() => {
                            emptyState.classList.add('visible');
                        }, 300);
                    } else {
                        emptyState.classList.remove('visible');
                    }
                }
            });
        });
    }

    // ========================================
    // Works Page: Modal Logic
    // ========================================
    const modal = document.getElementById('project-modal');
    if (modal) {
        const closeModal = document.querySelector('.close-modal');
        const modalImg = document.getElementById('modal-img');
        const modalTitle = document.getElementById('modal-title');
        const modalDesc = document.getElementById('modal-desc');

        window.openModal = function (projectId) {
            const projectData = {
                'project1': { title: 'Graphic Art Collection', img: 'assets/image2.png', desc: 'A collection of digital illustrations focusing on surrealism and vibrant color palettes. Created using Adobe Photoshop and Illustrator.' },
                'project2': { title: 'Brand Identity', img: 'assets/image3.png', desc: 'Complete branding package for a tech startup, including logo design, color theory, and corporate stationary.' },
                'project3': { title: 'Modern Web Design', img: 'assets/image1.png', desc: 'UI/UX design for a fashion e-commerce platform. Focus on minimalist aesthetics and smooth user journey.' },
                'project4': { title: 'Poster Design Series', img: 'assets/image4.png', desc: 'A series of event posters for an underground music festival. Typography driven design with grunge textures.' },
                '1': { title: 'Lover', img: 'assets/stranger-things.jpg', desc: 'Fan art designs for the Stranger Things series.' },
                // NEW_PROJECTS_DATA_HERE
            };

            const data = projectData[projectId];
            if (data && modalImg && modalTitle && modalDesc) {
                modalImg.src = data.img;
                modalTitle.innerText = data.title;
                modalDesc.innerText = data.desc;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        };

        if (closeModal) {
            closeModal.onclick = function () {
                modal.style.display = "none";
                document.body.style.overflow = 'auto';
            };
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.body.style.overflow = 'auto';
            }
        };
    }

    // ========================================
    // Contact Form Handling
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.querySelector('span').textContent;

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.querySelector('span').textContent = 'กำลังส่ง...';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Show success message
                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'block';

                    // Reset form
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
                console.error('Form error:', error);
            } finally {
                // Reset button
                submitBtn.disabled = false;
                submitBtn.querySelector('span').textContent = originalText;
            }
        });
    }

    // ========================================
    // Share Logic with Clipboard Fallback
    // ========================================
    window.shareProject = function (event, title) {
        event.stopPropagation();

        if (navigator.share) {
            navigator.share({
                title: 'Checkout this project by Noparat',
                text: `Check out "${title}" on Noparat's Portfolio!`,
                url: window.location.href
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            // Fallback: Copy to clipboard
            const shareText = `${title} - ${window.location.href}`;
            navigator.clipboard.writeText(shareText)
                .then(() => {
                    alert(`Link copied to clipboard!\n"${title}"`);
                })
                .catch(() => {
                    // Final fallback for older browsers
                    prompt('Copy this link:', window.location.href);
                });
        }
    };

    // ========================================
    // Hamburger Menu Logic
    // ========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu when a link is clicked
        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
});


// ========================================
// Splash Screen & Loader Logic (combined - runs on window load)
// ========================================
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');

    if (loader) {
        // Add page-loaded class after minimum display time
        setTimeout(() => {
            document.body.classList.add('page-loaded');
        }, 800);

        // Minimum load time to show animation
        setTimeout(() => {
            loader.classList.add('hidden');

            // Trigger hero animations after loader is gone
            setTimeout(() => {
                const heroTitle = document.querySelector('#hero h1');
                if (heroTitle) {
                    heroTitle.style.animationPlayState = 'running';
                }

                // Start Typewriter effect
                const title = document.querySelector('.typewriter-effect');
                if (title) {
                    const text1 = "NOPARAT";
                    const text2 = "MEESARAPEE";
                    title.innerHTML = '<span class="cursor-blink">|</span>'; // Start with cursor

                    let i = 0;
                    function typeWriter() {
                        // Remove cursor to add text
                        let currentText = title.innerHTML.replace('<span class="cursor-blink">|</span>', '');

                        if (i < text1.length) {
                            title.innerHTML = currentText + text1.charAt(i) + '<span class="cursor-blink">|</span>';
                            i++;
                            setTimeout(typeWriter, 100);
                        } else if (i === text1.length) {
                            title.innerHTML = currentText + '<br>' + '<span class="cursor-blink">|</span>';
                            i++;
                            setTimeout(typeWriter, 200);
                        } else if (i < text1.length + 1 + text2.length) {
                            title.innerHTML = currentText + text2.charAt(i - text1.length - 1) + '<span class="cursor-blink">|</span>';
                            i++;
                            setTimeout(typeWriter, 100);
                        }
                    }
                    typeWriter();
                }
            }, 500);
        }, 2500); // 2.5s duration
    } else {
        // No loader, just mark page as loaded
        document.body.classList.add('page-loaded');
    }
});

// ========================================
// Image Lightbox Functionality
// ========================================
(function () {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxDescription = lightbox.querySelector('.lightbox-description');
    const lightboxTags = lightbox.querySelector('.lightbox-tags');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentImages = [];
    let currentIndex = 0;

    // Project data for lightbox
    const projectData = {
        // Default data for images without specific data
        'default': {
            title: 'Artwork',
            description: 'ผลงานออกแบบกราฟิก',
            tags: ['Design']
        },
        // Hero grid images
        'IMG_5902-4': {
            title: 'Modern Visual Design',
            description: 'ผลงานออกแบบกราฟิกที่แสดงถึงความสวยงามและความทันสมัย',
            tags: ['Graphic Design', 'Visual Art']
        },
        'IMG_5900-2': {
            title: 'Creative Branding',
            description: 'โปรเจกต์แบรนด์ดิ้งที่ใช้สีสันสดใส สร้างความโดดเด่น',
            tags: ['Branding', 'Color Theory']
        },
        'IMG_3654-6': {
            title: 'Digital Illustration',
            description: 'ภาพประกอบดิจิทัลในสไตล์ศิลปะร่วมสมัย',
            tags: ['Illustration', 'Digital Art']
        },
        'IMG_3722-1': {
            title: 'UI/UX Design',
            description: 'การออกแบบ UI/UX ที่เน้นความเรียบง่ายและใช้งานง่าย',
            tags: ['UI Design', 'Minimalist']
        },
        // Works page images
        'image1': {
            title: 'Web Design',
            description: 'การออกแบบเว็บไซต์ที่ทันสมัยและตอบโจทย์ผู้ใช้',
            tags: ['Web Design', 'UI/UX']
        },
        'image2': {
            title: 'Graphic Art',
            description: 'ผลงานศิลปะดิจิทัลที่ผสมผสานความคิดสร้างสรรค์',
            tags: ['Digital Art', 'Illustration']
        },
        'image3': {
            title: 'Brand Identity',
            description: 'การออกแบบอัตลักษณ์องค์กร โลโก้และแนวคิด',
            tags: ['Branding', 'Logo Design']
        },
        'image4': {
            title: 'Poster Design',
            description: 'การออกแบบโปสเตอร์สำหรับงานศิลปะ',
            tags: ['Poster', 'Art Direction']
        },
        'stranger-things': {
            title: 'Lover',
            description: 'ผลงานศิลปะดิจิทัลที่ได้รับแรงบันดาลใจจากความรัก',
            tags: ['Digital Art', 'Fan Art']
        }
    };

    // Get image key from src
    function getImageKey(src) {
        const filename = src.split('/').pop().split('.')[0];
        return filename;
    }

    // Get project info
    function getProjectInfo(src) {
        const key = getImageKey(src);
        return projectData[key] || projectData['default'];
    }

    // Get all gallery images
    function getAllImages(selector) {
        // Default selector if not provided
        const sel = selector || '.grid-item img, .work-card img, .card-image img';
        const isHero = sel.includes('hero');

        const images = [];
        document.querySelectorAll(sel).forEach(img => {
            const info = getProjectInfo(img.src);
            images.push({
                src: img.src,
                alt: img.alt || 'Image',
                title: img.dataset.title || info.title,
                description: img.dataset.description || info.description,
                tags: img.dataset.tags ? img.dataset.tags.split(',') : info.tags,
                showInfo: !isHero // Hide info for hero images
            });
        });
        return images;
    }

    // Open lightbox
    function openLightbox(imgSrc, imgAlt, selector) {
        currentImages = getAllImages(selector);
        currentIndex = currentImages.findIndex(img => img.src === imgSrc);
        if (currentIndex === -1) currentIndex = 0;

        updateLightboxImage();
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Update lightbox image
    function updateLightboxImage() {
        if (currentImages.length === 0) return;

        const img = currentImages[currentIndex];
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;

        const infoPanel = lightbox.querySelector('.lightbox-info');

        // Check showInfo flag (undefined means show, false means hide)
        if (img.showInfo === false) {
            if (infoPanel) infoPanel.style.display = 'none';
            lightbox.classList.add('no-info');
        } else {
            if (infoPanel) infoPanel.style.display = 'flex';
            lightbox.classList.remove('no-info');

            // Update info panel
            lightboxTitle.textContent = img.title;
            lightboxDescription.textContent = img.description;

            // Update tags
            lightboxTags.innerHTML = '';
            if (img.tags && img.tags.length > 0) {
                img.tags.forEach(tag => {
                    const tagEl = document.createElement('span');
                    tagEl.className = 'lightbox-tag';
                    tagEl.textContent = tag.trim();
                    lightboxTags.appendChild(tagEl);
                });
            }
        }

        lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;

        // Hide nav buttons if only one image
        if (currentImages.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            lightboxCounter.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
            lightboxCounter.style.display = 'block';
        }
    }

    // Navigate to previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateLightboxImage();
    }

    // Navigate to next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateLightboxImage();
    }

    // Event Listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    // Click on backdrop to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });

    // Add click event to all gallery images
    document.querySelectorAll('.grid-item img, .work-card img, .card-image img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
            e.stopPropagation();

            let selector = '';
            if (img.closest('.hero-image-grid')) {
                selector = '.hero-image-grid .grid-item img';
            } else if (img.closest('.gallery') || img.closest('.work-card')) {
                // Works gallery images
                selector = '.work-card img, .card-image img';
                // Note: This relies on the structure. Ensure it selects only works.
                // Better to be safer if we are on works page or section.
                // Assuming works are in .gallery or .work-card containers not shared with hero.
            } else {
                // Fallback
                selector = '.grid-item img, .work-card img, .card-image img';
            }

            openLightbox(img.src, img.alt, selector);
        });
    });

    // Expose openLightbox globally
    window.openLightbox = openLightbox;
})();

// ========================================
// Page Transition
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Intercept all internal links
    const links = document.querySelectorAll('a[href^="./"], a[href^="../"], a[href^="/"], a[href*="html"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('href');

            // Ignore if key modifier is pressed (new tab) or target is # (anchor)
            if (e.metaKey || e.ctrlKey || target.startsWith('#') || target.includes('mailto:') || link.getAttribute('target') === '_blank') return;

            e.preventDefault();
            document.body.classList.add('page-fading-out');

            // Wait for animation to finish then navigate
            setTimeout(() => {
                window.location.href = target;
            }, 300); // 300ms matches CSS animation duration
        });
    });

    // Handle initial load (already handled by CSS animation)

    // Handle back/forward cache (bfcache)
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            document.body.classList.remove('page-fading-out');
        }
    });

    // ========================================
    // Active Navigation State (Scroll Spy)
    // ========================================
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const fromTop = window.scrollY + 150; // Offset margin for activation

        // Case 1: Index Page (Scroll Spy)
        if (currentPath === 'index.html') {
            let currentSection = '';

            // Find current section
            document.querySelectorAll('section').forEach(section => {
                if (section.offsetTop <= fromTop) {
                    currentSection = section.getAttribute('id');
                }
            });

            // Update links
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');

                // Highlight if href contains section ID (e.g. #about)
                if (currentSection && href.includes('#' + currentSection)) {
                    link.classList.add('active');
                }
                // Default to Home if no section or top of page
                else if (!currentSection && (href === 'index.html' || href === '#')) {
                    link.classList.add('active');
                }
            });
        }
        // Case 2: Other Pages (Static Highlight)
        else {
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === currentPath) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call

});
