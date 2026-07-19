import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaFileDownload, FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import './Technology.css';

gsap.registerPlugin(ScrollTrigger);

export default function Technology() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const centerBlockRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ─── THREE.JS SCENE SETUP ───
    const scene = new THREE.Scene();
    const isDark = document.documentElement.classList.contains('dark');
    const bgHex = isDark ? 0x0c0c0e : 0xf6f3ea;
    scene.background = new THREE.Color(bgHex);
    scene.fog = new THREE.FogExp2(bgHex, 0.035);

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.5, 13);
    camera.lookAt(0, 1.4, 0);

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
    const matHandle = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.9, roughness: 0.15 });
    const matDisplayBg = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.3, roughness: 0.5 });
    const matDisplayLED = new THREE.MeshStandardMaterial({ color: 0xff3300, emissive: 0xff2200, emissiveIntensity: 2.0 });
    const matRedButton = new THREE.MeshStandardMaterial({ color: 0xdd0000, emissive: 0x990000, emissiveIntensity: 0.5, metalness: 0.4, roughness: 0.3 });
    const matGauge = new THREE.MeshStandardMaterial({ color: 0xeeeeee, metalness: 0.3, roughness: 0.4 });
    const matGaugeRim = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9, roughness: 0.15 });
    const matPipe = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.85, roughness: 0.2 });
    const matWheel = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.3, roughness: 0.7 });
    const matWheelBracket = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.7, roughness: 0.3 });
    const matGrille = new THREE.MeshStandardMaterial({ color: 0x6a6a6a, metalness: 0.6, roughness: 0.4 });

    // ─── DIMENSIONS ───
    const BODY_W = 3.6, BODY_H = 4.8, BODY_D = 3.2, WALL = 0.08, PANEL_W = 0.35;
    const DOOR_W = (BODY_W - PANEL_W) / 2;
    const DOOR_H = BODY_H * 0.65;
    const DOOR_D = 0.06;

    const machineGroup = new THREE.Group();
    scene.add(machineGroup);

    // Outer Shell
    const backGeo = new THREE.BoxGeometry(BODY_W, BODY_H, WALL);
    const back = new THREE.Mesh(backGeo, matBody);
    back.position.set(0, BODY_H / 2, -BODY_D / 2);
    back.castShadow = true; back.receiveShadow = true;
    machineGroup.add(back);

    const topGeo = new THREE.BoxGeometry(BODY_W, WALL, BODY_D);
    const top = new THREE.Mesh(topGeo, matBody);
    top.position.set(0, BODY_H, 0);
    top.castShadow = true;
    machineGroup.add(top);

    const bottom = new THREE.Mesh(topGeo, matBody);
    bottom.position.set(0, 0, 0);
    bottom.receiveShadow = true;
    machineGroup.add(bottom);

    const sideGeo = new THREE.BoxGeometry(WALL, BODY_H, BODY_D);
    const leftSide = new THREE.Mesh(sideGeo, matBody);
    leftSide.position.set(-BODY_W / 2, BODY_H / 2, 0);
    leftSide.castShadow = true; leftSide.receiveShadow = true;
    machineGroup.add(leftSide);

    const rightSide = new THREE.Mesh(sideGeo, matBody);
    rightSide.position.set(BODY_W / 2, BODY_H / 2, 0);
    rightSide.castShadow = true; rightSide.receiveShadow = true;
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
    leftDoor.castShadow = true;
    leftDoorPivot.add(leftDoor);

    const rightDoorPivot = new THREE.Group();
    rightDoorPivot.position.set(PANEL_W / 2, doorY, doorZ);
    machineGroup.add(rightDoorPivot);

    const rightDoor = new THREE.Mesh(doorGeo, matDoor);
    rightDoor.position.set(DOOR_W / 2, 0, DOOR_D / 2);
    rightDoor.castShadow = true;
    rightDoorPivot.add(rightDoor);

    // Center Siemens PLC Control Panel Strip
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

    machineGroup.position.y = -1.0;
    machineGroup.rotation.y = -0.15;

    // ─── LIGHTING SETUP ───
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

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

    // Ground Plane Shadow
    const groundGeo = new THREE.PlaneGeometry(30, 30);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.3 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.15;
    ground.receiveShadow = true;
    scene.add(ground);

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
    const isMobile = window.innerWidth < 768;

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=500%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      }
    });

    // 1. Initial Hero Split Sequence (Text slides left & disappears, 3D Canvas slides in from right)
    if (isMobile) {
      mainTl.to(centerBlockRef.current, { y: '-15vh', duration: 0.6 }, 0);
      mainTl.fromTo('#webgl-canvas', { opacity: 0, y: '20vh' }, { opacity: 1, y: 0, duration: 0.6 }, 0.2);
    } else {
      mainTl.to(centerBlockRef.current, { x: '-25vw', duration: 0.6 }, 0);
      mainTl.fromTo('#webgl-canvas', { opacity: 0, x: '100vw' }, { opacity: 1, x: '25vw', duration: 0.6 }, 0);
      mainTl.to(centerBlockRef.current, { autoAlpha: 0, duration: 0.3 }, 0.65);
    }

    // 2. Phase 1: Structure & Controls (Open Doors & Camera Center)
    mainTl.to(machineGroup.rotation, { y: 0, duration: 0.8 }, 1.0);
    mainTl.to(leftDoorPivot.rotation, { y: -Math.PI * 0.55, duration: 1.5 }, 1.5);
    mainTl.to(rightDoorPivot.rotation, { y: Math.PI * 0.55, duration: 1.5 }, 1.5);
    mainTl.to(internalLightL, { intensity: 1.5, duration: 1 }, 1.8);
    mainTl.to(internalLightR, { intensity: 1.5, duration: 1 }, 1.8);
    mainTl.to('#webgl-canvas', { x: '0vw', duration: 1.5 }, 1.5);

    // 3. Phase 2: Thermal Engine & Airflow
    mainTl.to(machineGroup.rotation, { y: -0.5, duration: 1.5 }, 3.5);
    mainTl.to(camera.position, { x: 1.5, z: 14.5, y: 1.8, duration: 1.5 }, 3.5);
    mainTl.call(() => { machineGroup.userData.thermalActive = true; }, null, 4.0);

    // 4. Phase 3: Haptic Command Center (Zoom to Siemens PLC panel)
    mainTl.to(machineGroup.rotation, { y: 0.2, duration: 1.0 }, 6.5);
    mainTl.to(camera.position, { x: 0, z: 12.5, y: 1.8, duration: 1.0 }, 6.5);

    // 5. Phase 4: Dynamic Exhaust & Efficiency (Close doors & Pull back)
    mainTl.call(() => {
      machineGroup.userData.thermalActive = false;
      [...traysLeft, ...traysRight].forEach(t => t.material.color.setHex(0xbcbcbc));
    }, null, 9.5);
    mainTl.to(leftDoorPivot.rotation, { y: 0, duration: 1 }, 9.5);
    mainTl.to(rightDoorPivot.rotation, { y: 0, duration: 1 }, 9.5);
    mainTl.to(internalLightL, { intensity: 0, duration: 0.5 }, 9.5);
    mainTl.to(internalLightR, { intensity: 0, duration: 0.5 }, 9.5);
    mainTl.to(camera.position, { x: 0, z: 15, y: 1.5, duration: 1.0 }, 9.5);

    // 6. Transition to Datasheet Section
    mainTl.to('#webgl-canvas', { opacity: 0, y: '-30vh', duration: 1 }, 12.5);

    // Phase Card Triggering
    const phaseGroups = document.querySelectorAll('.phase-group');
    phaseGroups.forEach((group, idx) => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: `${(idx + 1) * 20}% top`,
        end: `${(idx + 2) * 20}% top`,
        onEnter: () => group.classList.add('active'),
        onLeave: () => group.classList.remove('active'),
        onEnterBack: () => group.classList.add('active'),
        onLeaveBack: () => group.classList.remove('active'),
      });
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      renderer.dispose();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const scrollToDatasheet = () => {
    const datasheet = document.getElementById('datasheet');
    if (datasheet) {
      datasheet.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full bg-bg text-primary-text transition-colors duration-300">
      {/* WebGL 3D Canvas */}
      <canvas id="webgl-canvas" ref={canvasRef} />

      {/* Hero Section Container */}
      <div id="hero-scroll-container" ref={containerRef}>
        <section className="hero">
          <div className="fixed-hero-wrapper">
            <div className="hero-center-block" ref={centerBlockRef}>
              <h1 className="headline">
                Preserve Today.<br />
                <span>Profit Tomorrow.</span>
              </h1>
              <p>
                CALOR MEGA Industrial Dehydration Systems deliver premium drying performance with maximum product quality and extended shelf life.
              </p>

              <div className="hero-stats-mini">
                <span className="split-stat"><strong>5%</strong> Final Moisture</span>
                <span className="split-stat"><strong>12+ Months</strong> Shelf Life</span>
                <span className="split-stat"><strong>Food Grade</strong> SS304 Steel</span>
                <span className="split-stat"><strong>Industrial</strong> Capacity</span>
              </div>

              <div className="hero-cta">
                <a
                  href="https://wa.me/1234567890?text=Hello%2C%20I%20am%20interested%20in%20CALOR%20MEGA.%20Can%20I%20get%20more%20details%3F"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-white shadow-soft transition-transform hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="text-xl" /> Get a Custom Quote
                </a>
                <button
                  onClick={scrollToDatasheet}
                  className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface/60 backdrop-blur-md px-6 py-3 font-semibold text-primary-text shadow-soft transition-transform hover:scale-105"
                >
                  View Specs <FaArrowRight />
                </button>
              </div>
            </div>
          </div>

          {/* Animated Scroll Down Chevron Arrow */}
          <div
            className="scroll-chevron"
            onClick={scrollToDatasheet}
            role="button"
            aria-label="Scroll to technical specifications"
            tabIndex={0}
          />
        </section>
      </div>

      {/* Fixed UI Overlays grouped by phase */}
      <div id="fixed-ui-overlay">
        {/* Phase 1 */}
        <div className="phase-group phase-1-group">
          <div className="card-column left">
            <div className="ui-card">
              <h4>SS 304 Stainless Steel Shell</h4>
              <p>10x10 foot premium food-grade construction. Zero contamination.</p>
            </div>
            <div className="ui-card">
              <h4>Thermal Insulation</h4>
              <p>High-density foam retains 99% of internal heat for maximum energy efficiency.</p>
            </div>
          </div>
          <div className="card-column right">
            <div className="ui-card">
              <h4>Siemens PLC Control</h4>
              <p>Precision PID temperature and humidity control via 10" HMI interface.</p>
            </div>
          </div>
        </div>

        {/* Phase 2 */}
        <div className="phase-group phase-2-group">
          <div className="card-column left">
            <div className="ui-card">
              <h4>Electric Heating Elements</h4>
              <p>Rapid thermal induction reaching optimal drying temperatures in minutes.</p>
            </div>
            <div className="ui-card">
              <h4>Precision Thermal Probes</h4>
              <p>Multi-point temperature sensing ensures absolute thermal consistency.</p>
            </div>
          </div>
          <div className="card-column right">
            <div className="ui-card">
              <h4>360° Cross-Flow Airflow</h4>
              <p>Guarantees perfectly uniform dehydration across every single tray level.</p>
            </div>
          </div>
        </div>

        {/* Phase 3 */}
        <div className="phase-group phase-3-group">
          <div className="card-column left">
            <div className="ui-card">
              <h4 className="text-accent">Precision Command Center</h4>
              <p>Industrial-grade digital controllers and fail-safe analog pressure gauges put you in total control.</p>
            </div>
          </div>
          <div className="card-column right">
            <div className="ui-card">
              <h4 className="text-accent">Real-time Humidity Sensors</h4>
              <p>Continuously monitors internal moisture levels to dynamically adjust airflow and maintain the climate.</p>
            </div>
          </div>
        </div>

        {/* Phase 4 */}
        <div className="phase-group phase-4-group">
          <div className="card-column left">
            <div className="ui-card">
              <h4 className="text-whatsapp">Smart Moisture Exhaust</h4>
              <p>Automated top-venting system expels humidity while retaining thermal energy for maximum processing speed.</p>
            </div>
          </div>
          <div className="card-column right">
            <div className="ui-card">
              <h4 className="text-whatsapp">Maximum Efficiency</h4>
              <p>Engineered with dual ventilation grilles to optimize cross-flow aerodynamics. Superior heat retention translates to faster ROI.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Data Sheet Section */}
      <section id="datasheet" className="datasheet-section">
        <div className="mx-auto max-w-6xl px-6">
          <div className="datasheet-header">
            <div className="engineering-label">Engineering Specs</div>
            <h2>Technical Data Sheet</h2>
            <div className="system-params">CALOR MEGA Batch System Parameters</div>
          </div>

          <table className="specs-table">
            <thead>
              <tr>
                <th>Specification Category</th>
                <th>Engineering Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Construction</td>
                <td>Double-walled heavy gauge Stainless Steel (SS304 outer/inner, optional SS316 internal chamber for high-acid produce). Reinforced structural framing.</td>
              </tr>
              <tr>
                <td>Thermal Insulation</td>
                <td>75mm high-density rockwool / mineral wool insulation, minimizing heat dissipation and casing temperature.</td>
              </tr>
              <tr>
                <td>Control System</td>
                <td>Microprocessor-based PID Digital Controller with dual displays for PV (Process Value) and SV (Set Value). Dynamic Pt100 RTD sensor.</td>
              </tr>
              <tr>
                <td>Capacity Range</td>
                <td>Standard industrial configurations of 50 kg, 100 kg, 200 kg, 500 kg, and custom 1000+ kg continuous batch processing setups.</td>
              </tr>
              <tr>
                <td>Drying Trays</td>
                <td>Removable SS304 mesh tray racks. Wire mesh spacing customized for tiny seeds, herbs, or large fruit chunks.</td>
              </tr>
              <tr>
                <td>Heating Method</td>
                <td>Finned stainless steel armored electric heating elements, with support for steam heating coils or hot water heat exchangers.</td>
              </tr>
              <tr>
                <td>Airflow System</td>
                <td>Direct-drive, dynamically balanced axial flow fans with high-temperature resistance and adjustable speed control for tailored laminar airflow.</td>
              </tr>
              <tr>
                <td>Temperature Range</td>
                <td>Ambient to 90°C, adjustable with ±1°C accuracy. Built-in thermal safety override cut-off.</td>
              </tr>
              <tr>
                <td>Humidity Control</td>
                <td>Active electronic humidity transmitter. Automated electric actuator dampers for exhaust air evacuation.</td>
              </tr>
              <tr>
                <td>Installation & Service</td>
                <td>Factory-assembled skid-mounted design for rapid commissioning. Simple three-phase electrical input connection.</td>
              </tr>
            </tbody>
          </table>

          {/* Download Brochure CTA */}
          <div className="download-cta">
            <div className="download-cta-icon">
              <FaFileDownload />
            </div>
            <div className="download-cta-text">
              <h3>Technical Blueprints & Brochure</h3>
              <p>Download full dimensional drawings, wiring guides, power ratings, and tray loading density sheets.</p>
            </div>
            <a
              href="/assets/downloads/CALOR_MEGA_Specs.pdf"
              download="CALOR_MEGA_Specs.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-white shadow-soft transition-transform hover:scale-105"
            >
              <FaFileDownload /> Download PDF Specs
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
