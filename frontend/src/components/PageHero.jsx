import React from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

// Props: heading, subheading, image, cta
const PageHero = ({ heading, subheading, image, cta }) => {
  return (
    <section
      className="relative bg-black text-white"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="container mx-auto px-6 py-32 relative z-10 text-center md:text-left">
        {heading && (
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{heading}</h1>
        )}
        {subheading && (
          <p className="text-lg md:text-xl text-gray-200 mb-6">{subheading}</p>
        )}
        {cta && cta.text && cta.link && (
          <Button
            asChild
            className="bg-white text-black hover:bg-gray-200 transition-colors duration-300 px-6 py-3 font-semibold"
          >
            <Link to={cta.link}>{cta.text}</Link>
          </Button>
        )}
      </div>
    </section>
  );
};

export default PageHero;
