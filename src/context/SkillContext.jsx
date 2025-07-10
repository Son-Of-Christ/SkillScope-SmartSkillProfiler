import React, { createContext, useContext, useState } from 'react';
import { analyzeSkillWithAI } from '../lib/supabase';

const SkillContext = createContext();

export const useSkill = () => {
  const context = useContext(SkillContext);
  if (!context) {
    throw new Error('useSkill must be used within a SkillProvider');
  }
  return context;
};

export const SkillProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    primarySkill: '',
    experience: ''
  });
  
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const analyzeSkill = async () => {
    setLoading(true);
    setError(null);
    try {
      // Call our Supabase Edge Function with real AI
      const analysis = await analyzeSkillWithAI(formData);
      setResults(analysis);
      return analysis;
    } catch (error) {
      console.error('Analysis failed:', error);
      setError(error.message || 'Failed to analyze skills. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetData = () => {
    setFormData({
      fullName: '',
      email: '',
      primarySkill: '',
      experience: ''
    });
    setResults(null);
    setError(null);
  };

  return (
    <SkillContext.Provider value={{
      formData,
      results,
      loading,
      error,
      updateFormData,
      analyzeSkill,
      resetData
    }}>
      {children}
    </SkillContext.Provider>
  );
};