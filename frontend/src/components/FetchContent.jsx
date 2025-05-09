import { useState } from "react";

function FetchContent() {
  const [token, setToken] = useState("");
  const [content, setContent] = useState(null);
  const [contentType, setContentType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchContentHandler() {
    if (!token.trim()) return;
    
    setIsLoading(true);
    setError("");
    setContent(null);
    setContentType(null);
    
    try {
      const response = await fetch(`https://any-share-oqhc-qmazwii32-orekis-projects-910cdc8e.vercel.app/api/fetch-content?token=${token}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }
      
      const responseData = await response.json();
      
      if (responseData.data && responseData.data.length > 0) {
        const fetchedData = responseData.data[0];
        setContentType(fetchedData.type);
        
        if (fetchedData.type === "Text") {
          setContent(fetchedData.data.text);
        } else if (fetchedData.type === "File") {
          setContent(fetchedData.data.data);
        }
      } else {
        throw new Error("No content found for this token");
      }
      
      setToken("");
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to retrieve content. Please check your token and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Fetch Content
      </h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter Token
        </label>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Paste your token here..."
        />
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <button
        className={`w-full p-3 rounded-lg font-medium transition-all ${
          isLoading || !token.trim()
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
        onClick={fetchContentHandler}
        disabled={isLoading || !token.trim()}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Fetching...
          </span>
        ) : (
          "Fetch Content"
        )}
      </button>

      {content && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Retrieved Content
          </h3>
          
          {contentType === "Text" ? (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="whitespace-pre-wrap">{content}</p>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="mb-3">File: {content.name}</p>
              
              <a
                href={content.downloadPage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Download File
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FetchContent;
