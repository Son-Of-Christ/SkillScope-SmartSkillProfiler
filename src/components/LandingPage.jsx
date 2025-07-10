import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Target, Lightbulb, TrendingUp, Users, Star, CheckCircle, Brain, Zap, Shield } from 'lucide-react';
import AIInfoModal from './AIInfoModal';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showAIModal, setShowAIModal] = useState(false);

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Gemini 1.5 Flash AI Analysis",
      description: "Powered by Google's advanced AI model for intelligent, personalized skill insights"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-Time Processing",
      description: "Lightning-fast analysis using Supabase Edge Functions for instant results"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Your data is processed securely and stored safely in our database"
    }
  ];

  const testimonials = [
    {
      name: "MUGABO FRED",
      role: "Frontend Developer",
      content: "SkillScope: Smart Skill Profiler-helped me identify my next learning path. The AI suggestions were spot-on!",
      rating: 5
    },
    {
      name: "CYNTHIA ISHIMWE",
      role: "Data Analyst",
      content: "Amazing insights into my skill profile. I discovered areas I never considered before.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Target className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">SkillScope: Smart Skill Profiler</span>
            </div>
            <button
              onClick={() => navigate('/form')}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-indigo-50 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Know Your Strengths,<br />
              <span className="text-primary-600">Unlock New Opportunities</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Powered by Google's  Gemini 1.5 Flash and Supabase Edge Functions, get intelligent, 
              personalized career insights in seconds. Discover your strengths and unlock new opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/form')}
                className="group bg-primary-600 text-white px-8 py-4 rounded-xl hover:bg-primary-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
              >
                <span>Start Skill Check</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setShowAIModal(true)}
                className="group text-primary-600 hover:text-primary-700 px-6 py-3 rounded-xl border border-primary-200 hover:border-primary-300 transition-all duration-300 font-medium flex items-center space-x-2"
              >
                <Brain className="w-4 h-4" />
                <span>How AI Works</span>
              </button>
              <div className="flex items-center space-x-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>AI-Powered • Secure • Instant Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powered by Advanced AI Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We use Google's Gemini 1.5 Flash model with Supabase Edge Functions for fast, intelligent analysis
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-6 group-hover:bg-primary-200 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-primary-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Professionals
            </h2>
            <p className="text-xl text-gray-600">
              See what others are saying about SkillScope: Smart Skill Profiler
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Experience AI-Powered Career Insights
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get personalized recommendations powered by the latest AI technology
          </p>
          <button
            onClick={() => navigate('/form')}
            className="group bg-primary-600 text-white px-8 py-4 rounded-xl hover:bg-primary-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2 mx-auto"
          >
            <span>Start Your Analysis</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Target className="w-6 h-6 text-primary-400" />
              <span className="text-lg font-semibold">SkillScope: Smart Skill Profiler</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 SkillScope: Smart Skill Profiler. Powered by Google Gemini 1.5 Flash & Supabase.
            </div>
          </div>
        </div>
      </footer>

      {/* AI Info Modal */}
      <AIInfoModal isOpen={showAIModal} onClose={() => setShowAIModal(false)} />
    </div>
  );
};

export default LandingPage;