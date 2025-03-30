import React from 'react';

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  description?: string;
  section?: string;
  content?: string;
}

interface FilePreviewProps {
  file: FileItem | null;
  onClose: () => void;
}

export function FilePreview({ file, onClose }: FilePreviewProps) {
  if (!file) {
    return (
      <div className="bg-white rounded-md shadow-md p-4 h-full">
        <div className="text-center text-gray-500 italic mt-20">
          یک فایل را از ساختار درختی انتخاب کنید تا جزئیات آن نمایش داده شود.
        </div>
      </div>
    );
  }

  // تعیین نوع زبان برای نمایش کد
  const getLanguage = (fileName: string) => {
    if (fileName.endsWith('.js')) return 'javascript';
    if (fileName.endsWith('.ts') || fileName.endsWith('.tsx')) return 'typescript';
    if (fileName.endsWith('.jsx')) return 'jsx';
    if (fileName.endsWith('.py')) return 'python';
    if (fileName.endsWith('.html')) return 'html';
    if (fileName.endsWith('.css')) return 'css';
    if (fileName.endsWith('.json')) return 'json';
    return 'plaintext';
  };

  // مثال محتوا برای نمایش براساس نوع فایل
  const getExampleContent = (file: FileItem) => {
    if (file.content) return file.content;

    const language = getLanguage(file.name);
    const fileSuffix = file.name.split('.').pop();

    if (language === 'javascript') {
      if (file.name.includes('Controller')) {
        return `// ${file.name}\n\nclass ${file.name.replace('.js', '')} {\n  constructor() {\n    // تنظیمات اولیه\n  }\n\n  async fetchData() {\n    // پیاده‌سازی متدهای کنترلر\n  }\n}`;
      } else if (file.name.includes('Service')) {
        return `// ${file.name}\n\nclass ${file.name.replace('.js', '')} {\n  constructor() {\n    this.baseUrl = 'https://api.example.com';\n  }\n\n  async callExternalApi() {\n    // پیاده‌سازی متدهای سرویس\n  }\n}`;
      } else if (file.name.includes('Route')) {
        return `// ${file.name}\n\nconst express = require('express');\nconst router = express.Router();\n\nrouter.get('/', async (req, res) => {\n  // پیاده‌سازی مسیرها\n});\n\nmodule.exports = router;`;
      }
    } else if (language === 'python') {
      return `# ${file.name}\n\nclass ${file.name.replace('.py', '')}:\n    def __init__(self):\n        # تنظیمات اولیه\n        pass\n\n    def process_data(self, data):\n        # پردازش داده‌ها\n        return result`;
    }

    return `// این فایل محتوای نمونه برای ${file.name} است\n// ساختار واقعی فایل بسته به نوع و کاربرد آن متفاوت خواهد بود`;
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4 h-full">
      <div className="flex justify-between items-center mb-4 pb-2 border-b">
        <h3 className="text-lg font-semibold text-blue-600">{file.name}</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          بستن
        </button>
      </div>

      <div className="mb-4">
        <span className={`inline-block px-2 py-1 rounded text-xs ${
          file.section === 'backend' ? 'bg-blue-100 text-blue-800' : 
          file.section === 'frontend' ? 'bg-green-100 text-green-800' : 
                                       'bg-yellow-100 text-yellow-800'
        }`}>
          {file.section === 'backend' ? 'بک‌اند' : 
          file.section === 'frontend' ? 'فرانت‌اند' : 'هوش مصنوعی'}
        </span>
      </div>

      {file.description && (
        <div className="mb-4 text-gray-700">
          <p>{file.description}</p>
        </div>
      )}

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">محتوای فایل:</h4>
        <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm"
             style={{ direction: 'ltr', textAlign: 'left', maxHeight: '400px' }}>
          <code>
            {getExampleContent(file)}
          </code>
        </pre>
      </div>
    </div>
  );
}