import { useState } from "react";
import Head from "next/head";

export default function Dashboard() {
  const steps = [
    {
      id: 1,
      number: "01",
      title: "Annual Goal Setting",
      description:
        "Managers and employees set clear, measurable goals to anchor performance and growth for the year.",
      icon: (
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
    {
      id: 2,
      number: "02",
      title: "Quarterly Check-In 1",
      description:
        "Reflect on Q1: celebrate wins, review progress, discuss challenges, share feedback.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      id: 3,
      number: "03",
      title: "Quarterly Check-In 2",
      description:
        "Reflect on Q1: celebrate wins, review progress, discuss challenges, share feedback.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <path d="M3 9h18"/><path d="M9 21V9"/>        
        </svg>
      ),
    },
    
  ];

  const [activeStep, setActiveStep] = useState(1);

  const progress = ((activeStep - 1) / (steps.length - 1)) * 100;

  return (
    <>
      <Head>
          <title>FPS Thrive PATH</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
          <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-start mb-16">
            <h1 className="text-5xl font-bold text-gray-900">FPS Thrive PATH</h1>
          </div>

          {/* Progress Bar */}
          <div className="relative mb-20">
            <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="relative flex justify-between">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className="group flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                      activeStep === step.id
                        ? "bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-lg scale-110"
                        : activeStep > step.id
                        ? "bg-gradient-to-br from-purple-600 to-pink-500 text-white"
                        : "bg-white text-gray-400 border-2 border-gray-200"
                    }`}
                  >
                    {activeStep > step.id ? "✓" : step.number}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {steps.map((step) => (
              <button
                key={step.id}
                className={`p-8 rounded-2xl text-left transition-all ${
                  activeStep === step.id
                    ? "bg-white shadow-xl ring-2 ring-purple-500"
                    : "bg-white hover:shadow-lg"
                }`}
                onClick={() => setActiveStep(step.id)}
              >
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-xl mb-6 ${
                    activeStep === step.id
                      ? "bg-gradient-to-br from-purple-600 to-pink-500 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-16">
            <button
              disabled={activeStep === 1}
              onClick={() => setActiveStep(activeStep - 1)}
              className="px-6 py-3 rounded-xl bg-white text-gray-700 disabled:opacity-40"
            >
              Previous
            </button>

            <button
              disabled={activeStep === steps.length}
              onClick={() => setActiveStep(activeStep + 1)}
              className="px-6 py-3 rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-500 disabled:opacity-40"
            >
              Next
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
