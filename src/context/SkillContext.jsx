//SkillContext:Global state manager - Handles form data, API calls, duplicate detection, and results storage

import React, { createContext, useContext, useState } from 'react';
import { analyzeSkillWithAI, checkExistingAnalysis, deleteExistingAnalysis } from '../lib/supabase';

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
  const [existingAnalysis, setExistingAnalysis] = useState(null);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const checkForExistingAnalysis = async (email) => {
    try {
      const existing = await checkExistingAnalysis(email);
      if (existing) {
        setExistingAnalysis(existing);
        setShowDuplicateModal(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking existing analysis:', error);
      return false;
    }
  };

  const handleViewExistingResults = () => {
    if (existingAnalysis) {
      // Convert database format to results format
      const convertedResults = {
        id: existingAnalysis.id,
        profileSummary: existingAnalysis.ai_profile_summary,
        suggestedSkills: existingAnalysis.ai_suggested_skills,
        confidence: existingAnalysis.ai_confidence,
        success: true
      };
      
      // Update form data with existing data
      setFormData({
        fullName: existingAnalysis.user_name,
        email: existingAnalysis.user_email,
        primarySkill: existingAnalysis.primary_skill,
        experience: existingAnalysis.experience_description
      });
      
      setResults(convertedResults);
      setShowDuplicateModal(false);
      setExistingAnalysis(null);
    }
  };

  const handleStartFresh = async () => {
    try {
      setLoading(true);
      await deleteExistingAnalysis(formData.email);
      setShowDuplicateModal(false);
      setExistingAnalysis(null);
      
      // Proceed with new analysis
      const analysis = await analyzeSkillWithAI(formData);
      setResults(analysis);
      return analysis;
    } catch (error) {
      console.error('Failed to start fresh analysis:', error);
      setError(error.message || 'Failed to start fresh analysis. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const analyzeSkill = async () => {
    // First check if analysis already exists
    const hasExisting = await checkForExistingAnalysis(formData.email);
    if (hasExisting) {
      return; // Modal will handle the next steps
    }

    // Proceed with new analysis
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
    setExistingAnalysis(null);
    setShowDuplicateModal(false);
  };

  return (
    <SkillContext.Provider value={{
      formData,
      results,
      loading,
      error,
      showDuplicateModal,
      existingAnalysis,
      updateFormData,
      analyzeSkill,
      resetData,
      handleViewExistingResults,
      handleStartFresh,
      setShowDuplicateModal
    }}>
      {children}
    </SkillContext.Provider>
  );
};