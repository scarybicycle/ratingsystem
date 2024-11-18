import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTodayStats, getWeeklyStats } from '@/lib/db';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow-sm">
        <p className="text-sm font-medium">{format(parseISO(label), 'MMM dd, yyyy')}</p>
        <p className="text-sm text-muted-foreground">
          Rating: {Number(payload[0].value).toFixed(1)} / 5.0
        </p>
      </div>
    );
  }
  return null;
};

export function Stats() {
  const todayStats = getTodayStats();
  const weeklyStats = getWeeklyStats();

  return (
    <div className="w-full grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      <Card className="w-full text-center">
        <CardHeader>
          <CardTitle>Today's Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">
            {todayStats.average.toFixed(1)} / 5.0
          </div>
          <p className="text-xs text-muted-foreground">
            Based on {todayStats.count} ratings
          </p>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>Weekly Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyStats} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => format(parseISO(date), 'MM/dd')}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={[0, 5]} 
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="average" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}