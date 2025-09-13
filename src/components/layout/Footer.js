import React from "react";
import {
    Github,
    Twitter,
    Linkedin,
    Instagram,
    Link
} from "lucide-react";

const Footer = () => {
    const quickLinks = [
        { title: "About Us", url: "#" },
        { title: "Events", url: "#" },
        { title: "Resources", url: "#" },
        { title: "Blogs", url: "#" },
        { title: "Team", url: "#" },
        { title: "Contact", url: "#" },
        { title: "Hello FOSS", url: "#" }
    ];

    return (
        <footer className="bg-gray-900/50 backdrop-blur-lg border-t border-cyan-500/20 p-8 mt-16">
            <div className="container mx-auto grid md:grid-cols-4 gap-8">
                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-4">
                        Quick Links
                    </h3>
                    <ul className="space-y-2">
                        {quickLinks.map((link, i) => (
                            <li key={i}>
                                <a
                                    href={link.url}
                                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                                >
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-4">
                        Contact
                    </h3>
                    <ul className="space-y-2 text-gray-400">
                        <li>wncc@iitb.ac.in</li>
                        <li>Student Activity Center</li>
                        <li>IIT Bombay, Powai</li>
                        <li>Mumbai - 400076</li>
                    </ul>
                </div>

                {/* Social Links */}
                <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-4">
                        Connect
                    </h3>
                    <div className="flex gap-4">
                        <a
                            href="https://github.com/wncc"
                            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                        >
                            <Github className="w-6 h-6" />
                        </a>
                        <a
                            href="https://x.com/i/flow/login?redirect_after_login=%2Fwncc_iitb"
                            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                        >
                            <Twitter className="w-6 h-6" />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/wncc-iitb/posts/?feedView=all"
                            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                        >
                            <Linkedin className="w-6 h-6" />
                        </a>
                        <a
                            href="https://www.instagram.com/wncc.iitb/"
                            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                        >
                            <Instagram className="w-6 h-6" />
                        </a>
                        <a
                            href="https://linktr.ee/wncciitb"
                            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                        >
                            <Link className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-8 pt-8 border-t border-cyan-500/20 text-center">
                <p className="text-gray-400">
                    © 2024 Web and Coding Club, IIT Bombay. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
