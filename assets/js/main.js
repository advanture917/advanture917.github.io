/**
 * Modern GitHub Pages Blog JavaScript
 * Enhanced functionality with theme switching, search, animations, and more
 */

(function() {
    'use strict';

    // Global state
    let posts = [];
    let isSearchLoaded = false;

    // DOM Content Loaded Event
    document.addEventListener('DOMContentLoaded', function() {
        initializeTheme();
        initializeNavigation();
        initializeSearch();
        initializeCodeHighlighting();
        initializeScrollToTop();
        initializeLazyLoading();
        initializeAnimations();
        initializeReadingProgress();
        loadPostsData();
    });

    /**
     * Enhanced Theme Management
     */
    function initializeTheme() {
        const themeToggle = document.querySelector('#theme-toggle');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (!themeToggle) return;
        
        // Load saved theme or use system preference
        const savedTheme = localStorage.getItem('theme') || 
                          (prefersDark.matches ? 'dark' : 'light');
        
        setTheme(savedTheme);
        
        // Add click event listener
        themeToggle.addEventListener('click', toggleTheme);
        
        // Listen for system theme changes
        prefersDark.addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const themeIcon = document.querySelector('#theme-toggle i');
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        // Dispatch custom event for theme change
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        
        // Add a subtle animation feedback
        const toggle = document.querySelector('#theme-toggle');
        if (toggle) {
            toggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                toggle.style.transform = 'scale(1)';
            }, 150);
        }
    }

    /**
     * Enhanced Navigation
     */
    function initializeNavigation() {
        const mobileToggle = document.querySelector('#mobile-nav-toggle');
        const navLinks = document.querySelector('#nav-links');
        
        if (mobileToggle && navLinks) {
            mobileToggle.addEventListener('click', function() {
                const isActive = navLinks.classList.contains('active');
                navLinks.classList.toggle('active', !isActive);
                
                // Update icon
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.className = isActive ? 'fas fa-bars' : 'fas fa-times';
                }
                
                // Update aria-expanded
                mobileToggle.setAttribute('aria-expanded', !isActive);
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navLinks && mobileToggle && 
                !navLinks.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.site-header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Highlight active nav link
        highlightActiveNavLink();
    }
    
    function highlightActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.page-link');
        
        navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentPath || 
                (currentPath !== '/' && linkPath !== '/' && currentPath.startsWith(linkPath))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    /**
     * Enhanced Search Functionality
     */
    function initializeSearch() {
        const searchInput = document.querySelector('#search-input');
        const searchResults = document.querySelector('#search-results');
        
        if (!searchInput) return;

        searchInput.addEventListener('input', debounce(function() {
            const query = this.value.trim().toLowerCase();
            
            if (query.length < 2) {
                hideSearchResults();
                return;
            }

            const results = searchPosts(posts, query);
            displaySearchResults(results);
        }, 300));

        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (searchInput && searchResults &&
                !searchInput.contains(e.target) && 
                !searchResults.contains(e.target)) {
                hideSearchResults();
            }
        });
        
        // Handle escape key
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hideSearchResults();
                this.blur();
            }
        });
    }

    function loadPostsData() {
        // In a real Jekyll site, you would generate a JSON file during build
        // For now, we'll extract post data from the current page
        const postElements = document.querySelectorAll('.post-list li');
        const extractedPosts = [];
        
        postElements.forEach(function(element) {
            const titleElement = element.querySelector('.post-link');
            const metaElement = element.querySelector('.post-meta');
            const excerptElement = element.querySelector('.post-excerpt');
            const tagsElements = element.querySelectorAll('.post-tag');
            
            if (titleElement) {
                const post = {
                    title: titleElement.textContent.trim(),
                    url: titleElement.getAttribute('href'),
                    excerpt: excerptElement ? excerptElement.textContent.trim() : '',
                    date: metaElement ? metaElement.textContent.trim() : '',
                    tags: Array.from(tagsElements).map(tag => tag.textContent.trim())
                };
                extractedPosts.push(post);
            }
        });
        
        posts = extractedPosts;
        isSearchLoaded = true;
    }

    function searchPosts(posts, query) {
        return posts.filter(function(post) {
            const searchableText = [
                post.title,
                post.excerpt,
                ...post.tags
            ].join(' ').toLowerCase();
            
            return searchableText.includes(query);
        }).slice(0, 5); // Limit to 5 results
    }

    function displaySearchResults(results) {
        const searchResults = document.querySelector('#search-results');
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = '<p class="no-results">No results found</p>';
        } else {
            searchResults.innerHTML = results.map(function(post) {
                return `
                    <div class="search-result">
                        <h3><a href="${post.url}">${post.title}</a></h3>
                        <p class="result-excerpt">${post.excerpt.substring(0, 150)}${post.excerpt.length > 150 ? '...' : ''}</p>
                        <small class="result-meta">${post.date}</small>
                    </div>
                `;
            }).join('');
        }

        searchResults.style.display = 'block';
        searchResults.setAttribute('aria-hidden', 'false');
    }

    function hideSearchResults() {
        const searchResults = document.querySelector('#search-results');
        if (searchResults) {
            searchResults.style.display = 'none';
            searchResults.setAttribute('aria-hidden', 'true');
        }
    }

    /**
     * Enhanced Code Highlighting
     */
    function initializeCodeHighlighting() {
        // Add copy button to code blocks
        document.querySelectorAll('pre code').forEach(function(codeBlock) {
            const pre = codeBlock.parentElement;
            const button = document.createElement('button');
            button.className = 'copy-button';
            button.innerHTML = '<i class="fas fa-copy"></i> Copy';
            button.setAttribute('aria-label', 'Copy code to clipboard');

            button.addEventListener('click', function() {
                copyToClipboard(codeBlock.textContent);
                
                // Visual feedback
                const originalContent = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                button.classList.add('copied');
                
                setTimeout(() => {
                    button.innerHTML = originalContent;
                    button.classList.remove('copied');
                }, 2000);
            });

            if (pre.style.position !== 'relative') {
                pre.style.position = 'relative';
            }
            pre.appendChild(button);
        });
        
        // Add language labels
        document.querySelectorAll('pre code[class*="language-"], pre code[class*="highlight-"]').forEach(function(codeBlock) {
            const className = codeBlock.className;
            const languageMatch = className.match(/(?:language-|highlight-)([\w-]+)/);
            
            if (languageMatch) {
                const language = languageMatch[1];
                const label = document.createElement('div');
                label.className = 'code-language-label';
                label.textContent = language.toUpperCase();
                label.style.cssText = `
                    position: absolute;
                    top: 0.5rem;
                    left: 1rem;
                    background: var(--primary-color);
                    color: white;
                    padding: 0.25rem 0.5rem;
                    border-radius: var(--border-radius-sm);
                    font-size: 0.75rem;
                    font-weight: 600;
                    z-index: 1;
                `;
                codeBlock.parentElement.appendChild(label);
            }
        });
    }

    function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).catch(err => {
                console.error('Failed to copy text: ', err);
                fallbackCopyTextToClipboard(text);
            });
        } else {
            fallbackCopyTextToClipboard(text);
        }
    }
    
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        
        document.body.removeChild(textArea);
    }

    /**
     * Enhanced Scroll to Top Button
     */
    function initializeScrollToTop() {
        const scrollButton = document.querySelector('#scroll-to-top');
        
        if (!scrollButton) {
            createScrollToTopButton();
        }
        
        const button = document.querySelector('#scroll-to-top');
        if (!button) return;
        
        let ticking = false;
        
        function updateScrollButton() {
            if (window.pageYOffset > 300) {
                button.classList.add('visible');
            } else {
                button.classList.remove('visible');
            }
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateScrollButton);
                ticking = true;
            }
        });

        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Add visual feedback
            button.style.transform = 'scale(0.9)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    }

    function createScrollToTopButton() {
        const button = document.createElement('button');
        button.id = 'scroll-to-top';
        button.className = 'scroll-to-top';
        button.innerHTML = '↑';
        button.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(button);
        return button;
    }

    /**
     * Enhanced Lazy Loading for Images
     */
    function initializeLazyLoading() {
        const images = document.querySelectorAll('img[data-src], img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        
                        img.classList.add('fade-in');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            images.forEach(function(img) {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(function(img) {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.classList.add('fade-in');
            });
        }
    }

    /**
     * Enhanced Animations with Intersection Observer
     */
    function initializeAnimations() {
        const animateElements = document.querySelectorAll('.post-list li, .post, .featured-section, .stats-section');
        
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry, index) {
                    if (entry.isIntersecting) {
                        // Staggered animation delay
                        setTimeout(() => {
                            entry.target.classList.add('fade-in');
                        }, index * 100);
                        
                        animationObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animateElements.forEach(function(element) {
                animationObserver.observe(element);
            });
        } else {
            // Fallback: add class immediately
            animateElements.forEach(function(element) {
                element.classList.add('fade-in');
            });
        }
        
        // Initialize other micro-animations
        initializeMicroAnimations();
    }
    
    function initializeMicroAnimations() {
        // Button hover effects
        document.querySelectorAll('.btn, .post-tag, .social-share-btn').forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Post list item hover effects
        document.querySelectorAll('.post-list li').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    /**
     * Reading Progress Indicator
     */
    function initializeReadingProgress() {
        const progressBar = document.querySelector('#reading-progress');
        
        if (!progressBar) {
            createReadingProgressBar();
        }
        
        const progress = document.querySelector('#reading-progress');
        if (!progress) return;
        
        let ticking = false;
        
        function updateReadingProgress() {
            const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progress.style.width = Math.min(Math.max(scrolled, 0), 100) + '%';
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateReadingProgress);
                ticking = true;
            }
        });
    }
    
    function createReadingProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.id = 'reading-progress';
        progressBar.className = 'reading-progress';
        document.body.appendChild(progressBar);
        return progressBar;
    }

    /**
     * Utility Functions
     */
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(this, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(this, args);
        };
    }
    
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Performance Monitoring
     */
    function initializePerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('web-vital' in window) {
            import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
                onCLS(console.log);
                onFID(console.log);
                onFCP(console.log);
                onLCP(console.log);
                onTTFB(console.log);
            });
        }
    }

    /**
     * Accessibility Enhancements
     */
    function initializeAccessibility() {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            left: -10000px;
            top: auto;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.cssText = `
                position: absolute;
                left: 6px;
                top: 7px;
                z-index: 999999;
                padding: 8px 16px;
                background: #000;
                color: #fff;
                text-decoration: none;
                border-radius: 3px;
            `;
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.cssText = `
                position: absolute;
                left: -10000px;
                top: auto;
                width: 1px;
                height: 1px;
                overflow: hidden;
            `;
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main content ID if not exists
        const mainContent = document.querySelector('main, .page-content');
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
        }
        
        // Enhanced keyboard navigation
        document.addEventListener('keydown', function(e) {
            // ESC key to close modals/overlays
            if (e.key === 'Escape') {
                hideSearchResults();
                
                const mobileNav = document.querySelector('#nav-links');
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    const toggle = document.querySelector('#mobile-nav-toggle');
                    if (toggle) {
                        const icon = toggle.querySelector('i');
                        if (icon) icon.className = 'fas fa-bars';
                        toggle.setAttribute('aria-expanded', 'false');
                        toggle.focus();
                    }
                }
            }
        });
    }
    /**
     * Additional initialization
     */
    
    // Initialize reading progress on post pages
    if (document.querySelector('.post-content')) {
        document.addEventListener('DOMContentLoaded', function() {
            initializeReadingProgress();
        });
    }
    
    // Initialize accessibility enhancements
    document.addEventListener('DOMContentLoaded', function() {
        initializeAccessibility();
    });
    
    // Initialize performance monitoring in production
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        document.addEventListener('DOMContentLoaded', function() {
            initializePerformanceMonitoring();
        });
    }
    
    // Export some functions for external use
    window.BlogJS = {
        setTheme: setTheme,
        toggleTheme: toggleTheme,
        searchPosts: searchPosts,
        debounce: debounce,
        throttle: throttle
    };

})();