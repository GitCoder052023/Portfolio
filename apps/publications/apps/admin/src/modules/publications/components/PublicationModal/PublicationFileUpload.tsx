'use client'

import { useRef, useState } from 'react';
import { File as FileIcon, CloudUpload } from 'lucide-react';

interface PublicationFileUploadProps {
  pdfFile: File | null;
  onFileChange: (file: File) => void;
  existingPdfPath?: string;
}

export function PublicationFileUpload({ pdfFile, onFileChange, existingPdfPath }: PublicationFileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        onFileChange(file);
      } else {
        alert('Please upload a PDF file');
      }
    }
  };

  return (
    <div className="space-y-3">
      <div 
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative group cursor-pointer flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl transition-all duration-200
          ${isDragging ? 'border-neutral-900 bg-neutral-50/80 scale-[1.02]' : 'border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50/50'}
          ${pdfFile ? 'bg-neutral-50/50 border-solid border-neutral-300' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              onFileChange(e.target.files[0]);
            }
          }}
        />
        
        {pdfFile ? (
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-white rounded-full shadow-sm border border-neutral-100">
              <FileIcon className="w-6 h-6 text-neutral-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900 truncate max-w-[200px] px-2">{pdfFile.name}</p>
              <p className="text-xs text-neutral-500 mt-1">{(pdfFile.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
            <p className="text-xs text-neutral-400 mt-2 font-medium">Click to replace file</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center space-y-4">
            <div className={`p-4 rounded-full transition-colors ${isDragging ? 'bg-neutral-200' : 'bg-neutral-100 group-hover:bg-neutral-200'}`}>
              <CloudUpload className={`w-6 h-6 ${isDragging ? 'text-neutral-900' : 'text-neutral-600'}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900">Upload PDF Document</p>
              <p className="text-xs text-neutral-500 mt-1 px-4">Drag and drop or click to browse</p>
            </div>
          </div>
        )}
      </div>
      
      {!pdfFile && existingPdfPath && (
        <div className="flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200 rounded-xl">
          <div className="p-2 bg-white rounded-lg border border-neutral-100 shadow-sm shrink-0">
            <FileIcon className="w-4 h-4 text-neutral-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-900 truncate" title={existingPdfPath}>
              {existingPdfPath.split('/').pop()}
            </p>
            <p className="text-xs text-neutral-500">Currently uploaded</p>
          </div>
        </div>
      )}
    </div>
  );
}
