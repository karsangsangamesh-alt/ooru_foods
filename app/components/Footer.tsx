"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Clock, Heart, ArrowRight, ArrowUp } from "lucide-react";

interface FormData {
  email: string;
  name: string;
}

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({ email: '', name: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email) {
      alert('Please enter your email');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      alert('Thank you for subscribing to our newsletter!');
      setFormData({ email: '', name: '' });
      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://facebook.com/ooruchutneypudi",
      icon: <Facebook className="w-5 h-5" />
    },
    {
      name: "Instagram",
      url: "https://instagram.com/ooruchutneypudi",
      icon: <Instagram className="w-5 h-5" />
    },
    {
      name: "Twitter",
      url: "https://twitter.com/ooruchutneypudi",
      icon: <Twitter className="w-5 h-5" />
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@ooruchutneypudi",
      icon: <Youtube className="w-5 h-5" />
    }
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Reviews", href: "/#reviews" }
  ];

  const policyLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Cookie Policy", href: "/cookie-policy" }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white border-t border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <Link href="/" className="inline-block">
                <motion.h3 
                  className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ooru Chutneypudi
                </motion.h3>
              </Link>
              <p className="text-gray-300 max-w-lg mx-auto sm:mx-0 text-center sm:text-left leading-relaxed text-sm sm:text-base">
                Bringing you authentic South Indian flavors with traditional chutneys 
                and spicy delicacies crafted with love and heritage recipes.
              </p>
            </motion.div>
            
            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-white">Connect With Us</h4>
              <div className="flex justify-center sm:justify-start flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-orange-500/20 min-w-[44px] min-h-[44px]"
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-white">Newsletter</h4>
              <div className="space-y-3">
                <div className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Subscribe"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  Subscribe to get updates on new flavors and exclusive offers
                </p>
              </div>
            </motion.form>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <motion.li 
                    key={link.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center space-x-2 text-gray-300 hover:text-orange-400 transition-colors duration-200 ${
                        pathname === link.href ? 'text-orange-400' : ''
                      }`}
                    >
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-white">Contact Us</h4>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-start space-x-3 group"
                  whileHover={{ x: 3 }}
                >
                  <div className="w-10 h-10 bg-gray-800 group-hover:bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                    <MapPin className="w-4 h-4 text-orange-400 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">123 Spice Street</p>
                    <p className="text-gray-400 text-sm">Flavor Town, India</p>
                  </div>
                </motion.div>
                
                <motion.a 
                  href="tel:+919876543210" 
                  className="flex items-center space-x-3 group"
                  whileHover={{ x: 3 }}
                >
                  <div className="w-10 h-10 bg-gray-800 group-hover:bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                    <Phone className="w-4 h-4 text-orange-400 group-hover:text-white" />
                  </div>
                  <span className="text-gray-300 group-hover:text-orange-400 transition-colors">
                    +91 98765 43210
                  </span>
                </motion.a>
                
                <motion.a 
                  href="mailto:info@ooruchutneypudi.com" 
                  className="flex items-center space-x-3 group"
                  whileHover={{ x: 3 }}
                >
                  <div className="w-10 h-10 bg-gray-800 group-hover:bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                    <Mail className="w-4 h-4 text-orange-400 group-hover:text-white" />
                  </div>
                  <span className="text-gray-300 group-hover:text-orange-400 transition-colors text-sm">
                    info@ooruchutneypudi.com
                  </span>
                </motion.a>
                
                <motion.div 
                  className="flex items-start space-x-3 group"
                  whileHover={{ x: 3 }}
                >
                  <div className="w-10 h-10 bg-gray-800 group-hover:bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                    <Clock className="w-4 h-4 text-orange-400 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Mon - Sat: 9:00 AM - 8:00 PM</p>
                    <p className="text-gray-400 text-sm">Sunday: 10:00 AM - 6:00 PM</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-700"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-center md:text-left text-gray-400">
              &copy; {new Date().getFullYear()} Ooru Chutneypudi. All rights reserved.
            </p>
            <div className="flex items-center justify-center space-x-6">
              {policyLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="text-xs text-gray-400 hover:text-orange-400 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add smooth scroll for anchor links
                    if (link.href.startsWith('#')) {
                      const id = link.href.substring(1);
                      const element = document.getElementById(id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else {
                      router.push(link.href);
                    }
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-xs text-gray-500 flex items-center justify-center md:justify-start">
              <span>Made with</span>
              <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
              <span>in India</span>
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-xs text-gray-400 hover:text-orange-400 transition-colors flex items-center"
                aria-label="Back to top"
              >
                <ArrowUp className="w-4 h-4 mr-1" />
                Back to top
              </button>
              <span className="text-gray-600">|</span>
              <Link 
                href="/sitemap" 
                className="text-xs text-gray-400 hover:text-orange-400 transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
