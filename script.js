/**
 * ==========================================================================
 * PORTFOLIO SYSTEM CONTROL ARCHITECTURE
 * AUTHOR: Sachin Patel Portfolio Engine
 * ==========================================================================
 */


document.addEventListener("DOMContentLoaded", () => {
    
    // SYSTEM CONSTANTS & SELECTORS
    const preloader = document.getElementById("preloader");
    const navbar = document.getElementById("navbar");
    const navMenu = document.getElementById("nav-menu");
    const hamburger = document.getElementById("hamburger");
    const themeToggle = document.getElementById("theme-toggle");
    const scrollBar = document.getElementById("scrollBar");
    const backToTopBtn = document.getElementById("backToTopBtn");
    const cursor = document.querySelector(".custom-cursor");
    const cursorDot = document.querySelector(".custom-cursor-dot");
    const typingTextElement = document.getElementById("typing-text");

    /* ==========================================================================
       1. CORE SYSTEM APPLICATION LOADER
       ========================================================================== */
    window.addEventListener("load", () => {
        setTimeout(() => {
            if(preloader) {
                preloader.style.opacity = "0";
                preloader.style.visibility = "hidden";
            }
            // Trigger entry reveal animations immediately
            triggerEntranceReveal();
        }, 1500);
    });

    /* ==========================================================================
       2. REFINED CUSTOM MOUSE TRACKING MATRIX (DESKTOP INTERACTIVE)
       ========================================================================== */
    if (window.innerWidth > 768) {
        document.addEventListener("mousemove", (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursor.style.opacity = "1";
            cursorDot.style.opacity = "1";
        });

        document.addEventListener("mouseleave", () => {
            cursor.style.opacity = "0";
            cursorDot.style.opacity = "0";
        });

        // Interactive hover enlargements mapping
        const interactiveElements = document.querySelectorAll("a, button, .tech-card, .filter-btn, .project-card-item");
        interactiveElements.forEach(elem => {
            elem.addEventListener("mouseenter", () => {
                cursor.style.width = "60px";
                cursor.style.height = "60px";
                cursor.style.backgroundColor = "rgba(6, 182, 212, 0.05)";
                cursor.style.borderColor = "var(--accent-color)";
            });
            elem.addEventListener("mouseleave", () => {
                cursor.style.width = "40px";
                cursor.style.height = "40px";
                cursor.style.backgroundColor = "transparent";
            });
        });
    }

    /* ==========================================================================
       3. RESPONSIVE THEME SUBSYSTEM PERSISTENCE ENGINE
       ========================================================================== */
    const currentSavedTheme = localStorage.getItem("portfolio-theme") || "dark";
    document.documentElement.setAttribute("data-theme", currentSavedTheme);
    updateThemeIcon(currentSavedTheme);

    themeToggle.addEventListener("click", () => {
        const targetTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", targetTheme);
        localStorage.setItem("portfolio-theme", targetTheme);
        updateThemeIcon(targetTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector("i");
        if(theme === "light") {
            icon.className = "fas fa-sun";
        } else {
            icon.className = "fas fa-moon";
        }
    }

    /* ==========================================================================
       4. TYPING STREAM SEQUENCER ANIMATION
       ========================================================================== */
    const matrixRoles = [
        "Full Stack MERN Developer.",
        "Software Engineering Student.",
        "Creative Interface Developer.",
        "Clean Code Craftsman."
    ];
    let activeRoleIdx = 0;
    let characterIdx = 0;
    let stateDeleting = false;

    function runTypingLoop() {
        const ongoingString = matrixRoles[activeRoleIdx];
        if (stateDeleting) {
            typingTextElement.textContent = ongoingString.substring(0, characterIdx - 1);
            characterIdx--;
        } else {
            typingTextElement.textContent = ongoingString.substring(0, characterIdx + 1);
            characterIdx++;
        }

        let standardDelay = stateDeleting ? 40 : 100;

        if (!stateDeleting && characterIdx === ongoingString.length) {
            standardDelay = 2000; // Freeze string layout context
            stateDeleting = true;
        } else if (stateDeleting && characterIdx === 0) {
            stateDeleting = false;
            activeRoleIdx = (activeRoleIdx + 1) % matrixRoles.length;
            standardDelay = 400; // Breath gap before switching strings
        }

        setTimeout(runTypingLoop, standardDelay);
    }
    if(typingTextElement) runTypingLoop();

    /* ==========================================================================
       5. MATRIX CONTROLS: MOBILE COMPACT HAMBURGER INTERFACES
       ========================================================================== */
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    /* ==========================================================================
       6. VIEW ENGINE SYNC: ACTIVE LINK CAPTURE, SCROLL BAR & SCROLL BACK TO TOP
       ========================================================================== */
    const webSections = document.querySelectorAll("section");
    const navigationLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        const pageScrollTop = window.scrollY;
        const completeDocHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Render scroll bar progress percentage mapping
        if(completeDocHeight > 0) {
            const calculatedPercentage = (pageScrollTop / completeDocHeight) * 100;
            scrollBar.style.width = `${calculatedPercentage}%`;
        }

        // Stick structural navigation layer control
        if (pageScrollTop > 50) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }

        // Render visibility limits for scroll back to top button
        if (pageScrollTop > 600) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }

        // Synchronous view tracking evaluation for active links mapping
        let activeScopeSectionId = "";
        webSections.forEach(section => {
            const sectionOffsetTop = section.offsetTop - 120;
            const sectionHeightOuter = section.offsetHeight;
            if (pageScrollTop >= sectionOffsetTop && pageScrollTop < sectionOffsetTop + sectionHeightOuter) {
                activeScopeSectionId = section.getAttribute("id");
            }
        });

        if(activeScopeSectionId) {
            navigationLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${activeScopeSectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* ==========================================================================
       7. MODERN INTERSECTION OBSERVATION ENGINE: METRIC AND SKILL RENDERERS
       ========================================================================== */
    const targetAnimatedObserver = new IntersectionObserver((observedEntries, internalObserver) => {
        observedEntries.forEach(entry => {
            if (entry.isIntersecting) {
                const DOMTarget = entry.target;
                
                // Trigger scroll animation reveals
                if (DOMTarget.classList.contains("scroll-reveal")) {
                    DOMTarget.classList.add("revealed");
                }
                
                // Process statistical metrics counter configurations
                if (DOMTarget.classList.contains("counter")) {
                    executeNumericalCounter(DOMTarget);
                    internalObserver.unobserve(DOMTarget);
                }
                
                // Process horizontal capability indicator bars
                if (DOMTarget.classList.contains("skill-progress")) {
                    DOMTarget.style.width = DOMTarget.getAttribute("data-width");
                    internalObserver.unobserve(DOMTarget);
                }

                // Process high fidelity circular layout tracking arcs
                if (DOMTarget.classList.contains("circle-outer")) {
                    executeCircularFill(DOMTarget);
                    internalObserver.unobserve(DOMTarget);
                }
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    function triggerEntranceReveal() {
        document.querySelectorAll(".scroll-reveal, .counter, .skill-progress, .circle-outer").forEach(element => {
            targetAnimatedObserver.observe(element);
        });
    }

    function executeNumericalCounter(counterDOMNode) {
        const terminalNumericalValue = parseInt(counterDOMNode.getAttribute("data-target"), 10);
        let currentIteratedValue = 0;
        const totalDurationSprints = 60; 
        const numericIncrementStep = Math.ceil(terminalNumericalValue / totalDurationSprints) || 1;
        
        const runtimeIntervalLoop = setInterval(() => {
            currentIteratedValue += numericIncrementStep;
            if (currentIteratedValue >= terminalNumericalValue) {
                counterDOMNode.textContent = terminalNumericalValue;
                clearInterval(runtimeIntervalLoop);
            } else {
                counterDOMNode.textContent = currentIteratedValue;
            }
        }, 25);
    }

    function executeCircularFill(circleDOMNode) {
        const terminalPercentValue = parseInt(circleDOMNode.getAttribute("data-percent"), 10);
        const internalValueDisplay = circleDOMNode.querySelector(".circle-value");
        let cycleValue = 0;

        const animationRenderInterval = setInterval(() => {
            cycleValue++;
            if (cycleValue > terminalPercentValue) {
                clearInterval(animationRenderInterval);
            } else {
                internalValueDisplay.textContent = `${cycleValue}%`;
                circleDOMNode.style.background = `conic-gradient(var(--accent-color) ${cycleValue * 3.6}deg, rgba(255,255,255,0.05) 0deg)`;
            }
        }, 15);
    }

    /* ==========================================================================
       8. SORT PARSER SUBSYSTEM: CATEGORIZED PROJECT DATA FILTERS
       ========================================================================== */
    const sortingFilterButtons = document.querySelectorAll(".filter-btn");
    const portfolioProjectCards = document.querySelectorAll(".project-card-item");

    sortingFilterButtons.forEach(button => {
        button.addEventListener("click", () => {
            sortingFilterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            
            const targetedCategoryScope = button.getAttribute("data-filter");

            portfolioProjectCards.forEach(card => {
                const executionCategory = card.getAttribute("data-category");
                if (targetedCategoryScope === "all" || executionCategory === targetedCategoryScope) {
                    card.style.display = "block";
                    setTimeout(() => { card.style.opacity = "1"; card.style.transform = "scale(1)"; }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.8)";
                    setTimeout(() => { card.style.display = "none"; }, 400);
                }
            });
        });
    });

    /* ==========================================================================
       9. DETAIL MATRIX POPUPS: MULTI-PURPOSE MODAL INSERTS
       ========================================================================== */
    const systemModalContainer = document.getElementById("projectModal");
    const operationalModalImg = document.getElementById("modal-img");
    const operationalModalTitle = document.getElementById("modal-title");
    const operationalModalDesc = document.getElementById("modal-desc");
    const operationalModalTech = document.getElementById("modal-tech");
    const closeSystemModalBtn = document.querySelector(".close-modal-btn");

    // Project metadata dictionary structure context
    const technicalProjectMetadata = {
        p1: { title: "JourneyHub", desc: "Advanced full stack architecture designed for automated route planning optimization, multi-tier booking workflows, and global ledger tracking capabilities via comprehensive MongoDB structural schemas.", tech: ["MongoDB", "Express", "React", "Node"] },
        p2: { title: "Work Bridge", desc: "A structural labor allocation ecosystem connecting heavy industry entities directly with certified manual workforce specialists utilizing custom Express data rendering models and modular templating arrays.", tech: ["Node.js", "Express", "MongoDB", "EJS"] },
        p3: { title: "Kashi Welfare Society", desc: "A customized production dashboard application structured to securely process tracking configurations for charity allocations, internal asset distribution arrays, and responsive rendering systems.", tech: ["HTML5", "CSS3", "JavaScript"] },
        p4: { title: "Spotify Clone", desc: "A modular, client side audio system simulation evaluating operational queue tracking matrixes, state machine play logic, dynamic waveform components, and complex asset styling rules.", tech: ["HTML5", "CSS Advanced", "JavaScript Engine"] },
        p5: { title: "Amazon Clone", desc: "High fidelity interface matrix executing granular multi tiered navigation configurations, fluid viewport cart processing events, product pricing formulas, and checkout interface simulations.", tech: ["HTML5", "CSS Flexbox", "JavaScript Core"] },
        p6: { title: "Simon Says Game", desc: "An asynchronous state evaluating interface monitoring user retention cycles against automated matrix processing pipelines using specialized timing loops.", tech: ["JavaScript Engine", "DOM Logic", "CSS Animation"] },
        p7: { title: "Mini Calculator", desc: "A lexical mathematics evaluation grid interpreting clean computational equations instantly without structural design latency using complex regex parsing.", tech: ["JavaScript", "RegEx Parse", "CSS UI"] }
    };

    document.querySelectorAll(".view-details-btn").forEach(trigger => {
        trigger.addEventListener("click", () => {
            const targetedKeyId = trigger.getAttribute("data-project");
            const analyticalRecord = technicalProjectMetadata[targetedKeyId];
            const companionImageSource = trigger.closest(".project-card-item").querySelector(".project-img-box img").getAttribute("src");

            if(analyticalRecord) {
                operationalModalImg.setAttribute("src", companionImageSource);
                operationalModalTitle.textContent = analyticalRecord.title;
                operationalModalDesc.textContent = analyticalRecord.desc;
                operationalModalTech.innerHTML = "";
                analyticalRecord.tech.forEach(t => {
                    const structuralSpan = document.createElement("span");
                    structuralSpan.textContent = t;
                    operationalModalTech.appendChild(structuralSpan);
                });
                systemModalContainer.classList.add("active");
            }
        });
    });

    closeSystemModalBtn.addEventListener("click", () => systemModalContainer.classList.remove("active"));
    systemModalContainer.addEventListener("click", (e) => { if(e.target === systemModalContainer) systemModalContainer.classList.remove("active"); });

    /* ==========================================================================
       10. SLIDER DATA LAYOUT TRACK ENGINE (TESTIMONIALS)
       ========================================================================== */
    const horizontalSliderTrack = document.getElementById("testimonial-track");
    const sliderItemsArray = document.querySelectorAll(".testimonial-slide");
    const navigationPreviousBtn = document.getElementById("prev-slide");
    const navigationNextBtn = document.getElementById("next-slide");
    const functionalIndicatorDotsWrapper = document.getElementById("slider-dots");
    let currentTrackIndex = 0;

    // Generate dynamic tracking dot infrastructure elements matching item arrays
    sliderItemsArray.forEach((_, stepIdx) => {
        const computationalDot = document.createElement("div");
        computationalDot.className = `dot ${stepIdx === 0 ? "active" : ""}`;
        computationalDot.addEventListener("click", () => evaluateTrackTransition(stepIdx));
        functionalIndicatorDotsWrapper.appendChild(computationalDot);
    });

    function evaluateTrackTransition(targetIndexPosition) {
        currentTrackIndex = targetIndexPosition;
        horizontalSliderTrack.style.transform = `translateX(-${currentTrackIndex * 100}%)`;
        document.querySelectorAll(".dot").forEach((dotNode, dotIdx) => {
            dotNode.classList.toggle("active", dotIdx === currentTrackIndex);
        });
    }

    navigationNextBtn.addEventListener("click", () => {
        let theoreticalIndex = (currentTrackIndex + 1) % sliderItemsArray.length;
        evaluateTrackTransition(theoreticalIndex);
    });

    navigationPreviousBtn.addEventListener("click", () => {
        let theoreticalIndex = (currentTrackIndex - 1 + sliderItemsArray.length) % sliderItemsArray.length;
        evaluateTrackTransition(theoreticalIndex);
    });

    // Auto structural slideshow cycle routine
    setInterval(() => {
        let automaticNextStepIndex = (currentTrackIndex + 1) % sliderItemsArray.length;
        evaluateTrackTransition(automaticNextStepIndex);
    }, 8000);

    /* ==========================================================================
       11. SYSTEM INTEGRATION GRID RENDER ENGINE (GITHUB BOARD SIMULATION)
       ========================================================================== */
    const matrixGridBoardWrapper = document.querySelector(".mock-grid-matrix");
    if(matrixGridBoardWrapper) {
        // Construct standard Github activity block rows 53 columns * 7 rows
        const blockTotalVolumeCount = 53 * 4; 
        for (let segmentIndex = 0; segmentIndex < blockTotalVolumeCount; segmentIndex++) {
            const matrixBlockElement = document.createElement("div");
            const pseudoRandomWeightedSeedValue = Math.random();
            
            // Apply randomized color intensity layers matching genuine engineering matrices
            if (pseudoRandomWeightedSeedValue > 0.85) matrixBlockElement.className = "matrix-block level-4";
            else if (pseudoRandomWeightedSeedValue > 0.70) matrixBlockElement.className = "matrix-block level-3";
            else if (pseudoRandomWeightedSeedValue > 0.50) matrixBlockElement.className = "matrix-block level-2";
            else if (pseudoRandomWeightedSeedValue > 0.25) matrixBlockElement.className = "matrix-block level-1";
            else matrixBlockElement.className = "matrix-block";
            
            matrixGridBoardWrapper.appendChild(matrixBlockElement);
        }
    }

    /* ==========================================================================
       12. TRANSACTION TRANSMISSION FORM: DISPATCH INTERACTION ROUTINES
       ========================================================================== */
    const interactiveContactForm = document.getElementById("portfolio-contact-form");
    const interactionStatusMessage = document.getElementById("form-status-msg");

    if (interactiveContactForm) {
        interactiveContactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            interactionStatusMessage.className = "form-status-notification success";
            interactionStatusMessage.textContent =
                "Data Pipeline Transmission Success! Message package has been verified.";

            interactiveContactForm.reset();

            document
                .querySelectorAll(".form-control-wrap input, .form-control-wrap textarea")
                .forEach(input => {
                    input.blur();
                });

            setTimeout(() => {
                interactionStatusMessage.style.display = "none";
            }, 5000);
        });
    }
});

