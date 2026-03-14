import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [loading, setLoading] = useState(true);
  const [videoFormat, setVideoFormat] = useState({});
  const [backgroundIndex, setBackgroundIndex] = useState(1);

  const totalVideos = 4;
  const nextVdRef = useRef(null);
  const mainVideoRef = useRef(null);
  const miniVideoRef = useRef(null);

  // Get video source with fallback
  const getVideoSrc = (index, format = 'webm') => {
    return `videos/hero-${index}.${format}`;
  };

  // Only hide loader when the main background video (hero-1) is ready
  const handleMainVideoLoad = () => {
    setLoading(false);
  };

  // Handle video error with fallback to MP4
  const handleVideoError = (e, index, videoRef, isMain = false) => {
    const currentFormat = videoFormat[index] || 'webm';
    
    if (currentFormat === 'webm') {
      setVideoFormat(prev => ({ ...prev, [index]: 'mp4' }));
      if (videoRef && videoRef.current) {
        videoRef.current.src = getVideoSrc(index, 'mp4');
        videoRef.current.load();
      }
    } else {
      console.error(`Both formats failed for video ${index}`);
      // If main video fails entirely, still remove loader
      if (isMain) setLoading(false);
    }
  };

  // Force loading to stop after timeout (safety net)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn("Video loading timeout - forcing content display");
        setLoading(false);
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [loading]);

  // Preload and start playing the next video when it changes
  useEffect(() => {
    if (nextVdRef.current && !loading) {
      nextVdRef.current.currentTime = 0;
      nextVdRef.current.play().catch(err => {
        if (err.name !== 'AbortError') {
          console.warn("Video preload play failed:", err);
        }
      });
    }
  }, [currentIndex, loading]);

  // Handle mini video click
  const handleMiniVdClick = () => {
    setHasClicked(true);
    setShowHint(false);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  // GSAP animation for video transition
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        
        // Animate the next video expanding to full screen
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onComplete: () => {
            // Update background video AFTER transition completes
            setBackgroundIndex(currentIndex);
          }
        });
        
        // Animate the mini video shrinking
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  // GSAP animation for scroll-triggered clip-path
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div id="hero" className="relative h-dvh w-screen overflow-x-hidden">
      {/* Loading Screen */}
      {loading && (
        <div className="flex-center absolute z-100 h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {/* Main Video Frame */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          {/* Mini Video Preview (Clickable) */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                onMouseEnter={() => setShowHint(false)}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={miniVideoRef}
                  src={getVideoSrc(
                    (currentIndex % totalVideos) + 1,
                    videoFormat[(currentIndex % totalVideos) + 1] || 'webm'
                  )}
                  loop
                  muted
                  playsInline
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onError={(e) => handleVideoError(e, (currentIndex % totalVideos) + 1, miniVideoRef)}
                  preload="none"
                />
              </div>
            </VideoPreview>

            {/* Hover Hint Animation */}
            {showHint && (
              <div className="absolute-center pointer-events-none absolute z-60">
                <div className="relative">
                  <div className="size-16 rounded-full border-[3px] border-blue-100/70 animate-pulse" />
                  <div
                    className="absolute top-1/2 left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-blue-100/50 animate-ping"
                    style={{ animationDuration: "2s" }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Next Video (Hidden, for transition) - Pre-playing */}
          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex, videoFormat[currentIndex] || 'webm')}
            loop
            muted
            playsInline
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onError={(e) => handleVideoError(e, currentIndex, nextVdRef)}
            preload="none"
          />

          {/* Main Background Video */}
          <video
            ref={mainVideoRef}
            src={getVideoSrc(
              backgroundIndex === totalVideos - 1 ? 1 : backgroundIndex,
              videoFormat[backgroundIndex === totalVideos - 1 ? 1 : backgroundIndex] || 'webm'
            )}
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleMainVideoLoad}
            onError={(e) => handleVideoError(e, backgroundIndex === totalVideos - 1 ? 1 : backgroundIndex, mainVideoRef, true)}
            preload="auto"
          />
        </div>

        {/* Heading Overlay (Inside Frame) */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          e<b>d</b>ger<b>un</b>ners
        </h1>

        {/* Content Overlay */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              c<b>y</b>berp<b>u</b>nk
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Live loud. <br /> Die legendary.
            </p>

            <a
              href="https://www.youtube.com/watch?v=JtqIas3bYhg&t=28s"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                id="watch-trailer"
                title="Watch trailer"
                leftIcon={<TiLocationArrow />}
                containerClass="bg-yellow-300 flex-center gap-1"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Heading Outside Frame */}
      <div className="absolute left-0 top-0 z-0 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-black">
              c<b>y</b>berp<b>u</b>nk
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-black">
              Live loud. <br /> Die legendary.
            </p>

            <a
              href="https://www.youtube.com/watch?v=JtqIas3bYhg&t=28s"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                id="watch-trailer"
                title="Watch trailer"
                leftIcon={<TiLocationArrow />}
                containerClass="bg-black flex-center gap-1"
              />
            </a>
          </div>
        </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        e<b>d</b>ger<b>un</b>ners
      </h1>
    </div>
  );
};

export default Hero;