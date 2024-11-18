import { useState } from 'react';
import { RatingForm } from './components/RatingForm';
import { Stats } from './components/Stats';
import { Toaster } from "@/components/ui/toaster";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container max-w-4xl mx-auto py-10 space-y-10 px-4">
        <div className="text-center text-sm font-semibold text-primary/80 uppercase tracking-wider">
          DigiMantra
        </div>
        
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Monday Breakfast Rating</h1>
          <p className="text-muted-foreground">Help us improve your Monday mornings!</p>
        </header>

        <RatingForm onRatingSubmit={() => setRefreshKey(prev => prev + 1)} />
        
        <div key={refreshKey} className="flex justify-center">
          <Stats />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;