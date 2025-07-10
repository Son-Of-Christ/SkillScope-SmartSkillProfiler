import React from 'react';
import { X, Brain, Zap, Shield, CheckCircle } from 'lucide-react';

const AIInfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">AI Technology Behind SkillScope: Smart Skill Profiler</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/*  Google Gemini 1.5 Flash */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="w-8 h-8 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900"> Google Gemini 1.5 Flash</h3>
              </div>
              <p className="text-gray-700 mb-4">
                We use Google's Gemini 1.5 Flash model, which offers the perfect balance of intelligence, 
                speed, and cost-effectiveness for skill analysis.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Fast response times</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">High-quality analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Personalized insights</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Career-focused recommendations</span>
                </div>
              </div>
            </div>

            {/* Supabase Edge Functions */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">Supabase Edge Functions</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Our serverless backend runs on Supabase Edge Functions, providing lightning-fast processing 
                and global distribution for optimal performance.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Global edge deployment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Auto-scaling infrastructure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Real-time processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Secure API handling</span>
                </div>
              </div>
            </div>

            {/* Security & Privacy */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
                <h3 className="text-xl font-semibold text-gray-900">Security & Privacy</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Your data security and privacy are our top priorities. We implement industry-standard 
                security measures to protect your information.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Encrypted data transmission</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Secure database storage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">No data sharing with third parties</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">GDPR compliant</span>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">How the Analysis Works</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">1</div>
                  <p className="text-gray-700">Your skill information is securely sent to our Supabase Edge Function</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">2</div>
                  <p className="text-gray-700">The Edge Function processes your data and sends it to Google's Gemini 1.5 Flash</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">3</div>
                  <p className="text-gray-700">AI analyzes your skills and generates personalized career insights</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">4</div>
                  <p className="text-gray-700">Results are stored securely in our database and displayed to you</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full bg-primary-600 text-white py-3 rounded-xl hover:bg-primary-700 transition-colors font-semibold"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInfoModal;