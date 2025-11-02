"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Button } from '../components/ui/button';
import { 
  Heart, 
  Star, 
  Award, 
  Users, 
  Clock, 
  MapPin, 
  ChefHat,
  Leaf,
  Shield,
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle,
  Quote,
  Calendar,
  Target,
  Zap,
  Globe,
  TrendingUp,
  Award as AwardIcon
} from 'lucide-react';

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Scroll-triggered animations
  const storyRef = React.useRef(null);
  const valuesRef = React.useRef(null);
  const teamRef = React.useRef(null);
  const timelineRef = React.useRef(null);

  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" });
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Timeline data
  const timelineEvents = [
    {
      year: "2008",
      title: "The Beginning",
      description: "Started in a small kitchen with grandmother's secret recipes",
      icon: Heart
    },
    {
      year: "2012",
      title: "First Store",
      description: "Opened our first retail store in Bangalore",
      icon: MapPin
    },
    {
      year: "2016",
      title: "Online Expansion",
      description: "Launched our online platform to reach families across India",
      icon: Globe
    },
    {
      year: "2020",
      title: "National Recognition",
      description: "Won 'Best South Indian Brand' award",
      icon: Award
    },
    {
      year: "2024",
      title: "Modern Innovation",
      description: "Introduced eco-friendly packaging and AI-powered quality control",
      icon: Sparkles
    }
  ];

  // Team members
  const teamMembers = [
    {
      name: "Priya Sharma",
      role: "Founder & CEO",
      description: "Granddaughter of the original recipe keeper, carrying forward the family legacy",
      avatar: "/api/placeholder/150/150",
      specialties: ["Recipe Development", "Quality Control", "Brand Strategy"]
    },
    {
      name: "Rajesh Kumar",
      role: "Head Chef",
      description: "25+ years mastering traditional South Indian cooking techniques",
      avatar: "/api/placeholder/150/150",
      specialties: ["Spice Blending", "Traditional Methods", "Innovation"]
    },
    {
      name: "Anitha Reddy",
      role: "Quality Manager",
      description: "Ensures every jar meets our high standards of excellence",
      avatar: "/api/placeholder/150/150",
      specialties: ["Quality Assurance", "Food Safety", "Process Optimization"]
    },
    {
      name: "Karthik Iyer",
      role: "Innovation Lead",
      description: "Bridging traditional flavors with modern culinary trends",
      avatar: "/api/placeholder/150/150",
      specialties: ["Product Development", "Market Research", "Sustainability"]
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Authentic Heritage",
      description: "Every recipe tells a story, passed down through generations of love and tradition",
      color: "from-red-500 to-pink-600",
      bgColor: "from-red-50 to-pink-50"
    },
    {
      icon: Leaf,
      title: "Natural Ingredients",
      description: "We source only the finest, freshest spices and ingredients from trusted farms",
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      icon: Shield,
      title: "Quality Promise",
      description: "Rigorous quality checks ensure every jar meets our highest standards",
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50"
    },
    {
      icon: Users,
      title: "Family First",
      description: "We're not just a brand, we're a family bringing people together through food",
      color: "from-purple-500 to-violet-600",
      bgColor: "from-purple-50 to-violet-50"
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Respecting tradition while embracing modern techniques and sustainability",
      color: "from-orange-500 to-amber-600",
      bgColor: "from-orange-50 to-amber-50"
    },
    {
      icon: Target,
      title: "Customer Love",
      description: "Your satisfaction drives everything we do, from kitchen to your table",
      color: "from-indigo-500 to-purple-600",
      bgColor: "from-indigo-50 to-purple-50"
    }
  ];

  return (
    <>
      {/* Simple Header */}
      <div className="py-25 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            About Ooru Foods
          </h1>
        </div>
      </div>

      {/* Our Story Section */}
      <motion.section ref={storyRef} className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={storyInView ? "visible" : "hidden"}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="inline-block">
                <motion.span
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-bold"
                  whileHover={{ scale: 1.05 }}
                >
                  Our Journey
                </motion.span>
              </div>
              
              <motion.h2
                variants={itemVariants}
                className="text-5xl md:text-6xl font-black text-gray-900 leading-tight"
              >
                A <span className="text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">Legacy</span> of Flavor
              </motion.h2>
              
              <motion.div variants={itemVariants} className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  In 2008, in a humble kitchen filled with the aroma of roasting spices, our founder Priya Sharma 
                  began a journey to preserve her grandmother's secret chutney recipes. What started as a 
                  family tradition soon became a mission to share authentic South Indian flavors with the world.
                </p>
                <p>
                  Today, Ooru Chutney Pudi stands as a testament to the power of tradition, innovation, and 
                  the unbreakable bonds created through food. Every jar carries not just spices, but stories, 
                  memories, and the love of generations.
                </p>
                <p className="text-orange-600 font-semibold">
                  "We're not just making chutneys – we're preserving heritage, one flavor at a time."
                </p>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <motion.div
                className="relative bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl p-8 shadow-2xl"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Floating Elements with different animation */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg"
                  animate={{ 
                    y: [0, -10, 0],
                    x: [0, 5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Heart className="w-8 h-8 text-white" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg"
                  animate={{ 
                    y: [0, 10, 0],
                    x: [0, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>

                <div className="text-center space-y-6">
                  <motion.div
                    className="w-32 h-32 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl mx-auto shadow-2xl flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <ChefHat className="w-16 h-16 text-white" />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Traditional Recipes</h3>
                    <p className="text-gray-600">Authentic South Indian flavors crafted with love, heritage, and premium ingredients</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {[
                      { label: "Family Recipes", value: "50+" },
                      { label: "Spice Varieties", value: "25+" },
                      { label: "Quality Tests", value: "100%" },
                      { label: "Customer Love", value: "98%" }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        className="text-center p-3 bg-white/50 rounded-xl"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-xl font-bold text-orange-600">{stat.value}</div>
                        <div className="text-xs text-gray-600">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section ref={timelineRef} className="py-24 bg-gradient-to-br from-gray-50 to-orange-50/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Our <span className="text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a small kitchen experiment to a beloved brand across India
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-orange-400 to-red-500 h-full rounded-full"
              initial={{ height: 0 }}
              animate={timelineInView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 2, delay: 0.5 }}
            />

            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.8 }}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <motion.div
                    className="bg-white rounded-2xl p-6 shadow-xl border border-orange-100"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                        <event.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-orange-600">{event.year}</div>
                        <div className="font-bold text-gray-900">{event.title}</div>
                      </div>
                    </div>
                    <p className="text-gray-600">{event.description}</p>
                  </motion.div>
                </div>

                {/* Timeline Node */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-orange-500 rounded-full shadow-lg"
                  initial={{ scale: 0 }}
                  animate={timelineInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 1 }}
                  whileHover={{ scale: 1.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section ref={valuesRef} className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Our <span className="text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do, from sourcing ingredients to serving our customers
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group cursor-pointer"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`bg-gradient-to-br ${value.bgColor} rounded-3xl p-8 h-full border border-orange-100 hover:shadow-2xl transition-all duration-300`}>
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                    whileHover={{ 
                      scale: 1.1,
                      rotateX: 15,
                      rotateY: 15
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <value.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section ref={teamRef} className="py-24 bg-gradient-to-br from-gray-50 to-orange-50/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Meet Our <span className="text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate people behind every jar of Ooru Chutney Pudi
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="bg-white rounded-3xl p-6 shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-300 h-full"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    <Users className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-orange-600 font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-4">{member.description}</p>
                    
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              What Our <span className="text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">Customers Say</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Meera Krishnan",
                role: "Home Chef",
                content: "Ooru's chutneys transport me back to my grandmother's kitchen. The authenticity is unmatched!",
                rating: 5
              },
              {
                name: "Ravi Sharma",
                role: "Restaurant Owner",
                content: "We've been using Ooru chutneys in our restaurant for 3 years. Our customers always ask for more!",
                rating: 5
              },
              {
                name: "Priya Patel",
                role: "Food Blogger",
                content: "The quality and taste consistency is remarkable. Every jar tastes as good as the first.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 border border-orange-100"
                whileHover={{ scale: 1.05 }}
              >
                <Quote className="w-12 h-12 text-orange-400 mb-4" />
                
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>

                <div className="flex mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}
