import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileDownload } from 'react-icons/fa';
import ApplicationCard from '../components/ApplicationCard';
import ApplicationModal from '../components/ApplicationModal';
import { applications } from '../data/applications';
import '../index.css'; // Ensure tailwind and global styles are applied

gsap.registerPlugin(ScrollTrigger);

const applicationCategories = [
  'All',
  'Fruits',
  'Spices and Herbs',
  'Plantations',
  'Grains and Pulses',
  'Nuts and Tubers',
  'Vegetables',
  'Specialty'
];

export default function Technology() {
  const canvasRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeAppCategory, setActiveAppCategory] = useState('All');
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#applications') {
      const el = document.getElementById('applications');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [location]);

  const filteredApps = activeAppCategory === 'All'
    ? applications
    : applications.filter(app => app.category === activeAppCategory);

  useEffect(() => {
    // ─── THREE.JS SCENE SETUP ───
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const bgHex = 0xf6f3ea; // Match light theme for mobile or transparent
    scene.fog = new THREE.FogExp2(bgHex, 0.035);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 2.4, 15); // Shifted up
    camera.lookAt(0, 1.9, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // ─── REUSABLE MATERIALS ───
    const matBody = new THREE.MeshStandardMaterial({ color: 0x8a8c8e, metalness: 0.4, roughness: 0.6 });
    const matDoor = new THREE.MeshStandardMaterial({ color: 0x909295, metalness: 0.35, roughness: 0.5 });
    const matBrushedSteel = new THREE.MeshStandardMaterial({ color: 0xd0d0d0, metalness: 0.9, roughness: 0.2 });
    const matInterior = new THREE.MeshStandardMaterial({ color: 0xe0d8ba, metalness: 0.6, roughness: 0.3 });
    const matTray = new THREE.MeshStandardMaterial({ color: 0xbcbcbc, metalness: 0.9, roughness: 0.2, transparent: true, opacity: 0.85 });
    const matDisplayBg = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.3, roughness: 0.5 });
    const matDisplayLED = new THREE.MeshStandardMaterial({ color: 0xff3300, emissive: 0xff2200, emissiveIntensity: 2.0 });
    const matRedButton = new THREE.MeshStandardMaterial({ color: 0xdd0000, emissive: 0x990000, emissiveIntensity: 0.5, metalness: 0.4, roughness: 0.3 });
    const matGauge = new THREE.MeshStandardMaterial({ color: 0xeeeeee, metalness: 0.3, roughness: 0.4 });
    const matGaugeRim = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9, roughness: 0.15 });
    const matWheel = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.3, roughness: 0.7 });
    const matWheelBracket = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.7, roughness: 0.3 });
    const matGrille = new THREE.MeshStandardMaterial({ color: 0x6a6a6a, metalness: 0.6, roughness: 0.4 });

    // ─── GEOMETRY DIMENSIONS ───
    const BODY_W = 3.6, BODY_H = 4.8, BODY_D = 3.2, WALL = 0.08, PANEL_W = 0.35;
    const DOOR_W = (BODY_W - PANEL_W) / 2;
    const DOOR_H = BODY_H * 0.65;
    const DOOR_D = 0.06;

    const machineGroup = new THREE.Group();
    scene.add(machineGroup);

    // Main Outer Frame
    const backGeo = new THREE.BoxGeometry(BODY_W, BODY_H, WALL);
    const back = new THREE.Mesh(backGeo, matBody);
    back.position.set(0, BODY_H / 2, -BODY_D / 2);
    machineGroup.add(back);

    const topGeo = new THREE.BoxGeometry(BODY_W, WALL, BODY_D);
    const top = new THREE.Mesh(topGeo, matBody);
    top.position.set(0, BODY_H, 0);
    machineGroup.add(top);

    const bottom = new THREE.Mesh(topGeo, matBody);
    bottom.position.set(0, 0, 0);
    machineGroup.add(bottom);

    const sideGeo = new THREE.BoxGeometry(WALL, BODY_H, BODY_D);
    const leftSide = new THREE.Mesh(sideGeo, matBody);
    leftSide.position.set(-BODY_W / 2, BODY_H / 2, 0);
    machineGroup.add(leftSide);

    const rightSide = new THREE.Mesh(sideGeo, matBody);
    rightSide.position.set(BODY_W / 2, BODY_H / 2, 0);
    machineGroup.add(rightSide);

    const interiorGeo = new THREE.BoxGeometry(BODY_W - WALL * 2, BODY_H - WALL * 2, 0.02);
    const interior = new THREE.Mesh(interiorGeo, matInterior);
    interior.position.set(0, BODY_H / 2, -BODY_D / 2 + WALL + 0.01);
    machineGroup.add(interior);

    // Doors & Hinged Pivots
    const doorY = BODY_H * 0.35;
    const doorZ = BODY_D / 2;
    const doorGeo = new THREE.BoxGeometry(DOOR_W, DOOR_H, DOOR_D);

    const leftDoorPivot = new THREE.Group();
    leftDoorPivot.position.set(-PANEL_W / 2, doorY, doorZ);
    machineGroup.add(leftDoorPivot);

    const leftDoor = new THREE.Mesh(doorGeo, matDoor);
    leftDoor.position.set(-DOOR_W / 2, 0, DOOR_D / 2);
    leftDoorPivot.add(leftDoor);

    const rightDoorPivot = new THREE.Group();
    rightDoorPivot.position.set(PANEL_W / 2, doorY, doorZ);
    machineGroup.add(rightDoorPivot);

    const rightDoor = new THREE.Mesh(doorGeo, matDoor);
    rightDoor.position.set(DOOR_W / 2, 0, DOOR_D / 2);
    rightDoorPivot.add(rightDoor);

    // Center Siemens Control Panel Strip
    const controlPanelGroup = new THREE.Group();
    controlPanelGroup.position.set(0, doorY, doorZ + 0.01);
    machineGroup.add(controlPanelGroup);

    const stripGeo = new THREE.BoxGeometry(PANEL_W, BODY_H * 0.75, 0.03);
    const strip = new THREE.Mesh(stripGeo, matBrushedSteel);
    controlPanelGroup.add(strip);

    const displayBgGeo = new THREE.BoxGeometry(0.2, 0.12, 0.02);
    const displayBg = new THREE.Mesh(displayBgGeo, matDisplayBg);
    displayBg.position.set(0, DOOR_H * 0.25, 0.025);
    controlPanelGroup.add(displayBg);

    const ledGeo = new THREE.BoxGeometry(0.14, 0.04, 0.005);
    const led1 = new THREE.Mesh(ledGeo, matDisplayLED);
    led1.position.set(0, DOOR_H * 0.27, 0.04);
    controlPanelGroup.add(led1);

    const buttonGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.025, 16);
    const button = new THREE.Mesh(buttonGeo, matRedButton);
    button.rotation.x = Math.PI / 2;
    button.position.set(0, DOOR_H * 0.12, 0.03);
    controlPanelGroup.add(button);

    // Pressure Gauges
    [0.0, -0.12].forEach(yOffset => {
      const rimGeo = new THREE.TorusGeometry(0.08, 0.008, 8, 32);
      const rim = new THREE.Mesh(rimGeo, matGaugeRim);
      rim.position.set(0, DOOR_H * yOffset, 0.03);
      controlPanelGroup.add(rim);

      const faceGeo = new THREE.CircleGeometry(0.075, 32);
      const face = new THREE.Mesh(faceGeo, matGauge);
      face.position.set(0, DOOR_H * yOffset, 0.028);
      controlPanelGroup.add(face);
    });

    // Internal Trays & Heating Elements
    const trayCount = 5;
    const trayW = DOOR_W - 0.15;
    const trayD = BODY_D - 0.3;
    const trayGeo = new THREE.BoxGeometry(trayW, 0.02, trayD);
    const spacing = (DOOR_H * 0.85) / (trayCount + 1);

    const traysLeft = [];
    const traysRight = [];

    for (let i = 0; i < trayCount; i++) {
      const yPos = -DOOR_H * 0.4 + spacing * (i + 1);

      const trayL = new THREE.Mesh(trayGeo, matTray.clone());
      trayL.position.set(-PANEL_W / 2 - DOOR_W / 2, BODY_H * 0.35 + yPos, 0);
      machineGroup.add(trayL);
      traysLeft.push(trayL);

      const trayR = new THREE.Mesh(trayGeo, matTray.clone());
      trayR.position.set(PANEL_W / 2 + DOOR_W / 2, BODY_H * 0.35 + yPos, 0);
      machineGroup.add(trayR);
      traysRight.push(trayR);
    }

    // Top & Side Ventilation Grilles
    const slotCount = 8;
    const slotW = BODY_W * 0.6;
    const slotH = 0.015;
    const slotGap = 0.03;
    const slotGeo = new THREE.BoxGeometry(slotW, slotH, 0.01);

    for (let i = 0; i < slotCount; i++) {
      const slatTop = new THREE.Mesh(slotGeo, matGrille);
      slatTop.position.set(0, BODY_H - 0.15 - i * slotGap, BODY_D / 2 + 0.01);
      machineGroup.add(slatTop);
    }

    // Wheels
    const wheelPositions = [
      [-BODY_W / 2 + 0.25, -0.15, BODY_D / 2 - 0.25],
      [BODY_W / 2 - 0.25, -0.15, BODY_D / 2 - 0.25],
      [-BODY_W / 2 + 0.25, -0.15, -BODY_D / 2 + 0.25],
      [BODY_W / 2 - 0.25, -0.15, -BODY_D / 2 + 0.25]
    ];

    wheelPositions.forEach(pos => {
      const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 0.08), matWheelBracket);
      bracket.position.set(pos[0], pos[1] + 0.06, pos[2]);
      machineGroup.add(bracket);

      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16), matWheel);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(pos[0], pos[1], pos[2]);
      machineGroup.add(wheel);
    });

    machineGroup.scale.set(0.75, 0.75, 0.75); // Scale adjusted for perfect fit
    machineGroup.position.y = 1.0; // Center perfectly between top text and bottom pills
    machineGroup.rotation.y = -0.15; // Initial angle

    // ─── LIGHTING SETUP ───
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x88aacc, 0.6, 20);
    fillLight.position.set(-6, 4, 3);
    scene.add(fillLight);

    const internalLightL = new THREE.PointLight(0xffdd88, 0, 5); 
    internalLightL.position.set(-PANEL_W / 2 - DOOR_W / 2, BODY_H * 0.7, 0);
    machineGroup.add(internalLightL);

    const internalLightR = new THREE.PointLight(0xffdd88, 0, 5);
    internalLightR.position.set(PANEL_W / 2 + DOOR_W / 2, BODY_H * 0.7, 0);
    machineGroup.add(internalLightR);

    // Initial doors completely closed
    leftDoorPivot.rotation.y = 0;
    rightDoorPivot.rotation.y = 0;

    // ─── ANIMATION LOOP ───
    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (machineGroup && machineGroup.userData.thermalActive) {
        const t = Date.now() * 0.001;
        [...traysLeft, ...traysRight].forEach((tray, i) => {
          const heat = (Math.sin(t * 2.5 + i * 0.6) + 1) / 2;
          tray.material.color.setRGB(0.85 + heat * 0.15, 0.3 + heat * 0.5, heat * 0.05);
        });
      }
      renderer.render(scene, camera);
    };
    animate();

    // ─── RESIZE LISTENER ───
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ─── GSAP MASTER SCROLLTIMELINE ───
    let ctx;
    const initTimer = setTimeout(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: 'top top',
            end: '+=700%',
            pin: true,
            scrub: 2.5,
          }
        });

      // Reset cards to start off-screen right
      gsap.set('.info-card:not(.card-shell), .stat-item', { autoAlpha: 0, x: 50 });
      gsap.set('.title-container, .hero-bottom-container', { autoAlpha: 1, y: 0 });
      gsap.set('.dot:not(.dot-1)', { opacity: 0.3 }); // Reset all dots except first
      
      // Initially visible elements (No empty box!)
      gsap.set('.card-shell', { autoAlpha: 1, x: 0 });
      gsap.set('.stat-shell', { autoAlpha: 0, x: 50 });
      gsap.set('.dot-1', { opacity: 1 });
      
      // Reset camera to place machine higher up to make room for bottom elements
      gsap.set(camera.position, { x: 0, y: 3.0, z: 14.5 });
      
      // Hide info panel initially (pushed off-screen downwards)
      gsap.set('#info-panel', { yPercent: 120 });

      // Phase 1: X-Ray Teardown (Shell)
      // Fade out title and bottom buttons first so they don't overlap with incoming Phase 1 boxes
      tl.to('.title-container, .hero-bottom-container', { autoAlpha: 0, y: -20, duration: 0.4 }, 0.1);
      
      // Then slide up info panel, slide in Phase 1 boxes, and pull camera down to center the machine
      tl.to('#info-panel', { yPercent: 0, duration: 0.5, ease: "power2.out" }, 0.5);
      tl.to('.stat-shell', { autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out" }, 0.5);
      tl.to(camera.position, { y: 2.4, z: 15, duration: 0.5, ease: "power2.out" }, 0.5);
      
      tl.to(machineGroup.rotation, { y: 0, duration: 1 }, 1);
      tl.to(leftDoorPivot.rotation, { y: -Math.PI * 0.6, duration: 1 }, 1);
      tl.to(rightDoorPivot.rotation, { y: Math.PI * 0.6, duration: 1 }, 1);
      tl.to(internalLightL, { intensity: 1.5, duration: 1 }, 1);
      tl.to(internalLightR, { intensity: 1.5, duration: 1 }, 1);
      
      // Transition 1 -> 2
      tl.to('.card-shell, .stat-shell', { autoAlpha: 0, x: -50, duration: 0.5, ease: "power2.in" }, 2.5);
      tl.to('.dot-1', { opacity: 0.3, duration: 0.3 }, 2.5);
      tl.to('.dot-2', { opacity: 1, duration: 0.3 }, 2.8);
      tl.to('.card-foam, .stat-foam', { autoAlpha: 1, x: 0, duration: 0.6, ease: "power2.out" }, 3.0);
      
      // Transition 2 -> 3
      tl.to('.card-foam, .stat-foam', { autoAlpha: 0, x: -50, duration: 0.5, ease: "power2.in" }, 4.5);
      tl.to('.dot-2', { opacity: 0.3, duration: 0.3 }, 4.5);
      
      // Cinematic Zoom 1: Zoom in tightly on the drying trays
      tl.to(camera.position, { y: 1.1, z: 9, duration: 1, ease: "power2.inOut" }, 4.5);
      
      tl.to('.dot-3', { opacity: 1, duration: 0.3 }, 4.8);
      tl.to('.card-trays, .stat-trays', { autoAlpha: 1, x: 0, duration: 0.6, ease: "power2.out" }, 5.0);

      // Transition 3 -> 4 (Thermal)
      tl.to('.card-trays, .stat-trays', { autoAlpha: 0, x: -50, duration: 0.5, ease: "power2.in" }, 6.5);
      tl.to('.dot-3', { opacity: 0.3, duration: 0.3 }, 6.5);
      
      // Cinematic Zoom 2: Pull back slightly to see the rotation
      tl.to(camera.position, { y: 1.8, z: 12, duration: 1, ease: "power2.inOut" }, 6.5);
      
      tl.to(machineGroup.rotation, { y: -0.5, duration: 1 }, 6.8);
      tl.call(() => { machineGroup.userData.thermalActive = true; }, null, 6.8);
      tl.to('.dot-4', { opacity: 1, duration: 0.3 }, 6.8);
      tl.to('.card-thermal, .stat-thermal', { autoAlpha: 1, x: 0, duration: 0.6, ease: "power2.out" }, 7.0);

      // Transition 4 -> 5 (Command Center) - Machine stays rotated, no doors close yet
      tl.to('.card-thermal, .stat-thermal', { autoAlpha: 0, x: -50, duration: 0.5, ease: "power2.in" }, 8.5);
      tl.to('.dot-4', { opacity: 0.3, duration: 0.3 }, 8.5);
      
      // Cinematic Zoom 3: Pan camera left to place the machine on the right side of the screen, slightly zoomed out
      tl.to(camera.position, { x: -2.2, y: 2.4, z: 12, duration: 1, ease: "power2.inOut" }, 8.5);
      
      tl.to('.dot-5', { opacity: 1, duration: 0.3 }, 8.8);
      tl.fromTo('.command-pillar-overlay', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, 8.8);
      tl.to('.card-command, .stat-command', { autoAlpha: 1, x: 0, duration: 0.6, ease: "power2.out" }, 9.0);

      // Transition 5 -> 6 (ROI) - Doors close, rotation back to front
      tl.to('.card-command, .stat-command', { autoAlpha: 0, x: -50, duration: 0.5, ease: "power2.in" }, 11.0);
      tl.to('.command-pillar-overlay', { autoAlpha: 0, duration: 0.5, ease: "power2.in" }, 10.5);
      tl.to('.dot-5', { opacity: 0.3, duration: 0.3 }, 11.0);
      
      // Cinematic Zoom 4: Pull all the way back to default view
      tl.to(camera.position, { x: 0, y: 2.4, z: 15, duration: 1, ease: "power2.inOut" }, 10.5);
      
      tl.call(() => {
        machineGroup.userData.thermalActive = false;
        [...traysLeft, ...traysRight].forEach(tray => {
          tray.material.color.setHex(0xbcbcbc);
        });
      }, null, 10.8);
      tl.to(leftDoorPivot.rotation, { y: 0, duration: 1 }, 10.8);
      tl.to(rightDoorPivot.rotation, { y: 0, duration: 1 }, 10.8);
      tl.to(internalLightL, { intensity: 0, duration: 0.5 }, 10.8);
      tl.to(internalLightR, { intensity: 0, duration: 0.5 }, 10.8);
      tl.to(machineGroup.rotation, { y: 0.2, duration: 1 }, 10.8);
      
      tl.to('.dot-6', { opacity: 1, duration: 0.3 }, 11.5);
      tl.to('.card-roi, .stat-roi', { autoAlpha: 1, x: 0, duration: 0.6, ease: "power2.out" }, 11.5);
      
      // Fade out the ROI box and dots so the panel is empty for the transition
      tl.to('.card-roi, .stat-roi', { autoAlpha: 0, y: -20, duration: 0.5, ease: "power2.in" }, 12.5);
      tl.to('.dot-container', { autoAlpha: 0, duration: 0.5 }, 12.5);
      
      // Fade out the floating pill before the datasheet slides up
      tl.to('#info-panel', { 
        autoAlpha: 0,
        duration: 0.5, 
        ease: 'power2.inOut' 
      }, 12.5);

      // Cinematic Zoom 5: Dramatic zoom into the machine as the datasheet slides up
      // Because #datasheet is moved by the user's native scroll, this zoom happens perfectly in sync!
      tl.to(camera.position, { 
          z: 3, 
          y: 1.5, 
          duration: 3, 
          ease: "power1.inOut" 
      }, 12.5);
      
      tl.to(machineGroup.rotation, {
          y: 0,
          duration: 3,
          ease: "power1.inOut"
      }, 12.5);
      
      // Fade out the 3D canvas entirely as it zooms into the screen
      tl.to('#webgl-canvas', {
          opacity: 0,
          duration: 3,
          ease: "power1.inOut"
      }, 12.5);
      
      tl.set({}, {}, 15.5);
    }, scrollContainerRef);
    ScrollTrigger.refresh();
  }, 500);

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      renderer.dispose();
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div className="relative w-full bg-bg min-h-screen text-primary-text overflow-x-hidden font-sans">
      
      {/* Scroll Timeline - Pinned section */}
      <div id="scroll-container" ref={scrollContainerRef} className="relative w-full h-[100svh] z-10 overflow-hidden bg-bg">
          
          {/* Top 72% - 3D Visual Zone */}
          <div className="absolute top-0 left-0 w-full h-[72%] z-0 pointer-events-none">
            <canvas id="webgl-canvas" ref={canvasRef} className="w-full h-[100svh] absolute top-0 left-0"></canvas>
          </div>

          {/* Hero Intro Area (Fades out when scrolling starts) */}
          <div className="absolute top-[8svh] left-0 w-full px-6 flex flex-col items-center justify-center z-10 title-container text-center">
              <h1 className="text-[clamp(2.1rem,10vw,3rem)] sm:text-5xl font-black tracking-tight leading-[1.1] mb-2">
                  <span className="text-primary-text block">Preserve Today.</span>
                  <span className="text-accent block">Profit Tomorrow.</span>
              </h1>
              
              <div className="w-12 h-1 bg-accent/80 mb-3"></div>
              
              <p className="text-[clamp(12px,3.5vw,15px)] text-secondary-text leading-relaxed w-full max-w-sm mb-4">
                  Premium industrial drying for maximum product quality and extended shelf life.
              </p>
          </div>

          {/* Hero Bottom Elements (Fades out when scrolling starts) */}
          <div className="absolute bottom-[18%] left-0 w-full px-6 flex flex-col items-center justify-center z-10 hero-bottom-container">
              {/* Badges Grid */}
              <div className="flex gap-2 mb-4 w-full max-w-sm justify-center">
                  <div className="bg-white/60 dark:bg-black/20 border border-black/5 dark:border-white/10 rounded-full py-1.5 px-3 flex items-center justify-center gap-1.5 backdrop-blur-sm">
                      <span className="text-accent text-[12px]">💧</span>
                      <span className="text-[10px] font-bold text-primary-text whitespace-nowrap"><span className="text-accent">5%</span> Final Moisture</span>
                  </div>
                  <div className="bg-white/60 dark:bg-black/20 border border-black/5 dark:border-white/10 rounded-full py-1.5 px-3 flex items-center justify-center gap-1.5 backdrop-blur-sm">
                      <span className="text-accent text-[12px]">📅</span>
                      <span className="text-[10px] font-bold text-primary-text whitespace-nowrap">12+ Months Shelf Life</span>
                  </div>
              </div>
              
              {/* Buttons */}
              <div className="flex items-center gap-3 w-full max-w-sm">
                  <button className="flex-1 bg-accent hover:bg-accent/90 text-white rounded-full py-2.5 px-4 font-bold text-[12px] flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,138,0,0.3)] transition-all">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                      Get a Custom Quote
                  </button>
                  <button className="flex-1 border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 bg-white/50 dark:bg-black/20 rounded-full py-2.5 px-4 font-bold text-[12px] text-primary-text flex items-center justify-center gap-2 backdrop-blur-sm transition-all">
                      View Specs
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </button>
              </div>
          </div>
          
          {/* Command Center 2D Image Overlay (Phase 5) */}
          <div className="absolute top-[20%] left-6 w-32 h-[50%] z-10 pointer-events-none command-pillar-overlay opacity-0 flex items-center">
              <img src="./assets/command-center-pillar.png" alt="Command Center" className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] relative z-10" />
              
              {/* Elegant Connector Line pointing to the 3D machine */}
              <div className="absolute left-[90%] top-1/2 w-[35vw] max-w-[140px] h-[2px] bg-gradient-to-r from-accent/80 to-transparent flex items-center z-0">
                  <div className="absolute -left-1 w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(255,138,0,0.8)]"></div>
                  <div className="absolute right-0 w-2 h-2 rounded-full bg-accent animate-ping opacity-80"></div>
              </div>
          </div>
          


          {/* GSAP Synced Dynamic HUD Panels (Meaningful Symmetric Layout) */}
          <div className="absolute bottom-[190px] left-0 w-full h-0 px-5 z-10 pointer-events-none">
              <div className="relative w-full h-full max-w-lg mx-auto">
                  
                  {/* Phase 1 */}
                  <div className="absolute bottom-0 left-0 stat-item stat-shell opacity-0 w-[47%] bg-white/70 dark:bg-[#1a1a1a]/70 backdrop-blur-xl p-[clamp(0.75rem,3vw,1.25rem)] rounded-3xl border border-white/30 dark:border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.12)]">
                      <h4 className="text-accent font-black text-[clamp(13px,3.5vw,16px)] mb-2 uppercase tracking-wide">SS304 Armor</h4>
                      <p className="text-[clamp(11px,3vw,14px)] text-secondary-text leading-relaxed">Food-grade structural purity.</p>
                  </div>
                  <div className="absolute bottom-0 right-0 stat-item stat-shell opacity-0 w-[47%] bg-white/70 dark:bg-[#1a1a1a]/70 backdrop-blur-xl p-[clamp(0.75rem,3vw,1.25rem)] rounded-3xl border border-white/30 dark:border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.12)]">
                      <h4 className="text-accent font-black text-[clamp(13px,3.5vw,16px)] mb-2 uppercase tracking-wide">Hermetic Seal</h4>
                      <p className="text-[clamp(11px,3vw,14px)] text-secondary-text leading-relaxed">Zero contamination risk.</p>
                  </div>
                  
                  {/* Phase 2: 2 boxes total (Left HUD + Bottom) */}
                  <div className="absolute inset-x-0 mx-auto bottom-0 stat-item stat-foam opacity-0 w-[94%] max-w-sm bg-white/70 dark:bg-[#1a1a1a]/70 backdrop-blur-xl p-[clamp(0.75rem,3vw,1.25rem)] rounded-3xl border border-white/30 dark:border-white/10 shadow-[0_15px_40px_rgba(0,176,255,0.12)] flex flex-col items-center text-center">
                      <h4 className="text-[#00b0ff] font-black text-[clamp(13px,3.5vw,16px)] mb-2 uppercase tracking-wide">99% Retention</h4>
                      <p className="text-[clamp(11px,3vw,14px)] text-secondary-text leading-relaxed">Max thermal energy efficiency.</p>
                  </div>
                  
                  {/* Phase 3: 3 boxes total (Left HUD + Right HUD + Bottom) */}
                  <div className="absolute bottom-0 left-0 stat-item stat-trays opacity-0 w-[47%] bg-white/70 dark:bg-[#1a1a1a]/70 backdrop-blur-xl p-5 rounded-3xl border border-white/30 dark:border-white/10 shadow-[0_15px_40px_rgba(255,78,0,0.12)]">
                      <h4 className="text-[#ff4e00] font-black text-[15px] mb-2 uppercase tracking-wide">Direct Heat</h4>
                      <p className="text-[13px] text-secondary-text leading-relaxed">Embedded electric elements.</p>
                  </div>
                  <div className="absolute bottom-0 right-0 stat-item stat-trays opacity-0 w-[47%] bg-white/70 dark:bg-[#1a1a1a]/70 backdrop-blur-xl p-5 rounded-3xl border border-white/30 dark:border-white/10 shadow-[0_15px_40px_rgba(255,78,0,0.12)]">
                      <h4 className="text-[#ff4e00] font-black text-[15px] mb-2 uppercase tracking-wide">SS304 Mesh</h4>
                      <p className="text-[13px] text-secondary-text leading-relaxed">Removable, easy-clean racks.</p>
                  </div>
                  
                  {/* Phase 4: 2 boxes total (Right HUD + Bottom) */}
                  <div className="absolute inset-x-0 mx-auto bottom-0 stat-item stat-thermal opacity-0 w-[94%] max-w-sm bg-white/70 dark:bg-[#1a1a1a]/70 backdrop-blur-xl p-5 rounded-3xl border border-white/30 dark:border-white/10 shadow-[0_15px_40px_rgba(255,78,0,0.12)] flex flex-col items-center text-center">
                      <h4 className="text-[#ff4e00] font-black text-[15px] mb-2 uppercase tracking-wide">Uniform Heat</h4>
                      <p className="text-[13px] text-secondary-text leading-relaxed">Eliminates cold spots entirely.</p>
                  </div>
                  
                  {/* Phase 5: 2 boxes total (Left HUD + Bottom) */}
                  <div className="absolute inset-x-0 mx-auto bottom-0 stat-item stat-command opacity-0 w-[94%] max-w-sm bg-white/70 dark:bg-[#1a1a1a]/70 backdrop-blur-xl p-5 rounded-3xl border border-white/30 dark:border-white/10 shadow-[0_15px_40px_rgba(255,204,0,0.12)] flex flex-col items-center text-center">
                      <h4 className="text-[#ffcc00] font-black text-[15px] mb-2 uppercase tracking-wide">PID Digital</h4>
                      <p className="text-[13px] text-secondary-text leading-relaxed">Smart micro-processor control.</p>
                  </div>
                  
                  {/* Phase 6: 2 boxes total (Centered HUD + Bottom) */}
                  <div className="absolute inset-x-0 mx-auto bottom-0 stat-item stat-roi opacity-0 w-[94%] max-w-sm bg-white/70 dark:bg-[#1a1a1a]/70 backdrop-blur-xl p-5 rounded-3xl border border-white/30 dark:border-white/10 shadow-[0_15px_40px_rgba(37,211,102,0.12)] flex flex-col items-center text-center">
                      <h4 className="text-[#25D366] font-black text-[15px] mb-2 uppercase tracking-wide">Rapid ROI</h4>
                      <p className="text-[13px] text-secondary-text leading-relaxed">Faster drying means more profit.</p>
                  </div>
              </div>
          </div>
          
          {/* Bottom Floating Pill Zone */}
          <div id="info-panel" className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[94%] max-w-sm z-20 flex flex-col items-center pointer-events-none">
              
              {/* The Static Info Box */}
              <div className="relative w-full bg-white/70 dark:bg-[#1a1a1a]/70 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden max-w-sm pb-6">
                  
                  <div className="relative w-full h-[90px] flex justify-center mt-5">
                      
                      {/* Info Cards (Sliding in and out via GSAP) */}
                      <div className="absolute w-full px-[clamp(1rem,4vw,1.5rem)] text-center info-card card-shell opacity-0">
                          <h4 className="text-accent font-black text-[clamp(14px,3.5vw,16px)] mb-2 uppercase tracking-wide">SS 304 Shell</h4>
                          <p className="text-[clamp(11px,3vw,14px)] text-secondary-text leading-relaxed">10x10 foot premium food-grade construction. Zero contamination design ensures maximum purity.</p>
                      </div>
                      
                      <div className="absolute w-full px-[clamp(1rem,4vw,1.5rem)] text-center info-card card-foam opacity-0">
                          <h4 className="text-[#00b0ff] font-black text-[clamp(14px,3.5vw,16px)] mb-2 uppercase tracking-wide">Thermal Insulation</h4>
                          <p className="text-[clamp(11px,3vw,14px)] text-secondary-text leading-relaxed">High-density rockwool foam retains 99% of internal heat, significantly reducing power consumption.</p>
                      </div>

                      <div className="absolute w-full px-6 text-center info-card card-trays opacity-0">
                          <h4 className="text-[#ff4e00] font-black text-[15px] mb-2 uppercase tracking-wide">Drying Trays</h4>
                          <p className="text-[13px] text-secondary-text leading-relaxed">Precision electric heating elements embedded directly into the removable SS304 mesh tray racks.</p>
                      </div>

                      <div className="absolute w-full px-6 text-center info-card card-thermal opacity-0">
                          <h4 className="text-[#ff4e00] font-black text-[15px] mb-2 uppercase tracking-wide">Thermal Dynamics</h4>
                          <p className="text-[13px] text-secondary-text leading-relaxed">Live heat-mapping proves uniform thermal distribution across all trays. Eliminates cold spots entirely.</p>
                      </div>

                      <div className="absolute w-full px-6 text-center info-card card-command opacity-0">
                          <h4 className="text-[#ffcc00] font-black text-[15px] mb-2 uppercase tracking-wide">Command Center</h4>
                          <p className="text-[13px] text-secondary-text leading-relaxed">Industrial-grade digital PID controllers, intuitive LED readouts, and fail-safe analog pressure gauges.</p>
                      </div>

                      <div className="absolute w-full px-6 text-center info-card card-roi opacity-0">
                          <h4 className="text-[#25D366] font-black text-[15px] mb-2 uppercase tracking-wide">Max Efficiency</h4>
                          <p className="text-[13px] text-secondary-text leading-relaxed">Dual ventilation grilles optimize cross-flow aerodynamics. Superior heat retention translates to faster ROI.</p>
                      </div>
                  </div>
              </div>

              {/* Progress Timeline Dots (Hidden for GSAP to target silently) */}
              <div className="hidden w-full items-center justify-center gap-3 pb-6 pt-2 dot-container relative z-10">
                  <div className="w-2 h-2 rounded-full bg-accent dot dot-1 opacity-30 shadow-[0_0_8px_currentColor]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#00b0ff] dot dot-2 opacity-30 shadow-[0_0_8px_currentColor]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#ff4e00] dot dot-3 opacity-30 shadow-[0_0_8px_currentColor]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#ff4e00] dot dot-4 opacity-30 shadow-[0_0_8px_currentColor]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#ffcc00] dot dot-5 opacity-30 shadow-[0_0_8px_currentColor]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#25D366] dot dot-6 opacity-30 shadow-[0_0_8px_currentColor]"></div>
              </div>
          </div>
      </div>

      {/* Technical Data Sheet Section (From Desktop Version) */}
      <section id="datasheet" className="bg-bg text-primary-text py-16 px-4 relative z-30 mt-[-100svh] rounded-t-[2rem]">
        <div className="mx-auto max-w-sm">
          <div className="mb-8 text-center">
            <div className="inline-block px-3 py-1 mb-3 bg-accent/10 text-accent rounded-full text-xs font-bold tracking-wider uppercase border border-accent/20">Engineering Specs</div>
            <h2 className="text-3xl font-bold font-outfit mb-2">Technical Data Sheet</h2>
            <div className="text-sm text-secondary-text">CALOR MEGA Batch System Parameters</div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border shadow-sm mb-10">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface border-b border-border">
                <tr>
                  <th className="p-4 font-bold text-primary-text">Specification</th>
                  <th className="p-4 font-bold text-primary-text">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-bg">
                <tr>
                  <td className="p-4 font-semibold text-primary-text">Construction</td>
                  <td className="p-4 text-secondary-text">Double-walled SS304. Reinforced framing.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-primary-text">Insulation</td>
                  <td className="p-4 text-secondary-text">75mm high-density rockwool / mineral wool.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-primary-text">Control System</td>
                  <td className="p-4 text-secondary-text">PID Digital Controller. Pt100 RTD sensor.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-primary-text">Capacity</td>
                  <td className="p-4 text-secondary-text">50 kg, 100 kg, 200 kg, 500 kg, and custom.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-primary-text">Drying Trays</td>
                  <td className="p-4 text-secondary-text">Removable SS304 mesh tray racks.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-primary-text">Heating</td>
                  <td className="p-4 text-secondary-text">Finned stainless steel armored electric.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-primary-text">Airflow</td>
                  <td className="p-4 text-secondary-text">Direct-drive axial flow fans.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-primary-text">Temperature</td>
                  <td className="p-4 text-secondary-text">Ambient to 90°C (±1°C accuracy).</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Download Brochure CTA */}
          <div className="bg-brand-light border border-border rounded-2xl p-6 text-center flex flex-col items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center text-xl">
              <FaFileDownload />
            </div>
            <div>
              <h3 className="font-bold text-primary-text text-lg mb-1">Technical Blueprints</h3>
              <p className="text-sm text-secondary-text">Download full dimensional drawings & wiring guides.</p>
            </div>
            <a
              href="./assets/downloads/CALOR_MEGA_Specs.pdf"
              download="CALOR_MEGA_Specs.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-soft"
            >
              <FaFileDownload /> Download PDF
            </a>
          </div>

          {/* Applications Subsection */}
          <div id="applications" className="mt-14 pt-10 border-t border-border">
            <div className="mb-6 text-center">
              <div className="inline-block px-3 py-1 mb-3 bg-accent/10 text-accent rounded-full text-xs font-bold tracking-wider uppercase border border-accent/20">
                Endless Produce
              </div>
              <h2 className="text-2xl font-bold font-outfit mb-2 text-primary-text">Applications & Processing</h2>
              <p className="text-xs text-secondary-text max-w-xs mx-auto">
                CALOR MEGA dryers are trusted across fruit, spice, grain, nut, and botanical processing.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mb-6">
              {applicationCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveAppCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeAppCategory === cat
                      ? 'bg-accent text-primary shadow-sm scale-105'
                      : 'bg-white/70 dark:bg-white/5 border border-primary/10 dark:border-white/10 text-primary/70 dark:text-paper/70'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid of Applications */}
            <motion.div layout className="grid grid-cols-2 gap-3 mb-8">
              <AnimatePresence mode="popLayout">
                {filteredApps.map((app, i) => (
                  <ApplicationCard
                    key={app.title}
                    application={app}
                    index={i}
                    onSelect={setSelectedApp}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Applications Download Option */}
            <div className="bg-brand-light border border-border rounded-2xl p-6 text-center flex flex-col items-center gap-4 shadow-sm mb-6">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center text-xl">
                <FaFileDownload />
              </div>
              <div>
                <h3 className="font-bold text-primary-text text-lg mb-1">Produce Processing Guide</h3>
                <p className="text-sm text-secondary-text">Download drying parameters, moisture targets & batch yields for 50+ crops.</p>
              </div>
              <a
                href="./assets/downloads/CALOR_MEGA_Applications_Guide.pdf"
                download="CALOR_MEGA_Applications_Guide.pdf"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-soft"
              >
                <FaFileDownload /> Download Applications PDF
              </a>
            </div>

            <ApplicationModal
              application={selectedApp}
              onClose={() => setSelectedApp(null)}
              onSelectRelated={setSelectedApp}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
