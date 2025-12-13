'use client';

import { useState } from "react";
import VolunteerDashboard from "../comparison/VolunteerDashboard";
import Login from "./login/login";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "221765598159-7nn7s0ek0q8n34iojmgijh4gndnfrtkf.apps.googleusercontent.com";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {isLoggedIn ? (
        <VolunteerDashboard />
      ) : (
        <Login onSuccess={() => setIsLoggedIn(true)} />
      )}
    </GoogleOAuthProvider>
  );
}
