import Image from "next/image";
import "./login.css";

export default function Login() {
  return (
    <div className="relative w-full h-screen">
      <Image
        src="/striped-pattern.jpg"
        alt="Background"
        fill
        className="object-cover opacity-3"
        priority
        
      />
      <div className="absolute left-[8vw] top-1/2 -translate-y-1/2 w-[30vw] max-w-[400px] min-w-[200px]">
        <Image
          src="/next-for-autism-logo.svg"
          alt="Next.js Logo"
          width={500}
          height={500}
          className="object-contain w-full h-auto"
        />
      </div>
      <div className="absolute right-[5vw] top-1/2 -translate-y-1/2 w-[45vw] max-w-[45vw] h-[80vh] max-h-[80vw] rounded-[3vw] shadow-lg p-[2vw]" style={{ backgroundColor: 'rgb(217,217,217)' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[30vw] h-[4vh] rounded-lg" style={{ backgroundColor: 'rgba(0, 38, 62, 1)' }}></div>
        <h3 className="welcome-font absolute left-1/2 -translate-x-1/2" style={{ textAlign: 'center', top: '25%', fontSize: '2vw', fontWeight: 'bold' }}>Welcome Back</h3>
        <div className="absolute left-1/2 -translate-x-1/2 w-[35vw] h-[5vh] rounded-md border-2" style={{ backgroundColor: 'white', borderColor: 'rgb(209, 213, 219)', top: '35%' }}>
            <span style={{ position: 'absolute', left: '1vw', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2vw', color: 'gray' }}>Username</span>
        </div>
<div className="absolute left-1/2 -translate-x-1/2 w-[35vw] h-[5vh] rounded-md border-2" style={{ backgroundColor: 'white', borderColor: 'rgb(209, 213, 219)', top: '45%' }}>
    <span style={{ position: 'absolute', left: '1vw', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2vw', color: 'gray' }}>Password</span>
</div>

<div className="absolute left-1/2 -translate-x-1/2 w-[25vw] h-[8vh] rounded-[3vw] flex items-center justify-center" style={{ backgroundColor: 'rgba(136, 174, 245, 1)', top: '55%' }}>
    <a href = "questions.tsx"><span style={{ color: 'white', fontSize: '2vw', fontWeight: 'bold' }}>Login</span></a>
</div>
</div>
      
    </div>
  );
}

