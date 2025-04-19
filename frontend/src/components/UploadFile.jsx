import { AlertCircleIcon, FileIcon, ImageUpIcon, XIcon } from "lucide-react";
import { useEffect } from "react";

import { useFileUpload } from "@/hooks/use-file-upload"; // Assuming this hook exists and works

// Let's name it differently to avoid confusion if the original is still used
export default function GenericFileUpload({ onFileChange, onFileRemove, isUploaded }) {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    
    maxSize,
    multiple: false,
  });

 
  const previewUrl = files[0]?.preview || null;
  const selectedFile = files[0]?.file || null;


  useEffect(() => {
    if (selectedFile && onFileChange) {
      onFileChange(selectedFile);
    }

  
    if (files.length === 0 && onFileRemove) {
      onFileRemove();
    }
   
  }, [files, onFileChange, onFileRemove, selectedFile]);



  useEffect(() => {
    if (isUploaded && files.length > 0) {
      removeFile(files[0].id);
    }
  }, [isUploaded, files, removeFile]);


  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        {/* Drop area */}
        <div
          role="button"
          tabIndex={0} 
          onClick={openFileDialog}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openFileDialog(); }} // Allow activation with keyboard
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          
          className={`border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 ${selectedFile ? 'has-file' : ''} ${previewUrl ? 'has-image-preview' : ''} has-[img]:border-none has-[input:focus]:ring-[3px]`}
        >
          
          <input {...getInputProps()} className="sr-only" aria-label="Upload file" />

          
          {previewUrl ? (
            
            <div className="absolute inset-0">
              <img
                src={previewUrl}
                alt={selectedFile?.name || "Uploaded image"}
                className="size-full object-cover"
              />
            </div>
          ) : selectedFile ? (
            
            <div className="flex flex-col items-center justify-center text-center p-4">
               <FileIcon className="size-10 mb-3 text-gray-400" aria-hidden="true" />
               <p className="text-sm font-medium text-gray-800 break-all px-2">
                 {selectedFile.name}
               </p>
               <p className="text-xs text-muted-foreground mt-1">
                 {(selectedFile.size / 1024).toFixed(1)} KB
               </p>
            </div>
          ) : (
            
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                
                <ImageUpIcon className="size-4 opacity-60" />
              </div>
              <p className="mb-1.5 text-sm font-medium">
                
                Drop your file here or click to browse
              </p>
              <p className="text-muted-foreground text-xs">
                Max size: {maxSizeMB}MB
              </p>
            </div>
          )}
        </div>

        {/* Remove Button: Show whenever a file is selected */}
        {selectedFile && (
          <div className="absolute top-4 right-4 z-10"> {/* Ensure button is clickable above content */}
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              // Use the removeFile function from the hook, passing the file's ID
              onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the main div's onClick
                  removeFile(files[0]?.id);
              }}
              aria-label="Remove file"
            >
              <XIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {/* Error Display */}
      {errors.length > 0 && (
        <div className="text-destructive flex items-center gap-1 text-xs" role="alert">
          <AlertCircleIcon className="size-3 shrink-0" />
          {/* Display the first error message */}
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}