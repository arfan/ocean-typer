import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface SoundUploaderProps {
  onFileSelect: (file: File, type: string) => void;
  soundType: string;
  accept?: string;
}

const SoundUploader: React.FC<SoundUploaderProps> = ({ 
  onFileSelect, 
  soundType, 
  accept = "audio/mpeg,audio/wav" 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file, soundType);
    }
  };

  return (
    <div className="mb-4">
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        <Upload className="w-4 h-4" />
        Upload {soundType} Sound
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}