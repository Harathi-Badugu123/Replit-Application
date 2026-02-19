import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Trophy, Star, TrendingUp, Download, RotateCcw, Sparkles } from 'lucide-react';
import Navigation from '../components/Navigation';
import { toast } from 'sonner';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results;

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">No results found</p>
          <button
            onClick={() => navigate('/assessment')}
            className="btn-primary px-6 py-3 rounded-full text-white font-semibold"
          >
            Take Assessment
          </button>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    toast.info('PDF download feature coming soon!');
  };

  const handleRetake = () => {
    navigate('/assessment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 noise-bg">
      <Navigation />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-indigo-100 mb-6">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-900">Your Results Are Ready!</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
            You're <span className="gradient-text">{results.personality_type}</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Based on your responses, we've identified your top career matches and key strengths.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Top Career Match - Large Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl p-8 text-white shadow-2xl"
            data-testid="top-career-match"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-medium opacity-90">Top Career Match</div>
                <div className="text-2xl font-bold">{results.career_matches[0]?.match_score}% Match</div>
              </div>
            </div>

            <h2 className="text-4xl font-bold mb-4">{results.career_matches[0]?.title}</h2>
            <p className="text-lg opacity-90 mb-6 leading-relaxed">
              {results.career_matches[0]?.description}
            </p>

            <div className="mb-6">
              <div className="text-sm font-semibold mb-3 opacity-90">Key Traits</div>
              <div className="flex flex-wrap gap-2">
                {results.career_matches[0]?.traits.map((trait, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold mb-3 opacity-90">Sample Careers</div>
              <div className="space-y-2">
                {results.career_matches[0]?.sample_careers.slice(0, 3).map((career, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Star className="w-4 h-4" fill="currentColor" />
                    <span className="font-medium">{career}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Top Strengths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 md:row-span-1 bg-white rounded-3xl p-8 shadow-xl border border-slate-100"
            data-testid="top-strengths"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Your Top Strengths</h3>
            </div>
            <div className="space-y-3">
              {results.top_strengths?.map((strength, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="font-semibold text-slate-900">{strength}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 md:row-span-1 bg-white rounded-3xl p-8 shadow-xl border border-slate-100"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-6">Next Steps</h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleDownload}
                data-testid="download-report-btn"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                <Download className="w-5 h-5" />
                Download Full Report
              </button>
              <button
                onClick={handleRetake}
                data-testid="retake-assessment-btn"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-900 font-semibold rounded-xl hover:bg-slate-200 transition-all"
              >
                <RotateCcw className="w-5 h-5" />
                Retake Assessment
              </button>
            </div>
          </motion.div>
        </div>

        {/* Other Career Matches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Other Great Matches</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {results.career_matches?.slice(1).map((match, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all"
                data-testid={`career-match-${index + 1}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">{match.title}</h3>
                  <div className="px-4 py-2 bg-indigo-100 text-indigo-700 font-bold rounded-full">
                    {match.match_score}%
                  </div>
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed">{match.description}</p>
                <div className="mb-4">
                  <div className="text-sm font-semibold text-slate-700 mb-2">Key Traits</div>
                  <div className="flex flex-wrap gap-2">
                    {match.traits.map((trait, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-700 mb-2">Sample Careers</div>
                  <ul className="space-y-1">
                    {match.sample_careers.slice(0, 3).map((career, i) => (
                      <li key={i} className="text-slate-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        {career}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsPage;