import React from "react";

const Mood = ({ diary }) => {
  // Original mood map
  const moodMap = [
    'joy', 'excitement', 'admiration', 'neutral', 'approval',
    'pride', 'gratitude', 'surprise', 'love', 'relief',
    'optimism', 'realization', 'caring', 'amusement',
    'annoyance', 'desire', 'disapproval', 'curiosity',
    'anger', 'nervousness', 'confusion', 'sadness',
    'disappointment', 'fear', 'grief', 'disgust',
    'embarrassment', 'remorse'
  ];

  // Core emotion groups
  const coreEmotionGroups = {
    'Happy': ['joy', 'amusement', 'love', 'gratitude', 'relief', 'pride','approval'],
    'Excited': ['excitement', 'optimism', 'desire', 'surprise', 'admiration'],
    'Neutral': ['neutral', 'realization', 'curiosity','caring'],
    'Sad': ['sadness', 'grief', 'disappointment', 'remorse'],
    'Angry': ['anger', 'annoyance', 'disgust', 'disapproval'],
    'Anxious': ['fear', 'nervousness', 'embarrassment','confusion'],
  };

  // Initialize counts for core emotions
  const coreEmotionCounts = Object.keys(coreEmotionGroups).reduce((acc, emotion) => {
    acc[emotion] = 0;
    return acc;
  }, {});

  // Count occurrences of each original mood
  const moodCounts = Array(moodMap.length).fill(0);
  diary.forEach((entry) => {
    if (entry.mood !== undefined && entry.mood >= 0 && entry.mood < moodMap.length) {
      moodCounts[entry.mood]++;
      
      // Map to core emotions
      const moodName = moodMap[entry.mood];
      for (const [coreEmotion, moods] of Object.entries(coreEmotionGroups)) {
        if (moods.includes(moodName)) {
          coreEmotionCounts[coreEmotion]++;
          break;
        }
      }
    }
  });

  return (
    <div className="mood-container">
  
      <div className="core-emotions">
        {Object.entries(coreEmotionCounts).map(([emotion, count]) => (
          <div key={emotion} className={`core-emotion core-${emotion.toLowerCase()}`}>
            {count} {emotion}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mood;