import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from './components/AnimatedBackground';
import factsData from './facts.json';

function App() {
  const { t, i18n } = useTranslation();
  const [currentFact, setCurrentFact] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const allFacts = factsData.facts;

  // Update document direction for RTL languages
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  // Filter facts based on search term using useMemo for performance
  const filteredFacts = useMemo(() => {
    if (searchTerm.trim() === '') {
      return [];
    }
    return allFacts.filter(fact =>
      fact.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allFacts]);

  const generateRandomFact = () => {
    setIsLoading(true);
    // Simulate a brief loading for effect
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * allFacts.length);
      setCurrentFact(allFacts[randomIndex]);
      setIsLoading(false);
    }, 300);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language || 'en';

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-navy via-deep-indigo to-purple-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Content with relative positioning */}
      <div className="relative z-10">
        {/* Header */}
        <header className="glass-effect sticky top-0 z-50 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent">
                  {t('title')}
                </h1>
                <p className="text-sm md:text-base text-gray-300 mt-1">{t('subtitle')}</p>
              </div>
              
              {/* Language Selector - Rounded Glowing Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">{t('languages')}:</span>
                <div className="flex gap-2 p-1 glass-effect rounded-full">
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      currentLanguage === 'en'
                        ? 'bg-electric-cyan text-deep-navy shadow-[0_0_20px_rgba(34,211,238,0.6)]'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => changeLanguage('ar')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      currentLanguage === 'ar'
                        ? 'bg-electric-cyan text-deep-navy shadow-[0_0_20px_rgba(34,211,238,0.6)]'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    AR
                  </button>
                  <button
                    onClick={() => changeLanguage('fr')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      currentLanguage === 'fr'
                        ? 'bg-electric-cyan text-deep-navy shadow-[0_0_20px_rgba(34,211,238,0.6)]'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    FR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Stats Section with Glassmorphism */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-effect glass-hover rounded-lg p-6 shadow-xl"
            >
              <div className="text-center">
                <p className="text-electric-cyan text-sm uppercase tracking-wide">{t('totalFacts')}</p>
                <p className="text-4xl font-bold mt-2">{allFacts.length}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect glass-hover rounded-lg p-6 shadow-xl"
            >
              <div className="text-center">
                <p className="text-neon-purple text-sm uppercase tracking-wide">Active Language</p>
                <p className="text-4xl font-bold mt-2">{currentLanguage.toUpperCase()}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-effect glass-hover rounded-lg p-6 shadow-xl"
            >
              <div className="text-center">
                <p className="text-pink-400 text-sm uppercase tracking-wide">Scientific Topics</p>
                <p className="text-4xl font-bold mt-2">∞</p>
              </div>
            </motion.div>
          </div>

          {/* Random Fact Generator Section with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-effect rounded-lg p-8 shadow-xl mb-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent">
              Random Fact Generator
            </h2>
            
            <div className="text-center mb-6">
              <button
                onClick={generateRandomFact}
                disabled={isLoading}
                className="bg-gradient-to-r from-electric-cyan to-neon-purple hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('loadingFact')}
                  </span>
                ) : (
                  t('randomFactButton')
                )}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {currentFact && (
                <motion.div
                  key={currentFact}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="glass-effect glass-hover rounded-lg p-6"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-electric-cyan text-2xl">💡</div>
                    <p className="text-lg leading-relaxed">{currentFact}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Search Section with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-effect rounded-lg p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent">
              Search Scientific Facts
            </h2>
            
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full glass-effect text-white rounded-lg py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-electric-cyan transition placeholder-gray-400"
                />
                {/* Fixed magnifying glass icon - 24px */}
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  width="24"
                  height="24"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>

            {searchTerm && (
              <div>
                {filteredFacts.length > 0 ? (
                  <>
                    <p className="text-gray-400 text-sm mb-4">
                      Found {filteredFacts.length} fact{filteredFacts.length !== 1 ? 's' : ''}
                    </p>
                    {/* Grid layout for search results */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2">
                      <AnimatePresence>
                        {filteredFacts.map((fact, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: index * 0.05 }}
                            className="glass-effect glass-hover rounded-lg p-4 cursor-pointer"
                          >
                            <div className="flex items-start gap-3">
                              <div className="text-neon-purple text-xl flex-shrink-0">🔬</div>
                              <p className="text-sm leading-relaxed">{fact}</p>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <p className="text-gray-400 text-lg">{t('noResults')}</p>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="glass-effect mt-12 py-6">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p className="text-sm">
              © 2026 The Insight Theory - A Global Scientific Platform
            </p>
            <p className="text-xs mt-2">
              Dedicated to unveiling the universe's deepest secrets through data-driven insights
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
