import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ArtifactCanvasProps {
  className?: string;
}

export const CulturalArtifactCanvas: React.FC<ArtifactCanvasProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    setIsLowPower(isMobile || prefersReducedMotion);

    // Test WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 4.2);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 4. Lighting - warm terracotta and rich brass glints
    const ambientLight = new THREE.AmbientLight(0x241711, 2.5);
    scene.add(ambientLight);

    const brassKeyLight = new THREE.DirectionalLight(0xb08a45, 3.5);
    brassKeyLight.position.set(3, 4, 3);
    scene.add(brassKeyLight);

    const terracottaFill = new THREE.DirectionalLight(0xb65a3c, 2.0);
    terracottaFill.position.set(-3, -2, 2);
    scene.add(terracottaFill);

    // Ceremonial flame point light
    const flameLight = new THREE.PointLight(0xc08a32, 4.0, 5);
    flameLight.position.set(0, 0.6, 0);
    scene.add(flameLight);

    // 5. Artifact Group: Handcrafted Ceremonial Terracotta & Brass Vessel
    const artifactGroup = new THREE.Group();
    scene.add(artifactGroup);

    // Materials
    // Terracotta Clay Material
    const terracottaMaterial = new THREE.MeshStandardMaterial({
      color: 0x9b4830,
      roughness: 0.85,
      metalness: 0.05,
    });

    // Burnt Terracotta Core
    const burntClayMaterial = new THREE.MeshStandardMaterial({
      color: 0x6e2c1e,
      roughness: 0.9,
      metalness: 0.02,
    });

    // Aged Brass Material
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xc89e4b,
      roughness: 0.32,
      metalness: 0.82,
    });

    // Polished Ochre Accent
    const ochreAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xdd9e38,
      roughness: 0.45,
      metalness: 0.5,
    });

    // A. Base Pedestal (Terracotta & Brass trim)
    const baseGeo = new THREE.CylinderGeometry(0.7, 0.9, 0.25, isMobile ? 24 : 36);
    const baseMesh = new THREE.Mesh(baseGeo, terracottaMaterial);
    baseMesh.position.y = -0.9;
    artifactGroup.add(baseMesh);

    const baseRingGeo = new THREE.TorusGeometry(0.88, 0.04, 12, isMobile ? 24 : 48);
    const baseRing = new THREE.Mesh(baseRingGeo, brassMaterial);
    baseRing.rotation.x = Math.PI / 2;
    baseRing.position.y = -0.9;
    artifactGroup.add(baseRing);

    // B. Urn / Kalash Belly (Terracotta Earthenware)
    const bellyGeo = new THREE.SphereGeometry(0.85, isMobile ? 24 : 36, isMobile ? 18 : 28);
    bellyGeo.scale(1, 0.85, 1);
    const bellyMesh = new THREE.Mesh(bellyGeo, burntClayMaterial);
    bellyMesh.position.y = -0.2;
    artifactGroup.add(bellyMesh);

    // C. Traditional Brass Girdle with Intricate Geometric Studs
    const girdleRingGeo = new THREE.TorusGeometry(0.86, 0.035, 12, isMobile ? 24 : 48);
    const girdleRing = new THREE.Mesh(girdleRingGeo, brassMaterial);
    girdleRing.rotation.x = Math.PI / 2;
    girdleRing.position.y = -0.2;
    artifactGroup.add(girdleRing);

    const studCount = isMobile ? 12 : 20;
    const studGeo = new THREE.SphereGeometry(0.04, 8, 8);
    for (let i = 0; i < studCount; i++) {
      const angle = (i / studCount) * Math.PI * 2;
      const stud = new THREE.Mesh(studGeo, ochreAccentMaterial);
      stud.position.set(Math.cos(angle) * 0.87, -0.2, Math.sin(angle) * 0.87);
      artifactGroup.add(stud);
    }

    // D. Ceremonial Diya Bowl (Upper tiered chalice)
    const diyaBowlGeo = new THREE.CylinderGeometry(0.95, 0.35, 0.45, isMobile ? 24 : 36, 1, true);
    const diyaBowl = new THREE.Mesh(diyaBowlGeo, terracottaMaterial);
    diyaBowl.position.y = 0.45;
    artifactGroup.add(diyaBowl);

    // Fluted Brass Rim
    const rimGeo = new THREE.TorusGeometry(0.95, 0.055, 12, isMobile ? 24 : 48);
    const rimMesh = new THREE.Mesh(rimGeo, brassMaterial);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 0.67;
    artifactGroup.add(rimMesh);

    // Inner brass oil basin
    const basinGeo = new THREE.CylinderGeometry(0.88, 0.2, 0.1, isMobile ? 18 : 28);
    const basinMesh = new THREE.Mesh(basinGeo, brassMaterial);
    basinMesh.position.y = 0.55;
    artifactGroup.add(basinMesh);

    // E. Ceremonial Sacred Flame Core
    const flameCoreGeo = new THREE.ConeGeometry(0.18, 0.55, 16);
    const flameCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffe6a3,
      transparent: true,
      opacity: 0.92,
    });
    const flameMesh = new THREE.Mesh(flameCoreGeo, flameCoreMat);
    flameMesh.position.y = 0.88;
    artifactGroup.add(flameMesh);

    // Floating Golden Embers / Cultural Dust Particles
    const particleCount = isMobile ? 25 : 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const rad = 0.2 + Math.random() * 1.6;
      particlePositions[i * 3] = Math.cos(theta) * rad;
      particlePositions[i * 3 + 1] = -0.5 + Math.random() * 2.2;
      particlePositions[i * 3 + 2] = Math.sin(theta) * rad;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xe8d7b8,
      size: isMobile ? 0.04 : 0.05,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Position entire group slightly tilted for editorial drama
    artifactGroup.rotation.x = 0.22;

    // 6. Interaction & Parallax State
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = window.scrollY;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.targetX = (clientX / rect.width) * 2 - 1;
      mouse.targetY = -(clientY / rect.height) * 2 + 1;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // Handle Resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Subtle continuous rotation + scroll influence
      const scrollRotation = scrollY * 0.0018;
      artifactGroup.rotation.y = elapsedTime * 0.25 + scrollRotation + mouse.x * 0.35;
      artifactGroup.rotation.x = 0.22 + mouse.y * 0.2;

      // Subtle bobbing motion
      artifactGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.05;

      // Flame flicker
      const flicker = Math.sin(elapsedTime * 8) * 0.05 + Math.cos(elapsedTime * 14) * 0.03;
      flameMesh.scale.set(1 + flicker, 1 + flicker * 1.5, 1 + flicker);
      flameLight.intensity = 3.5 + flicker * 3;

      // Move key light with cursor
      brassKeyLight.position.x = 3 + mouse.x * 2;
      brassKeyLight.position.y = 4 + mouse.y * 2;

      // Slowly rotate particles
      particleSystem.rotation.y = elapsedTime * 0.06;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      resizeObserver.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      renderer.dispose();
      baseGeo.dispose();
      baseRingGeo.dispose();
      bellyGeo.dispose();
      girdleRingGeo.dispose();
      studGeo.dispose();
      diyaBowlGeo.dispose();
      rimGeo.dispose();
      basinGeo.dispose();
      flameCoreGeo.dispose();
      particleGeo.dispose();

      terracottaMaterial.dispose();
      burntClayMaterial.dispose();
      brassMaterial.dispose();
      ochreAccentMaterial.dispose();
      flameCoreMat.dispose();
      particleMat.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div
        className={`flex items-center justify-center border border-[#B08A45]/30 rounded-2xl bg-[#3A241B]/30 ${className}`}
      >
        <div className="text-center p-6">
          <div className="w-16 h-16 mx-auto rounded-full border border-[#B08A45] flex items-center justify-center text-[#C08A32] text-2xl font-serif">
            ✦
          </div>
          <p className="mt-3 text-xs tracking-widest text-[#D8C19A] uppercase font-cinzel">
            Ceremonial Artifact
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* 3D Canvas mount */}
      <div ref={containerRef} className="w-full h-full min-h-[360px] sm:min-h-[440px]" />

      {/* Floating brass caption */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none text-center whitespace-nowrap">
        <span className="text-[10px] font-cinzel tracking-[0.25em] text-[#B08A45]/80 uppercase bg-[#241711]/60 px-3 py-1 rounded-full border border-[#B08A45]/25 backdrop-blur-xs">
          Interactive Artifact • Drag & Rotate
        </span>
      </div>
    </div>
  );
};
