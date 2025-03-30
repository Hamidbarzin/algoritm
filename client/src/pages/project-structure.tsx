import React, { useState } from 'react';
import { Header } from '../components/header';
import { TreeView } from '../components/tree-view';
import { FilePreview } from '../components/file-preview';
import { backendTree, frontendTree, aiTree } from '../lib/tree-data';

// این اینترفیس با تعریف در فایل tree-data.ts هماهنگ است
interface FileItem {
  name: string;
  type: 'folder' | 'file';
  description?: string;
  section?: string;
  children?: FileItem[];
  content?: string;
}

export default function ProjectStructure() {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('all');

  const handleFileSelect = (file: FileItem) => {
    setSelectedFile(file);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleClosePreview = () => {
    setSelectedFile(null);
  };

  // فیلتر کردن داده‌ها براساس بخش انتخاب شده
  const getFilteredData = () => {
    let data: FileItem[] = [];
    
    if (activeSection === 'all' || activeSection === 'backend') {
      data = [...data, ...backendTree];
    }
    
    if (activeSection === 'all' || activeSection === 'frontend') {
      data = [...data, ...frontendTree];
    }
    
    if (activeSection === 'all' || activeSection === 'ai') {
      data = [...data, ...aiTree];
    }
    
    return data;
  };

  return (
    <div className="p-4 md:p-6">
      <Header 
        onSearch={handleSearch} 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-md shadow-md p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">ساختار پروژه</h2>
          <TreeView 
            data={getFilteredData()} 
            onFileSelect={handleFileSelect} 
            searchTerm={searchTerm}
          />
        </div>
        
        <div>
          <FilePreview file={selectedFile} onClose={handleClosePreview} />
        </div>
      </div>
    </div>
  );
}