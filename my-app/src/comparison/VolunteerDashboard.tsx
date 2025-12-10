'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, FileText, AlertCircle, User } from 'lucide-react';

type Volunteer = {
  id: number;
  name: string;
  role: string;
  department: string;
  initials: string;
  color: string;
  selfReviews: number;
  observerReviews: number;
  lastReview: string;
};

const VolunteerDashboard = () => {
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const departments = ['all', 'Community Outreach', 'Development', 'Education'];
    // Fetch volunteers from backend
    useEffect(() => {
      const fetchVolunteers = async () => {
        try {
          setLoading(true);
          // Replace this URL with your actual backend endpoint
          const response = await fetch('/api/volunteers');
          
          if (!response.ok) {
            throw new Error('Failed to fetch volunteers');
          }
          
          const data = await response.json();
          setVolunteers(data);
          setError(null);
        } catch (err) {
          setError(err.message);
          console.error('Error fetching volunteers:', err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchVolunteers();
    }, []);
  
  

  const filteredVolunteers = volunteers.filter(v => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept =
      departmentFilter === 'all' || v.department === departmentFilter;

    return matchesSearch && matchesDept;
  });

  const totalReviews = volunteers.reduce(
    (sum, v) => sum + v.selfReviews + v.observerReviews,
    0
  );

  const pendingReviews = 4;

  return (
    <div className="min-h-screen bg-[#ffffff] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-3xl font-bold text-[#041e42] mb-2"> 
            DSP Performance Dashboard
          </h1>
          <p className="text-gray-600">
           
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#041e42] mb-1">Total Reviews</p>
                <p className="text-3xl font-bold text-[#041e42]">{totalReviews}</p>
              </div>
              <div className="w-12 h-12 bg-[#e2e9f1] rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#0072ec]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#041e42] mb-1">Reviews Pending</p>
                <p className="text-3xl font-bold text-[#041e42]">{pendingReviews}</p>
              </div>
              <div className="w-12 h-12 bg-[#f8e1e4] rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-[#cb333b]" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-2 gap-6">
          {/* Volunteers List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-[#041e42] mb-4">
              Volunteers
            </h2>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search volunteers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            

            {/* Volunteer Cards */}
            <div className="space-y-3">
              {filteredVolunteers.map((volunteer) => (
                <div
                  key={volunteer.id}
                  onClick={() => setSelectedVolunteer(volunteer)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedVolunteer?.id === volunteer.id
                      ? 'border-[rgb(0,114,206)] bg-[rgb(226,233,245)]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 ${volunteer.color} rounded-full flex items-center justify-center text-white font-semibold`}
                    >
                      {volunteer.initials}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-[#041e42]">
                        {volunteer.name}
                      </h3>
                      <p className="text-sm text-[#536077]">{volunteer.role}</p>
                      <p className="text-xs text-[#9099a6] mt-1">
                        {volunteer.department}
                      </p>

                      <div className="flex items-center gap-4 mt-2 text-xs text-[#9099a6]">
                        <span className="flex items-center gap-1">
                          <span className="font-medium text-[#536077]">
                            {volunteer.selfReviews}
                          </span>{' '}
                          self
                        </span>

                        <span className="flex items-center gap-1">
                          <span className="font-medium text-[#536077]">
                            {volunteer.observerReviews}
                          </span>{' '}
                          observer
                        </span>

                        <span>{volunteer.lastReview}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison View */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {selectedVolunteer ? (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-16 h-16 ${selectedVolunteer.color} rounded-full flex items-center justify-center text-white font-semibold text-xl`}
                  >
                    {selectedVolunteer.initials}
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedVolunteer.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {selectedVolunteer.role}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Self Reviews */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Self-Reviews ({selectedVolunteer.selfReviews})
                    </h3>

                    <div className="space-y-2">
                      {[...Array(selectedVolunteer.selfReviews)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-white p-3 rounded border border-gray-200"
                        >
                          <p className="text-sm text-gray-600">
                            Self-review {i + 1}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Submitted {Math.floor(Math.random() * 14) + 1} days
                            ago
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Observer Reviews */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Observer Feedback ({selectedVolunteer.observerReviews})
                    </h3>

                    <div className="space-y-2">
                      {[...Array(selectedVolunteer.observerReviews)].map(
                        (_, i) => (
                          <div
                            key={i}
                            className="bg-white p-3 rounded border border-gray-200"
                          >
                            <p className="text-sm text-gray-600">
                              Observer review {i + 1}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Received {Math.floor(Math.random() * 14) + 1} days
                              ago
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <User className="w-24 h-24 mb-4" />
                <p className="text-lg">
                  Select a volunteer to view feedback comparison
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
