import { useState } from 'react';
import { BookOpen, Layers, Award, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { subjects } from '../data/mockData';

export default function PracticePage() {
  const [selectedSubject, setSelectedSubject] = useState(null);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-emerald-100 text-[#10B981] text-xs font-semibold px-4 py-1 rounded-full mb-3">
            Practice Arena
          </span>
          <h1 className="text-4xl font-bold text-gray-900">Subject-wise Practice</h1>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Choose a subject to sharpen your concepts. Complete targeted quizzes to strengthen your weaker areas.
          </p>
        </div>

        {/* Practice Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subjects List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Available Subjects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subjects.map((sub, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedSubject(sub)}
                  className={`border rounded-[20px] p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    selectedSubject?.name === sub.name
                      ? 'border-[#2563EB] bg-blue-50/50 shadow-md'
                      : `${sub.color} hover:shadow-lg hover:-translate-y-0.5`
                  }`}
                >
                  <div>
                    <div className="text-4xl mb-3">{sub.icon}</div>
                    <h3 className="font-bold text-gray-900 text-base mb-1">{sub.name}</h3>
                    <p className="text-xs text-gray-500 mb-4">
                      {sub.topics} Topics • {sub.questions.toLocaleString()} Questions
                    </p>
                  </div>
                  <button className="w-full mt-2 bg-white text-[#2563EB] text-xs font-bold py-2.5 rounded-xl hover:bg-[#2563EB] hover:text-white transition border border-[#2563EB]/20 flex items-center justify-center gap-1 shadow-sm">
                    View Topics <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Details / Topics Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-6 sticky top-24">
              {selectedSubject ? (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">{selectedSubject.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">{selectedSubject.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Syllabus Breakdown</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-xl p-3.5 flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Layers className="w-4 h-4 text-[#2563EB]" /> Total Topics
                      </div>
                      <span className="font-bold text-[#2563EB]">{selectedSubject.topics}</span>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-3.5 flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2 text-gray-700">
                        <BookOpen className="w-4 h-4 text-[#10B981]" /> Total Questions
                      </div>
                      <span className="font-bold text-[#10B981]">{selectedSubject.questions.toLocaleString()}</span>
                    </div>
                  </div>

                  <h4 className="font-bold text-gray-900 text-xs tracking-wider uppercase mt-6 mb-3">Topic List</h4>
                  <div className="max-h-60 overflow-y-auto pr-1 space-y-2 mb-6">
                    {selectedSubject.topicList && selectedSubject.topicList.map((topic, ti) => (
                      <div key={ti} className="flex items-center gap-2 text-sm text-gray-600 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                        {topic}
                      </div>
                    ))}
                  </div>

                  <button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-sm">
                    <Award className="w-4 h-4" /> Start Practice Quiz
                  </button>
                </div>
              ) : (
                <div className="py-12 text-center text-gray-500">
                  <div className="text-5xl mb-4">🎯</div>
                  <p className="font-medium text-sm">Select a subject on the left to see available topics and start practicing.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
