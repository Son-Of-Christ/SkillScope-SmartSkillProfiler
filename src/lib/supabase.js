//Supabase.js:Database client - Supabase connection, API calls, duplicate checking, and data management

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if email already has an analysis
export const checkExistingAnalysis = async (email) => {
  try {
    const { data, error } = await supabase
      .from('skill_analyses')
      .select('*')
      .eq('user_email', email)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error checking existing analysis:', error);
      return null;
    }

    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error('Failed to check existing analysis:', error);
    return null;
  }
};

// Helper function to delete existing analysis
export const deleteExistingAnalysis = async (email) => {
  try {
    const { error } = await supabase
      .from('skill_analyses')
      .delete()
      .eq('user_email', email);

    if (error) {
      console.error('Error deleting existing analysis:', error);
      throw new Error('Failed to delete existing analysis');
    }

    return true;
  } catch (error) {
    console.error('Failed to delete existing analysis:', error);
    throw error;
  }
};

// Helper function to call our Edge Function
export const analyzeSkillWithAI = async (formData) => {
  try {
    console.log('Calling Edge Function with data:', formData);
    
    const { data, error } = await supabase.functions.invoke('analyze-skill', {
      body: formData
    });

    if (error) {
      console.error('Edge function error details:', error);
      
      // More specific error handling
      if (error.message?.includes('Gemini API key')) {
        throw new Error('Google Gemini API key not configured. Please check your Supabase Edge Function environment variables.');
      } else if (error.message?.includes('500')) {
        throw new Error('Server error occurred. Please check the Edge Function logs in your Supabase dashboard.');
      } else {
        throw new Error(error.message || 'Failed to analyze skills. Please try again.');
      }
    }

    if (!data || !data.success) {
      console.error('Edge function returned error:', data);
      throw new Error(data?.error || 'Analysis failed. Please try again.');
    }

    console.log('Analysis completed successfully:', data);
    return data;
  } catch (error) {
    console.error('Analysis error:', error);
    throw error;
  }
};

// Helper function to get shared analysis
export const getSharedAnalysis = async (analysisId) => {
  try {
    const { data, error } = await supabase
      .from('skill_analyses')
      .select('*')
      .eq('id', analysisId)
      .single();

    if (error) {
      throw new Error('Analysis not found');
    }

    return {
      id: data.id,
      fullName: data.user_name,
      email: data.user_email,
      primarySkill: data.primary_skill,
      experience: data.experience_description,
      profileSummary: data.ai_profile_summary,
      suggestedSkills: data.ai_suggested_skills,
      confidence: data.ai_confidence,
      createdAt: data.created_at
    };
  } catch (error) {
    console.error('Failed to fetch shared analysis:', error);
    throw error;
  }
};