import React, { useState } from 'react';
import { FolderIcon, FileIcon, ChevronRightIcon, ChevronDownIcon } from 'lucide-react';

interface TreeItem {
  name: string;
  type: 'folder' | 'file';
  description?: string;
  section?: string;
  children?: TreeItem[];
  content?: string;
}

interface TreeViewProps {
  data: TreeItem[];
  onFileSelect: (file: TreeItem) => void;
  searchTerm?: string;
}

// کامپوننت جدید برای نمایش هر آیتم به صورت جداگانه
function TreeItemComponent({ 
  item, 
  path = '', 
  depth = 0, 
  onFileSelect,
  searchTerm = ''
}: { 
  item: TreeItem; 
  path?: string; 
  depth?: number; 
  onFileSelect: (file: TreeItem) => void;
  searchTerm?: string;
}) {
  const [isOpen, setIsOpen] = useState(!!searchTerm);
  
  // نادیده گرفتن آیتم‌هایی که با عبارت جستجو تطابق ندارند
  if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      !(item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))) {
    // اگر فولدر است، فرزندان آن را بررسی کنیم
    if (item.type === 'folder' && item.children) {
      // جلوگیری از رندر نامناسب با فیلتر کردن کامپوننت‌ها به جای عناصر
      const hasMatchingChildren = item.children.some(child => 
        child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (child.description && child.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      
      if (!hasMatchingChildren) {
        return null;
      }
      
      return (
        <div key={`${path}/${item.name}`} className="ml-4 mt-1">
          <div className="flex items-center p-1 rounded hover:bg-gray-100 cursor-pointer">
            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
            <FolderIcon className="h-4 w-4 text-blue-500 mr-2" />
            <span className="text-sm">{item.name}</span>
            {item.description && <span className="text-xs text-gray-500 mr-2 ml-2">{item.description}</span>}
            {item.section && (
              <span className={`text-xs px-2 py-0.5 rounded ${
                item.section === 'backend' ? 'bg-blue-100 text-blue-800' : 
                item.section === 'frontend' ? 'bg-green-100 text-green-800' : 
                                            'bg-yellow-100 text-yellow-800'
              } ml-auto`}>
                {item.section === 'backend' ? 'بک‌اند' : 
                 item.section === 'frontend' ? 'فرانت‌اند' : 'هوش مصنوعی'}
              </span>
            )}
          </div>
          <div className="ml-5">
            {item.children.map(child => (
              <TreeItemComponent 
                key={`${path}/${item.name}/${child.name}`}
                item={child} 
                path={`${path}/${item.name}`} 
                depth={depth + 1}
                onFileSelect={onFileSelect}
                searchTerm={searchTerm}
              />
            ))}
          </div>
        </div>
      );
    }
    
    return null;
  }
  
  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.type === 'folder') {
      setIsOpen(!isOpen);
    }
  };
  
  return (
    <div key={`${path}/${item.name}`} className="mt-1">
      <div 
        className={`flex items-center p-1 rounded cursor-pointer ${
          item.type === 'file' ? 'hover:bg-blue-50' : 'hover:bg-gray-100'
        }`}
        onClick={(e) => {
          if (item.type === 'file') {
            onFileSelect(item);
          } else {
            toggleOpen(e);
          }
        }}
      >
        {item.type === 'folder' && (
          isOpen ? 
            <ChevronDownIcon className="h-4 w-4 text-gray-500" /> : 
            <ChevronRightIcon className="h-4 w-4 text-gray-500" />
        )}
        
        {item.type === 'folder' ? 
          <FolderIcon className="h-4 w-4 text-blue-500 mr-2" /> : 
          <FileIcon className="h-4 w-4 text-gray-500 mr-2" />
        }
        
        <span className="text-sm">{item.name}</span>
        
        {item.description && <span className="text-xs text-gray-500 mr-2 ml-2">{item.description}</span>}
        
        {item.section && (
          <span className={`text-xs px-2 py-0.5 rounded ${
            item.section === 'backend' ? 'bg-blue-100 text-blue-800' : 
            item.section === 'frontend' ? 'bg-green-100 text-green-800' : 
                                       'bg-yellow-100 text-yellow-800'
          } ml-auto`}>
            {item.section === 'backend' ? 'بک‌اند' : 
             item.section === 'frontend' ? 'فرانت‌اند' : 'هوش مصنوعی'}
          </span>
        )}
      </div>
      
      {item.type === 'folder' && isOpen && item.children && (
        <div className="ml-5">
          {item.children.map(child => (
            <TreeItemComponent 
              key={`${path}/${item.name}/${child.name}`}
              item={child} 
              path={`${path}/${item.name}`} 
              depth={depth + 1}
              onFileSelect={onFileSelect}
              searchTerm={searchTerm}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function TreeView({ data, onFileSelect, searchTerm = '' }: TreeViewProps) {
  return (
    <div className="overflow-auto max-h-[calc(100vh-200px)]">
      {data.map(item => (
        <TreeItemComponent 
          key={item.name}
          item={item} 
          onFileSelect={onFileSelect}
          searchTerm={searchTerm}
        />
      ))}
    </div>
  );
}