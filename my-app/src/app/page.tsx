<<<<<<< HEAD
'use client';

import VolunteerDashboard from "../comparison/VolunteerDashboard";
=======
import Login from "./login/login";
import {GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google';
>>>>>>> 78e3a58c51315db33af17614302d34bbb1931eb9

const clientId = '221765598159-7nn7s0ek0q8n34iojmgijh4gndnfrtkf.apps.googleusercontent.com';
export default function Home() {
<<<<<<< HEAD
  return <VolunteerDashboard />;
=======
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Login />
    </GoogleOAuthProvider>
  );
>>>>>>> 78e3a58c51315db33af17614302d34bbb1931eb9
}
