import React, { useState } from "react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { UserIcon, ChevronDownIcon, MenuIcon, XIcon } from "lucide-react";
import { Link } from "react-router-dom";

const headerData = {
  logo: { name: "MyCMS", link: "/" },
  navLinks: [
    { name: "Posts", link: "/posts" },
    { name: "Categories", link: "/categories" },
    { name: "Tags", link: "/tags" },
  ],
  userMenu: ["Profile", "Settings", "Logout"],
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-black text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to={headerData.logo.link}
          className="text-3xl font-extrabold tracking-tight hover:text-gray-300 transition-colors duration-300"
        >
          {headerData.logo.name}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {headerData.navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className="relative group text-white font-medium hover:text-gray-300 transition-colors duration-300"
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Right-side Buttons */}
        <div className="flex items-center gap-4">
          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="hidden md:flex items-center gap-2 text-white hover:bg-gray-900 transition-colors duration-300">
                <UserIcon className="w-5 h-5" />
                Admin
                <ChevronDownIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-black rounded-lg shadow-xl min-w-[160px]">
              {headerData.userMenu.map((item) => (
                <DropdownMenuItem
                  key={item}
                  className="hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer px-4 py-2 rounded-md"
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Hamburger */}
          <Button
            variant="ghost"
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black px-6 py-4 space-y-4 border-t border-gray-700">
          {headerData.navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className="block text-white font-medium hover:text-gray-300 transition-colors duration-300"
              onClick={() => setMobileOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {headerData.userMenu.map((item) => (
            <Button
              key={item}
              variant="ghost"
              className="w-full justify-start px-0 text-left text-white hover:bg-gray-800 transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </Button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
