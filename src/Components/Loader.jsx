import React, { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { DotLottiePlayer } from '@dotlottie/react-player';

const Loader = ({ isLoaded, onComplete }) => {
  const containerRef = useRef(null);
  const rocketRef = useRef(null);

  useGSAP(() => {
    // Twinkle stars
    gsap.to('.star', {
      opacity: (i) => 0.2 + Math.random() * 0.8,
      scale: (i) => 0.8 + Math.random() * 0.4,
      duration: (i) => 2 + Math.random() * 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.1,
    });

    // Softly drift stars
    gsap.to('.star', {
      x: () => -20 + Math.random() * 120,
      y: () => -20 + Math.random() * 120,
      duration: (i) => 6 + Math.random() * 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Animate rocket from bottom to mid-top
    gsap.fromTo(
      rocketRef.current,
      { y: '100vh', scale: 0.5 },
      {
        y: '-10vh',
        scale: 1,
        duration: 3,
        ease: 'power2.out',
      }
    );

    // Subtle moon glow
    gsap.to('.moon-glow', {
      opacity: 0.8,
      scale: 1.1,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, { scope: containerRef });

  // Exit animation triggered when isLoaded becomes true
  useGSAP(() => {
    if (isLoaded) {
      const tl = gsap.timeline({
        onComplete: onComplete,
      });

      // Rocket shoots up further for parallax effect
      tl.to(rocketRef.current, {
        y: '-100vh',
        duration: 1.2,
        ease: 'power2.in',
      }, 0);

      // Entire loader slides up
      tl.to(containerRef.current, {
        y: '-100vh',
        duration: 1.2,
        ease: 'power2.inOut',
      }, 0.2); // slight delay

      // Parallax effect for stars (they move up slightly slower or faster, creating depth)
      tl.to('.star', {
        y: '30vh', // Relative to the container sliding up
        duration: 1.2,
        ease: 'power2.inOut',
      }, 0.4);
    }
  }, [isLoaded]);

  // Generate random stars once
  const stars = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
    }));
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[100] h-dvh w-screen overflow-hidden bg-black"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B1A] to-[#1A1A3A] opacity-90" />

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
          }}
        />
      ))}

      {/* Moon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="moon-glow absolute inset-0 size-64 rounded-full bg-blue-400 blur-[80px] opacity-50" />
        <div className="relative size-64 rounded-full bg-gradient-to-br from-gray-100 to-gray-400 shadow-[0_0_60px_rgba(255,255,255,0.4)] overflow-hidden">
          {/* Craters */}
          <div className="absolute top-[20%] left-[20%] size-12 rounded-full bg-gray-300 opacity-40 shadow-inner" />
          <div className="absolute top-[50%] left-[60%] size-16 rounded-full bg-gray-300 opacity-30 shadow-inner" />
          <div className="absolute top-[70%] left-[30%] size-8 rounded-full bg-gray-300 opacity-50 shadow-inner" />
        </div>
      </div>

      {/* Rocket */}
      <div className="flex-center absolute inset-0 z-10">
        <div ref={rocketRef} className="w-[150px] h-[150px] md:w-[250px] md:h-[250px]">
          <DotLottiePlayer
            src="/loader/Loading rocket.lottie"
            autoplay
            loop
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
