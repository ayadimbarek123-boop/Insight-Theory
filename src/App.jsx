import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import factsData from './facts.json';

function App() {
  const { t, i18n } = useTranslation();
  const [currentFact, setCurrentFact] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const allFacts = factsData.facts;

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Header */}
      <header className="bg-black bg-opacity-50 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {t('title')}
              </h1>
              <p className="text-sm md:text-base text-gray-300 mt-1">{t('subtitle')}</p>
            </div>
            
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">{t('languages')}:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    currentLanguage === 'en'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => changeLanguage('ar')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    currentLanguage === 'ar'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  AR
                </button>
                <button
                  onClick={() => changeLanguage('fr')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    currentLanguage === 'fr'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 shadow-xl">
            <div className="text-center">
              <p className="text-blue-200 text-sm uppercase tracking-wide">{t('totalFacts')}</p>
              <p className="text-4xl font-bold mt-2">{allFacts.length}</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 shadow-xl">
            <div className="text-center">
              <p className="text-purple-200 text-sm uppercase tracking-wide">Active Language</p>
              <p className="text-4xl font-bold mt-2">{currentLanguage.toUpperCase()}</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-pink-600 to-pink-800 rounded-lg p-6 shadow-xl">
            <div className="text-center">
              <p className="text-pink-200 text-sm uppercase tracking-wide">Scientific Topics</p>
              <p className="text-4xl font-bold mt-2">∞</p>
            </div>
          </div>
        </div>

        {/* Random Fact Generator Section */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-8 shadow-xl mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Random Fact Generator</h2>
          
          <div className="text-center mb-6">
            <button
              onClick={generateRandomFact}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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

          {currentFact && (
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg p-6 animate-fadeIn">
              <div className="flex items-start gap-3">
                <div className="text-blue-400 text-2xl">💡</div>
                <p className="text-lg leading-relaxed">{currentFact}</p>
              </div>
            </div>
          )}
        </div>

        {/* Search Section */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Search Scientific Facts</h2>
          
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
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
            <div className="space-y-3">
              {filteredFacts.length > 0 ? (
                <>
                  <p className="text-gray-400 text-sm mb-4">
                    Found {filteredFacts.length} fact{filteredFacts.length !== 1 ? 's' : ''}
                  </p>
                  <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
                    {filteredFacts.map((fact, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg p-4 hover:from-gray-600 hover:to-gray-800 transition cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-blue-400 text-xl">🔬</div>
                          <p className="text-sm leading-relaxed">{fact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 text-lg">{t('noResults')}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black bg-opacity-50 backdrop-blur-sm mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p className="text-sm">
            © 2026 The Insight Theory - A Global Scientific Platform
          </p>
          <p className="text-xs mt-2">
            Dedicated to unveiling the universe's deepest secrets through data-driven insights
          </p>
        </div>
      </footer>

      {/* Custom animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
