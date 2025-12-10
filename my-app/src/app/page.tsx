import Login from "./login/login";
import {GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google';

const clientId = '221765598159-7nn7s0ek0q8n34iojmgijh4gndnfrtkf.apps.googleusercontent.com';
export default function Home() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Login />
    </GoogleOAuthProvider>
  );
}
