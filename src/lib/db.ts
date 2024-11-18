import { format, subDays } from 'date-fns';

export interface Rating {
  id: string;
  rating: number;
  date: string;
  created_at: string;
}

const STORAGE_KEY = 'monday-breakfast-ratings';

function getRatings(): Rating[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveRatings(ratings: Rating[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
}

export function addRating(rating: number): void {
  const ratings = getRatings();
  const newRating: Rating = {
    id: crypto.randomUUID(),
    rating,
    date: format(new Date(), 'yyyy-MM-dd'),
    created_at: new Date().toISOString()
  };
  
  ratings.push(newRating);
  saveRatings(ratings);
}

export function getTodayStats(): { average: number; count: number } {
  const today = format(new Date(), 'yyyy-MM-dd');
  const ratings = getRatings().filter(r => r.date === today);
  
  if (ratings.length === 0) {
    return { average: 0, count: 0 };
  }
  
  const average = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
  return {
    average: Number(average.toFixed(2)),
    count: ratings.length
  };
}

export function getWeeklyStats(): { date: string; average: number; count: number }[] {
  const ratings = getRatings();
  const today = new Date();
  const stats: { [key: string]: { sum: number; count: number } } = {};

  // Initialize last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = format(subDays(today, i), 'yyyy-MM-dd');
    stats[date] = { sum: 0, count: 0 };
  }

  // Calculate stats for each day
  ratings.forEach(rating => {
    if (stats[rating.date]) {
      stats[rating.date].sum += rating.rating;
      stats[rating.date].count += 1;
    }
  });

  // Convert to array and calculate averages
  return Object.entries(stats).map(([date, { sum, count }]) => ({
    date,
    average: count > 0 ? Number((sum / count).toFixed(2)) : 0,
    count
  }));
}