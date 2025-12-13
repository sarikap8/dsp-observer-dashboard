"use client";

import Image from "next/image";
import "./login.css";
import { GoogleSignInButton } from "../../../components/GoogleSignInButton";
import {GoogleLogin} from '@react-oauth/google';
import {useRouter} from 'next/navigation';
import { findUserByEmail, setActiveUser } from "../form/userDirectory";

export default function Login() {
  const router = useRouter();

  const decodeEmailFromCredential = (credential?: string | null) => {
    if (!credential) return null;
    try {
      const payload = JSON.parse(atob(credential.split('.')[1]));
      return (payload?.email as string | undefined) ?? null;
    } catch (error) {
      console.warn("Unable to decode credential", error);
      return null;
    }
  };

  const handleGoogleSignIn = async () => {
    // TODO: Implement Google OAuth authentication
    // Example: Redirect to Google OAuth or use a library like next-auth
    // window.location.href = '/api/auth/google';
    console.log("Google sign-in clicked");
  };

  const handleLoginSuccess = (credentialResponse: any) => {
    const email = decodeEmailFromCredential(credentialResponse?.credential);
    const directoryEntry = findUserByEmail(email);

    if (!directoryEntry) {
      alert("This test login email is not recognized in the directory. Use arjun.mathu2005@gmail.com (observer) or j1212steven@gmail.com (DSP).");
      return;
    }

    const activeUser = {
      email: email!,
      name: directoryEntry.name,
      role: directoryEntry.role,
    };

    setActiveUser(activeUser);

    if (directoryEntry.role === "observer") {
      router.push('/form/observer');
    } else {
      router.push('/form');
    }
  };

  return (
    <>
    <div className="relative w-full h-screen flex items-center justify-center" style={{ backgroundColor: '#363942' }}>
      <Image
        src="/striped-pattern.jpg"
        alt="Background"
        fill
        className="object-cover opacity-5"
        priority
        style={{ mixBlendMode: 'overlay' }}
      />
      <div className="relative z-80 bg-white rounded-2xl flex flex-col items-center" style={{ 
        width: '70vw', 
        height: '70vh', 
        padding: '10vw',
        paddingTop: '10vh',
        gap: '4vh',
        boxShadow: '0 50px 50px -20px rgba(0, 0, 0, 0.5)' 
      }}>
        <div className="flex justify-center items-center" style={{ width: '100%' }}>
          <Image
            src="/next-for-autism-logo.svg"
            alt="Next for Autism Logo"
            width={5}
            height={50}
            className="object-contain"
            style={{ width: '15vw', height: 'auto', paddingTop: '3vh' }
      }
          />
        </div>
        <div className="flex justify-center items-center google-login-wrapper" style={{ width: '100%', marginTop: '2vh' }}>
          <GoogleLogin 
            onSuccess={handleLoginSuccess} 
            onError={() => console.log("login error")}
          />
          {/* <GoogleSignInButton 
            onClick={handleGoogleSignIn}
            type="button"
            className="bg-black text-white font-light shadow-md hover:bg-gray-700 transition-colors"
            style={{ 
              padding: '1.1vh 2.5vw',
              fontSize: '0.8vw',
              width: '20.0vw',
              borderRadius: '18pt',
              fontWeight: '200',
              border: 'none',
              cursor: 'pointer'
            }}
          /> */}
        </div>
      </div>
    </div>
    </>
  );
}
