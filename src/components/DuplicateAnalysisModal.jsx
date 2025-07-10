//Duplicate AnalysisModal:Duplicate handler - Appears when user email already exists, offers "View Results" or "Start Fresh"

import React from 'react';
import { X, Eye, RotateCcw, AlertCircle } from 'lucide-react';

const DuplicateAnalysisModal = ({ isOpen, onClose, onViewResults, onStartFresh, email, fullName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full animate-fade-in">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Analysis Already Exists</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              We found an existing analysis for <strong>{fullName}</strong>. What would you like to do?
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-800 text-sm">
                <strong>View Results:</strong> See your previous AI analysis<br />
                <strong>Start Fresh:</strong> Delete old analysis and create a new one
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onViewResults}
              className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>View Results</span>
            </button>
            <button
              onClick={onStartFresh}
              className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Start Fresh</span>
            </button>
          </div>

          {/* Cancel */}
          <button
            onClick={onClose}
            className="w-full mt-3 text-gray-600 hover:text-gray-800 py-2 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DuplicateAnalysisModal;