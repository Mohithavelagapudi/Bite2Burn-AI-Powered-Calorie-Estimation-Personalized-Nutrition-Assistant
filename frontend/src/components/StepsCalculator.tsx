import React, { useState } from 'react';
import { X } from 'lucide-react';

interface StepsCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaceOption = {
  speed: number;
  met: number;
  label: string;
  description: string;
};

const paceOptions: PaceOption[] = [
  { speed: 0.9, met: 2.8, label: 'Slow', description: '2 miles/hour (3.2 km/h)' },
  { speed: 1.34, met: 3.5, label: 'Average', description: '3 miles/hour (4.8 km/h)' },
  { speed: 1.79, met: 5.0, label: 'Fast', description: '4 miles/hour (6.4 km/h)' },
];

export function StepsCalculator({ isOpen, onClose }: StepsCalculatorProps) {
  const [formData, setFormData] = useState({
    steps: '',
    weight: '',
    height: '',
    pace: '1.34', // Default to average pace
  });
  const [results, setResults] = useState<{
    caloriesBurned: number;
    caloriesPerStep: number;
    timeMinutes: number;
    caloriesPerHour: number;
  } | null>(null);

  const calculateCalories = () => {
    const { steps, weight, height, pace } = formData;
    const stepsNum = parseFloat(steps);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const paceNum = parseFloat(pace);

    if (!stepsNum || !weightNum || !heightNum || !paceNum) return;

    const selectedPace = paceOptions.find(option => option.speed === paceNum);
    if (!selectedPace) return;

    const strideLength = heightNum * 0.414;
    const distance = strideLength * stepsNum;
    const timeHours = distance / (paceNum * 3600); // Convert to hours
    const timeMinutes = timeHours * 60;
    
    const calories = timeHours * selectedPace.met * 3.5 * weightNum / 200;
    const caloriesPerStep = calories / stepsNum;
    const caloriesPerHour = calories / timeHours;

    setResults({
      caloriesBurned: calories,
      caloriesPerStep: caloriesPerStep,
      timeMinutes: timeMinutes,
      caloriesPerHour: caloriesPerHour,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateCalories();
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-purple-600">Steps to Calories</h2>
          <button onClick={onClose} className="p-2 hover:bg-purple-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Number of Steps</label>
            <input
              type="number"
              name="steps"
              value={formData.steps}
              onChange={handleInputChange}
              placeholder="Enter number of steps"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="Enter weight in kg"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Height (m)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              placeholder="Enter height in meters"
              step="0.01"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Walking Pace</label>
            <div className="space-y-2">
              {paceOptions.map((option) => (
                <label key={option.speed} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="pace"
                    value={option.speed}
                    checked={formData.pace === option.speed.toString()}
                    onChange={handleInputChange}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <div>
                    <span className="font-medium">{option.label}</span>
                    <span className="text-sm text-gray-500 ml-2">({option.description})</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Calculate
          </button>

          {results && (
            <div className="mt-6 space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-600 mb-2">Results</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-600">Calories burned:</span>
                    <span className="ml-2 font-bold">{results.caloriesBurned.toFixed(2)} kcal</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Calories per step:</span>
                    <span className="ml-2 font-bold">{results.caloriesPerStep.toFixed(5)} kcal</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm">
                  ⚡ Taking {formData.steps} steps at this pace takes about{' '}
                  {Math.round(results.timeMinutes)} minutes, which means you're burning around{' '}
                  {Math.round(results.caloriesPerHour)} kcal per hour.
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}