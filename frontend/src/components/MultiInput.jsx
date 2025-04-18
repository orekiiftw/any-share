import { useState } from "react";
import UploadFile from "./UploadFile";

function MultiInput() {
  const [selectedType, setSelectedType] = useState("Text");
  const [text, setText] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function fileUploadHandler() {
    setIsLoading(true);
    setError("");
    
    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const response = await fetch("http://localhost:3000/api/upload-file", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      console.log(data)
      setToken(data.token);
      setUploadedFile(null);
      setIsUploaded(true);
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function TextUploadHandler() {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch("http://localhost:3000/api/upload-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setToken(data.dbResponse.token);
      setText("");
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload text. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleFileChange(file) {
    setUploadedFile(file);
    setIsUploaded(false);
    console.log("Received file:", file);
  }

  function handleFileRemove() {
    setUploadedFile(null);
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Upload Content
      </h2>
      
      <div className="mb-6">
        <div className="flex bg-gray-50 rounded-lg p-1 mb-2">
          <button
            onClick={() => setSelectedType("Text")}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
              selectedType === "Text"
                ? "bg-white shadow-sm font-medium text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Text
          </button>
          <button
            onClick={() => setSelectedType("File")}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
              selectedType === "File"
                ? "bg-white shadow-sm font-medium text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            File
          </button>
        </div>
      </div>

      {selectedType === "Text" && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text Input
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none min-h-[150px] transition-all"
            placeholder="Enter your text here..."
          />
        </div>
      )}

      {selectedType === "File" && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            File Upload
          </label>
          <UploadFile
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer transition-all"
            onFileChange={handleFileChange}
            onFileRemove={handleFileRemove}
            isUploaded={isUploaded}
          />
          
          {uploadedFile && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700">{uploadedFile.name}</span>
                <span className="text-sm text-gray-500">
                  {(uploadedFile.size / 1024).toFixed(1)} KB
                </span>
              </div>
              
              {uploadedFile.type.startsWith("image/") && (
                <div className="mt-2 flex justify-center">
                  <img
                    src={URL.createObjectURL(uploadedFile)}
                    alt="Preview"
                    className="max-h-48 rounded-md object-contain"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <button
        className={`w-full p-3 mt-6 rounded-lg font-medium transition-all ${
          isLoading
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : selectedType === "Text" && !text.trim()
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : selectedType === "File" && !uploadedFile
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        onClick={selectedType === "Text" ? TextUploadHandler : fileUploadHandler}
        disabled={
          isLoading ||
          (selectedType === "Text" && !text.trim()) ||
          (selectedType === "File" && !uploadedFile)
        }
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
            Uploading...
          </span>
        ) : (
          "Upload"
        )}
      </button>

      {token && (
        <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-100">
          <p className="text-sm text-green-800 mb-1">Upload successful!</p>
          <div className="flex items-center justify-between">
            <p className="font-mono text-gray-700 break-all">{token}</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(token);
              }}
              className="ml-2 p-2 text-blue-600 hover:bg-blue-50 rounded-md"
              title="Copy to clipboard"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MultiInput;
