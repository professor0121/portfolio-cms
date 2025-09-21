import React from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

// Example data object for hero
const heroData = {
  heading: "Welcome to MyCMS",
  subheading: "Manage your posts, categories, and tags effortlessly with our modern CMS dashboard.",
  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80",
  cta: { text: "Get Started", link: "/posts/create" },
};

const HomeHero = () => {
  return (
    <section
      className="relative bg-black text-white"
      style={{
        backgroundImage: `url(${heroData.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="container mx-auto px-6 py-32 relative z-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          {heroData.heading}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6">
          {heroData.subheading}
        </p>
        <Button
          asChild
          className="bg-white text-black hover:bg-gray-200 transition-colors duration-300 px-6 py-3 font-semibold"
        >
          <Link to={heroData.cta.link}>{heroData.cta.text}</Link>
        </Button>
      </div>
    </section>
  );
};

export default HomeHero;
