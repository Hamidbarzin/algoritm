import { useState, useEffect } from 'react';
import { combinedTree, backendTree, frontendTree, aiTree } from '../lib/tree-data';
import { StatData } from '../components/stats-grid';

interface UseTreeDataReturn {
  treeData: any[];
  backendTreeData: any[];
  frontendTreeData: any[];
  activeSection: string;
  setActiveSection: (section: string) => void;
  stats: StatData[];
  fileTypeData: any[];
  distributionData: any[];
  activityData: any;
}

export function useTreeData(): UseTreeDataReturn {
  const [activeSection, setActiveSection] = useState<string>('all'); // 'all', 'backend', 'frontend'
  const [stats, setStats] = useState<StatData[]>([]);
  const [fileTypeData, setFileTypeData] = useState<any[]>([]);
  const [distributionData, setDistributionData] = useState<any[]>([]);
  const [activityData, setActivityData] = useState<any>({
    days: [],
    datasets: []
  });

  // Function to count files and folders
  const countFilesAndFolders = (tree: any[]) => {
    let files = 0;
    let folders = 0;

    const traverse = (items: any[]) => {
      items.forEach(item => {
        if (item.type === 'folder') {
          folders++;
          if (item.children) {
            traverse(item.children);
          }
        } else if (item.type === 'file') {
          files++;
        }
      });
    };

    traverse(tree);
    return { files, folders };
  };

  // Function to count files by section
  const countFilesBySection = (tree: any[]) => {
    let backend = 0;
    let frontend = 0;
    let ai = 0;

    const traverse = (items: any[]) => {
      items.forEach(item => {
        if (item.type === 'file') {
          if (item.section === 'backend') backend++;
          else if (item.section === 'frontend') frontend++;
          else if (item.section === 'ai') ai++;
        }
        
        if (item.children) {
          traverse(item.children);
        }
      });
    };

    traverse(tree);
    return { backend, frontend, ai };
  };

  useEffect(() => {
    // Count files by section
    const { backend, frontend, ai } = countFilesBySection(combinedTree);
    const total = backend + frontend + ai;

    // Set stats
    setStats([
      {
        title: "فایل‌های بک‌اند",
        value: backend,
        icon: "mdi-server",
        color: "blue"
      },
      {
        title: "فایل‌های فرانت‌اند",
        value: frontend,
        icon: "mdi-monitor-dashboard",
        color: "indigo"
      },
      {
        title: "فایل‌های هوش مصنوعی",
        value: ai,
        icon: "mdi-brain",
        color: "purple"
      },
      {
        title: "تعداد پوشه‌ها",
        value: countFilesAndFolders(combinedTree).folders,
        icon: "mdi-folder-multiple",
        color: "amber"
      },
      {
        title: "تعداد کل فایل‌ها",
        value: backend + frontend + ai,
        icon: "mdi-file-multiple",
        color: "emerald"
      }
    ]);

    // Set file type data
    setFileTypeData([
      { label: 'JavaScript', count: 30, color: '#FF6384' },
      { label: 'HTML', count: 15, color: '#36A2EB' },
      { label: 'CSS', count: 20, color: '#FFCE56' },
      { label: 'Python', count: 25, color: '#4BC0C0' },
      { label: 'JSON', count: 5, color: '#9966FF' },
      { label: 'Other', count: 5, color: '#C9CBCF' }
    ]);

    // Set distribution data
    setDistributionData([
      { 
        label: 'بک‌اند', 
        count: backend, 
        color: '#3498db',
        percentage: Math.round(backend / total * 100)
      },
      { 
        label: 'فرانت‌اند', 
        count: frontend, 
        color: '#2ecc71',
        percentage: Math.round(frontend / total * 100)
      },
      { 
        label: 'هوش مصنوعی', 
        count: ai, 
        color: '#9b59b6',
        percentage: Math.round(ai / total * 100)
      }
    ]);

    // Set activity data
    setActivityData({
      days: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'],
      datasets: [
        {
          label: 'بک‌اند',
          data: [12, 8, 15, 6, 10, 8, 5],
          color: '#3498db'
        },
        {
          label: 'فرانت‌اند',
          data: [8, 15, 12, 10, 18, 14, 7],
          color: '#2ecc71'
        },
        {
          label: 'هوش مصنوعی',
          data: [5, 3, 8, 4, 6, 7, 3],
          color: '#9b59b6'
        }
      ]
    });
  }, []);

  // Determine which tree data to return based on active section
  const getTreeData = () => {
    switch (activeSection) {
      case 'backend':
        return backendTree;
      case 'frontend':
        return frontendTree;
      case 'ai':
        return aiTree;
      default:
        return combinedTree;
    }
  };

  return {
    treeData: getTreeData(),
    backendTreeData: backendTree,
    frontendTreeData: frontendTree,
    activeSection,
    setActiveSection,
    stats,
    fileTypeData,
    distributionData,
    activityData
  };
}
