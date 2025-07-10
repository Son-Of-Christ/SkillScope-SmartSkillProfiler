import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSkill } from '../context/SkillContext';
import { ArrowLeft, ArrowRight, User, Mail, Briefcase, FileText, Target, Loader, Brain, AlertCircle } from 'lucide-react';

const FormPage = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, analyzeSkill, loading, error } = useSkill();
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step >= 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (step >= 2) {
      if (!formData.primarySkill.trim()) {
        newErrors.primarySkill = 'Primary skill is required';
      }
      if (!formData.experience.trim()) {
        newErrors.experience = 'Experience description is required';
      } else if (formData.experience.length > 300) {
        newErrors.experience = 'Experience description must be 300 characters or less';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(2)) {
      try {
        await analyzeSkill();
        navigate('/results');
      } catch (error) {
        console.error('Analysis failed:', error);
        // Handle error appropriately
      }
    }
  };

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const steps = [
    { number: 1, title: 'Personal Info', icon: <User className="w-5 h-5" /> },
    { number: 2, title: 'Skills & Experience', icon: <Briefcase className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <div className="flex items-center space-x-2">
              <Target className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">SkillScope: Smart Skill Profiler</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center space-x-3 ${
                  currentStep >= step.number ? 'text-primary-600' : 'text-gray-400'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    currentStep >= step.number 
                      ? 'bg-primary-600 border-primary-600 text-white' 
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    {currentStep > step.number ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span className="font-medium hidden sm:block">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-primary-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {currentStep === 1 ? 'Tell us about yourself' : 'Share your expertise'}
            </h1>
            <p className="text-gray-600">
              {currentStep === 1 
                ? 'We need some basic information to get started'
                : 'Help us understand your skills and experience'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="flex justify-end pt-6">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-primary-600 text-white px-8 py-3 rounded-xl hover:bg-primary-700 transition-colors font-medium flex items-center space-x-2"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="w-4 h-4 inline mr-2" />
                    Primary Trade or Skill *
                  </label>
                  <input
                    type="text"
                    value={formData.primarySkill}
                    onChange={(e) => handleInputChange('primarySkill', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.primarySkill ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Web Development, Data Analysis, Graphic Design"
                  />
                  {errors.primarySkill && (
                    <p className="mt-1 text-sm text-red-600">{errors.primarySkill}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Experience Description *
                  </label>
                  <textarea
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    rows={4}
                    maxLength={300}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none ${
                      errors.experience ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Briefly describe your experience, projects, or achievements in this area..."
                  />
                  <div className="flex justify-between items-center mt-2">
                    <div>
                      {errors.experience && (
                        <p className="text-sm text-red-600">{errors.experience}</p>
                      )}
                    </div>
                    <p className={`text-sm ${
                      formData.experience.length > 250 ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {formData.experience.length}/300
                    </p>
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-gray-600 hover:text-gray-900 px-6 py-3 rounded-xl transition-colors font-medium flex items-center space-x-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary-600 text-white px-8 py-3 rounded-xl hover:bg-primary-700 transition-colors font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Brain className="w-4 h-4 animate-pulse" />
                        <span>AI Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <span>Get AI Analysis</span>
                        <Brain className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-red-800 font-medium">Analysis Failed</h4>
                <p className="text-red-700 text-sm mt-1">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-red-600 hover:text-red-800 text-sm font-medium mt-2 underline"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* AI Technology Info */}
          {currentStep === 2 && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="w-5 h-5 text-blue-600" />
                <h4 className="text-blue-800 font-medium">AI-Powered Analysis</h4>
              </div>
              <p className="text-blue-700 text-sm">
                We use Google's Gemini 1.5 Flash model to analyze your skills and provide personalized career insights. 
                Your data is processed securely and stored safely.
              </p>
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            Powered by Google Gemini 1.5 Flash • Processed via Supabase Edge Functions • Your data is secure
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormPage;