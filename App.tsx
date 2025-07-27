
import React, { useState, useCallback } from 'react';
import type { AnalysisResult } from './types';
import { analyzeFeedback } from './services/geminiService';
import Header from './components/Header';
import FeedbackInput from './components/FeedbackInput';
import AnalysisResults from './components/AnalysisResults';
import Spinner from './components/Spinner';
import Alert from './components/Alert';

const App: React.FC = () => {
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeClick = useCallback(async () => {
    if (!feedbackText.trim()) {
      setError('Please enter some feedback to analyze.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeFeedback(feedbackText);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError('An error occurred during analysis. Please check the console or try again.');
    } finally {
      setIsLoading(false);
    }
  }, [feedbackText]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8">
            Paste your customer feedback, reviews, or survey responses below to get an instant AI-powered analysis.
          </p>

          <FeedbackInput
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            onAnalyze={handleAnalyzeClick}
            isLoading={isLoading}
          />

          {error && <div className="mt-6"><Alert message={error} /></div>}
          
          {isLoading && <Spinner />}

          {analysis && !isLoading && (
            <div className="mt-8 animate-fade-in">
              <AnalysisResults result={analysis} />
            </div>
          )}

          {!analysis && !isLoading && !error && (
             <div className="text-center mt-12 p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Analysis will appear here</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your results are just a click away.</p>
             </div>
          )}

        </div>
      </main>
      <footer className="text-center p-4 mt-8 text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} AI Feedback Analyzer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
