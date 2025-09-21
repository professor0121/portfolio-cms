import React from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Link } from "react-router-dom";



const Footer = () => {
  const footerData = {
    sections: [
      {
        title: "Company",
        links: [
          { name: "About Us", link: "/about" },
          { name: "Careers", link: "/careers" },
          { name: "Blog", link: "/blog" },
        ],
      },
      {
        title: "Support",
        links: [
          { name: "Help Center", link: "/help" },
          { name: "Contact Us", link: "/contact" },
          { name: "Privacy Policy", link: "/privacy" },
        ],
      },
      {
        title: "Social",
        links: [
          { name: "Twitter", link: "https://twitter.com" },
          { name: "LinkedIn", link: "https://linkedin.com" },
          { name: "GitHub", link: "https://github.com" },
        ],
      },
    ],
    copyright: "© 2025 MyCMS. All rights reserved.",
  };

  return (
    <footer className="bg-black text-white mt-10">
      <Card className="bg-black border-none text-white rounded-none p-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sections */}
          {footerData.sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.link}
                      className="hover:text-gray-400 transition-colors duration-300"
                      target={link.link.startsWith("http") ? "_blank" : "_self"}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter / Subscription */}
          <div>
            <h3 className="text-lg font-bold mb-4">Subscribe</h3>
            <p className="text-gray-400 mb-4">Get our latest updates via email</p>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                className="bg-gray-900 text-white placeholder-gray-400"
              />
              <Button className="bg-white text-black hover:bg-gray-200 mt-2">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
          {footerData.copyright}
        </div>
      </Card>
    </footer>
  );
};

export default Footer;
