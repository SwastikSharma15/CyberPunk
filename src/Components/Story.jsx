import React, { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import RoundedCorners from "./RoundedCorners";
import Button from "./Button";

const Story = () => {

	const frameRef = useRef('null');
	const handelMouseLeave = () => {
		const element = frameRef.current;

		gsap.to(element, {
			duration: 0.3,
			rotateX: 0,
			rotateY: 0,
			ease: 'power1.inOut'
		})

	}

	const handelMouseMove = (e) => {
		const {clientX, clientY} = e;
		const element = frameRef.current;

		if(!e) return;

		const rect = element.getBoundingClientRect();
		const x = clientX - rect.left;
		const y = clientY - rect.top;

		const centerX = rect.width /2;
		const centerY = rect.height / 2;

		const rotateX = ((y-centerY) / centerY) * -10;
		const rotateY = ((x-centerX) / centerX) * 10;

		gsap.to(element, {
			duration: 0.3,
			rotateX, rotateY,
			transformPerspective: 500,
			ease: 'power1.inOut'
		})
	}

  return (
    <section className="min-h-dvh w-screen bg-black text-blue-50">
			<div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          the city that takes everything
        </p>
				<div className="relative size-full">
          <AnimatedTitle
            title="There are no <br /> happy endings <br /> in Night City"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />
					<div className="story-img-container ">
						<div className="story-img-mask">
							<div className="story-img-content">
								<img 
									ref={frameRef}
									src="/img/entrance.jpg" 
									alt="entrance"
									className="object-contain ml-10"
									onMouseLeave={handelMouseLeave}
									onMouseUp={handelMouseLeave}
									onMouseEnter={handelMouseLeave}
									onMouseMove={handelMouseMove}
									/>
							</div>
						</div>
						<RoundedCorners />
					</div>
				</div>
				<div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
					<div className="flex h-full w-fit flex-col items-center md:items-start">
						<p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
							Edgerunners tells a standalone, 10-episode story about a street kid — David — trying to survive in Night City, a technology and body modification-obsessed city of the future. Having everything to lose, he chooses to stay alive by becoming an edgerunner—a mercenary outlaw also known as a cyberpunk.
						</p>
						<a
              href="https://cyberpunk.fandom.com/wiki/Cyberpunk:_Edgerunners"
              target="_blank"
            >
              <Button
                id="realm-button"
                title="discover prologue"
                containerClass="mt-5"
              />
            </a>
					</div>
				</div>
			</div>
		</section>
  );
};

export default Story;
