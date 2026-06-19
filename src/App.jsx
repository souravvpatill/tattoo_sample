// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import InkReveal from './InkReveal';
import CircularGallery from './CircularGallery';

// --- PRODUCTION COMPONENT MANIFEST ---
// This file orchestrates:
// 1. Interactive Navigation Overlay with scroll-direction sensing hide/reveal mechanics
// 2. Multi-stage Inertia Tracking Pointer System (Fluid Cursor Field)
// 3. Typography Line-Sharding and Word-Spitting Engines
// 4. Asymmetrical Structural Panes & Glassmorphic Content Grids
// 5. Interactive FAQ Dossier Accordions using AnimatePresence Layout updates

// --- ENGINE DATA ARRAYS ---
const tattooCollection = [
  { image: '/assets/tat1.png', text: 'Obsidian Realism' },
  { image: '/assets/tat2.png', text: 'Neo-Traditional' },
  { image: '/assets/tat3.png', text: 'Sacred Geometry' },
  { image: '/assets/tat4.png', text: 'Japanese Irezumi' },
  { image: '/assets/tat5.png', text: 'Dark Cyberpunk' },
  { image: '/assets/tat6.png', text: 'Fine Line Minimal' },
  { image: '/assets/tat7.png', text: 'Biomechanical' },
  { image: '/assets/tat8.png', text: 'Classic Blackwork' },
];

const studioStyles = [
  { id: "01", title: "Obsidian Realism", tag: "HYPER-CONTRAST", desc: "High-contrast, hyper-realistic blackwork engineered to command absolute physical presence and structural durability." },
  { id: "02", title: "Sacred Geometry", tag: "MATHEMATICAL", desc: "Precision line-work mapping ancient architectural patterns and mathematical perfection directly onto human anatomy." },
  { id: "03", title: "Japanese Irezumi", tag: "CHRONICLE FLUID", desc: "Traditional flow and grand mythological storytelling tailored meticulously to the natural movement of muscle groups." },
  { id: "04", title: "Fine Line Minimal", tag: "SINGLE-NEEDLE", desc: "Delicate, single-needle elegance for subtle, sharp, and sophisticated placements with microscopic accuracy." }
];

const faqs = [
  { q: "How do I book a formal consultation?", a: "Submit our encrypted digital dossier mapping your design conceptualization, target dimensional placement, and anatomical reference photography. Our review board coordinates scheduling timelines based on project compatibility." },
  { q: "What is the baseline investment structure?", a: "Project evaluations scale directly with conceptual intricacy and dimensional complexity. Bespoke commissions are structured around flat day-rate tiers. A non-refundable retainer is required to authorize calendar placement." },
  { q: "Do you execute anatomical cover-up designs?", a: "Yes, though cover-up procedures require an exhaustive physiological structural analysis. Pre-treatment laser alteration cycles may be mandated during the initial diagnostic consultation phase to guarantee premium clarity." },
  { q: "How should I prepare for a multi-hour session?", a: "Optimize systemic hydration 48 hours prior. Secure a complete 8-hour sleep cycle, ingest a high-protein caloric intake 2 hours before arrival, and ensure the target anatomical field is free of acute dermal irritation." }
];

const navigationLinks = [
  { label: "EXHIBITION", target: "exhibition" },
  { label: "PHILOSOPHY", target: "philosophy" },
  { label: "SPECIALIZATIONS", target: "specializations" },
  { label: "PROCESS", target: "process" },
  { label: "DOSSIER", target: "dossier" }
];

// --- CORE ANIMATION CURVES ---
const springTransition = { type: "spring", stiffness: 220, damping: 28, mass: 0.6 };
const ultraSmoothTransition = { duration: 0.85, ease: [0.16, 1, 0.3, 1] };

const globalFadeUp = {
  hidden: { opacity: 0, y: 50, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1, transition: ultraSmoothTransition }
};

// --- SUBSYSTEM COMPONENTS ---

