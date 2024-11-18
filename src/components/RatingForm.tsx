import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Star } from 'lucide-react';
import { addRating } from '@/lib/db';

export function RatingForm({ onRatingSubmit }: { onRatingSubmit: () => void }) {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (selectedRating === 0) {
      toast({
        title: "Error",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }

    addRating(selectedRating);
    toast({
      title: "Success",
      description: "Thank you for rating today's breakfast!",
    });
    setSelectedRating(0);
    onRatingSubmit();
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 text-center">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Rate Today's Breakfast</h2>
        <p className="text-muted-foreground">How was your Monday breakfast today?</p>
      </div>

      <div className="flex justify-center space-x-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            className="p-2 transition-all"
            onMouseEnter={() => setHoveredRating(rating)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => setSelectedRating(rating)}
          >
            <Star
              className={`w-8 h-8 ${
                rating <= (hoveredRating || selectedRating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>

      <Button 
        className="w-full" 
        size="lg"
        onClick={handleSubmit}
      >
        Submit Rating
      </Button>
    </div>
  );
}