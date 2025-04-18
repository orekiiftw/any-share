import React, { useState } from 'react';
import MultiInput from './components/MultiInput';
import FetchContent from './components/FetchContent';

function App() {
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <div className="App flex flex-col min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
            Anyshare
          </h1>
          <nav>
            <button 
              onClick={() => setActiveComponent(null)} 
              className="text-white hover:text-blue-200 transition-colors"
            >
              Home
            </button>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto p-6 flex-grow">
        {activeComponent === null ? (
          <div className="max-w-2xl mx-auto mt-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Anyshare</h2>
            <p className="text-lg text-gray-600 mb-10">
              The easiest way to share and retrieve content. What would you like to do?
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-8 w-8 text-blue-600" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload Content</h3>
                  <p className="text-gray-600 mb-6">
                    Share text or files and get a token to access them later.
                  </p>
                  <button 
                    onClick={() => setActiveComponent('upload')}
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Upload
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-8">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-8 w-8 text-indigo-600" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Fetch Content</h3>
                  <p className="text-gray-600 mb-6">
                    Retrieve shared content using a token.
                  </p>
                  <button 
                    onClick={() => setActiveComponent('fetch')}
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Fetch
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : activeComponent === 'upload' ? (
          <div>
            <div className="mb-6">
              <button 
                onClick={() => setActiveComponent(null)}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </button>
            </div>
            <MultiInput />
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <button 
                onClick={() => setActiveComponent(null)}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </button>
            </div>
            <FetchContent />
          </div>
        )}
      </main>
      
      <footer className="bg-gray-800 text-gray-300 p-6 mt-auto">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} Anyshare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
