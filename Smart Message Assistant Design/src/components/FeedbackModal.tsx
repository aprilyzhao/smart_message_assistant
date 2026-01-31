import { X, Star } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';

interface FeedbackModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

const FEEDBACK_CHIPS = [
  'Accurate',
  'Natural phrasing',
  'Matched my intent',
  'Too formal',
  'Too casual',
  'Lost meaning',
  'Grammar issues',
  'Wrong tone',
];

export function FeedbackModal({ onClose, onSubmit }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [comment, setComment] = useState('');

  const handleChipToggle = (chip: string) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  const handleSubmit = () => {
    // In a real app, this would send feedback data
    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[520px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-gray-900">Share Your Feedback</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Rating */}
          <div>
            <Label className="text-gray-900 mb-3 block">
              How would you rate this result?
            </Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-[#e2b203] text-[#e2b203]'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Feedback Chips */}
          <div>
            <Label className="text-gray-900 mb-3 block">
              What worked or didn't work? (optional)
            </Label>
            <div className="flex flex-wrap gap-2">
              {FEEDBACK_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleChipToggle(chip)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    selectedChips.includes(chip)
                      ? 'bg-[#1164a3] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <Label htmlFor="feedback-comment" className="text-gray-900 mb-2 block">
              Additional comments (optional)
            </Label>
            <textarea
              id="feedback-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us more about your experience..."
              className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1164a3] focus:border-transparent resize-none text-gray-900 placeholder:text-gray-500"
            />
          </div>

          {/* Privacy Note */}
          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
            Your feedback helps improve the Smart Message Assistant. We collect only non-sensitive signals like quality ratings and feature usage—no PII is stored.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Skip
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="bg-[#007a5a] hover:bg-[#006644] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Feedback
          </Button>
        </div>
      </div>
    </div>
  );
}
