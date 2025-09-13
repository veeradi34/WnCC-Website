import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = ({ currentPage, setCurrentPage }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Add "Hello FOSS" to the navItems array
    const navItems = ["Home", "About", "Events", "Resources", "Blogs", "Team", "Contact", "Hello FOSS"];

    const handleNavClick = (page) => {
        setCurrentPage(page);
        setIsOpen(false);
    };

    return (
        <nav className="sticky top-0 bg-gray-900/80 backdrop-blur-lg border-b border-cyan-500/20 px-4 py-4 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img src="/WnCC.png" alt="WnCC Logo" className="w-8 h-8" />
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-cyan-400">Web & Coding Club</span>
                        <span className="text-xs text-gray-500">IIT Bombay</span>
                    </div>
                    <button
                        className="md:hidden ml-6 text-gray-300 hover:text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Desktop Navbar */}
                <div className="hidden md:flex gap-6">
                    {navItems.map((item) => (
                        <button
                            key={item}
                            onClick={() => handleNavClick(item)}
                            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${currentPage === item
                                ? "bg-cyan-500/20 text-cyan-400"
                                : "text-gray-300 hover:text-cyan-400"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile Navbar (Hamburger Menu) */}
            {isOpen && (
                <div className="absolute bg-gray-800/90 w-full left-0 top-full flex flex-col gap-4 p-4 border-t border-cyan-500/20">
                    {navItems.map((item) => (
                        <button
                            key={item}
                            onClick={() => handleNavClick(item)}
                            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${currentPage === item
                                ? "bg-cyan-500/20 text-cyan-400"
                                : "text-gray-300 hover:text-cyan-400"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
