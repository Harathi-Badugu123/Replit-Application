import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Compass } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="relative z-10 px-6 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 group"
          data-testid="logo-btn"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900">PathFinder</span>
        </button>

        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/')}
            className={`font-medium transition-colors ${
              location.pathname === '/' ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'
            }`}
            data-testid="nav-home"
          >
            Home
          </button>
          <button
            onClick={() => navigate('/assessment')}
            className={`font-medium transition-colors ${
              location.pathname === '/assessment' ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'
            }`}
            data-testid="nav-assessment"
          >
            Assessment
          </button>
          {location.pathname !== '/assessment' && (
            <button
              onClick={() => navigate('/assessment')}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-full hover:shadow-lg transition-all"
              data-testid="nav-start-now"
            >
              Start Now
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;