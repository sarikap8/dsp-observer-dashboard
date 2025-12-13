"use client";

import Image from "next/image";
import { useState, useEffect, useMemo, ReactNode, useRef } from "react";
import { useRouter } from "next/navigation";
import type { RefObject } from "react";
import { getActiveUser, getDspOptionsForObserver, DspOption, DSP_DIRECTORY } from "./userDirectory";
import { submitObserverEvaluation } from "@/lib/api";

type AnimatedSectionProps = {
  isOpen: boolean;
  children: ReactNode;
};

type FormPageProps = {
  dspOptions?: DspOption[];
};

const createEmptyFormData = () => ({
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

type FormDataShape = ReturnType<typeof createEmptyFormData>;

const AnimatedSection = ({ isOpen, children }: AnimatedSectionProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>(isOpen ? "auto" : "0px");
  const duration = 600;
  const easing = "cubic-bezier(0.33, 1, 0.68, 1)";

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let resizeObserver: ResizeObserver | null = null;

    const syncHeight = () => {
      if (!el) return;
      setHeight(`${el.scrollHeight}px`);
    };

    if (isOpen) {
      syncHeight();
      resizeObserver = new ResizeObserver(syncHeight);
      resizeObserver.observe(el);
    } else {
      // closing: animate from current content height to zero
      setHeight(`${el.scrollHeight}px`);
      requestAnimationFrame(() => setHeight("0px"));
    }

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [isOpen]);

  return (
    <div
      className={`overflow-hidden transition-[height,opacity,transform] will-change-[height,opacity,transform] ${
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
      style={{
        height,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: easing,
      }}
      aria-hidden={!isOpen}
      ref={wrapperRef}
    >
      <div className="p-10">{children}</div>
    </div>
  );
};


export default function FormPage({ dspOptions = [] }: FormPageProps) {
  const router = useRouter();
  const [availableDsps, setAvailableDsps] = useState<DspOption[]>(dspOptions);
  const [selectedDsp, setSelectedDsp] = useState("");
  const [formsByDsp, setFormsByDsp] = useState<Record<string, FormDataShape>>({});
  const [submittedDsps, setSubmittedDsps] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [activeUser, setActiveUserState] = useState<{ email: string; name: string } | null>(null);

  const formData = useMemo(() => {
    if (!selectedDsp) return createEmptyFormData();
    return formsByDsp[selectedDsp] ?? createEmptyFormData();
  }, [formsByDsp, selectedDsp]);

  const [expandedSections, setExpandedSections] = useState({
    choice: true,
    belonging: true,
    lifelongLearning: true,
    healthyLiving: true,
  });

  const choiceHeaderRef = useRef<HTMLDivElement>(null);
  const belongingHeaderRef = useRef<HTMLDivElement>(null);
  const lifelongHeaderRef = useRef<HTMLDivElement>(null);
  const healthyHeaderRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const active = getActiveUser();
    if (!active) {
      router.replace("/");
      return;
    }

    if (active.role !== "observer") {
      router.replace("/form");
      return;
    }
    
    setActiveUserState({ email: active.email, name: active.name });

    const directoryOptions = getDspOptionsForObserver(active.email);
    if (directoryOptions.length) {
      setAvailableDsps(directoryOptions);
      setSelectedDsp(directoryOptions[0]?.value || "");
      return;
    }

    if (dspOptions.length) {
      setAvailableDsps(dspOptions);
      setSelectedDsp(dspOptions[0].value);
    }
  }, [router, dspOptions]);

  useEffect(() => {
    if (!availableDsps.length) {
      setSelectedDsp("");
      return;
    }

    if (!availableDsps.some(option => option.value === selectedDsp)) {
      setSelectedDsp(availableDsps[0].value);
    }
  }, [availableDsps, selectedDsp]);

  useEffect(() => {
    if (!selectedDsp) return;
    setFormsByDsp(prev => {
      if (prev[selectedDsp]) return prev;
      return { ...prev, [selectedDsp]: createEmptyFormData() };
    });
  }, [selectedDsp]);

  const sectionRefs: Record<keyof typeof expandedSections, RefObject<HTMLDivElement>> = {
    choice: choiceHeaderRef,
    belonging: belongingHeaderRef,
    lifelongLearning: lifelongHeaderRef,
    healthyLiving: healthyHeaderRef,
  };

  const selectedDspLabel = useMemo(() => {
    const match = availableDsps.find(option => option.value === selectedDsp);
    return match?.label || "";
  }, [availableDsps, selectedDsp]);

  // Check if section is complete
  const isSectionComplete = (fields: string[]) => {
    return fields.every(field => {
      const value = formData[field as keyof FormDataShape];
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
        followHeaderDuringClose(choiceHeaderRef);
        setExpandedSections(prev => ({ ...prev, choice: false }));
      }, 1000); // wait 1s before closing
  
      return () => clearTimeout(timeout);
    }
  }, [choiceComplete]);
  
  useEffect(() => {
    if (belongingComplete) {
      const timeout = setTimeout(() => {
        followHeaderDuringClose(belongingHeaderRef);
        setExpandedSections(prev => ({ ...prev, belonging: false }));
      }, 1000);
  
      return () => clearTimeout(timeout);
    }
  }, [belongingComplete]);
  
  useEffect(() => {
    if (lifelongLearningComplete) {
      const timeout = setTimeout(() => {
        followHeaderDuringClose(lifelongHeaderRef);
        setExpandedSections(prev => ({ ...prev, lifelongLearning: false }));
      }, 1000);
  
      return () => clearTimeout(timeout);
    }
  }, [lifelongLearningComplete]);
  
  useEffect(() => {
    if (healthyLivingComplete) {
      const timeout = setTimeout(() => {
        followHeaderDuringClose(healthyHeaderRef);
        setExpandedSections(prev => ({ ...prev, healthyLiving: false }));
      }, 1000);
  
      return () => clearTimeout(timeout);
    }
  }, [healthyLivingComplete]);

  const followHeaderDuringClose = (ref: RefObject<HTMLDivElement>, duration = 620) => {
    if (!ref.current) return;
    const offsetTop = () =>
      ref.current ? ref.current.getBoundingClientRect().top + window.scrollY - 90 : window.scrollY;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = ts - start;
      window.scrollTo({ top: offsetTop(), behavior: "auto" });
      if (elapsed < duration) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const toggleSection = (section: "choice" | "belonging" | "lifelongLearning" | "healthyLiving") => {
    const ref = sectionRefs[section];
    setExpandedSections(prev => {
      const isOpen = prev[section];
      if (isOpen) followHeaderDuringClose(ref);
      return {
        ...prev,
        [section]: !isOpen
      };
    });
  };

  const handleChange = (name: string, value: string) => {
    if (!selectedDsp) return;
    setFormsByDsp(prev => {
      const current = prev[selectedDsp] ?? createEmptyFormData();
      return {
        ...prev,
        [selectedDsp]: { ...current, [name]: value },
      };
    });
  };

  const handleSubmit = async () => {
    if (!selectedDsp) return;
    if (!activeUser) {
      setSubmitError("User session not found. Please log in again.");
      return;
    }
    
    // Get DSP info from directory
    const dspInfo = DSP_DIRECTORY[selectedDsp];
    if (!dspInfo || !dspInfo.email) {
      setSubmitError("DSP information not found. Please try again.");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const result = await submitObserverEvaluation(
        activeUser.email,
        activeUser.name,
        dspInfo.email,
        dspInfo.label,
        formData
      );
      
      if (result.success) {
        setSubmittedDsps(prev => ({ ...prev, [selectedDsp]: true }));
      } else {
        setSubmitError(result.message || "Failed to submit evaluation");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Count completed fields for summary
  const getCompletionCount = (fields: string[]) => {
    const completed = fields.filter(field => {
      const value = formData[field as keyof FormDataShape];
      return value !== "" && value !== null && value !== undefined;
    }).length;
    return { completed, total: fields.length };
  };

  const choiceCount = getCompletionCount(choiceFields);
  const belongingCount = getCompletionCount(belongingFields);
  const lifelongLearningCount = getCompletionCount(lifelongLearningFields);
  const healthyLivingCount = getCompletionCount(healthyLivingFields);
  const isCurrentSubmitted = selectedDsp ? submittedDsps[selectedDsp] === true : false;
  const otherPending = useMemo(
    () => availableDsps.filter(option => option.value !== selectedDsp && !submittedDsps[option.value]).length,
    [availableDsps, selectedDsp, submittedDsps]
  );
  const completionMessage = otherPending > 0 ? "Please submit your other evaluations" : "All evaluations complete";

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
        <div className="bg-white rounded-3xl shadow-xl border-2 border-blue-100 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-blue-500 font-semibold">Observer form</p>
              <h2 className="text-2xl font-bold text-gray-800">Select DSP</h2>
              <p className="text-sm text-gray-600">Choose which DSP you are completing this form for.</p>
            </div>
            <div className="relative w-full md:w-72">
              <select
                value={selectedDsp}
                onChange={(e) => setSelectedDsp(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-blue-200 text-gray-800 rounded-2xl px-4 py-3 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              >
                {!availableDsps.length && <option value="">Select a DSP</option>}
                {availableDsps.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-blue-500">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          {selectedDspLabel && (
            <p className="text-sm text-gray-700 mt-4">
              You&apos;re filling out this form for <span className="font-semibold text-gray-900">{selectedDspLabel}</span>.
            </p>
          )}
        </div>

        {!selectedDsp ? (
          <div className="bg-white rounded-3xl shadow-xl border-2 border-blue-100 px-10 py-14 text-center space-y-3">
            <h1 className="text-3xl font-bold text-gray-800">Select a DSP to begin</h1>
            <p className="text-base text-gray-700">Choose someone from the dropdown above to start the evaluation.</p>
          </div>
        ) : isCurrentSubmitted ? (
          <div className="bg-white rounded-3xl shadow-xl border-2 border-blue-100 px-10 py-14 text-center space-y-3">
            <h1 className="text-4xl font-bold text-gray-800">Done!</h1>
            <p className="text-lg text-gray-700">{completionMessage}</p>
          </div>
        ) : (
          <>
            {/* CHOICE Section */}
            <div className="bg-white rounded-3xl shadow-xl border-2 border-blue-100">
              <div 
                className="sticky top-[110px] z-20 bg-white cursor-pointer shadow-md"
                onClick={() => toggleSection("choice")}
                ref={choiceHeaderRef}
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
              
              <AnimatedSection isOpen={expandedSections.choice}>
                <>
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
            </>
          </AnimatedSection>
        </div>

        {/* BELONGING Section */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100">
          <div 
            className="sticky top-[110px] z-20 bg-white cursor-pointer shadow-md"
            onClick={() => toggleSection("belonging")}
            ref={belongingHeaderRef}
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
          
          <AnimatedSection isOpen={expandedSections.belonging}>
            <>
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
            </>
          </AnimatedSection>
        </div>

        {/* LIFE-LONG LEARNING Section */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-emerald-100">
          <div 
            className="sticky top-[110px] z-20 bg-white cursor-pointer shadow-md"
            onClick={() => toggleSection("lifelongLearning")}
            ref={lifelongHeaderRef}
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
          
          <AnimatedSection isOpen={expandedSections.lifelongLearning}>
            <>
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
            </>
          </AnimatedSection>
        </div>

        {/* HEALTHY LIVING Section */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-teal-100">
          <div 
            className="sticky top-[110px] z-20 bg-white cursor-pointer shadow-md"
            onClick={() => toggleSection("healthyLiving")}
            ref={healthyHeaderRef}
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
          
          <AnimatedSection isOpen={expandedSections.healthyLiving}>
            <>
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
            </>
          </AnimatedSection>
        </div>
        {submitError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-4">
            <p className="text-red-700 font-medium">{submitError}</p>
          </div>
        )}
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`inline-flex items-center justify-center px-6 py-3 rounded-2xl text-white font-semibold shadow-md transition ${
              isSubmitting 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
          </>
        )}
      </div>
    </div>
  );
}
