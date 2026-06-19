// src/InkReveal.jsx
import React from 'react';
import { motion } from 'framer-motion';

const InkReveal = ({ children }) => {
  return (
    <div style={styles.stage}>
      
      {/* 1. THE PARCHMENT BACKGROUND LAYER */}
      <div style={styles.parchmentBackground} />

      {/* 2. LIQUID INK CAPILLARY FILTER */}
      <svg style={{ width: 0, height: 0, position: 'absolute' }}>
        <defs>
          <filter id="fluid-ink-bleed" x="-20%" y="-20%" width="140%" height="140%">
            {/* Creates fine-grain fractal textures simulating paper fiber resistance */}
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.04" 
              numOctaves="5" 
              result="paper-noise" 
            />
            {/* Distorts the edges along the noise paths to look like raw bleeding ink */}
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="paper-noise" 
              scale="70" 
              xChannelSelector="R" 
              yChannelSelector="G" 
              result="displaced-ink" 
            />
            {/* Softens the bleed borders slightly */}
            <feGaussianBlur in="displaced-ink" stdDeviation="5" result="smooth-bleed" />
            {/* Locks up the alpha thresholds to give a clean, deep liquid edge */}
            <feColorMatrix
              in="smooth-bleed"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -11"
              result="final-ink"
            />
          </filter>
        </defs>
      </svg>

      {/* 3. FLUID INK BLEED CANVAS */}
      <div style={styles.inkCanvas}>
        
        {/* Central Core Blot (Rapid drop, then slow creeping spread) */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 8, 22, 45] }}
          transition={{
            duration: 4.5,
            times: [0, 0.15, 0.5, 1], // Variable rates: Fast initial pop, creeping finish
            ease: [0.25, 0.1, 0.1, 1]
          }}
          style={styles.blackInkBlob}
        />

        {/* Satellite Blot Left (Pours in smoothly with a delay) */}
        <motion.div
          initial={{ scale: 0, x: '-25vw', y: '-10vh' }}
          animate={{ scale: [0, 5, 18, 35] }}
          transition={{
            duration: 5,
            delay: 0.3,
            times: [0, 0.2, 0.6, 1],
            ease: "easeInOut"
          }}
          style={styles.blackInkBlob}
        />

        {/* Satellite Blot Right (Asymmetric secondary pool) */}
        <motion.div
          initial={{ scale: 0, x: '28vw', y: '20vh' }}
          animate={{ scale: [0, 4, 15, 30] }}
          transition={{
            duration: 4.2,
            delay: 0.1,
            times: [0, 0.1, 0.5, 1],
            ease: "easeOut"
          }}
          style={styles.blackInkBlob}
        />
      </div>

      {/* 4. THE CORE GALLERY CONTENT */}
      {/* Smoothly fades in right as the ink turns the paper entirely black */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1.8, ease: "easeOut" }}
        style={styles.contentLayer}
      >
        {children}
      </motion.div>
    </div>
  );
};

const styles = {
  stage: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#000000',
  },
  parchmentBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: "url('/assets/parchment.png')", // Pulls your texture file
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 1,
  },
  inkCanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
    zIndex: 2,
    filter: 'url(#fluid-ink-bleed)', // Connects the liquid math engine
  },
  blackInkBlob: {
    position: 'absolute',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#000000', // Solid black ink
    transformOrigin: 'center center',
  },
  contentLayer: {
    position: 'relative',
    zIndex: 3,
    width: '100%',
    height: '100%',
  }
};

export default InkReveal;