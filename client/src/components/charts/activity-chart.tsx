import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface ActivityData {
  days: string[];
  datasets: {
    label: string;
    data: number[];
    color: string;
  }[];
}

interface ActivityChartProps {
  data: ActivityData;
}

export function ActivityChart({ data }: ActivityChartProps) {
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
          type: 'bar',
          data: {
            labels: data.days,
            datasets: data.datasets.map(dataset => ({
              label: dataset.label,
              data: dataset.data,
              backgroundColor: dataset.color,
              borderRadius: 4
            }))
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                stacked: true,
                grid: {
                  display: false
                },
                ticks: {
                  font: {
                    family: 'Vazirmatn'
                  }
                }
              },
              y: {
                stacked: true,
                ticks: {
                  font: {
                    family: 'Vazirmatn'
                  }
                }
              }
            },
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  padding: 20,
                  font: {
                    family: 'Vazirmatn'
                  }
                }
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
          <h2 className="text-lg font-medium">فعالیت توسعه در ۷ روز گذشته</h2>
          <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition">
            <i className="mdi mdi-dots-vertical"></i>
          </button>
        </div>
        
        <div className="h-[220px]">
          <canvas ref={chartRef}></canvas>
        </div>
      </CardContent>
    </Card>
  );
}
