"use client";

import { useState } from "react";
import { Loader2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRateMaterial } from "@/lib/hooks/use-ratings";

interface RatingComponentProps {
  materialId: string;
  currentRating: number;
  onSubmit?: (rating: number) => void;
}

export function RatingComponent({
  materialId,
  currentRating,
  onSubmit,
}: RatingComponentProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(currentRating);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const rateMaterial = useRateMaterial();

  const handleRating = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      await rateMaterial.mutateAsync({
        materialId,
        ratingValue: selectedRating,
      });
    } catch {
      return;
    } finally {
      setIsSubmitting(false);
    }

    onSubmit?.(selectedRating);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-6">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => handleRating(star)}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded transition-transform hover:scale-110"
              aria-label={`Rate ${star} stars`}
            >
              <Star
                className={`h-8 w-8 transition-colors cursor-pointer ${
                  star <= (hoverRating || selectedRating)
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          ))}
        </div>
        <span className="text-sm font-medium">
          {selectedRating > 0
            ? `${selectedRating} star${selectedRating !== 1 ? "s" : ""}`
            : "No rating"}
        </span>
      </div>
      {selectedRating > 0 && (
        <Button
          onClick={handleSubmit}
          size="sm"
          disabled={isSubmitting || selectedRating <= 0}
          className="cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Rating"
          )}
        </Button>
      )}
      {isSubmitted && (
        <p className="text-sm text-green-600">Thank you for rating!</p>
      )}
    </div>
  );
}
