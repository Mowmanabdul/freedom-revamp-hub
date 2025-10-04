import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, PieChart, TrendingUp, Activity, Target } from 'lucide-react';
import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
} from 'recharts';
import { useQuest } from '@/contexts/QuestContext';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { addDays, isWithinInterval, format, differenceInDays, startOfDay } from 'date-fns';
import { useTheme } from 'next-themes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const NoDataPlaceholder = () => (
  <div className="text-center py-8 text-muted-foreground">
    <p className="text-sm">No data for this period</p>
    <p className="text-xs mt-1">Complete some quests to see your stats!</p>
  </div>
);

export function Analytics() {
  const { state } = useQuest();
  const { theme } = useTheme();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  const filteredQuests = useMemo(() => {
    return state.completedQuests.filter((quest) => {
      if (!dateRange?.from || !dateRange?.to || !quest.completedAt) return false;
      return isWithinInterval(new Date(quest.completedAt), {
        start: dateRange.from,
        end: dateRange.to,
      });
    });
  }, [state.completedQuests, dateRange]);

  const { questCompletionData, xpGainedData, categoryData, totalXpGained } = useMemo(() => {
    const dailyData: { [key: string]: { date: number; completed: number; xp: number } } = {};
    const categoryCounts: { [key: string]: number } = {};
    let totalXp = 0;

    for (const quest of filteredQuests) {
      if (quest.completedAt) {
        const dateKey = startOfDay(new Date(quest.completedAt)).getTime();
        if (!dailyData[dateKey]) {
          dailyData[dateKey] = { date: dateKey, completed: 0, xp: 0 };
        }
        dailyData[dateKey].completed += 1;
        dailyData[dateKey].xp += quest.xp;

        categoryCounts[quest.category] = (categoryCounts[quest.category] || 0) + 1;
        totalXp += quest.xp;
      }
    }

    const sortedDailyData = Object.values(dailyData).sort((a, b) => a.date - b.date);

    return {
      questCompletionData: sortedDailyData.map(d => ({ ...d, date: format(d.date, 'MMM d') })),
      xpGainedData: sortedDailyData.map(d => ({ ...d, date: format(d.date, 'MMM d') })),
      categoryData: Object.entries(categoryCounts).map(([name, value]) => ({ name, value })),
      totalXpGained: totalXp,
    };
  }, [filteredQuests]);

  const tickColor = theme === 'dark' ? '#e5e7eb' : '#4b5563';

  const totalQuestsCompleted = filteredQuests.length;
  const days = dateRange?.from && dateRange?.to ? differenceInDays(dateRange.to, dateRange.from) + 1 : 1;
  const averageQuestsPerDay = totalQuestsCompleted > 0 ? (totalQuestsCompleted / days).toFixed(1) : '0.0';

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          Analytics
        </h2>
        <DatePickerWithRange onDateChange={setDateRange} />
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">
            <Activity className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="trends">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="breakdown">
            <PieChart className="w-4 h-4 mr-2" />
            Breakdown
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Quests Completed</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalQuestsCompleted}</div>
                <p className="text-xs text-muted-foreground">in the selected period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total XP Gained</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalXpGained.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">from completed quests</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageQuestsPerDay}</div>
                <p className="text-xs text-muted-foreground">quests completed per day</p>
              </CardContent>
            </Card>
          </div>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <BarChart className="w-4 h-4" />
                Quest Completion Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              {questCompletionData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={questCompletionData}>
                    <XAxis dataKey="date" stroke={tickColor} fontSize={12} />
                    <YAxis stroke={tickColor} fontSize={12} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === 'dark' ? '#1f2937' : '#f9fafb',
                        borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                      }}
                    />
                    <Bar dataKey="completed" fill="hsl(var(--primary))" name="Quests Completed" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              ) : (
                <NoDataPlaceholder />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <LineChart className="w-4 h-4" />
                XP Gained Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              {xpGainedData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={xpGainedData}>
                    <XAxis dataKey="date" stroke={tickColor} fontSize={12} />
                    <YAxis stroke={tickColor} fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === 'dark' ? '#1f2937' : '#f9fafb',
                        borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '14px' }} />
                    <Line type="monotone" dataKey="xp" stroke="hsl(var(--primary))" name="XP Gained" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              ) : (
                <NoDataPlaceholder />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <PieChart className="w-4 h-4" />
                Category Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => {
                        const p = typeof percent === 'number' ? percent : 0;
                        return `${name} ${Math.round(p * 100)}%`;
                      }}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === 'dark' ? '#1f2937' : '#f9fafb',
                        borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '14px' }} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              ) : (
                <NoDataPlaceholder />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
