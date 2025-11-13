import React from "react";
import BlurText from "./BlurText";
import Orb from "./Orb";
import logo from "../assets/book.svg"; 

const Banner = () => {
  return (
    <div className="max-w-7xl  mx-auto ">
      <div style={{ width: "100%", height: 600, position: "relative" }}>
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        >
          <div className="w-full h-full flex md:mt-0 mt-50  flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-6 flex-1">
              <BlurText
                text="Your Next Chapter Awaits"
                delay={150}
                animateBy="letter"
                direction="top"
                className="text-3xl md:text-5xl font-bold leading-tight"
              />
              <BlurText
                text="Explore timeless stories, cozy reads, and new adventures at your modern bookstore."
                delay={150}
                animateBy="words"
                direction="bottom"
                className="text-base md:text-xl max-w-2xl"
              />

              <div className="flex gap-3">
               
                <button className="btn bg-amber-800 pointer-events-auto">All Books</button>
                <button className="btn border border-amber-800 hover:bg-amber-800 pointer-events-auto">
                  Create Book
                </button>
              </div>
            </div>

            <div className="flex-shrink-0 hidden md:block">
              <img
                className="w-32 md:w-138 select-none pointer-events-auto"
                src={logo}
                alt="Bookstore logo"
                role="img"
              />

              
            </div>
            
          </div>
          <div className="bg-amber-200 hidden md:block w-full h-15 blur absolute"></div>
        </Orb>
      </div>
    </div>
  );
};

export default Banner;
