import Image from "next/image";

export default function FormPage() {
  return (
    <div className="relative w-full min-h-[400vh] bg-blue-100">
      <div className="absolute top-0 left-0 p-4 z-10">
        <Image
          src="/next-for-autism-logo.svg"
          alt="Next for Autism Logo"
          width={150}
          height={150}
          className="object-contain"
        />
      </div>
      
      {/* Section 1 */}
      <div className="absolute top-[20vh] left-1/2 -translate-x-1/2 w-[85%]">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Section 1 Name</h2>
        <div className="bg-yellow-50 rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.15)] p-8 min-h-[150vh]">
          <h3 className="text-2xl font-semibold mb-6 text-gray-700">Subsection 1 Name</h3>
          <div className="mb-8">
            <p className="text-lg font-medium mb-4 text-gray-800">Question 1</p>
          </div>
        </div>
      </div>
      
      <div className="absolute top-[180vh] left-1/2 -translate-x-1/2 w-[85%] h-[150vh] bg-blue-200 rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.15)]">
          </div>
        </div>
  );
}

