import { Card, CardContent } from "@/components/ui/card";

export interface StatData {
  title: string;
  value: number;
  icon: string;
  color: string;
}

interface StatsGridProps {
  stats: StatData[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white border-0 shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div className={`h-1 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-400`}></div>
          <CardContent className="p-6 flex items-center">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white ml-4 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 shadow-md`}>
              <i className={`mdi ${stat.icon} text-2xl`}></i>
            </div>
            <div>
              <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
              <div className="text-sm text-gray-500">{stat.title}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
