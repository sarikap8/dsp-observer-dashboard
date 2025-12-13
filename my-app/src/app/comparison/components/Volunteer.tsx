'use client';

import React from 'react';

interface VolunteerType {
  id: number;
  name: string;
  role: string;
  department: string;
  initials: string;
  color: string;
  selfReviews: number;
  observerReviews: number;
  lastReview: string;
}

const Volunteer = ({ selectedVolunteer }: { selectedVolunteer: VolunteerType }) => {
  if (!selectedVolunteer) return null;

  return (
    <div className="space-y-4">

      {/* =======================
          SELF REVIEWS
      ======================== */}
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
                Submitted {Math.floor(Math.random() * 14) + 1} days ago
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* =======================
          OBSERVER REVIEWS
      ======================== */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">
          Observer Feedback ({selectedVolunteer.observerReviews})
        </h3>

        <div className="space-y-2">
          {[...Array(selectedVolunteer.observerReviews)].map((_, i) => (
            <div
              key={i}
              className="bg-white p-3 rounded border border-gray-200"
            >
              <p className="text-sm text-gray-600">
                Observer review {i + 1}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Received {Math.floor(Math.random() * 14) + 1} days ago
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Volunteer;
