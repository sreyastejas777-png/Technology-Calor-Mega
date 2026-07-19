import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaFileDownload, FaWhatsapp, FaArrowRight, FaCog, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';
import './Technology.css';

gsap.registerPlugin(ScrollTrigger);

export default function Technology() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ─── THREE.JS SCENE SETUP ───
    const scene = new THREE.Scene();
    const isDark = document.documentElement.classList.contains('dark');
    const bgHex = isDark ? 0x0c0c0e : 0xFEFAF1;
    scene.background = new THREE.Color(bgHex);
    scene.fog = new THREE.FogExp2(bgHex, 0.03);

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

    // ─── MATERIALS ───
    const matBody = new THREE.MeshStandardMaterial({ color: 0x8a8c8e, metalness: 0.4, roughness: 0.6 });
    const matDoor = new THREE.MeshStandardMaterial({ color: 0x909295, metalness: 0.35, roughness: 0.5 });
    const matBrushedSteel = new THREE.MeshStandardMaterial({ color: 0xd0d0d0, metalness: 0.9, roughness: 0.2 });
    const matInterior = new THREE.MeshStandardMaterial({ color: 0xe0d8ba, metalness: 0.6, roughness: 0.3 });
    const matTray = new THREE.MeshStandardMaterial({ color: 0xbcbcbc, metalness: 0.9, roughness: 0.2, transparent: true, opacity: 0.85 });
    const matDisplayBg = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.3, roughness: 0.5 });
    const matDisplayLED = new THREE.MeshStandardMaterial({ color: 0xe09f3e, emissive: 0xe09f3e, emissiveIntensity: 2.0 });
    const matPipe = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.85, roughness: 0.2 });
    const matWheel = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.3, roughness: 0.7 });

    // ─── MACHINE GEOMETRY ───
    const machineGroup = new THREE.Group();
    scene.add(machineGroup);

    const BODY_W = 3.6, BODY_H = 4.8, BODY_D = 3.2, WALL = 0.08, PANEL_W = 0.35;
    const DOOR_W = (BODY_W - PANEL_W) / 2;
    const DOOR_H = BODY_H * 0.65;
    const DOOR_D = 0.06;

    // Main Outer Shell
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

    // Doors & Pivots
    const doorY = BODY_H * 0.42;
    const doorZ = BODY_D / 2 - DOOR_D / 2;

    const leftDoorPivot = new THREE.Group();
    leftDoorPivot.position.set(-BODY_W / 2 + WALL, doorY, doorZ);
    machineGroup.add(leftDoorPivot);

    const leftDoor = new THREE.Mesh(new THREE.BoxGeometry(DOOR_W, DOOR_H, DOOR_D), matDoor);
    leftDoor.position.set(DOOR_W / 2, 0, 0);
    leftDoorPivot.add(leftDoor);

    const rightDoorPivot = new THREE.Group();
    rightDoorPivot.position.set(BODY_W / 2 - WALL, doorY, doorZ);
    machineGroup.add(rightDoorPivot);

    const rightDoor = new THREE.Mesh(new THREE.BoxGeometry(DOOR_W, DOOR_H, DOOR_D), matDoor);
    rightDoor.position.set(-DOOR_W / 2, 0, 0);
    rightDoorPivot.add(rightDoor);

    // Internal Trays
    const TRAY_COUNT = 8;
    const trayGeo = new THREE.BoxGeometry(DOOR_W * 0.85, 0.03, BODY_D * 0.75);
    const traysLeft = [];
    const traysRight = [];

    for (let i = 0; i < TRAY_COUNT; i++) {
      const ty = BODY_H * 0.12 + i * (DOOR_H * 0.85 / TRAY_COUNT);

      const trayL = new THREE.Mesh(trayGeo, matTray);
      trayL.position.set(-BODY_W / 4, ty, 0);
      machineGroup.add(trayL);
      traysLeft.push(trayL);

      const trayR = new THREE.Mesh(trayGeo, matTray);
      trayR.position.set(BODY_W / 4, ty, 0);
      machineGroup.add(trayR);
      traysRight.push(trayR);
    }

    // Center Control Panel
    const panelGeo = new THREE.BoxGeometry(PANEL_W, DOOR_H, DOOR_D * 1.5);
    const panel = new THREE.Mesh(panelGeo, matBrushedSteel);
    panel.position.set(0, doorY, doorZ + 0.02);
    machineGroup.add(panel);

    const screenGeo = new THREE.BoxGeometry(PANEL_W * 0.7, 0.4, 0.01);
    const screen = new THREE.Mesh(screenGeo, matDisplayBg);
    screen.position.set(0, doorY + 0.8, doorZ + DOOR_D + 0.01);
    machineGroup.add(screen);

    const ledMesh = new THREE.Mesh(new THREE.BoxGeometry(PANEL_W * 0.5, 0.05, 0.01), matDisplayLED);
    ledMesh.position.set(0, doorY + 0.8, doorZ + DOOR_D + 0.02);
    machineGroup.add(ledMesh);

    // Wheels
    [-BODY_W / 2.2, BODY_W / 2.2].forEach(x => {
      [-BODY_D / 2.2, BODY_D / 2.2].forEach(z => {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.12, 16), matWheel);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(x, -0.18, z);
        machineGroup.add(wheel);
      });
    });

    machineGroup.position.y = -1.0;
    machineGroup.rotation.y = -0.15;

    // ─── LIGHTING ───
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfffaed, 1.8);
    mainLight.position.set(6, 10, 8);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xdbe7ff, 0.8);
    fillLight.position.set(-6, 4, -4);
    scene.add(fillLight);

    const warmLight = new THREE.PointLight(0xe09f3e, 2, 8);
    warmLight.position.set(0, 2, 1);
    scene.add(warmLight);

    // ─── ANIMATION LOOP ───
    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // ─── RESIZE HANDLER ───
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ─── GSAP SCROLLTIMELINE SETUP ───
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1,
      }
    });

    // 3D Machine Camera & Component Animation Sequence
    heroTl.to(machineGroup.rotation, { y: Math.PI * 0.25, duration: 1 })
          .to(leftDoorPivot.rotation, { y: -Math.PI * 0.65, duration: 1 }, 0.5)
          .to(rightDoorPivot.rotation, { y: Math.PI * 0.65, duration: 1 }, 0.5)
          .to(traysLeft.map(t => t.position), { z: 0.8, duration: 1, stagger: 0.05 }, 1.2)
          .to(traysRight.map(t => t.position), { z: 0.8, duration: 1, stagger: 0.05 }, 1.2)
          .to(camera.position, { x: 0, y: 1.8, z: 7, duration: 1 }, 2)
          .to(machineGroup.rotation, { y: Math.PI * 2, duration: 1.5 }, 2.5);

    // Phase Overlay Toggle Triggers
    const phaseElements = document.querySelectorAll('.phase-group');
    phaseElements.forEach((el, idx) => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: `${(idx + 1) * 20}% top`,
        end: `${(idx + 2) * 20}% top`,
        onEnter: () => el.classList.add('active'),
        onLeave: () => el.classList.remove('active'),
        onEnterBack: () => el.classList.add('active'),
        onLeaveBack: () => el.classList.remove('active'),
      });
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      renderer.dispose();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="relative w-full bg-bg text-primary-text transition-colors duration-300">
      {/* WebGL 3D Canvas */}
      <canvas id="webgl-canvas" ref={canvasRef} />

      {/* Hero Section Container */}
      <div id="hero-scroll-container" ref={containerRef}>
        <section className="hero flex items-center justify-center">
          <div className="fixed-hero-wrapper">
            <div className="hero-center-block">
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
                <a
                  href="#datasheet"
                  className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface/60 backdrop-blur-md px-6 py-3 font-semibold text-primary-text shadow-soft transition-transform hover:scale-105"
                >
                  View Specs <FaArrowRight />
                </a>
              </div>
            </div>
          </div>
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
              <p>Continuously monitors internal moisture levels to dynamically adjust airflow and maintain the perfect climate.</p>
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
