//Results page: Results display - Shows AI-generated profile summary, skill recommendations, and confidence score

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSkill } from '../context/SkillContext';
import { 
  ArrowLeft, 
  RotateCcw, 
  Share2, 
  Target, 
  TrendingUp, 
  User, 
  Lightbulb,
  CheckCircle,
  Sparkles,
  Brain,
  ExternalLink,
  Copy
} from 'lucide-react';

const ResultsPage = () => {
  const navigate = useNavigate();
  const { formData, results, resetData } = useSkill();
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Redirect if no results
  React.useEffect(() => {
    if (!results) {
      navigate('/form');
    }
  }, [results, navigate]);

  if (!results) {
    return null;
  }

  const handleStartOver = () => {
    resetData();
    navigate('/form');
  };

  const handleShare = () => {
    const currentUrl = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Smart Skill Profile Analysis',
        text: `Check out my AI-powered skill analysis from SkillScope: Smart Skill Profile! ${results.profileSummary.substring(0, 100)}...`,
        url: currentUrl
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(currentUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate('/form')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Form</span>
            </button>
            <div className="flex items-center space-x-2">
              <Target className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">SkillScope: Smart Skill Profile</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Analysis Complete!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Here's what Google's Gemini 1.5 Flash  discovered about your professional profile and growth opportunities.
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-slide-up">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {formData.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{formData.fullName}</h2>
              <p className="text-gray-600">{formData.email}</p>
              <p className="text-primary-600 font-medium">{formData.primarySkill}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Your Experience
            </h3>
            <p className="text-gray-700 leading-relaxed">{formData.experience}</p>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="bg-gradient-to-r from-primary-50 to-indigo-50 rounded-2xl p-8 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">AI-Generated Profile Analysis</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            {results.profileSummary}
          </p>
          <div className="flex items-center space-x-2 text-primary-600">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">AI Confidence Score: {results.confidence}%</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500 mt-2">
            <Brain className="w-4 h-4" />
            <span className="text-sm">Powered by Google Gemini 1.5 Flash</span>
          </div>
        </div>

        {/* Suggested Skills */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">AI-Recommended Skills</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Based on AI analysis of your current expertise, here are skill areas that could accelerate your career:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {results.suggestedSkills.map((skill, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:border-primary-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <Lightbulb className="w-5 h-5 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{skill}</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  AI-identified skill that complements your expertise and opens new career opportunities.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={handleShare}
            className="group bg-primary-600 text-white px-8 py-4 rounded-xl hover:bg-primary-700 transition-all duration-300 font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 relative"
          >
            {copied ? (
              <>
                <Copy className="w-5 h-5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-5 h-5" />
                <span>Share Analysis</span>
              </>
            )}
          </button>
          <button
            onClick={handleStartOver}
            className="group bg-white text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold flex items-center space-x-2 border border-gray-300 hover:border-gray-400"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Start Over</span>
          </button>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-12 p-6 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-600 mb-2">
            Want to dive deeper into your career development?
          </p>
          <p className="text-sm text-gray-500">
            Use these AI-powered insights to guide your learning path and unlock new opportunities.
          </p>
          <div className="flex items-center justify-center space-x-2 mt-3 text-xs text-gray-400">
            <Brain className="w-3 h-3" />
            <span>Analysis powered by Google Gemini 1.5 Flash via Supabase Edge Functions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;