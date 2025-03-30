import React from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
  onSearch: (term: string) => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Header({ onSearch, activeSection, onSectionChange }: HeaderProps) {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('search') as string;
    onSearch(searchTerm);
  };

  return (
    <header className="bg-white shadow-md rounded-md p-4 mb-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">نمایش ساختار پروژه ارز دیجیتال</h1>
        
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <input
              type="text"
              name="search"
              placeholder="جستجو در فایل‌ها..."
              className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
            >
              <Search size={20} />
            </button>
          </div>
        </form>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSectionChange('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            همه
          </button>
          <button
            onClick={() => onSectionChange('frontend')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'frontend' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            فرانت‌اند
          </button>
          <button
            onClick={() => onSectionChange('backend')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'backend' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            بک‌اند
          </button>
          <button
            onClick={() => onSectionChange('ai')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'ai' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            هوش مصنوعی
          </button>
        </div>
      </div>
    </header>
  );
}