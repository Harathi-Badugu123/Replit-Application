import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import useAssessmentStore from '../store/assessmentStore';
import Navigation from '../components/Navigation';
import ProgressBar from '../components/ProgressBar';
import LikertScale from '../components/LikertScale';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AssessmentPage = () => {
  const navigate = useNavigate();
  const { answers, setAnswer, currentStep, setCurrentStep, resetAssessment } = useAssessmentStore();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const questionsPerPage = 5;
  const totalSteps = 4;

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${API}/questions`);
      setQuestions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast.error('Failed to load questions. Please try again.');
      setLoading(false);
    }
  };

  const getCurrentQuestions = () => {
    const start = currentStep * questionsPerPage;
    const end = start + questionsPerPage;
    return questions.slice(start, end);
  };

  const isStepComplete = () => {
    const currentQuestions = getCurrentQuestions();
    return currentQuestions.every(q => answers[q.id] !== undefined);
  };

  const handleNext = () => {
    if (!isStepComplete()) {
      toast.error('Please answer all questions before continuing');
      return;
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, value]) => ({
        question_id: parseInt(questionId),
        value: value
      }));

      const response = await axios.post(`${API}/submit-assessment`, {
        answers: formattedAnswers
      });

      toast.success('Assessment completed successfully!');
      navigate('/results', { state: { results: response.data } });
      resetAssessment();
    } catch (error) {
      console.error('Error submitting assessment:', error);
      toast.error('Failed to submit assessment. Please try again.');
      setSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;
  const answeredInStep = getCurrentQuestions().filter(q => answers[q.id] !== undefined).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading assessment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 noise-bg">
      <Navigation />
      <ProgressBar progress={progress} />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-indigo-100 mb-6">
            <span className="text-sm font-medium text-indigo-900">
              Step {currentStep + 1} of {totalSteps}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Assessment in Progress
          </h1>
          <p className="text-lg text-slate-600">
            {answeredInStep} of {questionsPerPage} questions answered in this section
          </p>
        </motion.div>

        {/* Questions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {getCurrentQuestions().map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-indigo-100/50 border border-slate-100"
                data-testid={`question-card-${question.id}`}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold">
                    {currentStep * questionsPerPage + index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                      {question.text}
                    </h3>
                    <div className="flex gap-2">
                      <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full">
                        {question.category}
                      </span>
                      <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-sm font-medium rounded-full">
                        {question.subcategory}
                      </span>
                    </div>
                  </div>
                  {answers[question.id] !== undefined && (
                    <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0" />
                  )}
                </div>

                <LikertScale
                  questionId={question.id}
                  value={answers[question.id]}
                  onChange={(value) => setAnswer(question.id, value)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-between items-center mt-12"
        >
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-700 font-semibold border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            data-testid="previous-btn"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="text-center flex-1 mx-4">
            <div className="text-sm text-slate-600">
              {Object.keys(answers).length} of {questions.length} total questions answered
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!isStepComplete() || submitting}
            className="btn-primary inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/30"
            data-testid="next-btn"
          >
            {submitting ? (
              'Submitting...'
            ) : currentStep === totalSteps - 1 ? (
              <>Complete Assessment <CheckCircle className="w-5 h-5" /></>
            ) : (
              <>Next <ArrowRight className="w-5 h-5" /></>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AssessmentPage;