import React from "react";
import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const ImageClipBox = ({ src, clipClass }) => {
  return (
    <div className={clipClass}>
      <img src={src} />
    </div>
  );
};

const Contact = () => {
  return (
    <div id="credits" className="my-20 min-h-96 w-screen  px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-1.png"
            clipClass="contact-clip-path-1 scale-90"
          />
          <ImageClipBox
            src="/img/contact-2.jpg"
            clipClass="contact-clip-path-2 -translate-y-20 scale-120"
          />
        </div>
        <div className="absolute -top-20 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            clipClass="sword-man-clip-path md:scale-135"
            src="img/swordman.png"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 --font-family-general text-[10px] uppercase">
            Creativity Meets Innovation
          </p>
          <AnimatedTitle
            title="Inspired by <br /> Cyberpunk Edgerunners <br /> Designed Like Zentry"
            className="--font-family-zentry !md:text-[6.2rem] w-full  text-5xl leading-[0.9] md:text-[6rem] bento-title special-font"
          />
          <Button 
            title='Made with Love for Lucy' 
            containerClass='mt-10 cursor-pointer' />
        </div>
      </div>
    </div>
  );
};
export default Contact;