// 1. Text Splitter Utility for Premium Typography Movement
const ShardText = ({ text, delayOffset = 0, style, customVariants }) => {
  const words = text.split(" ");
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: delayOffset } }
  };
  
  const wordVariants = customVariants || {
    hidden: { opacity: 0, y: "110%", rotate: 3 },
    visible: { opacity: 1, y: "0%", rotate: 0, transition: { type: "spring", stiffness: 140, damping: 14 } }
  };

  return (
    <motion.span style={{ display: 'inline-flex', flexWrap: 'wrap', overflow: 'hidden', verticalAlign: 'bottom' }} variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10px" }}>
      {words.map((word, index) => (
        <span key={index} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.28em', paddingBottom: '0.05em' }}>
          <motion.span style={{ ...style, display: 'inline-block', transformOrigin: "left bottom" }} variants={wordVariants}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

// 2. High-Inertia Dual Stage Pointer Subsystem
const IntelligenceCursor = ({ isMobile }) => {
  const pointerRef = useRef({ x: 0, y: 0 });
  const ringRef = useRef({ x: 0, y: 0 });
  const [pointerState, setPointerState] = useState({ scale: 1, active: false });

  useEffect(() => {
    if (isMobile) return;
    
    const movePointer = (e) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
      
      const observedTarget = e.target;
      const isClickable = window.getComputedStyle(observedTarget).cursor === 'pointer' || 
                          observedTarget.tagName === 'BUTTON' || 
                          observedTarget.closest('a') ||
                          observedTarget.closest('[onClick]');
      
      setPointerState({
        scale: isClickable ? 2.2 : 1,
        active: isClickable
      });
    };

    window.addEventListener("mousemove", movePointer);
    return () => window.removeEventListener("mousemove", movePointer);
  }, [isMobile]);

  const dotX = useSpring(0, { stiffness: 600, damping: 40 });
  const dotY = useSpring(0, { stiffness: 600, damping: 40 });
  const ringX = useSpring(0, { stiffness: 120, damping: 22, mass: 0.8 });
  const ringY = useSpring(0, { stiffness: 120, damping: 22, mass: 0.8 });

  useEffect(() => {
    if (isMobile) return;
    let animationFrameId;

    const tick = () => {
      dotX.set(pointerRef.current.x - 4);
      dotY.set(pointerRef.current.y - 4);
      ringX.set(pointerRef.current.x - 18);
      ringY.set(pointerRef.current.y - 18);
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isMobile, dotX, dotY, ringX, ringY]);

  if (isMobile) return null;

  return (
    <>
      <motion.div style={{ ...styles.cursorCore, x: dotX, y: dotY }} />
      <motion.div 
        style={{ ...styles.cursorRing, x: ringX, y: ringY }}
        animate={{
          scale: pointerState.scale,
          borderColor: pointerState.active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)",
          backgroundColor: pointerState.active ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0)"
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
      />
    </>
  );
};

// --- APP ARCHITECTURE ENGINE ---
function App() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [navigationVisible, setNavigationVisible] = useState(true);
  const containerScrollRef = useRef(null);
  const previousScrollY = useRef(0);

  // Scroll Metrics Hook Setup
  const { scrollYProgress } = useScroll({ container: containerScrollRef });
  const linearProgressWidth = useSpring(scrollYProgress, { stiffness: 160, damping: 35 });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Structural Scroll Velocity Monitoring & Hide/Reveal Logic for UI Navigation
  const monitorScrollVector = (e) => {
    const currentScrollPosition = e.target.scrollTop;
    const trackingDelta = currentScrollPosition - previousScrollY.current;

    if (trackingDelta > 15 && currentScrollPosition > 100) {
      setNavigationVisible(false); // Scrolling downward - hide navbar
    } else if (trackingDelta < -10 || currentScrollPosition <= 50) {
      setNavigationVisible(true);  // Scrolling upward - show navbar
    }
    previousScrollY.current = currentScrollPosition;
  };

  const executeJumpToSection = (elementId) => {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={styles.siteWrapper}>
      <IntelligenceCursor isMobile={isMobile} />
      
      {/* Dynamic Scroll Matrix Progress Tracker */}
      <motion.div style={{ ...styles.topProgressBar, scaleX: linearProgressWidth }} />
      
      {/* High-Fidelity Tactical Micro-Grain Mask */}
      <div style={styles.filmGrainOverlay}></div>

      {/* INTELLIGENT FLOATING NAVIGATION OVERLAY */}
      <motion.header 
        style={styles.floatingHeader}
        animate={{ y: navigationVisible ? 0 : -100, opacity: navigationVisible ? 1 : 0 }}
        transition={springTransition}
      >
        <div style={styles.headerInnerContainer}>
          <motion.div style={styles.headerBranding} onClick={() => containerScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })} whileHover={{ scale: 1.02 }}>
            SACRED<span style={{ color: '#888', fontWeight: 300 }}>INK</span>
          </motion.div>
          
          {!isMobile && (
            <nav style={styles.navigationLinkMatrix}>
              {navigationLinks.map((link, i) => (
                <motion.button 
                  key={i} 
                  style={styles.navLinkItem} 
                  onClick={() => executeJumpToSection(link.target)}
                  whileHover={{ y: -2, color: "#ffffff" }}
                >
                  {link.label}
                  <motion.span style={styles.navLinkUnderline} layoutId="navUnderline" className="underline-element" initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} />
                </motion.button>
              ))}
            </nav>
          )}

          <motion.button 
            style={styles.headerActionCompactButton} 
            onClick={() => executeJumpToSection('dossier')}
            whileHover={{ backgroundColor: '#ffffff', color: '#000000', borderColor: '#ffffff' }}
            whileTap={{ scale: 0.97 }}
          >
            RESERVE SESSION
          </motion.button>
        </div>
      </motion.header>

      <InkReveal>
        <div id="master-scroll-viewport" ref={containerScrollRef} onScroll={monitorScrollVector} style={styles.scrollContainer}>
          
          {/* ================= HERO SECTION ================= */}
          <section id="hero" style={styles.heroSection}>
            <div style={styles.heroAssetBackgroundMask} />
            <div style={styles.heroOverlayTint} />
            
            <div style={styles.heroContentContainer}>
              <div style={styles.heroDataMetricsBadge}>
                <span style={styles.badgePulseIndicator}></span>
                <p style={styles.badgeMetaText}>BESPOKE ATELIER / CHRONICLE EDITION 2026</p>
              </div>

              <h1 style={{ ...styles.heroPrimaryTitle, fontSize: isMobile ? '2.8rem' : '6.5rem', letterSpacing: isMobile ? '8px' : '22px' }}>
                <ShardText text="SACRED INK" delayOffset={3.6} />
              </h1>

              <motion.div 
                style={styles.heroStructuralDividerLine} 
                initial={{ width: 0, opacity: 0 }} 
                animate={{ width: isMobile ? "100px" : "240px", opacity: 0.4 }} 
                transition={{ delay: 4.3, duration: 1.4, ease: "easeInOut" }} 
              />

              <motion.p 
                style={{ ...styles.heroSecondaryTypography, fontSize: isMobile ? '0.85rem' : '1.15rem' }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.8, duration: 0.8 }}
              >
                CUSTOM EMBODIMENT. PERMANENT BIOMECHANICAL LEGACY.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 5.1, duration: 0.6 }}
                style={{ marginTop: '20px' }}
              >
                <motion.button 
                  style={styles.heroPrimaryCallToAction}
                  onClick={() => executeJumpToSection('exhibition')}
                  whileHover={{ scale: 1.04, backgroundColor: "#ffffff", color: "#000000", boxShadow: "0px 12px 40px rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.96 }}
                >
                  ENTER THE STUDIO ARCHIVE
                </motion.button>
              </motion.div>
            </div>

            <div style={styles.heroGeometricAnchorCoordinates}>
              <p style={styles.coordinateTypography}>LAT: 40.7128° N // LONG: 74.0060° W</p>
            </div>
          </section>


          {/* ================= THE EXHIBITION ================= */}
          <section id="exhibition" style={{ ...styles.darkCanvasSection, padding: isMobile ? '80px 0' : '160px 0' }}>
            <motion.div 
              style={styles.globalGridContainer}
              variants={globalFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10px" }}
            >
              <div style={styles.sectionHeaderClusterAlignment}>
                <p style={styles.structuralSectionNumericalCounter}>METRIC 01 // GALLERY</p>
                <h2 style={{ ...styles.sectionMainTitleTypography, fontSize: isMobile ? '2rem' : '3.8rem' }}>THE EXHIBITION</h2>
                <div style={styles.sectionHeadingAccentLine} />
                <p style={styles.sectionContextualSubheading}>DRAG MOUSE OR SWIPE SCANNING MATRIX TO ROTATE COLLECTIVE WORKS</p>
              </div>
              
              <div style={{ ...styles.exhibitionInteractiveGalleryWrapper, height: isMobile ? '420px' : '680px' }}>
                <CircularGallery 
                  items={tattooCollection} 
                  bend={isMobile ? 1.0 : 3.2}              
                  textColor="#ffffff"      
                  borderRadius={0.04}      
                  scrollSpeed={isMobile ? 0.12 : 0.35}       
                  scrollEase={0.05}        
                  fontUrl="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
                  font={isMobile ? "bold 13px Orbitron" : "bold 24px Orbitron"} 
                />
              </div>
            </motion.div>
          </section>


          {/* ================= ARTIST & PHILOSOPHY ================= */}
          <section id="philosophy" style={{ ...styles.lightCanvasSection, padding: isMobile ? '80px 0' : '160px 0' }}>
            <div style={styles.globalGridContainer}>
              <div style={{ ...styles.splitLayoutAsymmetricPane, flexDirection: isMobile ? 'column' : 'row' }}>
                
                <motion.div 
                  style={styles.philosophyMediaFrameContainer}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div style={styles.mediaFrameGlintAccent} />
                  <motion.img 
                    src="/assets/tat6.png" 
                    alt="Obsidian Needle Art Canvas" 
                    style={styles.philosophyPrimaryImage} 
                    whileHover={{ scale: 1.04, filter: "grayscale(30%) contrast(125%)" }}
                    transition={{ duration: 0.6 }}
                  />
                  <div style={styles.mediaFrameAbsoluteCornerBoundingBox} />
                </motion.div>

                <div style={{ ...styles.philosophyTextualContentColumn, textAlign: isMobile ? 'center' : 'left' }}>
                  <p style={styles.structuralSectionNumericalCounter}>METRIC 02 // LAB CORE</p>
                  <h2 style={{ ...styles.sectionMainTitleTypography, fontSize: isMobile ? '2rem' : '3.5rem' }}>
                    <ShardText text="FORM & TEXTURE" />
                  </h2>
                  <div style={isMobile ? styles.sectionHeadingAccentLine : styles.sectionHeadingLeftAlignedAccentLine} />
                  
                  <motion.p 
                    style={styles.philosophyCoreParagraphBody}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    Tattoos transcend superficial ink. They map a raw, calculated mathematical collaboration directly onto living fiber. With a decade operating at the absolute razor edge of needle physics, our dedicated studio structure alters human flesh with structural flow and contrasting dynamic blackworks.
                  </motion.p>
                  
                  <motion.p 
                    style={styles.philosophyCoreParagraphBody}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    Every composition is mathematically rendered from zero state foundations. No flash designs tolerated. No sequential replicas authorized. We execute designs within an architectural, clinical zone where personal narratives solidify into timeless, permanent human form.
                  </motion.p>

                  <motion.div style={styles.signatureClusterBlock} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    <div style={styles.signatureHorizontalRule} />
                    <p style={styles.signatureMonospaceLabel}>SACRED INK DIRECTING BOARD // FOUNDRY CHIEF</p>
                  </motion.div>
                </div>

              </div>
            </div>
          </section>


          {/* ================= STYLES & SPECIALIZATIONS ================= */}
          <section id="specializations" style={{ ...styles.darkCanvasSection, padding: isMobile ? '80px 0' : '160px 0' }}>
            <div style={styles.globalGridContainer}>
              
              <motion.div style={styles.sectionHeaderClusterAlignment} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={globalFadeUp}>
                <p style={styles.structuralSectionNumericalCounter}>METRIC 03 // DISCIPLINE</p>
                <h2 style={{ ...styles.sectionMainTitleTypography, fontSize: isMobile ? '2rem' : '3.8rem' }}>SPECIALIZATIONS</h2>
                <div style={styles.sectionHeadingAccentLine} />
              </motion.div>

              <motion.div 
                style={{ ...styles.specializationsComplexMatrixGrid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
              >
                {studioStyles.map((style, index) => (
                  <motion.div 
                    key={index} 
                    style={styles.matrixInteractiveCard}
                    variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: ultraSmoothTransition } }}
                    whileHover={{ y: -8, backgroundColor: "rgba(15,15,15,0.75)", borderColor: "rgba(255,255,255,0.3)" }}
                  >
                    <div style={styles.cardHeaderFlexRow}>
                      <span style={styles.cardNumericalIdentitySymbol}>{style.id}</span>
                      <span style={styles.cardContextualTagLabel}>{style.tag}</span>
                    </div>
                    <h3 style={styles.cardPrimaryTitleTypography}>{style.title}</h3>
                    <div style={styles.cardInternalStructuralDividerLine} />
                    <p style={styles.cardContextualBodyText}>{style.desc}</p>
                    <div style={styles.cardBackgroundRadialGlowAccent} />
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </section>


          {/* ================= THE PROCESS ================= */}
          <section id="process" style={{ ...styles.lightCanvasSection, padding: isMobile ? '80px 0' : '160px 0' }}>
            <div style={styles.globalGridContainer}>
              
              <motion.div style={styles.sectionHeaderClusterAlignment} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={globalFadeUp}>
                <p style={styles.structuralSectionNumericalCounter}>METRIC 04 // TIMELINE</p>
                <h2 style={{ ...styles.sectionMainTitleTypography, fontSize: isMobile ? '2rem' : '3.8rem' }}>THE PROCESS</h2>
                <div style={styles.sectionHeadingAccentLine} />
              </motion.div>

              <motion.div 
                style={{ ...styles.processChronologicalRowLayout, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '60px' : '40px' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
              >
                {[
                  { step: "01", frame: "CONSULTATION", copy: "Submit digital brief mapping structural intent, references, and target coordinates." },
                  { step: "02", frame: "DESIGN INTEGRATION", copy: "Bespoke interface blueprint composition. Secure locking calendar position via deposit transfer." },
                  { step: "03", frame: "DERMAL EXECUTION", copy: "Enter the surgical chair ecosystem. Materialize concepts step-by-step into physical reality." }
                ].map((item, index) => (
                  <motion.div key={index} style={styles.chronologicalStepCardBlock} variants={{ hidden: { opacity: 0, scale: 0.97 }, visible: { opacity: 1, scale: 1, transition: springTransition } }}>
                    <div style={styles.stepNumberAbsoluteGraphicTrack}>{item.step}</div>
                    <div style={styles.stepInteractiveNodeDot} />
                    <h4 style={styles.stepPrimaryHeadlineText}>{item.frame}</h4>
                    <p style={styles.stepDescriptionParagraphTypography}>{item.copy}</p>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </section>


          {/* ================= FAQ SECTION ================= */}
          <section id="dossier" style={{ ...styles.darkCanvasSection, padding: isMobile ? '80px 0' : '160px 0' }}>
            <motion.div 
              style={{ ...styles.globalGridContainer, maxWidth: '900px' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={globalFadeUp}
            >
              <div style={styles.sectionHeaderClusterAlignment}>
                <p style={styles.structuralSectionNumericalCounter}>METRIC 05 // SYSTEM INFO</p>
                <h2 style={{ ...styles.sectionMainTitleTypography, fontSize: isMobile ? '2rem' : '3.8rem' }}>CLIENT DOSSIER</h2>
                <div style={styles.sectionHeadingAccentLine} />
              </div>
              
              <div style={styles.faqStructuralAccordionWrapper}>
                {faqs.map((faq, index) => (
                  <motion.div 
                    key={index} 
                    style={styles.faqInteractiveRowContainer} 
                    onClick={() => toggleFaq(index)}
                    layout="position"
                  >
                    <div style={{ ...styles.faqQuestionFlexHeaderBlock, fontSize: isMobile ? '1.05rem' : '1.35rem' }}>
                      <span style={{ color: activeFaq === index ? '#ffffff' : '#999999', transition: 'color 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>{faq.q}</span>
                      <motion.div 
                        animate={{ rotate: activeFaq === index ? 135 : 0, color: activeFaq === index ? '#ffffff' : '#666666' }} 
                        style={styles.faqStateCrossIndicatorSymbol}
                      >
                        +
                      </motion.div>
                    </div>
                    
                    <AnimatePresence initial={false}>
                      {activeFaq === index && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} 
                          animate={{ height: "auto", opacity: 1 }} 
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p style={{ ...styles.faqAnswerBodyTypography, fontSize: isMobile ? '0.9rem' : '1.05rem' }}>{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>


          {/* ================= GLOBAL ARCHIVE FOOTER ================= */}
          <footer style={styles.globalStudioFooter}>
            <div style={styles.globalGridContainer}>
              <h2 style={{ ...styles.footerPrimaryBrandLogo, fontSize: isMobile ? '2.2rem' : '4.5rem', letterSpacing: isMobile ? '8px' : '18px' }}>
                SACRED INK
              </h2>
              <p style={{ ...styles.footerSecondaryMonospaceContext, fontSize: isMobile ? '0.8rem' : '1rem' }}>
                METRO CITY HUB // STRICTLY BY SECURED COMMISSION APPOINTMENT ONLY
              </p>
              
              <div style={{ ...styles.footerInteractiveSocialGridLinks, gap: isMobile ? '20px' : '40px' }}>
                {['INSTAGRAM', 'TIKTOK', 'SECURE CHROME', 'ENCRYPTED COMMUNICATIONS'].map((link, i) => (
                  <motion.span 
                    key={i} 
                    style={styles.footerLinkElementInteraction} 
                    whileHover={{ color: '#ffffff', y: -4, textShadow: "0px 0px 12px rgba(255,255,255,0.6)" }}
                  >
                    {link}
                  </motion.span>
                ))}
              </div>

              <div style={styles.footerBaseStructuralMetaRow}>
                <p style={styles.copyrightNoticeTypography}>© 2026 SACRED INK SYSTEM CO. LAB ALL RIGHTS RESERVED.</p>
                <p style={styles.architectureNoticeTypography}>ARCHITECTURE BY HIGH-FIDELITY CORE COMPONENT PARADIGM.</p>
              </div>
            </div>
          </footer>

        </div>
      </InkReveal>
    </div>
  );
}

// --- MASTER STYLES MANIFEST (HIGH FIDELITY CSS-IN-JS ENGINE) ---
const styles = {
  siteWrapper: { backgroundColor: '#020202', color: '#ffffff', margin: 0, padding: 0, width: '100%', minHeight: '100vh', boxSizing: 'border-box', fontFamily: '"Figtree", sans-serif', overflow: 'hidden', cursor: 'none' },
  
  // High Inertia Pointer Element Definitions
  cursorCore: { position: 'fixed', top: 0, left: 0, width: '8px', height: '8px', backgroundColor: '#ffffff', borderRadius: '50%', pointerEvents: 'none', zIndex: 99999, mixBlendMode: 'difference' },
  cursorRing: { position: 'fixed', top: 0, left: 0, width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)', pointerEvents: 'none', zIndex: 99998, transformOrigin: 'center center' },
  
  topProgressBar: { position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #333333 0%, #ffffff 50%, #333333 100%)', transformOrigin: '0%', zIndex: 10000 },
  filmGrainOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9000, opacity: 0.035, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")' },
  
  scrollContainer: { height: '100vh', width: '100%', overflowY: 'auto', overflowX: 'hidden', position: 'relative', scrollBehavior: 'smooth' },
  globalGridContainer: { maxWidth: '1440px', margin: '0 auto', padding: '0 6vw', width: '100%', boxSizing: 'border-box' },
  
  // Intelligent Floating Header Elements
  floatingHeader: { position: 'fixed', top: 0, left: 0, right: 0, height: '80px', backgroundColor: 'rgba(2,2,2,0.7)', backdropFilter: 'blur(20px)', zIndex: 8000, display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  headerInnerContainer: { width: '100%', maxWidth: '1440px', margin: '0 auto', padding: '0 4vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  headerBranding: { fontFamily: '"Orbitron", sans-serif', fontWeight: 900, fontSize: '1.25rem', letterSpacing: '4px', color: '#ffffff', cursor: 'pointer' },
  navigationLinkMatrix: { display: 'flex', gap: '35px', alignItems: 'center' },
  navLinkItem: { background: 'none', border: 'none', color: '#888888', fontFamily: '"Orbitron", sans-serif', fontSize: '0.8rem', letterSpacing: '2px', cursor: 'pointer', position: 'relative', padding: '6px 0', transition: 'color 0.3s' },
  navLinkUnderline: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', backgroundColor: '#ffffff', transformOrigin: 'left center' },
  headerActionCompactButton: { padding: '10px 22px', backgroundColor: 'transparent', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '2px', fontFamily: '"Orbitron", sans-serif', fontSize: '0.75rem', letterSpacing: '2px', cursor: 'pointer', transition: 'all 0.4s' },

  // Hero Presentation Canvas Definitions
  heroSection: { position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' },
  heroAssetBackgroundMask: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url('/assets/hero_tattoo.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', transform: 'scale(1.02)' },
  heroOverlayTint: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(2, 2, 2, 0.82)', zIndex: 1 },
  heroContentContainer: { position: 'relative', zIndex: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '0 20px', boxSizing: 'border-box' },
  heroDataMetricsBadge: { display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '6px 14px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', marginBottom: '30px' },
  badgePulseIndicator: { width: '6px', height: '6px', backgroundColor: '#ffffff', borderRadius: '50%', boxShadow: '0 0 8px #fff' },
  badgeMetaText: { margin: 0, fontSize: '0.7rem', letterSpacing: '3px', fontFamily: '"Orbitron", sans-serif', color: '#aaaaaa' },
  heroPrimaryTitle: { fontWeight: 900, margin: '0 0 15px 0', paddingBottom: '10px', lineHeight: '1.1', textTransform: 'uppercase', fontFamily: '"Orbitron", sans-serif', color: '#ffffff' },
  heroStructuralDividerLine: { height: '1px', backgroundColor: '#ffffff', margin: '20px auto 35px auto' },
  heroSecondaryTypography: { textTransform: 'uppercase', letterSpacing: '5px', color: '#777777', maxWidth: '700px', lineHeight: '1.6', margin: '0 0 40px 0', fontFamily: '"Orbitron", sans-serif' },
  heroPrimaryCallToAction: { padding: '20px 38px', backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #ffffff', borderRadius: '0px', fontSize: '0.85rem', letterSpacing: '4px', fontFamily: '"Orbitron", sans-serif', cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' },
  heroGeometricAnchorCoordinates: { position: 'absolute', bottom: '40px', left: '6vw', zIndex: 2 },
  coordinateTypography: { margin: 0, fontSize: '0.75rem', fontFamily: 'monospace', color: '#444444', letterSpacing: '2px' },

  // Unified Architecture Section Layout Rules
  darkCanvasSection: { backgroundColor: '#020202', width: '100%', boxSizing: 'border-box', position: 'relative' },
  lightCanvasSection: { backgroundColor: '#060606', width: '100%', boxSizing: 'border-box', position: 'relative', borderTop: '1px solid rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.02)' },
  sectionHeaderClusterAlignment: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '70px', width: '100%' },
  structuralSectionNumericalCounter: { margin: '0 0 12px 0', fontSize: '0.75rem', fontFamily: 'monospace', color: '#555555', letterSpacing: '3px' },
  sectionMainTitleTypography: { fontFamily: '"Orbitron", sans-serif', fontWeight: 900, letterSpacing: '8px', textTransform: 'uppercase', margin: 0, color: '#ffffff' },
  sectionHeadingAccentLine: { width: '40px', height: '1px', backgroundColor: '#ffffff', margin: '25px auto', opacity: 0.25 },
  sectionHeadingLeftAlignedAccentLine: { width: '40px', height: '1px', backgroundColor: '#ffffff', margin: '25px 0', opacity: 0.25 },
  sectionContextualSubheading: { fontSize: '0.8rem', color: '#555555', letterSpacing: '3px', textTransform: 'uppercase', margin: 0, fontFamily: '"Orbitron", sans-serif', maxWidth: '600px', lineHeight: '1.5' },
  
  // Complex Multi-Pane Layout Formations
  exhibitionInteractiveGalleryWrapper: { width: '100%', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '4px', backgroundColor: 'rgba(0,0,0,0.2)' },
  splitLayoutAsymmetricPane: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6vw' },
  philosophyMediaFrameContainer: { flex: '1 1 45%', maxWidth: '560px', aspectRatio: '3/4', overflow: 'hidden', borderRadius: '2px', position: 'relative', border: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#0a0a0a' },
  mediaFrameGlintAccent: { position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', zIndex: 3 },
  philosophyPrimaryImage: { width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(118%)', transform: 'scale(1.01)' },
  mediaFrameAbsoluteCornerBoundingBox: { position: 'absolute', bottom: '15px', right: '15px', width: '30px', height: '30px', borderRight: '1px solid rgba(255,255,255,0.3)', borderBottom: '1px solid rgba(255,255,255,0.3)', pointerEvents: 'none' },
  philosophyTextualContentColumn: { flex: '1 1 50%', maxWidth: '640px', display: 'flex', flexDirection: 'column' },
  philosophyCoreParagraphBody: { fontSize: '1.05rem', lineHeight: '1.85', color: '#aaaaaa', marginBottom: '24px', fontWeight: 300, letterSpacing: '0.3px' },
  signatureClusterBlock: { marginTop: '20px', width: '100%' },
  signatureHorizontalRule: { width: '80px', height: '1px', backgroundColor: '#333333', marginBottom: '15px' },
  signatureMonospaceLabel: { margin: 0, fontSize: '0.7rem', fontFamily: 'monospace', color: '#555555', letterSpacing: '2px' },

  // Specialized Architectural Matrix Grid Modules
  specializationsComplexMatrixGrid: { display: 'grid', gap: '30px', width: '100%' },
  matrixInteractiveCard: { padding: '50px 45px', backgroundColor: 'rgba(8,8,8,0.4)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '4px', textAlign: 'left', position: 'relative', overflow: 'hidden', transition: 'border-color 0.4s, background-color 0.4s' },
  cardHeaderFlexRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' },
  cardNumericalIdentitySymbol: { fontSize: '1.1rem', fontFamily: '"Orbitron", sans-serif', color: '#555555', fontWeight: 700 },
  cardContextualTagLabel: { fontSize: '0.65rem', fontFamily: 'monospace', color: '#888888', letterSpacing: '2px', border: '1px solid rgba(255,255,255,0.08)', padding: '3px 8px', borderRadius: '2px' },
  cardPrimaryTitleTypography: { fontFamily: '"Orbitron", sans-serif', fontSize: '1.4rem', letterSpacing: '3px', margin: '0 0 15px 0', color: '#ffffff' },
  cardInternalStructuralDividerLine: { width: '30px', height: '1px', backgroundColor: '#ffffff', opacity: 0.15, marginBottom: '20px' },
  cardContextualBodyText: { color: '#888888', lineHeight: '1.75', fontSize: '0.98rem', fontWeight: 300, margin: 0 },
  cardBackgroundRadialGlowAccent: { position: 'absolute', bottom: '-40px', right: '-40px', width: '120px', height: '120px', background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)', pointerEvents: 'none' },

  // Chronological Linear Process Nodes
  processChronologicalRowLayout: { display: 'flex', justifyContent: 'space-between', width: '100%', position: 'relative' },
  chronologicalStepCardBlock: { flex: '1 1 30%', textAlign: 'left', position: 'relative', padding: '30px 25px', backgroundColor: 'rgba(255,255,255,0.01)', borderLeft: '1px solid rgba(255,255,255,0.05)' },
  stepNumberAbsoluteGraphicTrack: { fontSize: '4.5rem', fontFamily: '"Orbitron", sans-serif', color: '#121212', fontWeight: 900, lineHeight: 1, marginBottom: '10px', userSelect: 'none' },
  stepInteractiveNodeDot: { width: '6px', height: '6px', backgroundColor: '#ffffff', borderRadius: '50%', marginBottom: '20px', opacity: 0.4 },
  stepPrimaryHeadlineText: { fontSize: '1.05rem', letterSpacing: '3px', margin: '0 0 15px 0', fontFamily: '"Orbitron", sans-serif', color: '#ffffff' },
  stepDescriptionParagraphTypography: { color: '#777777', lineHeight: '1.7', fontSize: '0.92rem', fontWeight: 300, margin: 0 },

  // Dossier System Accordion Elements
  faqStructuralAccordionWrapper: { textAlign: 'left', width: '100%', borderTop: '1px solid rgba(255,255,255,0.05)' },
  faqInteractiveRowContainer: { borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '35px 10px', cursor: 'pointer', display: 'flex', flexDirection: 'column' },
  faqQuestionFlexHeaderBlock: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', letterSpacing: '2px', fontFamily: '"Orbitron", sans-serif', fontWeight: 700 },
  faqStateCrossIndicatorSymbol: { fontSize: '1.4rem', fontWeight: 300, display: 'inline-block', width: '24px', textAlign: 'center' },
  faqAnswerBodyTypography: { paddingTop: '25px', color: '#888888', lineHeight: '1.85', fontWeight: 300, paddingRight: '40px', margin: 0, letterSpacing: '0.2px' },

  // Core Studio Production Footer Properties
  globalStudioFooter: { backgroundColor: '#000000', padding: '120px 0 50px 0', textAlign: 'center', width: '100%', borderTop: '1px solid rgba(255,255,255,0.03)' },
  footerPrimaryBrandLogo: { fontFamily: '"Orbitron", sans-serif', fontWeight: 900, color: '#161616', margin: '0 0 20px 0', userSelect: 'none' },
  footerSecondaryMonospaceContext: { color: '#444444', letterSpacing: '4px', margin: '0 0 60px 0', fontFamily: '"Orbitron", sans-serif' },
  footerInteractiveSocialGridLinks: { display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '80px' },
  footerLinkElementInteraction: { cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '3px', color: '#555555', transition: 'all 0.3s', fontFamily: '"Orbitron", sans-serif' },
  footerBaseStructuralMetaRow: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', borderTop: '1px solid #111111', paddingTop: '40px', textAlign: 'left' },
  copyrightNoticeTypography: { color: '#333333', fontSize: '0.72rem', letterSpacing: '2px', margin: 0, fontFamily: 'monospace' },
  architectureNoticeTypography: { color: '#333333', fontSize: '0.72rem', letterSpacing: '2px', margin: 0, fontFamily: 'monospace' }
};

export default App;