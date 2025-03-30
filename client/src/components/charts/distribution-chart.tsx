import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface DistributionData {
  label: string;
  count: number;
  color: string;
  percentage: number;
}

interface DistributionChartProps {
  data: DistributionData[];
}

export function DistributionChart({ data }: DistributionChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      if (ctx) {
        // Destroy previous chart if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        
        chartInstance.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: data.map(item => item.label),
            datasets: [{
              data: data.map(item => item.count),
              backgroundColor: data.map(item => item.color),
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
              legend: {
                display: false
              }
            }
          }
        });
      }
    }
    
    // Cleanup
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <Card className="bg-white shadow-card">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">توزیع فایل‌ها</h2>
          <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition">
            <i className="mdi mdi-refresh"></i>
          </button>
        </div>
        
        <div className="mb-6 h-[220px]">
          <canvas ref={chartRef}></canvas>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          {data.map((item, index) => (
            <div key={index} className={`p-2 rounded-lg bg-${item.color}/10`}>
              <div className="text-sm text-gray-600">{item.label}</div>
              <div className={`font-bold text-${item.color}`}>{item.percentage}%</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
