'use client';

import React, { useState, useEffect } from 'react';
import { Search, Star, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'; 
import { useRouter } from 'next/navigation';
import { getActiveUser, DSP_DIRECTORY, USER_DIRECTORY, getDspOptionsForObserver } from '../form/userDirectory';

type DspInfo = {
  id: string;
  name: string;
  email: string;
  observerEmail: string;
  observerName: string;
  initials: string;
  color: string;
};

type QuestionResponse = {
  q1: number | null;
  q2: number | null;
  q3: number | null;
  q4: number | null;
  q5: number | null;
  q6: number | null;
  q7: number | null;
  q8: number | null;
  q9: number | null;
  q10: number | null;
  q11: number | null;
  q12: number | null;
  q13: number | null;
  q14: number | null;
  q15: number | null;
  q16: number | null;
  q17: number | null;
  q18: number | null;
  q19: number | null;
  q20: number | null;
  q21: number | null;
  q22: number | null;
  q23: number | null;
  q24: number | null;
  q25: number | null;
  q26: number | null;
  q27: number | null;
  q28: number | null;
  q29: number | null;
  q30: number | null;
  q31: number | null;
  q32: number | null;
  q33: number | null;
};

type SubmissionData = {
  dsp?: {
    id: string;
    email: string;
    name: string;
  };
  selfEvaluation?: {
    questionResponse: QuestionResponse;
    createdAt: string;
    updatedAt: string;
  };
  observerEvaluations?: {
    observer: { name: string; email: string };
    questionResponse: QuestionResponse;
    submittedAt: string;
  }[];
};

// Question labels for display
const QUESTION_LABELS: Record<string, string> = {
  q1: "Privacy - Knocking",
  q2: "Privacy - Hands-on Permission",
  q3: "Privacy - Education",
  q4: "Clothing Choice",
  q5: "Space Personalization",
  q6: "Leisure Activities",
  q7: "Meal Options",
  q8: "Activity Options",
  q9: "Incidents",
  q10: "Personalized Schedule",
  q11: "Group Schedule",
  q12: "Responsibility Chart",
  q13: "Community Outings (Individual)",
  q14: "Community Outings (Group)",
  q15: "Phone Access",
  q16: "Overnight Visits",
  q17: "Visitors - Friends",
  q18: "Visitors - Family",
  q19: "Visitors - Dates",
  q20: "Annual Plan Understanding",
  q21: "Communication Support Description",
  q22: "Communication Support Usage",
  q23: "BST Steps Understanding",
  q24: "BST Incorporation",
  q25: "Behavioral Plan Location",
  q26: "Behavioral Data Reporting",
  q27: "Physical Form Location",
  q28: "Medication Needs",
  q29: "Dietary Needs",
  q30: "Exercise Activities",
  q31: "Mental Health Activities",
  q32: "Healthy Habits Trainings",
  q33: "Personal Hygiene Education",
};

// Section groupings
const SECTIONS = [
  { name: "CHOICE", questions: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9"], color: "border-blue-400", bg: "bg-blue-50" },
  { name: "BELONGING", questions: ["q10", "q11", "q12", "q13", "q14", "q15", "q16", "q17", "q18", "q19"], color: "border-purple-400", bg: "bg-purple-50" },
  { name: "LIFE-LONG LEARNING", questions: ["q20", "q21", "q22", "q23", "q24", "q25", "q26"], color: "border-emerald-400", bg: "bg-emerald-50" },
  { name: "HEALTHY LIVING", questions: ["q27", "q28", "q29", "q30", "q31", "q32", "q33"], color: "border-teal-400", bg: "bg-teal-50" },
];

const StarRating = ({ value, maxStars = 5 }: { value: number | null; maxStars?: number }) => {
  if (value === null) return <span className="text-gray-400 text-sm">—</span>;
  
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(maxStars)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

const ComparisonRow = ({ 
  label, 
  selfValue, 
  observerValue 
}: { 
  label: string; 
  selfValue: number | null; 
  observerValue: number | null;
}) => {
  const diff = selfValue !== null && observerValue !== null ? selfValue - observerValue : null;
  
  return (
    <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-100 items-center hover:bg-gray-50">
      <div className="text-sm text-gray-700">{label}</div>
      <div className="flex justify-center">
        <StarRating value={selfValue} />
      </div>
      <div className="flex justify-center items-center gap-2">
        <StarRating value={observerValue} />
        {diff !== null && diff !== 0 && (
          <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
            diff > 0 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
          }`}>
            {diff > 0 ? `+${diff}` : diff}
          </span>
        )}
      </div>
    </div>
  );
};

// Calculate averages helper
const calcAverage = (response: QuestionResponse | undefined) => {
  if (!response) return null;
  const values = Object.values(response).filter((v): v is number => v !== null && typeof v === 'number');
  if (values.length === 0) return null;
  return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
};

// ============================================
// DSP VIEW - Only sees their own comparison
// ============================================
const DspComparisonView = ({ activeUser }: { activeUser: { email: string; name: string; role: string } }) => {
  const [submissionData, setSubmissionData] = useState<SubmissionData | null>(null);
  const [loading, setLoading] = useState(true);

  const userEntry = USER_DIRECTORY[activeUser.email.toLowerCase()];
  const observerEmail = userEntry?.observerEmail || '';
  const observerEntry = USER_DIRECTORY[observerEmail];
  const observerName = observerEntry?.name || 'Your Observer';

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      
      // Get DSP email
      let dspEmail = activeUser.email;
      const dspId = userEntry?.dspId;
      if (dspId && DSP_DIRECTORY[dspId]?.email) {
        dspEmail = DSP_DIRECTORY[dspId].email;
      }

      try {
        const response = await fetch(`/api/submissions/dsp?email=${encodeURIComponent(dspEmail)}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setSubmissionData(data.data);
          }
        }
      } catch (error) {
        console.error('Error fetching submissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [activeUser.email, userEntry?.dspId]);

  const selfResponse = submissionData?.selfEvaluation?.questionResponse;
  const observerResponse = submissionData?.observerEvaluations?.[0]?.questionResponse;
  const observerInfo = submissionData?.observerEvaluations?.[0]?.observer;
  const selfAvg = calcAverage(selfResponse);
  const observerAvg = calcAverage(observerResponse);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* User Info Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
              {activeUser.name?.split(' ').map(n => n[0]).join('') || '?'}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{activeUser.name}</h2>
              <p className="text-sm text-gray-500">{activeUser.email}</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-600">Your Observer:</p>
            <p className="font-medium text-gray-800">{observerInfo?.name || observerName}</p>
            <p className="text-xs text-gray-500">{observerInfo?.email || observerEmail}</p>
          </div>
        </div>
      </div>

      {/* Comparison View */}
      <div className="bg-white rounded-2xl shadow-lg p-6 max-h-[700px] overflow-y-auto">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading your evaluations...</div>
        ) : !selfResponse && !observerResponse ? (
          <div className="text-center py-12 text-gray-500">
            <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No evaluations found yet</p>
            <p className="text-sm mt-2 mb-6">Complete your self-evaluation and wait for your observer to submit their evaluation.</p>
            <Link href="/form" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
              Go to Self-Evaluation Form
            </Link>
          </div>
        ) : (
          <ComparisonContent 
            selfResponse={selfResponse} 
            observerResponse={observerResponse} 
            selfAvg={selfAvg} 
            observerAvg={observerAvg}
            selfLabel="My Self Rating"
            observerLabel="Observer Rating"
          />
        )}
      </div>

      {/* Back to Form button */}
      <div className="mt-6 text-center">
        <Link href="/form" className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition shadow-lg">
          ← Back to Self-Evaluation Form
        </Link>
      </div>
    </div>
  );
};

// ============================================
// OBSERVER VIEW - Can select from their DSPs
// ============================================
const ObserverComparisonView = ({ activeUser }: { activeUser: { email: string; name: string; role: string } }) => {
  const [selectedDsp, setSelectedDsp] = useState<DspInfo | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dspList, setDspList] = useState<DspInfo[]>([]);
  const [submissionData, setSubmissionData] = useState<SubmissionData | null>(null);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);

  // Build DSP list from observer's assigned DSPs
  useEffect(() => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500'];
    const assignedDsps = getDspOptionsForObserver(activeUser.email);
    
    const list: DspInfo[] = assignedDsps.map((dsp, index) => {
      const dspEntry = DSP_DIRECTORY[dsp.value];
      return {
        id: dsp.value,
        name: dsp.label,
        email: dspEntry?.email || '',
        observerEmail: activeUser.email,
        observerName: activeUser.name,
        initials: dsp.label.split(' ').map(n => n[0]).join(''),
        color: colors[index % colors.length],
      };
    });
    
    setDspList(list);
  }, [activeUser.email, activeUser.name]);

  // Fetch submission data when a DSP is selected
  useEffect(() => {
    if (!selectedDsp?.email) return;

    const fetchSubmissions = async () => {
      setLoadingSubmissions(true);
      try {
        const response = await fetch(`/api/submissions/dsp?email=${encodeURIComponent(selectedDsp.email)}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setSubmissionData(data.data);
          } else {
            setSubmissionData(null);
          }
        } else {
          setSubmissionData(null);
        }
      } catch (error) {
        console.error('Error fetching submissions:', error);
        setSubmissionData(null);
      } finally {
        setLoadingSubmissions(false);
      }
    };

    fetchSubmissions();
  }, [selectedDsp]);

  const filteredDsps = dspList.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selfResponse = submissionData?.selfEvaluation?.questionResponse;
  const observerResponse = submissionData?.observerEvaluations?.[0]?.questionResponse;
  const selfAvg = calcAverage(selfResponse);
  const observerAvg = calcAverage(observerResponse);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-4 gap-6">
        {/* DSP List - Left Column */}
        <div className="col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-[#041e42] mb-3">
            Your DSPs
          </h2>

          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredDsps.length === 0 ? (
              <div className="text-center py-4 text-gray-500 text-sm">
                No DSPs assigned
              </div>
            ) : (
              filteredDsps.map((dsp) => (
                <div
                  key={dsp.id}
                  onClick={() => setSelectedDsp(dsp)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedDsp?.id === dsp.id
                      ? 'border-[rgb(0,114,206)] bg-[rgb(226,233,245)]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 ${dsp.color} rounded-full flex items-center justify-center text-white font-semibold text-xs`}>
                      {dsp.initials}
                    </div>
                    <div>
                      <h3 className="font-medium text-[#041e42] text-sm">{dsp.name}</h3>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Comparison View - Right (3 columns) */}
        <div className="col-span-3 bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-h-[700px] overflow-y-auto">
          {selectedDsp ? (
            <div>
              {/* Header with DSP info */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b sticky top-0 bg-white z-10">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${selectedDsp.color} rounded-full flex items-center justify-center text-white font-semibold text-lg`}>
                    {selectedDsp.initials}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{selectedDsp.name}</h2>
                    <p className="text-sm text-gray-500">{selectedDsp.email}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-600">Observer (You):</p>
                  <p className="font-medium text-gray-800">{activeUser.name}</p>
                </div>
              </div>

              {loadingSubmissions ? (
                <div className="text-center py-12 text-gray-500">Loading submissions...</div>
              ) : !selfResponse && !observerResponse ? (
                <div className="text-center py-12 text-gray-500">
                  <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">No submissions found</p>
                  <p className="text-sm mt-2">The DSP needs to submit their self-evaluation and you need to submit your observer evaluation.</p>
                </div>
              ) : (
                <ComparisonContent 
                  selfResponse={selfResponse} 
                  observerResponse={observerResponse} 
                  selfAvg={selfAvg} 
                  observerAvg={observerAvg}
                  selfLabel="DSP Self Rating"
                  observerLabel="Your Rating"
                />
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 py-20">
              <User className="w-24 h-24 mb-4" />
              <p className="text-lg">Select a DSP to view their comparison</p>
              <p className="text-sm mt-2">DSP self-rating vs your observer rating</p>
            </div>
          )}
        </div>
      </div>

      {/* Back to Form button */}
      <div className="mt-6 text-center">
        <Link href="/form/observer" className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition shadow-lg">
          ← Back to Observer Form
        </Link>
      </div>
    </div>
  );
};

// ============================================
// SHARED COMPARISON CONTENT
// ============================================
const ComparisonContent = ({ 
  selfResponse, 
  observerResponse, 
  selfAvg, 
  observerAvg,
  selfLabel,
  observerLabel,
}: { 
  selfResponse: QuestionResponse | undefined; 
  observerResponse: QuestionResponse | undefined;
  selfAvg: string | null;
  observerAvg: string | null;
  selfLabel: string;
  observerLabel: string;
}) => {
  return (
    <div className="space-y-6">
      {/* Column Headers */}
      <div className="grid grid-cols-3 gap-4 py-3 bg-gray-100 rounded-lg px-4 font-semibold text-sm sticky top-0 z-10">
        <div className="text-gray-700">Question</div>
        <div className="text-center text-blue-600">
          {selfLabel}
          {selfAvg && <span className="ml-2 text-xs font-normal">(avg: {selfAvg})</span>}
        </div>
        <div className="text-center text-green-600">
          {observerLabel}
          {observerAvg && <span className="ml-2 text-xs font-normal">(avg: {observerAvg})</span>}
        </div>
      </div>

      {/* Status indicators */}
      <div className="flex gap-4 text-sm">
        <div className={`px-4 py-2 rounded-lg ${selfResponse ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
          Self-Evaluation: {selfResponse ? '✓ Submitted' : 'Pending'}
        </div>
        <div className={`px-4 py-2 rounded-lg ${observerResponse ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
          Observer Evaluation: {observerResponse ? '✓ Submitted' : 'Pending'}
        </div>
      </div>

      {/* Sections */}
      {SECTIONS.map((section) => (
        <div key={section.name} className={`border-l-4 ${section.color} ${section.bg} rounded-r-lg p-4`}>
          <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">{section.name}</h3>
          <div className="bg-white rounded-lg p-3">
            {section.questions.map((qKey) => (
              <ComparisonRow
                key={qKey}
                label={QUESTION_LABELS[qKey]}
                selfValue={selfResponse?.[qKey as keyof QuestionResponse] ?? null}
                observerValue={observerResponse?.[qKey as keyof QuestionResponse] ?? null}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Summary Card */}
      {(selfResponse || observerResponse) && (
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mt-6">
          <h3 className="font-semibold text-gray-800 mb-4">Overall Summary</h3>
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">{selfLabel} Average</p>
              <p className="text-3xl font-bold text-blue-600">{selfAvg || '—'}</p>
              {selfResponse && (
                <div className="flex justify-center mt-2">
                  <StarRating value={selfAvg ? Math.round(parseFloat(selfAvg)) : null} />
                </div>
              )}
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">{observerLabel} Average</p>
              <p className="text-3xl font-bold text-green-600">{observerAvg || '—'}</p>
              {observerResponse && (
                <div className="flex justify-center mt-2">
                  <StarRating value={observerAvg ? Math.round(parseFloat(observerAvg)) : null} />
                </div>
              )}
            </div>
          </div>
          
          {selfAvg && observerAvg && (
            <div className="mt-4 pt-4 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Difference: 
                <span className={`ml-2 font-bold ${
                  parseFloat(selfAvg) > parseFloat(observerAvg) 
                    ? 'text-orange-600' 
                    : parseFloat(selfAvg) < parseFloat(observerAvg) 
                      ? 'text-green-600' 
                      : 'text-gray-600'
                }`}>
                  {(parseFloat(selfAvg) - parseFloat(observerAvg)).toFixed(1)}
                </span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
const VolunteerDashboard = () => {
  const router = useRouter();
  const [activeUser, setActiveUser] = useState<{ email: string; name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Check authentication and get user info
  useEffect(() => {
    const user = getActiveUser();
    if (!user) {
      router.replace('/');
      return;
    }
    setActiveUser(user);
    setLoading(false);
  }, [router]);

  if (loading || !activeUser) {
    return (
      <div className="min-h-screen bg-[#041e42] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Check user role
  const userEntry = USER_DIRECTORY[activeUser.email.toLowerCase()];
  const isDsp = userEntry?.role === 'dsp';
  const isObserver = userEntry?.role === 'observer';

  return (
    <div className="min-h-screen bg-[#041e42]">
      {/* Header */}
      <div className="w-full bg-white flex items-center py-6 px-8 relative">
        <Link href="/">
          <div className="w-16 lg:w-20">
            <Image
              src="/next-for-autism-logo.svg" 
              alt="Next for Autism Logo" 
              width={160}
              height={80}
              className="object-contain cursor-pointer w-full h-auto"
            />
          </div>
        </Link>
        <h1 className="text-3xl font-bold text-[#041e42] absolute left-1/2 -translate-x-1/2"> 
          {isDsp ? 'My Performance Comparison' : 'DSP Performance Comparison'}
        </h1>
      </div>

      {isDsp ? (
        <DspComparisonView activeUser={activeUser} />
      ) : isObserver ? (
        <ObserverComparisonView activeUser={activeUser} />
      ) : (
        <div className="max-w-md mx-auto mt-20 bg-white rounded-3xl shadow-xl p-12 text-center">
          <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Restricted</h2>
          <p className="text-gray-600">Your account does not have access to this page.</p>
        </div>
      )}
    </div>
  );
};

export default VolunteerDashboard;
