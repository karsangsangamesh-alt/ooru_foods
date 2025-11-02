"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Clock, Users, Star, Heart, BookOpen, Lightbulb } from 'lucide-react';

interface ChefSecret {
  id: number;
  title: string;
  description: string;
  tip: string;
  category: 'technique' | 'ingredient' | 'secret' | 'story';
  icon: string;
  rating: number;
  cookingTime?: string;
  serves?: string;
}

const CHEF_SECRETS: ChefSecret[] = [
  {
    id: 1,
    title: "The Perfect Spice Balance",
    description: "The secret to our authentic flavors lies in the careful balance of spices",
    tip: "Always toast spices before grinding - it releases essential oils that create deeper flavors",
    category: "technique",
    icon: "🔥",
    rating: 5,
    cookingTime: "5 mins prep",
    serves: "Any quantity"
  },
  {
    id: 2,
    title: "Grandmother's Coconut Technique",
    description: "Fresh coconut makes all the difference in our traditional chutneys",
    tip: "Use fresh coconut grated the same day - it gives that creamy texture and sweet undertone",
    category: "ingredient",
    icon: "🥥",
    rating: 5,
    cookingTime: "10 mins prep",
    serves: "Family recipe"
  },
  {
    id: 3,
    title: "The Secret Ingredient",
    description: "Every family has that one secret ingredient that makes flavors sing",
    tip: "A pinch of asafoetida (hing) in our chutneys creates that 'wow factor' - it's our family secret passed down for generations",
    category: "secret",
    icon: "⭐",
    rating: 5,
    cookingTime: "Family secret",
    serves: "Generations"
  },
  {
    id: 4,
    title: "The Story Behind Fire Chutney",
    description: "This intense chutney has a story of courage and tradition",
    tip: "Created during festival times when families compete to showcase the spiciest dishes - it's a test of culinary courage",
    category: "story",
    icon: "🌶️",
    rating: 5,
    cookingTime: "15 mins prep",
    serves: "Festival crowd"
  },
  {
    id: 5,
    title: "The Storage Secret",
    description: "How to keep chutneys fresh for months without preservatives",
    tip: "Pour a layer of oil on top before sealing - it acts as a natural preservative and prevents oxidation",
    category: "technique",
    icon: "🏺",
    rating: 4,
    cookingTime: "2 mins prep",
    serves: "Long-term storage"
  },
  {
    id: 6,
    title: "The Perfect Pairing",
    description: "Understanding which chutney complements which dish",
    tip: "Coconut chutney with idli, mint chutney with paratha, and gunpowder with rice - each pairing is scientifically perfect",
    category: "ingredient",
    icon: "🍽️",
    rating: 5,
    cookingTime: "Knowledge",
    serves: "Perfect harmony"
  }
];

interface ChefSecretsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChefSecrets({ isOpen, onClose }: ChefSecretsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSecret, setSelectedSecret] = useState<ChefSecret | null>(null);

  const categories = [
    { id: 'all', name: 'All Secrets', icon: '🍽️' },
    { id: 'technique', name: 'Techniques', icon: '👨‍🍳' },
    { id: 'ingredient', name: 'Ingredients', icon: '🌿' },
    { id: 'secret', name: 'Family Secrets', icon: '🔐' },
    { id: 'story', name: 'Stories', icon: '📖' }
  ];

  const filteredSecrets = selectedCategory === 'all' 
    ? CHEF_SECRETS 
    : CHEF_SECRETS.filter(secret => secret.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technique': return 'from-blue-400 to-blue-600';
      case 'ingredient': return 'from-green-400 to-green-600';
      case 'secret': return 'from-purple-400 to-purple-600';
      case 'story': return 'from-orange-400 to-orange-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ChefHat className="w-8 h-8" />
                <h2 className="text-3xl font-bold">Chef's Secrets</h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
              >
                ✕
              </button>
            </div>
            <p className="mt-2 text-orange-100">Discover the hidden techniques and stories behind our authentic chutneys</p>
          </div>

          <div className="flex h-[70vh]">
            {/* Sidebar - Categories and List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              {/* Category Filter */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left p-2 rounded-lg transition-colors flex items-center space-x-2 ${
                        selectedCategory === category.id
                          ? 'bg-orange-100 text-orange-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span className="text-sm font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Secrets List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {filteredSecrets.map((secret) => (
                  <motion.div
                    key={secret.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedSecret?.id === secret.id
                        ? 'border-orange-300 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedSecret(secret)}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{secret.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm">{secret.title}</h4>
                        <p className="text-gray-600 text-xs mt-1 line-clamp-2">{secret.description}</p>
                        <div className="flex items-center mt-2 space-x-1">
                          {[...Array(secret.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {selectedSecret ? (
                <motion.div
                  key={selectedSecret.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 flex-1 flex flex-col"
                >
                  {/* Secret Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-4xl">{selectedSecret.icon}</span>
                        <h3 className="text-2xl font-bold text-gray-800">{selectedSecret.title}</h3>
                      </div>
                      <p className="text-gray-600">{selectedSecret.description}</p>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-white text-xs font-medium bg-gradient-to-r ${getCategoryColor(selectedSecret.category)}`}>
                        {categories.find(c => c.id === selectedSecret.category)?.name}
                      </div>
                    </div>
                  </div>

                  {/* Chef's Tip */}
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 mb-6 border border-orange-100">
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="w-6 h-6 text-orange-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-orange-800 mb-2">Chef's Secret Tip</h4>
                        <p className="text-orange-700 leading-relaxed">{selectedSecret.tip}</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {selectedSecret.cookingTime && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="w-5 h-5 text-gray-500" />
                          <span className="font-medium text-gray-700">Time</span>
                        </div>
                        <p className="text-gray-600">{selectedSecret.cookingTime}</p>
                      </div>
                    )}
                    {selectedSecret.serves && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="w-5 h-5 text-gray-500" />
                          <span className="font-medium text-gray-700">Serves</span>
                        </div>
                        <p className="text-gray-600">{selectedSecret.serves}</p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2"
                    >
                      <Heart className="w-5 h-5" />
                      <span>Save Secret</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 border-2 border-orange-500 text-orange-500 py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2"
                    >
                      <BookOpen className="w-5 h-5" />
                      <span>Try Recipe</span>
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-lg font-medium">Select a secret to discover</p>
                    <p className="text-sm">Learn the art behind our authentic flavors</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
