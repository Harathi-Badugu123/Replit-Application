import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Target, TrendingUp, Brain } from 'lucide-react';
import Navigation from '../components/Navigation';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 noise-bg">
      {/* Floating Blobs */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-indigo-100">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-900">Science-backed Career Guidance</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                Discover a career designed for{' '}
                <span className="gradient-text">who you are</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
                Stop guessing. Our comprehensive multi-dimensional assessment uncovers your unique psychological profile to match you with careers where you'll thrive.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/assessment')}
                  data-testid="start-assessment-btn"
                  className="btn-primary group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-lg shadow-lg shadow-indigo-500/30"
                >
                  Start Free Assessment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-indigo-600 font-semibold text-lg border border-indigo-100 hover:bg-indigo-50 transition-all"
                  data-testid="learn-more-btn"
                >
                  Learn How It Works
                </button>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-indigo-600">20</div>
                  <div className="text-sm text-slate-600">Questions</div>
                </div>
                <div className="w-px h-12 bg-slate-200" />
                <div>
                  <div className="text-3xl font-bold text-indigo-600">5</div>
                  <div className="text-sm text-slate-600">Minutes</div>
                </div>
                <div className="w-px h-12 bg-slate-200" />
                <div>
                  <div className="text-3xl font-bold text-indigo-600">Free</div>
                  <div className="text-sm text-slate-600">Forever</div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/7868820/pexels-photo-7868820.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Student working"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent" />
              </div>
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">98% Accuracy</div>
                    <div className="text-sm text-slate-600">Career Matching</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Why PathFinder?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our assessment goes beyond simple quizzes to provide deep insights into your career potential.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Psychometric Analysis",
                description: "Based on proven RIASEC model and personality frameworks used by career counselors worldwide."
              },
              {
                icon: Target,
                title: "Personalized Matches",
                description: "Get matched with careers that align with your interests, skills, and personality traits."
              },
              {
                icon: TrendingUp,
                title: "Actionable Insights",
                description: "Receive detailed reports with career paths, required skills, and growth opportunities."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 card-glow"
                data-testid={`feature-card-${index}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;