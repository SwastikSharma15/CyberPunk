import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {

  useGSAP(() => {
    // Refresh ScrollTrigger after images load
    const images = document.querySelectorAll('img');
    let imagesLoaded = 0;
    
    const checkAllImagesLoaded = () => {
      imagesLoaded++;
      if (imagesLoaded === images.length) {
        ScrollTrigger.refresh();
      }
    };

    images.forEach(img => {
      if (img.complete) {
        checkAllImagesLoaded();
      } else {
        img.addEventListener('load', checkAllImagesLoaded);
      }
    });

    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });

    // Additional refresh after a short delay to ensure everything is rendered
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  });

  return (
    <div id="about" className="min-h-screen w-screen ">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Night City
        </h2>
        
        <AnimatedTitle
          title="<b>w</b>elco<b>m</b>e t<b>o</b> the <b>n</b>e<b>o</b>n b<b>a</b>ttlegroun<b>d</b> <br /> w<b>h</b>ere e<b>v</b>ery <b>u</b>pgra<b>d</b>e c<b>u</b>ts a little <b>d</b>eeper"
          containerClass="mt-5 !text-black text-center special-font"
        />

        <div className="about-subtext">
          <p>
            She dreamed of the moon. He became the reason she still believed.
          </p>
          <p>
            But in Night City, dreams always demand blood.
          </p>
        </div>
      </div>
      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image" >
          <img src="img/about.png" 
            alt="background"
            loading="eager"
            className="absolute left-0 top-0 size-full object-cover" 
          />
        </div>

      </div>
    </div>
  );
};

export default About;
