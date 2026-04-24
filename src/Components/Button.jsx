import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Button = ({ title, id, rightIcon, leftIcon, containerClass, onClick }) => {
  const textTopRef = useRef(null);
  const textBottomRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const textTop = textTopRef.current;
    const textBottom = textBottomRef.current;

    // Set initial state for bottom text letters
    gsap.set(textBottom.children, {
      yPercent: 150,
      opacity: 0
    });

    const handleMouseEnter = () => {
      const tl = gsap.timeline();

      // Text slide up animation (top text goes up and fades with stagger)
      tl.to(textTop.children, {
        yPercent: -150,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.01
      }, 0);

      // Text slide up animation (bottom text comes up with stagger)
      tl.to(textBottom.children, {
        yPercent: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.01
      }, 0);
    };

    const handleMouseLeave = () => {
      const tl = gsap.timeline();

      // Reset text positions with stagger
      tl.to(textTop.children, {
        yPercent: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.01
      }, 0);

      tl.to(textBottom.children, {
        yPercent: 150,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.01
      }, 0);
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Split title into individual letters wrapped in spans
  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} className="inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <button
      id={id}
      ref={buttonRef}
      onClick={onClick}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        {/* Top text (default visible) */}
        <div ref={textTopRef} className="flex">
          {splitText(title)}
        </div>
        
        {/* Bottom text (hidden, slides up on hover) */}
        <div ref={textBottomRef} className="absolute inset-0 flex">
          {splitText(title)}
        </div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;