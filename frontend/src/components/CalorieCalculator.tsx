import React, { useState } from 'react';
import { X } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface CalorieCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

type ActivityLevel = {
  value: number;
  label: string;
};

const activityLevels: ActivityLevel[] = [
  { value: 1.2, label: 'Sedentary (little/no exercise)' },
  { value: 1.4, label: 'Slightly active (1-2 days/week)' },
  { value: 1.6, label: 'Moderately active (2-3 days/week)' },
  { value: 1.75, label: 'Very active (4-5 days/week)' },
  { value: 2.0, label: 'Extra active (6-7 days/week)' },
  { value: 2.3, label: 'Professional athlete' },
];

const MACRO_DATA = [
  { name: 'Protein', value: 22.5, color: '#9333EA' },
  { name: 'Carbs', value: 50, color: '#A855F7' },
  { name: 'Fat', value: 27.5, color: '#C084FC' },
];

export function CalorieCalculator({ isOpen, onClose }: CalorieCalculatorProps) {
  const [formData, setFormData] = useState({
    sex: 'male',
    feet: '',
    inches: '',
    weight: '',
    age: '',
    activityLevel: '1.2',
  });
  const [calories, setCalories] = useState<number | null>(null);

  const calculateBMR = () => {
    const { sex, feet, inches, weight, age, activityLevel } = formData;
    const weightNum = parseFloat(weight);
    const feetNum = parseFloat(feet);
    const inchesNum = parseFloat(inches || '0');
    const heightInCm = ((feetNum * 12) + inchesNum) * 2.54;
    const ageNum = parseFloat(age);
    const activityMultiplier = parseFloat(activityLevel);

    if (!weightNum || !heightInCm || !ageNum || !activityMultiplier) return;

    let bmr;
    if (sex === 'male') {
      bmr = 10 * weightNum + 6.25 * heightInCm - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightInCm - 5 * ageNum - 161;
    }

    const totalCalories = Math.round(bmr * activityMultiplier);
    setCalories(totalCalories);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateBMR();
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-purple-600">Calorie Calculator</h2>
          <button onClick={onClose} className="p-2 hover:bg-purple-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Sex</label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 bg-white"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Height</label>
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="number"
                  name="feet"
                  value={formData.feet}
                  onChange={handleInputChange}
                  placeholder="Feet"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  name="inches"
                  value={formData.inches}
                  onChange={handleInputChange}
                  placeholder="Inches"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
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
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Enter age"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Activity Level</label>
            <select
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 bg-white"
            >
              {activityLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Calculate
          </button>

          {calories && (
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-600 mb-2">Your Daily Calorie Needs</h3>
              <div className="text-3xl font-bold text-gray-800">{calories} kcal</div>
              
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-purple-600 mb-2">Recommended Macronutrient Distribution</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={MACRO_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {MACRO_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <div>Protein: {Math.round(calories * 0.225 / 4)} g ({Math.round(calories * 0.225)} kcal)</div>
                  <div>Carbs: {Math.round(calories * 0.5 / 4)} g ({Math.round(calories * 0.5)} kcal)</div>
                  <div>Fat: {Math.round(calories * 0.275 / 9)} g ({Math.round(calories * 0.275)} kcal)</div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}