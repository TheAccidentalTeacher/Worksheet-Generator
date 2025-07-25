'use client';

import React, { useState } from 'react';
import { Send, Loader2, Download, Eye, Sparkles, BookOpen, Heart, Target, Clock, FileText, Settings } from 'lucide-react';
import { downloadAsPDF, downloadAsWord, WorksheetResult } from '@/lib/downloadUtils';

// Import our Phase 1 Enhanced Systems
import { WorkflowEngine } from '@/lib/workflow/WorkflowEngine';
import { EnhancedWorksheetGenerator } from '@/lib/EnhancedWorksheetGenerator';
import { ProfessionalOutputEngine } from '@/lib/output/ProfessionalOutputEngine';
import { TemplateEngine } from '@/lib/TemplateEngine';
import type { WorkflowState, GenerationRequest } from '@/lib/workflow/types';
import type { ChristianContentLevel, Denomination } from '@/lib/denominational/types';

interface EnhancedWorksheetGeneratorProps {
  customization?: {
    grade: string;
    subject: string;
    topic: string;
    numProblems: number;
    scaffolding: string;
    differentiation: string;
    christianContent: number;
    worksheetStyle: string;
    timeEstimate: string;
  };
}

export default function EnhancedWorksheetGeneratorComponent({ customization }: EnhancedWorksheetGeneratorProps) {
  // Phase 1 Enhanced Template System State
  const [workflowEngine] = useState(() => new WorkflowEngine());
  const [currentStep, setCurrentStep] = useState(0);
  const [generationRequest, setGenerationRequest] = useState<Partial<GenerationRequest>>({});
  const [result, setResult] = useState<WorksheetResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Enhanced generation function
  async function generateEnhancedWorksheet() {
    if (!generationRequest.basicInfo) return;
    
    setLoading(true);
    setError('');

    try {
      const result = await EnhancedWorksheetGenerator.generateWorksheet(generationRequest as GenerationRequest);
      
      // Convert to our existing result format
      setResult({
        title: generationRequest.topic?.mainTopic || 'Generated Worksheet',
        grade: generationRequest.basicInfo?.gradeLevel?.toString() || '',
        subject: generationRequest.basicInfo?.subject || '',
        topic: generationRequest.topic?.mainTopic || '',
        description: `Enhanced worksheet using ${result.metadata.template.name}`,
        instructions: 'Complete the following worksheet activities.',
        estimatedTime: `${generationRequest.basicInfo?.estimatedTime || 30} minutes`,
        problems: [], // We'll parse this from the content later
        answerKey: 'Generated by Enhanced Template System'
      });
    } catch (error) {
      console.error('Enhanced generation failed:', error);
      setError(error instanceof Error ? error.message : 'Generation failed');
    } finally {
      setLoading(false);
    }
  }

  function handleWorkflowNext() {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else if (generationRequest.basicInfo) {
      generateEnhancedWorksheet();
    }
  }

  function handleWorkflowBack() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  return (
    <div className="w-full space-y-6 min-w-0 max-w-full">
      {/* Enhanced Template System UI */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Enhanced Template System</h2>
            </div>
            <p className="text-gray-600 text-lg">
              Professional templates • Denominational integration • Multi-step workflow
            </p>
          </div>
          
          {/* Step Progress Indicator */}
          <div className="flex items-center justify-between mb-8">
            {[
              { step: 0, label: 'Basic Info', icon: BookOpen },
              { step: 1, label: 'Topic', icon: Target },
              { step: 2, label: 'Faith Level', icon: Heart },
              { step: 3, label: 'Customize', icon: Settings },
              { step: 4, label: 'Template', icon: FileText },
              { step: 5, label: 'Review', icon: Eye }
            ].map(({ step, label, icon: Icon }) => (
              <div key={step} className={`flex flex-col items-center ${
                currentStep >= step ? 'text-blue-600' : 'text-gray-400'
              }`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm mt-2 font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {currentStep === 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-center">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-3">Grade Level</label>
                    <select 
                      className="w-full border-2 border-gray-300 rounded-xl p-4 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      onChange={(e) => setGenerationRequest(prev => ({
                        ...prev,
                        basicInfo: { 
                          ...prev.basicInfo, 
                          gradeLevel: parseInt(e.target.value), 
                          subject: prev.basicInfo?.subject || 'Math', 
                          estimatedTime: prev.basicInfo?.estimatedTime || 30 
                        }
                      }))}
                    >
                      <option value="">Select Grade</option>
                      {Array.from({length: 13}, (_, i) => (
                        <option key={i} value={i}>{i === 0 ? 'Kindergarten' : `Grade ${i}`}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-3">Subject</label>
                    <select 
                      className="w-full border-2 border-gray-300 rounded-xl p-4 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      onChange={(e) => setGenerationRequest(prev => ({
                        ...prev,
                        basicInfo: { 
                          ...prev.basicInfo, 
                          subject: e.target.value as any, 
                          gradeLevel: prev.basicInfo?.gradeLevel || 1, 
                          estimatedTime: prev.basicInfo?.estimatedTime || 30 
                        }
                      }))}
                    >
                      <option value="">Select Subject</option>
                      <option value="Math">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="Language Arts">Language Arts</option>
                      <option value="History">History</option>
                      <option value="Geography">Geography</option>
                      <option value="Art">Art</option>
                      <option value="Bible">Bible Study</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-center">Topic Selection</h3>
                <div className="max-w-2xl mx-auto">
                  <label className="block text-lg font-medium text-gray-700 mb-3">Main Topic</label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-300 rounded-xl p-4 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="e.g., Multiplication, Solar System, American Revolution"
                    onChange={(e) => setGenerationRequest(prev => ({
                      ...prev,
                      topic: { 
                        mainTopic: e.target.value,
                        subtopics: prev.topic?.subtopics || [],
                        learningObjectives: prev.topic?.learningObjectives || []
                      }
                    }))}
                  />
                  <p className="text-gray-600 mt-2">Be specific to get the best results!</p>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-center">Faith Integration Level</h3>
                <div className="max-w-3xl mx-auto space-y-4">
                  {[
                    { level: 0, title: 'Secular Content', desc: 'No faith elements - purely academic content', color: 'gray' },
                    { level: 1, title: 'Christian Values', desc: 'General values like kindness, honesty, service', color: 'green' },
                    { level: 2, title: 'Biblical Themes', desc: 'Stories and themes naturally integrated', color: 'blue' },
                    { level: 3, title: 'Doctrinal Content', desc: 'Explicit denominational teaching and theology', color: 'purple' }
                  ].map(({ level, title, desc, color }) => (
                    <label key={level} className={`flex items-start p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-all ${
                      generationRequest.faithIntegration?.level === level ? `border-${color}-500 bg-${color}-50` : ''
                    }`}>
                      <input
                        type="radio"
                        name="faithLevel"
                        value={level}
                        className="mt-1 mr-4 scale-125"
                        onChange={() => setGenerationRequest(prev => ({
                          ...prev,
                          faithIntegration: {
                            level: level as ChristianContentLevel,
                            denomination: prev.faithIntegration?.denomination,
                            specificRequests: prev.faithIntegration?.specificRequests
                          }
                        }))}
                      />
                      <div>
                        <div className="text-lg font-semibold">{title}</div>
                        <div className="text-gray-600">{desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Additional steps would go here */}
            {currentStep >= 3 && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <Sparkles className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-4">Ready to Generate!</h3>
                  <p className="text-gray-600 mb-6">
                    Your worksheet will be created using our enhanced template system with denominational integration.
                  </p>
                  <button
                    onClick={generateEnhancedWorksheet}
                    disabled={loading || !generationRequest.basicInfo?.gradeLevel || !generationRequest.topic?.mainTopic}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5" />
                        Generate Professional Worksheet
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          {currentStep < 3 && (
            <div className="flex justify-between pt-6 border-t">
              <button
                onClick={handleWorkflowBack}
                disabled={currentStep === 0}
                className="px-6 py-3 text-gray-600 border-2 border-gray-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Back
              </button>
              <button
                onClick={handleWorkflowNext}
                disabled={
                  (currentStep === 0 && !generationRequest.basicInfo?.gradeLevel) ||
                  (currentStep === 1 && !generationRequest.topic?.mainTopic) ||
                  (currentStep === 2 && generationRequest.faithIntegration?.level === undefined)
                }
                className="px-8 py-3 bg-blue-600 text-white rounded-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Results Display */}
        {result && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold">Generated Worksheet</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => downloadAsPDF(result)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Download className="h-4 w-4" />
                  PDF
                </button>
                <button
                  onClick={() => downloadAsWord(result)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Download className="h-4 w-4" />
                  Word
                </button>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-semibold text-lg">{result.title}</h4>
              <p className="text-gray-600">{result.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                Grade: {result.grade} | Subject: {result.subject} | Time: {result.estimatedTime}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
