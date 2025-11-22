import React, { useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

const BentoTilt = ({children, className= ''}) => {

  const [transformStyle, setTransformStyle] = useState('');
  const itemRef = useRef();

  const handleMouseMove = (e) => {
    if(!itemRef.current) return;

    const {left, top,width, height} = itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left ) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`
    
    setTransformStyle(newTransform)
  }

  const handleMouseLeave = () => {
    setTransformStyle('');
  }

  return (
    <div ref={itemRef} className={className} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{transform: transformStyle}}>
      {children}
    </div>
  )
}

const BentoCard = ({ title, src, description }) => {
  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="prologue" className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Into Night City’s Shadows
          </p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Step into a relentless world fueled by tech, betrayal, and survival—where every choice pulls you deeper into the chaos of the streets and the corps above.
          </p>
        </div>
        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="videos/feature-1.webm"
            title={
              <>
                <b>n</b>ight City
              </>
            }
            description="A neon-soaked journey through Night City, where every upgrade costs more than chrome."
            isComingSoon={true}
          />
        </BentoTilt>
        <div className="grid w-full gap-7 grid-cols-1 md:h-[135vh] md:grid-cols-2 md:grid-rows-3">
          <BentoTilt className="bento-tilt_1 h-[65vh] w-full md:h-auto md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/feature-2.webm"
              title={
                <>
                  meet l<b>u</b>cy
                </>
              }
              description="Lucy drifts through Night City with a guarded heart, balancing lethal skill with a quiet yearning to escape its grip."
              isComingSoon
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_1 w-10/12 h-[32vh] ml-auto md:h-auto md:col-span-1">
            <BentoCard
              src="videos/feature-3.webm"
              title={
                <>
                  e<b>d</b>ger<b>un</b>ners
                </>
              }
              description="A crew of cyberpunks tearing through Night City’s chaos, chasing freedom in a system built to crush them."
              isComingSoon
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_1 w-10/12 h-[32vh] mr-auto md:h-auto md:col-span-1 ">
            <BentoCard
              src="videos/feature-4.webm"
              title={
                <>
                  neon-so<b>a</b>ked beats
                </>
              }
              description="A mix of synth, sorrow, and adrenaline that defines every moment in Night City."
              isComingSoon
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_2 h-[36vh] md:h-auto">
            <div className="relative size-full flex flex-col justify-between p-5 bg-transparent">
              <h1 className="absolute top-5 left-5 z-20 bento-title special-font text-[#ffff00]">
                N<b>o</b>w <br /> strea<b>m</b>ing <br /> o<b>n</b>ly o<b>n</b> <br /> <b>n</b>etflix!
              </h1>

              <video
                src="videos/feature-6.webm"
                loop
                muted
                autoPlay
                className="w-full h-auto mt-4 object-cover rounded-xl"
              />
            </div>
          </BentoTilt>
          <BentoTilt className="bento-tilt_2 h-[36vh] md:h-auto ">
            <video
              src="videos/feature-5.webm"
              loop
              muted
              autoPlay
              className="size-full object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
