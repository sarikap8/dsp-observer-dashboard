"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { submitDspSelfEvaluation } from "@/lib/api";


export default function FormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // User info - in a real app this would come from auth context
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  
  const [formData, setFormData] = useState({
    // Human Rights / Disability Rights
    privacyKnock: "",
    privacyHandsOn: "",
    privacyEducation: "",
    // Social Identity
    clothingChoice: "",
    spacePersonalization: "",
    leisureActivities: "",
    // Supported Decision Making
    mealOptions: "",
    activityOptions: "",
    // Abuse, Neglect, and Exploitation
    incidents: "",
    // BELONGING - Schedules and Routines
    personalizedSchedule: "",
    groupSchedule: "",
    responsibilityChart: "",
    // BELONGING - Community Engagement
    communityOutingsIndividual: "",
    communityOutingsGroup: "",
    // BELONGING - Relationships
    phoneAccess: "",
    overnightVisits: "",
    visitorsFriends: "",
    visitorsFamily: "",
    visitorsDates: "",
    // LIFE-LONG LEARNING - Person-Centered Plan
    annualPlanUnderstanding: "",
    // LIFE-LONG LEARNING - Communication Support
    communicationSupportDescription: "",
    communicationSupportUsage: "",
    // LIFE-LONG LEARNING - Adult Learning
    bstStepsUnderstanding: "",
    bstIncorporation: "",
    // LIFE-LONG LEARNING - Positive Behavioral Supports
    behavioralPlanLocation: "",
    behavioralDataReporting: "",
    // HEALTHY LIVING - Health Planning
    physicalFormLocation: "",
    medicationNeeds: "",
    dietaryNeeds: "",
    // HEALTHY LIVING - Health Equity
    exerciseActivities: "",
    mentalHealthActivities: "",
    healthyHabitsTrainings: "",
    personalHygieneEducation: "",
  });

  const [expandedSections, setExpandedSections] = useState({
    choice: true,
    belonging: true,
    lifelongLearning: true,
    healthyLiving: true,
  });

  // Define fields for each section
  const choiceFields = [
    "privacyKnock", "privacyHandsOn", "privacyEducation",
    "clothingChoice", "spacePersonalization", "leisureActivities",
    "mealOptions", "activityOptions", "incidents"
  ];

  const belongingFields = [
    "personalizedSchedule", "groupSchedule", "responsibilityChart",
    "communityOutingsIndividual", "communityOutingsGroup",
    "phoneAccess", "overnightVisits", "visitorsFriends", "visitorsFamily", "visitorsDates"
  ];

  const lifelongLearningFields = [
    "annualPlanUnderstanding",
    "communicationSupportDescription", "communicationSupportUsage",
    "bstStepsUnderstanding", "bstIncorporation",
    "behavioralPlanLocation", "behavioralDataReporting"
  ];

  const healthyLivingFields = [
    "physicalFormLocation", "medicationNeeds", "dietaryNeeds",
    "exerciseActivities", "mentalHealthActivities", "healthyHabitsTrainings", "personalHygieneEducation"
  ];

  // Check if section is complete
  const isSectionComplete = (fields: string[]) => {
    return fields.every(field => {
      const value = formData[field as keyof typeof formData];
      return value !== "" && value !== null && value !== undefined;
    });
  };

  const choiceComplete = useMemo(() => isSectionComplete(choiceFields), [formData]);
  const belongingComplete = useMemo(() => isSectionComplete(belongingFields), [formData]);
  const lifelongLearningComplete = useMemo(() => isSectionComplete(lifelongLearningFields), [formData]);
  const healthyLivingComplete = useMemo(() => isSectionComplete(healthyLivingFields), [formData]);

  // Auto-collapse when section is complete
  useEffect(() => {
    if (choiceComplete) {
      const timeout = setTimeout(() => {
        setExpandedSections(prev => ({ ...prev, choice: false }));
      }, 1000); // wait 1s before closing
  
      return () => clearTimeout(timeout);
    }
  }, [choiceComplete]);
  
  useEffect(() => {
    if (belongingComplete) {
      const timeout = setTimeout(() => {
        setExpandedSections(prev => ({ ...prev, belonging: false }));
      }, 1000);
  
      return () => clearTimeout(timeout);
    }
  }, [belongingComplete]);
  
  useEffect(() => {
    if (lifelongLearningComplete) {
      const timeout = setTimeout(() => {
        setExpandedSections(prev => ({ ...prev, lifelongLearning: false }));
      }, 1000);
  
      return () => clearTimeout(timeout);
    }
  }, [lifelongLearningComplete]);
  
  useEffect(() => {
    if (healthyLivingComplete) {
      const timeout = setTimeout(() => {
        setExpandedSections(prev => ({ ...prev, healthyLiving: false }));
      }, 1000);
  
      return () => clearTimeout(timeout);
    }
  }, [healthyLivingComplete]);

  const toggleSection = (section: "choice" | "belonging" | "lifelongLearning" | "healthyLiving") => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Count completed fields for summary
  const getCompletionCount = (fields: string[]) => {
    const completed = fields.filter(field => {
      const value = formData[field as keyof typeof formData];
      return value !== "" && value !== null && value !== undefined;
    }).length;
    return { completed, total: fields.length };
  };

  const choiceCount = getCompletionCount(choiceFields);
  const belongingCount = getCompletionCount(belongingFields);
  const lifelongLearningCount = getCompletionCount(lifelongLearningFields);
  const healthyLivingCount = getCompletionCount(healthyLivingFields);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 pb-20">
      <div className="sticky top-0 left-0 p-4 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-300 shadow-sm">
        <Image
          src="/next-for-autism-logo.svg"
          alt="Next for Autism Logo"
          width={120}
          height={120}
          className="object-contain"
        />
      </div>
      
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* CHOICE Section */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-blue-100">
          <div 
            className="sticky top-[110px] z-20 bg-white cursor-pointer shadow-md"
            onClick={() => toggleSection("choice")}
          >
            <div className="px-10 pt-10 pb-4 relative">
              <h1 className="text-4xl font-bold mb-10 text-gray-800 text-center border-b-4 border-blue-400 pb-4">
                CHOICE
                {choiceComplete && (
                  <svg className="w-6 h-6 text-green-500 inline-block ml-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </h1>
              {!expandedSections.choice && (
                <p className="text-center text-sm text-gray-600 mt-2">
                  {choiceCount.completed}/{choiceCount.total} questions completed
                </p>
              )}
            </div>
          </div>
          
          {expandedSections.choice && (
          <div className="p-10">
        
          {/* Human Rights / Disability Rights */}
          <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-blue-200 pb-3">
            Human Rights / Disability Rights
          </h2>
          
          <div className="mb-8">
            <p className="text-lg font-medium mb-4 text-gray-700">
              <strong>Individuals have a right to privacy</strong>
            </p>
            <p className="text-base mb-4 text-gray-600">
              DSP knocks and asks permission to enter individuals' personal space (bedroom, physical space, classroom, workspace, etc.).
            </p>
            <div className="space-y-2">
              {[
                { value: "a", label: "Every time (5 out of 5 times)" },
                { value: "b", label: "Most of the time (4 out of 5 times)" },
                { value: "c", label: "Some of the time (3 out of 5 times)" },
                { value: "d", label: "Occasionally (2 out of 5 times)" },
                { value: "e", label: "No opportunity" },
              ].map((option) => (
                <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="privacyKnock"
                    value={option.value}
                    checked={formData.privacyKnock === option.value}
                    onChange={(e) => handleChange("privacyKnock", e.target.value)}
                    className="w-5 h-5 text-blue-600 mr-3 cursor-pointer"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="text-base mb-4 text-gray-600">
              DSP asks the individual's permission prior to using hands-on assistance or support.
            </p>
            <div className="space-y-2">
              {[
                { value: "a", label: "Every time (5 out of 5 times)" },
                { value: "b", label: "Most of the time (4 out of 5 times)" },
                { value: "c", label: "Some of the time (3 out of 5 times)" },
                { value: "d", label: "Occasionally (2 out of 5 times)" },
                { value: "e", label: "No opportunity" },
              ].map((option) => (
                <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="privacyHandsOn"
                    value={option.value}
                    checked={formData.privacyHandsOn === option.value}
                    onChange={(e) => handleChange("privacyHandsOn", e.target.value)}
                    className="w-5 h-5 text-blue-600 mr-3 cursor-pointer"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="text-base mb-4 text-gray-600">
              DSP provides education, through organic reminders, to the supported individual about their right to privacy.
            </p>
            <div className="space-y-2">
              {[
                { value: "a", label: "Consistently (at least 1 time per day)" },
                { value: "b", label: "Often (3–4 times per week)" },
                { value: "c", label: "Sometimes (2 times per week)" },
                { value: "d", label: "Rarely (1 time per week)" },
                { value: "e", label: "No opportunity" },
              ].map((option) => (
                <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="privacyEducation"
                    value={option.value}
                    checked={formData.privacyEducation === option.value}
                    onChange={(e) => handleChange("privacyEducation", e.target.value)}
                    className="w-5 h-5 text-blue-600 mr-3 cursor-pointer"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
          </div>

          {/* Social Identity, Cultural Expression and Personal Agency */}
          <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-blue-200 pb-3">
            Social Identity, Cultural Expression and Personal Agency
          </h2>
          
          <div className="mb-8">
            <p className="text-base mb-4 text-gray-600">
              Individual(s) in setting express themselves through choice of clothing, i.e., choosing their own outfits. Example resource – how to help non-speakers choose their own clothes.
            </p>
            <div className="space-y-2">
              {[
                { value: "a", label: "Every time (7 out of 7 days)" },
                { value: "b", label: "Most of the time (5–6 times per week)" },
                { value: "c", label: "Some of the time (3–4 times per week)" },
                { value: "d", label: "Occasionally (only on special occasions)" },
                { value: "e", label: "Never (DSP always lays out clothing without input from individual)" },
              ].map((option) => (
                <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="clothingChoice"
                    value={option.value}
                    checked={formData.clothingChoice === option.value}
                    onChange={(e) => handleChange("clothingChoice", e.target.value)}
                    className="w-5 h-5 text-blue-600 mr-3 cursor-pointer"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="text-base mb-4 text-gray-600">
              Bedrooms, classrooms, and other living spaces are personalized with meaningful touches, such as family photos and posters showcasing personal interests.
            </p>
            <div className="space-y-2">
              {[
                { value: "a", label: "Completely personalized" },
                { value: "b", label: "Mostly personalized" },
                { value: "c", label: "Somewhat personalized (shared space but has pictures or other personal items)" },
                { value: "d", label: "Limited personalization" },
                { value: "e", label: "Not personalized" },
              ].map((option) => (
                <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="spacePersonalization"
                    value={option.value}
                    checked={formData.spacePersonalization === option.value}
                    onChange={(e) => handleChange("spacePersonalization", e.target.value)}
                    className="w-5 h-5 text-blue-600 mr-3 cursor-pointer"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="text-base mb-4 text-gray-600">
              <strong>Count the total number of leisure activities completed over the month.</strong>
            </p>
            <p className="text-sm mb-4 text-gray-500 italic">
              Leisure activities are enjoyable or relaxing pursuits chosen independently, separate from chores, day programs, or employment. Examples include dining out, volunteering, or time spent away from home in either group or solo settings. Note: group activities should be counted as a single outing.
            </p>
            <div className="flex items-center gap-4">
              <label className="text-gray-700 font-medium">Enter number per week:</label>
              <input
                type="number"
                name="leisureActivities"
                value={formData.leisureActivities}
                onChange={(e) => handleChange("leisureActivities", e.target.value)}
                min="0"
                className="w-32 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700"
                placeholder="0"
              />
            </div>
          </div>
          </div>

          {/* Supported Decision Making */}
          <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-blue-200 pb-3">
            Supported Decision Making
          </h2>
          
          <div className="mb-8">
            <p className="text-base mb-4 text-gray-600">
              The individual is provided options for meals and is able to pick what they want to eat. This can be independently picked or supported when presented with options.
            </p>
            <div className="space-y-2">
              {[
                { value: "a", label: "Every meal" },
                { value: "b", label: "Most meals (7–8 meals per week)" },
                { value: "c", label: "Some meals (5–6 meals per week)" },
                { value: "d", label: "Occasional meals (2–3 meals per week)" },
                { value: "e", label: "No opportunity (only eats what is prepared for them)" },
              ].map((option) => (
                <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="mealOptions"
                    value={option.value}
                    checked={formData.mealOptions === option.value}
                    onChange={(e) => handleChange("mealOptions", e.target.value)}
                    className="w-5 h-5 text-blue-600 mr-3 cursor-pointer"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="text-base mb-4 text-gray-600">
              The individual is provided options for activities, such as games to play, projects to complete, etc.
            </p>
            <div className="space-y-2">
              {[
                { value: "a", label: "Constantly (at least 1 time per day)" },
                { value: "b", label: "Most of the time (at least 5 times per week)" },
                { value: "c", label: "Sometimes (at least 3 times per week)" },
                { value: "d", label: "Occasionally (2 times per week)" },
                { value: "e", label: "No opportunity" },
              ].map((option) => (
                <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="activityOptions"
                    value={option.value}
                    checked={formData.activityOptions === option.value}
                    onChange={(e) => handleChange("activityOptions", e.target.value)}
                    className="w-5 h-5 text-blue-600 mr-3 cursor-pointer"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

          {/* Abuse, Neglect, and Exploitation */}
          <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-red-200 pb-3 text-red-700">
            Abuse, Neglect, and Exploitation
          </h2>
          
          <div className="mb-8">
            <p className="text-base mb-4 text-gray-600">
              Indicate number of incidents of abuse, neglect, or exploitation per month.
            </p>
            <div className="flex items-center gap-4">
              <label className="text-gray-700 font-medium">Number of incidents:</label>
              <input
                type="number"
                name="incidents"
                value={formData.incidents}
                onChange={(e) => handleChange("incidents", e.target.value)}
                min="0"
                className="w-32 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 text-gray-700"
                placeholder="0"
              />
            </div>
          </div>
          </div>
          </div>
          )}
        </div>

        {/* BELONGING Section */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100">
          <div 
            className="sticky top-[110px] z-20 bg-white cursor-pointer shadow-md"
            onClick={() => toggleSection("belonging")}
          >
            <div className="px-10 pt-10 pb-4 relative">
              <h1 className="text-4xl font-bold mb-10 text-gray-800 text-center border-b-4 border-purple-400 pb-4">
                BELONGING
                {belongingComplete && (
                  <svg className="w-6 h-6 text-green-500 inline-block ml-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </h1>
              {!expandedSections.belonging && (
                <p className="text-center text-sm text-gray-600 mt-2">
                  {belongingCount.completed}/{belongingCount.total} questions completed
                </p>
              )}
            </div>
          </div>
          
          {expandedSections.belonging && (
          <div className="p-10">
          
          {/* Schedules and Routines */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-purple-200 pb-3">
              Schedules and Routines
            </h2>
            
            <div className="mb-8">
              <p className="text-base mb-4 text-gray-600">
                Individuals have personalized posted schedules (or know where the schedule is located) for the day and month in their home/program.
              </p>
              <div className="space-y-2">
                {[
                  { value: "a", label: "Fully available (kept in personal space or readily available)" },
                  { value: "b", label: "Partial availability (individual may know it exists but doesn't know where it is)" },
                  { value: "c", label: "No availability" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="personalizedSchedule"
                      value={option.value}
                      checked={formData.personalizedSchedule === option.value}
                      onChange={(e) => handleChange("personalizedSchedule", e.target.value)}
                      className="w-5 h-5 text-purple-600 mr-3 cursor-pointer"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-base mb-4 text-gray-600">
                Home/program have group schedules posted with times and activities in common area.
              </p>
              <div className="space-y-2">
                {[
                  { value: "a", label: "Fully available (individuals can readily see it or can tell DSP where it is)" },
                  { value: "b", label: "Partially available (may know it exists but doesn't know where it is)" },
                  { value: "c", label: "No availability" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="groupSchedule"
                      value={option.value}
                      checked={formData.groupSchedule === option.value}
                      onChange={(e) => handleChange("groupSchedule", e.target.value)}
                      className="w-5 h-5 text-purple-600 mr-3 cursor-pointer"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-base mb-4 text-gray-600">
                Home/program responsibility chart is posted in common area.
              </p>
              <div className="space-y-2">
                {[
                  { value: "a", label: "Fully available (individuals can readily see)" },
                  { value: "b", label: "Partially available (know it exists but don't know where or posted in DSP area)" },
                  { value: "c", label: "No availability" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="responsibilityChart"
                      value={option.value}
                      checked={formData.responsibilityChart === option.value}
                      onChange={(e) => handleChange("responsibilityChart", e.target.value)}
                      className="w-5 h-5 text-purple-600 mr-3 cursor-pointer"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Community Engagement */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-purple-200 pb-3">
              Community Engagement
            </h2>
            
            <div className="mb-8">
              <p className="text-base mb-4 text-gray-600">
                <strong>Tally the number of times community outings occurred for the month.</strong>
              </p>
              <p className="text-sm mb-4 text-gray-500 italic">
                Examples: church, temple, grocery store, pharmacy, clothes shopping, gym, etc.
              </p>
              <div className="bg-purple-50 rounded-lg p-6 space-y-4">
                <div>
                  <p className="text-sm font-semibold mb-2 text-gray-700">a. Home/Program</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">i. Individual:</label>
                      <input
                        type="number"
                        name="communityOutingsIndividual"
                        value={formData.communityOutingsIndividual}
                        onChange={(e) => handleChange("communityOutingsIndividual", e.target.value)}
                        min="0"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">ii. Group:</label>
                      <input
                        type="number"
                        name="communityOutingsGroup"
                        value={formData.communityOutingsGroup}
                        onChange={(e) => handleChange("communityOutingsGroup", e.target.value)}
                        min="0"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Relationships */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-purple-200 pb-3">
              Relationships
            </h2>
            
            <div className="mb-8">
              <p className="text-base mb-4 text-gray-600">
                Does individual have access to cell or home phone?
              </p>
              <div className="space-y-2">
                {[
                  { value: "a", label: "Fully available (no restriction on use)" },
                  { value: "b", label: "Partially available (can use when approved or assisted)" },
                  { value: "c", label: "No availability" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="phoneAccess"
                      value={option.value}
                      checked={formData.phoneAccess === option.value}
                      onChange={(e) => handleChange("phoneAccess", e.target.value)}
                      className="w-5 h-5 text-purple-600 mr-3 cursor-pointer"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-base mb-4 text-gray-600">
                Tally the number of times individuals in the home had overnight visits, vacations, or visited family or friends this month.
              </p>
              <div className="flex items-center gap-4">
                <label className="text-gray-700 font-medium">a. Number:</label>
                <input
                  type="number"
                  name="overnightVisits"
                  value={formData.overnightVisits}
                  onChange={(e) => handleChange("overnightVisits", e.target.value)}
                  min="0"
                  className="w-32 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700"
                  placeholder="0"
                />
        </div>
      </div>
      
            <div className="mb-8">
              <p className="text-base mb-4 text-gray-600">
                Tally the number of times individuals have visitors to the home this month.
              </p>
              <div className="bg-purple-50 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">a. Friends:</label>
                    <input
                      type="number"
                      name="visitorsFriends"
                      value={formData.visitorsFriends}
                      onChange={(e) => handleChange("visitorsFriends", e.target.value)}
                      min="0"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">b. Family:</label>
                    <input
                      type="number"
                      name="visitorsFamily"
                      value={formData.visitorsFamily}
                      onChange={(e) => handleChange("visitorsFamily", e.target.value)}
                      min="0"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">c. Dates:</label>
                    <input
                      type="number"
                      name="visitorsDates"
                      value={formData.visitorsDates}
                      onChange={(e) => handleChange("visitorsDates", e.target.value)}
                      min="0"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          )}
        </div>

        {/* LIFE-LONG LEARNING Section */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-emerald-100">
          <div 
            className="sticky top-[110px] z-20 bg-white cursor-pointer shadow-md"
            onClick={() => toggleSection("lifelongLearning")}
          >
            <div className="px-10 pt-10 pb-4 relative">
              <h1 className="text-4xl font-bold mb-10 text-gray-800 text-center border-b-4 border-emerald-400 pb-4">
                LIFE-LONG LEARNING
                {lifelongLearningComplete && (
                  <svg className="w-6 h-6 text-green-500 inline-block ml-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </h1>
              {!expandedSections.lifelongLearning && (
                <p className="text-center text-sm text-gray-600 mt-2">
                  {lifelongLearningCount.completed}/{lifelongLearningCount.total} questions completed
                </p>
              )}
            </div>
          </div>
          
          {expandedSections.lifelongLearning && (
          <div className="p-10">
          
          {/* Person-Centered Plan */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-emerald-200 pb-3">
              Person-Centered Plan
            </h2>
            
            <div className="mb-8">
              <p className="text-base mb-4 text-gray-600">
                DSP has been trained and understands the individual they support's annual plan.
              </p>
              <div className="space-y-2">
                {[
                  { value: "a", label: "Full understanding (has been educated about goals and knows where to locate current document)" },
                  { value: "b", label: "Partial understanding (can locate current document)" },
                  { value: "c", label: "No understanding" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="annualPlanUnderstanding"
                      value={option.value}
                      checked={formData.annualPlanUnderstanding === option.value}
                      onChange={(e) => handleChange("annualPlanUnderstanding", e.target.value)}
                      className="w-5 h-5 text-emerald-600 mr-3 cursor-pointer"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Communication Support */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-emerald-200 pb-3">
              Communication Support
            </h2>
            
            <div className="mb-8">
              <p className="text-base mb-4 text-gray-600">
                DSP is able to describe communication support needs for the individual.
              </p>
              <div className="space-y-2">
                {[
                  { value: "a", label: "Fully understanding (can reference the goal and visual aids needed)" },
                  { value: "b", label: "Partially understanding (can describe some supports needed)" },
                  { value: "c", label: "No understanding" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="communicationSupportDescription"
                      value={option.value}
                      checked={formData.communicationSupportDescription === option.value}
                      onChange={(e) => handleChange("communicationSupportDescription", e.target.value)}
                      className="w-5 h-5 text-emerald-600 mr-3 cursor-pointer"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-base mb-4 text-gray-600">
                DSP uses supported communication, as prescribed by speech and language therapists.
              </p>
              <div className="space-y-2">
                {[
                  { value: "a", label: "Consistently (every interaction)" },
                  { value: "b", label: "Occasionally (50% of interactions)" },
                  { value: "c", label: "No opportunity (does not use)" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="communicationSupportUsage"
                      value={option.value}
                      checked={formData.communicationSupportUsage === option.value}
                      onChange={(e) => handleChange("communicationSupportUsage", e.target.value)}
                      className="w-5 h-5 text-emerald-600 mr-3 cursor-pointer"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Adult Learning */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-emerald-200 pb-3">
              Adult Learning
            </h2>
            
            <div className="mb-8">
              <p className="text-base mb-4 text-gray-600">
                DSP is able to identify the 4 steps of Behavioral Skills Training (BST).
              </p>
              <div className="space-y-2">
                {[
                  { value: "a", label: "Fully understanding (can describe each step)" },
                  { value: "b", label: "Partially understanding (can describe 2 out of the 4)" },
                  { value: "c", label: "No understanding (can describe none or 1 of the steps)" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="bstStepsUnderstanding"
                      value={option.value}
                      checked={formData.bstStepsUnderstanding === option.value}
                      onChange={(e) => handleChange("bstStepsUnderstanding", e.target.value)}
                      className="w-5 h-5 text-emerald-600 mr-3 cursor-pointer"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-base mb-4 text-gray-600">
                DSP incorporates BST into daily tasks and interactions. Example: teaching measuring or nutrition while cooking.
              </p>
              <div className="space-y-2">
                {[
                  { value: "a", label: "Consistently (at least 1 time per day)" },
                  { value: "b", label: "Often (3–4 times per week)" },
                  { value: "c", label: "Sometimes (2 times per week)" },
                  { value: "d", label: "Rarely (1 time per week)" },
                  { value: "e", label: "No opportunity" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="bstIncorporation"
                      value={option.value}
                      checked={formData.bstIncorporation === option.value}
                      onChange={(e) => handleChange("bstIncorporation", e.target.value)}
                      className="w-5 h-5 text-emerald-600 mr-3 cursor-pointer"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Positive Behavioral Supports */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-emerald-200 pb-3">
              Positive Behavioral Supports
            </h2>
            
            <div className="mb-8">
              <p className="text-base mb-4 text-gray-600">
                DSP is able to describe where the individual's Behavioral Support Plan is stored and how to reference it.
              </p>
              <div className="space-y-2">
                {[
                  { value: "a", label: "Fully understanding (can reference where it is stored and what is included)" },
                  { value: "b", label: "Partially understanding (can reference where it is stored)" },
                  { value: "c", label: "No understanding" },
                  { value: "d", label: "N/A (no behavioral support plans in place)" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="behavioralPlanLocation"
                      value={option.value}
                      checked={formData.behavioralPlanLocation === option.value}
                      onChange={(e) => handleChange("behavioralPlanLocation", e.target.value)}
                      className="w-5 h-5 text-emerald-600 mr-3 cursor-pointer"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-base mb-4 text-gray-600">
                DSP is able to describe how to report behavioral data to the Behavioral Professional.
              </p>
              <div className="space-y-2">
                {[
                  { value: "a", label: "Fully understanding (knows what to record and uses data sheets provided)" },
                  { value: "b", label: "Partially understanding (can verbally report on behaviors)" },
                  { value: "c", label: "No understanding" },
                  { value: "d", label: "N/A (no behavioral support plans in place)" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="behavioralDataReporting"
                      value={option.value}
                      checked={formData.behavioralDataReporting === option.value}
                      onChange={(e) => handleChange("behavioralDataReporting", e.target.value)}
                      className="w-5 h-5 text-emerald-600 mr-3 cursor-pointer"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          </div>
          )}
        </div>

        {/* HEALTHY LIVING Section */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-teal-100">
          <div 
            className="sticky top-[110px] z-20 bg-white cursor-pointer shadow-md"
            onClick={() => toggleSection("healthyLiving")}
          >
            <div className="px-10 pt-10 pb-4 relative">
              <h1 className="text-4xl font-bold mb-10 text-gray-800 text-center border-b-4 border-teal-400 pb-4">
                HEALTHY LIVING
                {healthyLivingComplete && (
                  <svg className="w-6 h-6 text-green-500 inline-block ml-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </h1>
              {!expandedSections.healthyLiving && (
                <p className="text-center text-sm text-gray-600 mt-2">
                  {healthyLivingCount.completed}/{healthyLivingCount.total} questions completed
                </p>
              )}
            </div>
          </div>
          
          {expandedSections.healthyLiving && (
          <div className="p-10">
          
          {/* Health Planning */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-teal-200 pb-3">
              Health Planning
            </h2>
            
            <div className="mb-8">
              <p className="text-base mb-4 text-gray-600">
                DSP is able to identify where most recent physical form and information is kept for each individual.
              </p>
              <div className="space-y-2">
                {[
                  { value: "a", label: "Fully understanding (document is up to date and filed correctly)" },
                  { value: "b", label: "Partially understanding (knows there is a document but can't locate)" },
                  { value: "c", label: "No understanding" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-teal-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="physicalFormLocation"
                      value={option.value}
                      checked={formData.physicalFormLocation === option.value}
                      onChange={(e) => handleChange("physicalFormLocation", e.target.value)}
                      className="w-5 h-5 text-teal-600 mr-3 cursor-pointer"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-base mb-4 text-gray-600">
                DSP is able to refer to medication needs of each individual.
              </p>
              <div className="space-y-2">
                {[
                  { value: "a", label: "Fully understanding (knows where information is stored and/or posted)" },
                  { value: "b", label: "Partially understanding (knows meds are taken, but not what or when)" },
                  { value: "c", label: "No understanding" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-teal-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="medicationNeeds"
                      value={option.value}
                      checked={formData.medicationNeeds === option.value}
                      onChange={(e) => handleChange("medicationNeeds", e.target.value)}
                      className="w-5 h-5 text-teal-600 mr-3 cursor-pointer"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-base mb-4 text-gray-600">
                DSP is able to identify dietary needs for each individual. Specialty or medical diets are known, posted, and understood.
              </p>
              <div className="space-y-2">
                {[
                  { value: "a", label: "Fully understanding (diets are posted and followed as prescribed)" },
                  { value: "b", label: "Partially understanding (knows there are special dietary needs but not specifics)" },
                  { value: "c", label: "No understanding" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-3 rounded-lg hover:bg-teal-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="dietaryNeeds"
                      value={option.value}
                      checked={formData.dietaryNeeds === option.value}
                      onChange={(e) => handleChange("dietaryNeeds", e.target.value)}
                      className="w-5 h-5 text-teal-600 mr-3 cursor-pointer"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Health Equity */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-teal-200 pb-3">
              Health Equity
            </h2>
            
            <div className="mb-8">
              <p className="text-base mb-4 text-gray-600">
                <strong>Report number of activities participated in for the month:</strong>
              </p>
              <div className="bg-teal-50 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">a. Exercise class or activities (yoga, walk in the park, etc.):</label>
                    <input
                      type="number"
                      name="exerciseActivities"
                      value={formData.exerciseActivities}
                      onChange={(e) => handleChange("exerciseActivities", e.target.value)}
                      min="0"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 text-gray-700"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">b. Mental health supports/activities (meditation, stress relief, etc.):</label>
                    <input
                      type="number"
                      name="mentalHealthActivities"
                      value={formData.mentalHealthActivities}
                      onChange={(e) => handleChange("mentalHealthActivities", e.target.value)}
                      min="0"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 text-gray-700"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">c. Healthy habits trainings (nutrition, sexual, etc.):</label>
                    <input
                      type="number"
                      name="healthyHabitsTrainings"
                      value={formData.healthyHabitsTrainings}
                      onChange={(e) => handleChange("healthyHabitsTrainings", e.target.value)}
                      min="0"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 text-gray-700"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">d. Personal hygiene education:</label>
                    <input
                      type="number"
                      name="personalHygieneEducation"
                      value={formData.personalHygieneEducation}
                      onChange={(e) => handleChange("personalHygieneEducation", e.target.value)}
                      min="0"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 text-gray-700"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          )}
        </div>

        {/* User Info Section */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-200 p-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-gray-200 pb-3">
            Your Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700"
                placeholder="Enter your email"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col items-center pt-8 gap-4">
          {submitError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded-lg">
              {submitError}
            </div>
          )}
          {submitSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg">
              ✅ Form submitted successfully and saved to database!
            </div>
          )}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={async () => {
              setSubmitError(null);
              setSubmitSuccess(false);
              
              // Validate user info
              if (!userName.trim()) {
                setSubmitError("Please enter your name.");
                return;
              }
              if (!userEmail.trim()) {
                setSubmitError("Please enter your email.");
                return;
              }
              
              // Check if all sections are complete
              const allComplete = choiceComplete && belongingComplete && lifelongLearningComplete && healthyLivingComplete;
              if (!allComplete) {
                setSubmitError("Please complete all sections before submitting.");
                return;
              }
              
              setIsSubmitting(true);
              
              try {
                // Submit to database via API
                const result = await submitDspSelfEvaluation(
                  userEmail.trim(),
                  userName.trim(),
                  formData
                );
                
                if (result.success) {
                  setSubmitSuccess(true);
                  console.log("Form submitted successfully:", result);
                } else {
                  setSubmitError(result.message || "Failed to submit form. Please try again.");
                  console.error("Submission failed:", result);
                }
              } catch (error) {
                console.error("Error submitting form:", error);
                setSubmitError("An unexpected error occurred. Please try again.");
              } finally {
                setIsSubmitting(false);
              }
            }}
            className={`px-12 py-4 text-white text-xl font-bold rounded-2xl shadow-lg transform transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Evaluation'}
          </button>
        </div>
          </div>
        </div>
  );
}

