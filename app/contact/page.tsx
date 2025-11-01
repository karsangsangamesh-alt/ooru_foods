"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Clock, 
  Send, 
  User, 
  FileText, 
  Paperclip, 
  Check, 
  X, 
  Star, 
  Truck, 
  Package, 
  Globe, 
  Building, 
  HelpCircle, 
  ChevronDown, 
  Heart,
  PhoneCall,
  MapPinIcon,
  MessageCircleIcon,
  Sparkles,
  Zap,
  ArrowRight,
  Upload,
  AlertCircle,
  CheckCircle2,
  Info,
  Gift,
  Handshake
} from 'lucide-react';

interface ContactFormData {
  step: number;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
  };
  inquiryDetails: {
    subject: string;
    category: string;
    priority: string;
  };
  messageDetails: {
    message: string;
    orderNumber?: string;
    attachments: File[];
  };
  preferences: {
    contactMethod: string;
    newsletter: boolean;
  };
}

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<ContactFormData>({
    step: 0,
    personalInfo: {
      name: '',
      email: '',
      phone: ''
    },
    inquiryDetails: {
      subject: '',
      category: '',
      priority: 'medium'
    },
    messageDetails: {
      message: '',
      orderNumber: '',
      attachments: []
    },
    preferences: {
      contactMethod: 'email',
      newsletter: false
    }
  });

  const steps = [
    { 
      title: 'Personal Information', 
      subtitle: 'Tell us about yourself',
      icon: User,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      title: 'Inquiry Details', 
      subtitle: 'What can we help you with?',
      icon: MessageCircle,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      title: 'Message & Files', 
      subtitle: 'Share the details',
      icon: FileText,
      color: 'from-green-500 to-emerald-500'
    },
    { 
      title: 'Preferences', 
      subtitle: 'How would you like to hear from us?',
      icon: Heart,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry', icon: HelpCircle, description: 'Questions about our products or services' },
    { value: 'product', label: 'Product Information', icon: Package, description: 'Details about chutneys and ingredients' },
    { value: 'order', label: 'Order Support', icon: Truck, description: 'Help with your order or delivery' },
    { value: 'bulk', label: 'Bulk Orders', icon: Building, description: 'Wholesale and restaurant orders' },
    { value: 'feedback', label: 'Feedback', icon: Star, description: 'Share your experience with us' },
    { value: 'partnership', label: 'Partnership', icon: Handshake, description: 'Business opportunities and collaborations' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-gray-500', icon: Clock, description: 'General inquiry' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-500', icon: AlertCircle, description: 'Need response within 24h' },
    { value: 'high', label: 'High', color: 'text-red-500', icon: Zap, description: 'Urgent matter' }
  ];

  const updateFormData = <K1 extends keyof ContactFormData, K2 extends keyof ContactFormData[K1]>(
    section: K1,
    field: K2,
    value: ContactFormData[K1][K2]
  ) => {
    if (section === 'step') return;
    
    setFormData((prev: ContactFormData) => ({
      ...prev,
      [section]: {
        ...(prev[section] as object),
        [field]: value
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setFormData(prev => ({
        ...prev,
        messageDetails: {
          ...prev.messageDetails,
          attachments: [...prev.messageDetails.attachments, ...files]
        }
      }));
    }
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      messageDetails: {
        ...prev.messageDetails,
        attachments: prev.messageDetails.attachments.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
    }, 2000);
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return formData.personalInfo.name && formData.personalInfo.email;
      case 1:
        return formData.inquiryDetails.subject && formData.inquiryDetails.category;
      case 2:
        return formData.messageDetails.message.length >= 10;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 pt-20">
        {/* Enhanced Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center py-16 px-4"
        >
          <motion.div
            variants={itemVariants}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="w-32 h-32 bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-8 relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            />
            <MessageCircleIcon className="text-white text-5xl relative z-10" />
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 bg-clip-text text-transparent mb-6 leading-tight"
          >
            Let's Start a
            <motion.span
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto]"
            >
              {" "}Conversation
            </motion.span>
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            We're here to help! Reach out to us through any of these convenient ways and we'll get back to you faster than you can say "chutney pudi"! 🚀
          </motion.p>
        </motion.div>

        {/* Enhanced Quick Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="container mx-auto px-4 mb-20"
        >
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
          >
            {[
              { 
                icon: PhoneCall, 
                title: 'Call Us', 
                subtitle: '+91 98765 43210', 
                color: 'from-blue-500 to-blue-600', 
                action: 'Call Now',
                description: 'Speak directly with our team',
                gradient: 'from-blue-500/10 to-blue-600/10',
                borderColor: 'border-blue-200'
              },
              { 
                icon: MessageCircle, 
                title: 'Live Chat', 
                subtitle: 'Available 24/7', 
                color: 'from-green-500 to-green-600', 
                action: 'Start Chat',
                description: 'Get instant responses',
                gradient: 'from-green-500/10 to-green-600/10',
                borderColor: 'border-green-200'
              },
              { 
                icon: Mail, 
                title: 'Email Us', 
                subtitle: 'info@ooruchutneypudi.com', 
                color: 'from-purple-500 to-purple-600', 
                action: 'Send Email',
                description: 'Detailed inquiries welcome',
                gradient: 'from-purple-500/10 to-purple-600/10',
                borderColor: 'border-purple-200'
              },
              { 
                icon: MapPin, 
                title: 'Visit Us', 
                subtitle: '123 Spice Street, Flavor Town', 
                color: 'from-red-500 to-red-600', 
                action: 'Get Directions',
                description: 'Come say hello!',
                gradient: 'from-red-500/10 to-red-600/10',
                borderColor: 'border-red-200'
              }
            ].map((contact, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                className={`bg-gradient-to-br ${contact.gradient} border-2 ${contact.borderColor} rounded-3xl p-8 cursor-pointer group relative overflow-hidden transition-all duration-500`}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-20 h-20 bg-gradient-to-r ${contact.color} rounded-2xl flex items-center justify-center mb-6 relative z-10`}
                >
                  <contact.icon className="text-white text-3xl" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative z-10"
                >
                  <h3 className="font-bold text-xl text-gray-800 mb-3">{contact.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{contact.subtitle}</p>
                  <p className="text-gray-500 text-xs mb-6">{contact.description}</p>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`w-full group-hover:bg-gradient-to-r group-hover:${contact.color} group-hover:text-white transition-all duration-300 relative z-10`}
                    >
                      {contact.action}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Animated background effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Multi-Step Contact Form */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            {/* Enhanced Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <div className="flex justify-between items-center mb-8">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div 
                      key={index} 
                      className="flex flex-col items-center relative"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold transition-all duration-500 relative overflow-hidden ${
                          index <= currentStep
                            ? `bg-gradient-to-r ${step.color} text-white shadow-lg`
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {index < currentStep ? (
                          <Check className="text-white text-2xl" />
                        ) : (
                          <Icon className="text-2xl" />
                        )}
                        
                        {/* Animated background for active step */}
                        {index === currentStep && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        )}
                      </motion.div>
                      <motion.p 
                        className={`text-sm mt-3 text-center max-w-24 font-medium ${
                          index === currentStep ? 'text-orange-600' : 'text-gray-500'
                        }`}
                        animate={{ 
                          color: index === currentStep ? '#ea580c' : '#6b7280'
                        }}
                      >
                        {step.title}
                      </motion.p>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Enhanced Progress Bar */}
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 h-3 rounded-full relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </motion.div>
                </div>
                
                {/* Step indicators */}
                {steps.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`absolute top-0 w-3 h-3 rounded-full transform -translate-y-0 transition-all duration-500 ${
                      index <= currentStep ? 'bg-white border-2 border-orange-500' : 'bg-gray-400'
                    }`}
                    style={{ left: `${(index / (steps.length - 1)) * 100}%` }}
                    animate={{ 
                      scale: index === currentStep ? 1.2 : 1,
                      boxShadow: index === currentStep ? "0 0 20px rgba(234, 88, 12, 0.5)" : "0 0 0px rgba(0, 0, 0, 0)"
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Enhanced Form Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -50, rotateY: 15 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className="bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-orange-100 relative overflow-hidden"
              >
                {/* Animated background pattern */}
                <motion.div
                  className="absolute inset-0 opacity-5"
                  animate={{
                    background: [
                      "radial-gradient(circle at 20% 20%, #f97316 0%, transparent 50%)",
                      "radial-gradient(circle at 80% 80%, #f59e0b 0%, transparent 50%)",
                      "radial-gradient(circle at 40% 60%, #ef4444 0%, transparent 50%)",
                      "radial-gradient(circle at 20% 20%, #f97316 0%, transparent 50%)"
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Step Header */}
                <motion.div 
                  className="text-center mb-12 relative z-10"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${steps[currentStep].color} mb-4`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {React.createElement(steps[currentStep].icon, { className: "text-white text-2xl" })}
                  </motion.div>
                  
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">{steps[currentStep].title}</h2>
                  <p className="text-xl text-gray-600">{steps[currentStep].subtitle}</p>
                </motion.div>

                {/* Enhanced Step Content */}
                <motion.div 
                  className="space-y-8 relative z-10"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {currentStep === 0 && (
                    <>
                      <motion.div 
                        variants={itemVariants}
                        className="grid md:grid-cols-2 gap-8"
                      >
                        <motion.div whileHover={{ scale: 1.02 }}>
                          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                            <User className="w-4 h-4 mr-2 text-orange-500" />
                            Full Name *
                          </label>
                          <Input
                            type="text"
                            value={formData.personalInfo.name}
                            onChange={(e) => updateFormData('personalInfo', 'name', e.target.value)}
                            placeholder="Enter your full name"
                            className="w-full h-12 text-lg transition-all duration-300 focus:ring-2 focus:ring-orange-500 border-2 border-gray-200 focus:border-orange-500"
                          />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }}>
                          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-orange-500" />
                            Email Address *
                          </label>
                          <Input
                            type="email"
                            value={formData.personalInfo.email}
                            onChange={(e) => updateFormData('personalInfo', 'email', e.target.value)}
                            placeholder="your@email.com"
                            className="w-full h-12 text-lg transition-all duration-300 focus:ring-2 focus:ring-orange-500 border-2 border-gray-200 focus:border-orange-500"
                          />
                        </motion.div>
                      </motion.div>
                      <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }}>
                        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-orange-500" />
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          value={formData.personalInfo.phone}
                          onChange={(e) => updateFormData('personalInfo', 'phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full h-12 text-lg transition-all duration-300 focus:ring-2 focus:ring-orange-500 border-2 border-gray-200 focus:border-orange-500"
                        />
                      </motion.div>
                    </>
                  )}

                  {currentStep === 1 && (
                    <>
                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-semibold text-gray-700 mb-6 flex items-center">
                          <MessageCircle className="w-4 h-4 mr-2 text-orange-500" />
                          Category *
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {categories.map((category) => {
                            const Icon = category.icon;
                            return (
                              <motion.button
                                key={category.value}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateFormData('inquiryDetails', 'category', category.value)}
                                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                                  formData.inquiryDetails.category === category.value
                                    ? 'border-orange-500 bg-orange-50 shadow-lg'
                                    : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
                                }`}
                              >
                                <div className="flex items-center mb-3">
                                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                                    formData.inquiryDetails.category === category.value
                                      ? 'bg-orange-500 text-white'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    <Icon className="text-xl" />
                                  </div>
                                  <div className="font-semibold text-gray-800">{category.label}</div>
                                </div>
                                <p className="text-sm text-gray-600">{category.description}</p>
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                      
                      <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }}>
                        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                          <FileText className="w-4 h-4 mr-2 text-orange-500" />
                          Subject *
                        </label>
                        <Input
                          type="text"
                          value={formData.inquiryDetails.subject}
                          onChange={(e) => updateFormData('inquiryDetails', 'subject', e.target.value)}
                          placeholder="Brief description of your inquiry"
                          className="w-full h-12 text-lg transition-all duration-300 focus:ring-2 focus:ring-orange-500 border-2 border-gray-200 focus:border-orange-500"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-semibold text-gray-700 mb-6 flex items-center">
                          <Zap className="w-4 h-4 mr-2 text-orange-500" />
                          Priority
                        </label>
                        <div className="grid grid-cols-3 gap-6">
                          {priorities.map((priority) => {
                            const Icon = priority.icon;
                            return (
                              <motion.button
                                key={priority.value}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => updateFormData('inquiryDetails', 'priority', priority.value)}
                                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                                  formData.inquiryDetails.priority === priority.value
                                    ? 'border-orange-500 bg-orange-50 shadow-lg'
                                    : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
                                }`}
                              >
                                <div className="flex flex-col items-center space-y-3">
                                  <Icon className={`text-2xl ${priority.color}`} />
                                  <span className={`font-bold ${priority.color}`}>{priority.label}</span>
                                  <span className="text-xs text-gray-500 text-center">{priority.description}</span>
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                      <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }}>
                        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                          <FileText className="w-4 h-4 mr-2 text-orange-500" />
                          Your Message *
                        </label>
                        <textarea
                          value={formData.messageDetails.message}
                          onChange={(e) => updateFormData('messageDetails', 'message', e.target.value)}
                          rows={6}
                          className="w-full px-4 py-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-300 text-lg"
                          placeholder="Please provide as much detail as possible so we can assist you better..."
                        />
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-500">
                            Minimum 10 characters required
                          </span>
                          <span className={`text-sm font-medium ${
                            formData.messageDetails.message.length >= 10 ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {formData.messageDetails.message.length}/1000 characters
                          </span>
                        </div>
                      </motion.div>

                      {formData.inquiryDetails.category === 'order' && (
                        <motion.div 
                          variants={itemVariants} 
                          whileHover={{ scale: 1.01 }}
                          className="bg-blue-50 border border-blue-200 rounded-2xl p-6"
                        >
                          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                            <Package className="w-4 h-4 mr-2 text-blue-500" />
                            Order Number (if applicable)
                          </label>
                          <Input
                            type="text"
                            value={formData.messageDetails.orderNumber}
                            onChange={(e) => updateFormData('messageDetails', 'orderNumber', e.target.value)}
                            placeholder="ORD-123456"
                            className="w-full h-12 text-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 border-2 border-gray-200 focus:border-blue-500"
                          />
                        </motion.div>
                      )}

                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-semibold text-gray-700 mb-6 flex items-center">
                          <Paperclip className="w-4 h-4 mr-2 text-orange-500" />
                          Attachments (optional)
                        </label>
                        <motion.div
                          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                            dragActive
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-300 hover:border-orange-300'
                          }`}
                          onDragEnter={handleDrag}
                          onDragLeave={handleDrag}
                          onDragOver={handleDrag}
                          onDrop={handleDrop}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files) {
                                const files = Array.from(e.target.files);
                                setFormData(prev => ({
                                  ...prev,
                                  messageDetails: {
                                    ...prev.messageDetails,
                                    attachments: [...prev.messageDetails.attachments, ...files]
                                  }
                                }));
                              }
                            }}
                          />
                          <motion.div
                            animate={{ 
                              y: dragActive ? -10 : 0,
                              scale: dragActive ? 1.1 : 1
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className="w-20 h-20 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                              <Upload className="text-2xl text-orange-500" />
                            </motion.div>
                            <div className="space-y-4">
                              <div>
                                <p className="text-gray-700 font-medium text-lg">
                                  {dragActive ? 'Drop files here!' : 'Drag & drop files here, or'}
                                </p>
                                <motion.button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="text-orange-600 hover:text-orange-700 font-bold text-lg underline mt-2"
                                >
                                  browse files
                                </motion.button>
                              </div>
                              <p className="text-sm text-gray-500">Supports: JPG, PNG, PDF, DOC (Max 10MB)</p>
                            </div>
                          </motion.div>
                        </motion.div>

                        {/* Enhanced Attachment List */}
                        {formData.messageDetails.attachments.length > 0 && (
                          <motion.div 
                            className="mt-6 space-y-3"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            {formData.messageDetails.attachments.map((file, index) => (
                              <motion.div
                                key={index}
                                variants={itemVariants}
                                className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200"
                                whileHover={{ scale: 1.02 }}
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <FileText className="text-orange-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-800">{file.name}</p>
                                    <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                  </div>
                                </div>
                                <motion.button
                                  onClick={() => removeAttachment(index)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                >
                                  <X className="w-5 h-5" />
                                </motion.button>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </motion.div>
                    </>
                  )}

                  {currentStep === 3 && (
                    <>
                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-semibold text-gray-700 mb-6 flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-orange-500" />
                          Preferred Contact Method
                        </label>
                        <div className="grid grid-cols-3 gap-6">
                          {[
                            { value: 'email', label: 'Email', icon: Mail, description: 'Send me an email' },
                            { value: 'phone', label: 'Phone', icon: PhoneCall, description: 'Call me directly' },
                            { value: 'chat', label: 'Chat', icon: MessageCircle, description: 'Live chat support' }
                          ].map((method) => {
                            const Icon = method.icon;
                            return (
                              <motion.button
                                key={method.value}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateFormData('preferences', 'contactMethod', method.value)}
                                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                                  formData.preferences.contactMethod === method.value
                                    ? 'border-orange-500 bg-orange-50 shadow-lg'
                                    : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
                                }`}
                              >
                                <div className="text-center space-y-3">
                                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto ${
                                    formData.preferences.contactMethod === method.value
                                      ? 'bg-orange-500 text-white'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    <Icon className="text-2xl" />
                                  </div>
                                  <div className="font-bold text-gray-800">{method.label}</div>
                                  <div className="text-sm text-gray-600">{method.description}</div>
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>

                      <motion.div 
                        variants={itemVariants}
                        className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-start space-x-4">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"
                          >
                            <Gift className="text-green-600 text-xl" />
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                id="newsletter"
                                checked={formData.preferences.newsletter}
                                onChange={(e) => updateFormData('preferences', 'newsletter', e.target.checked)}
                                className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                              />
                              <label htmlFor="newsletter" className="text-sm font-semibold text-gray-700">
                                I'd love to receive updates about new products, special offers, and cooking tips! 🎁
                              </label>
                            </div>
                            <p className="text-xs text-gray-600 mt-2 ml-8">
                              Get exclusive recipes, discount codes, and be the first to know about new chutney varieties!
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </motion.div>

                {/* Enhanced Navigation Buttons */}
                <motion.div 
                  className="flex justify-between mt-12 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      variant="outline"
                      className="px-8 py-4 text-lg font-semibold transition-all duration-300"
                    >
                      ← Previous
                    </Button>
                  </motion.div>

                  {currentStep === steps.length - 1 ? (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleSubmit}
                        disabled={!isStepValid(currentStep) || isSubmitting}
                        className="px-10 py-4 text-lg font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 relative overflow-hidden group"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 0.6 }}
                        />
                        {isSubmitting ? (
                          <div className="flex items-center gap-3 relative z-10">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            <span>Sending...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 relative z-10">
                            <Send className="w-5 h-5" />
                            <span>Submit Message</span>
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={nextStep}
                        disabled={!isStepValid(currentStep)}
                        className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 relative overflow-hidden group"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 0.6 }}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                          Next
                          <ArrowRight className="w-5 h-5" />
                        </span>
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Success State */}
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className="bg-white rounded-3xl p-12 max-w-lg mx-4 text-center relative overflow-hidden"
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400"
                      animate={{ 
                        background: [
                          "linear-gradient(45deg, #10b981, #34d399, #6ee7b7)",
                          "linear-gradient(45deg, #34d399, #6ee7b7, #10b981)",
                          "linear-gradient(45deg, #6ee7b7, #10b981, #34d399)",
                          "linear-gradient(45deg, #10b981, #34d399, #6ee7b7)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-8 relative z-10"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <CheckCircle2 className="text-white text-4xl" />
                      </motion.div>
                    </motion.div>
                    
                    <h3 className="text-3xl font-bold text-white mb-6 relative z-10">Message Sent Successfully! 🎉</h3>
                    <p className="text-white text-lg mb-8 leading-relaxed relative z-10">
                      Thank you for contacting us! We've received your message and our team will get back to you within 24 hours.
                    </p>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => setSubmitStatus('idle')}
                        className="px-8 py-4 text-lg font-semibold bg-white text-green-600 hover:bg-gray-50 relative z-10"
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Close
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Enhanced FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="container mx-auto px-4 py-20"
        >
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: "200% auto" }}
            >
              Frequently Asked Questions
            </motion.h2>
            <p className="text-xl text-gray-600">Quick answers to common questions 💡</p>
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                question: "What is your return policy?",
                answer: "We offer a 30-day return policy for unopened products in their original packaging. If you're not satisfied with your purchase, contact us for a full refund or replacement.",
                icon: HelpCircle,
                color: "from-blue-500 to-cyan-500"
              },
              {
                question: "Do you offer bulk discounts?",
                answer: "Yes! We provide special pricing for bulk orders of 50+ units. Contact our sales team for custom quotes and special arrangements for restaurants and retailers.",
                icon: Building,
                color: "from-purple-500 to-pink-500"
              },
              {
                question: "How long do your chutneys last?",
                answer: "Our chutneys have a shelf life of 12 months when stored in a cool, dry place. Once opened, consume within 3-4 weeks for best taste and quality.",
                icon: Clock,
                color: "from-green-500 to-emerald-500"
              },
              {
                question: "Are your products vegetarian?",
                answer: "Yes, all our chutney pudi products are 100% vegetarian and made with natural ingredients. We also offer vegan options clearly marked on our packaging.",
                icon: Heart,
                color: "from-red-500 to-pink-500"
              },
              {
                question: "Do you ship internationally?",
                answer: "Currently, we ship within India. We're working on expanding our shipping capabilities to international markets. Stay tuned for updates!",
                icon: Globe,
                color: "from-orange-500 to-yellow-500"
              },
              {
                question: "What makes your chutneys special?",
                answer: "Our chutneys are made using traditional family recipes, premium ingredients, and modern food safety standards. Each batch is crafted with care to deliver authentic South Indian flavors.",
                icon: Star,
                color: "from-indigo-500 to-purple-500"
              }
            ].map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </motion.div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
}

// Enhanced FAQ Component with Animation
interface FAQItemProps {
  faq: {
    question: string;
    answer: string;
    icon?: any;
    color?: string;
  };
  index: number;
}

const FAQItem = ({ faq, index }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100"
      whileHover={{ y: -2, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors relative overflow-hidden"
        whileHover={{ x: 4 }}
      >
        <motion.div 
          className="flex items-center gap-6"
          layout
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${faq.color || "from-orange-500 to-amber-500"} flex items-center justify-center`}
          >
            {React.createElement(faq.icon || HelpCircle, { className: "text-white text-xl" })}
          </motion.div>
          <span className="font-bold text-lg text-gray-800">{faq.question}</span>
        </motion.div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-400"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>

        {/* Hover effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-amber-500/5"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8">
              <motion.p 
                className="text-gray-600 leading-relaxed text-lg pl-20"
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {faq.answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
