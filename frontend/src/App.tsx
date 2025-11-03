import React, { useState } from 'react';
import { Flame, Send, Menu, Calculator, Footprints } from 'lucide-react';
import { CalorieCalculator } from './components/CalorieCalculator';
import { StepsCalculator } from './components/StepsCalculator';

function App() {
  const [input, setInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isStepsCalculatorOpen, setIsStepsCalculatorOpen] = useState(false);

  return (
    <div className={`flex flex-col h-screen text-gray-800 transition-all duration-300 bg-main-bg bg-cover bg-center bg-fixed ${isCalculatorOpen || isStepsCalculatorOpen ? 'mr-96' : ''}`}>
      {/* Add a semi-transparent overlay */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm -z-10" />

      {/* Top Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-purple-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <Flame className="w-6 h-6 text-purple-600" />
                <span className="text-2xl font-bold text-gray-800">Bite2Burn</span>
              </div>
              <span className="text-s text-purple-600 ml-8 -mt-1">eat it to burn it</span>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <button 
              onClick={() => {
                setIsCalculatorOpen(true);
                setIsStepsCalculatorOpen(false);
              }}
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              <Calculator className="w-5 h-5" />
              <span>Calorie Calculator</span>
            </button>
            <button
              onClick={() => {
                setIsStepsCalculatorOpen(true);
                setIsCalculatorOpen(false);
              }}
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              <Footprints className="w-5 h-5" />
              <span>Steps2Calories</span>
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Start New Chat
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 flex items-center px-4">
          {!isSidebarOpen && (
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-purple-100 rounded mr-2">
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div className="flex-1 flex justify-center">
            <span className="text-2xl font-semibold text-purple-600">"Eat smart, move more, live bright!"</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-4 space-y-4">
            <div className="bg-[rgb(230,218,250)]/90 backdrop-blur-sm p-6 rounded-lg">
              <h1 className="text-2xl font-bold mb-4">Welcome to Bite2Burn</h1>
              <p className="text-gray-700 mb-6">
                Your AI-powered Nutrition guide. Ask me anything about the calorie content in daily foods.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Calculate daily calories",
                  "Track your steps",
                  "Monitor progress",
                  "Get personalized insights"
                ].map((feature, i) => (
                  <div key={i} className="bg-white/80 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Flame className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <footer className="p-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center space-x-2 bg-[rgb(230,218,250)]/90 backdrop-blur-sm rounded-lg p-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Start Typing..."
                className="flex-1 bg-transparent border-0 focus:ring-0 resize-none h-10 py-2 px-3 text-gray-700 placeholder-gray-500"
                rows={1}
              />
              <button className="p-2 hover:bg-purple-200 rounded-lg transition-colors">
                <Send className="w-5 h-5 text-purple-600" />
              </button>
            </div>
          </div>
        </footer>
      </div>

      <CalorieCalculator 
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
      <StepsCalculator
        isOpen={isStepsCalculatorOpen}
        onClose={() => setIsStepsCalculatorOpen(false)}
      />
    </div>
  );
}

export default App;