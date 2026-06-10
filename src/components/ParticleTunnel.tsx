import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PARTICLE_COUNT = 1800;

export function ParticleTunnel() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x130b07, 0.032);

    const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 120);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    const colorA = new THREE.Color('#d6a96b');
    const colorB = new THREE.Color('#7f9870');
    const colorC = new THREE.Color('#f0d4a0');

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const i3 = i * 3;
      const lane = i % 6;
      const depth = (i / PARTICLE_COUNT) * 72;
      const twist = depth * 0.72 + lane * 1.05;
      const radius = 1.15 + Math.sin(depth * 0.28 + lane) * 0.55 + lane * 0.09;

      positions[i3] = Math.cos(twist) * radius;
      positions[i3 + 1] = Math.sin(twist) * radius * 0.72;
      positions[i3 + 2] = -depth;

      const mixed = colorA.clone().lerp(lane % 3 === 0 ? colorB : colorC, (i % 100) / 100);
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.74,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const clock = new THREE.Clock();
    let animationFrame = 0;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      points.rotation.z = elapsed * 0.035;
      points.rotation.y = Math.sin(elapsed * 0.18) * 0.08;
      camera.position.x = Math.sin(elapsed * 0.22) * 0.28;
      camera.position.y = Math.cos(elapsed * 0.18) * 0.16;

      const pos = geometry.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        const zIndex = i * 3 + 2;
        positions[zIndex] += 0.035;

        if (positions[zIndex] > 8) {
          positions[zIndex] = -64;
        }
      }

      pos.needsUpdate = true;
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const scrollTween = gsap.to(points.rotation, {
      x: 0.5,
      y: 0.42,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.4,
      },
    });

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      scrollTween.kill();
      cancelAnimationFrame(animationFrame);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="pointer-events-none fixed inset-0 z-0 opacity-80" aria-hidden="true" />;
}