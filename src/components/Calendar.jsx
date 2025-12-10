import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";

// ---- Mood + Emotion Maps ----
const moodMap = [
  'joy', 'excitement', 'admiration', 'neutral', 'approval',
  'pride', 'gratitude', 'surprise', 'love', 'relief',
  'optimism', 'realization', 'caring', 'amusement',
  'annoyance', 'desire', 'disapproval', 'curiosity',
  'anger', 'nervousness', 'confusion', 'sadness',
  'disappointment', 'fear', 'grief', 'disgust',
  'embarrassment', 'remorse'
];

const coreEmotionGroups = {
  Happy: ['joy', 'amusement', 'love', 'gratitude', 'relief', 'pride', 'approval'],
  Excited: ['excitement', 'optimism', 'desire', 'surprise', 'admiration'],
  Neutral: ['neutral', 'realization', 'curiosity', 'caring'],
  Sad: ['sadness', 'grief', 'disappointment', 'remorse'],
  Angry: ['anger', 'annoyance', 'disgust', 'disapproval'],
  Anxious: ['fear', 'nervousness', 'embarrassment', 'confusion'],
};

const moodEmojis = {
  Happy: "😊",
  Excited: "🤩",
  Neutral: "😐",
  Sad: "😢",
  Angry: "😠",
  Anxious: "😰",
  Unknown: "❓",
};

function getCoreMood(emotionName) {
  for (const [core, list] of Object.entries(coreEmotionGroups)) {
    if (list.includes(emotionName)) return core;
  }
  return "Unknown";
}

export default function MyCalendar({ data, date, setDate }) {
  const [events, setEvents] = useState([]);
  const [moodDisplay, setMoodDisplay] = useState(null);
  const isToggled = useSelector((state) => state.toggle.isToggled);

  // Load events on mount
  useEffect(() => {
    if (data) setEvents(data);
  }, [data]);

  // When a date is selected → update mood + sentiment display
  const handleDateChange = (newDate) => {
    setDate(newDate);

    const selected = newDate.toLocaleDateString("en-CA");
    const event = events.find((e) => e.date === selected);

    if (event) {
      const emotionName = moodMap[event.mood];
      const coreMood = getCoreMood(emotionName);
      const emoji = moodEmojis[coreMood];
      const sentimentPercent = (event.rating / 10) * 100;

      setMoodDisplay({
        emoji,
        coreMood,
        sentimentPercent,
        emotionName
      });

    } else {
      setMoodDisplay(null);
    }
  };

  // Render calendar day tiles
  const renderTileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const currentDate = date.toLocaleDateString("en-CA");
    const event = events.find((e) => e.date === currentDate);

    if (event) {
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src="/fourleaf.png"
            alt="event"
            className="w-5 h-5"
          />
        </div>
      );
    }

    return null;
  };

  if (!isToggled) return null;

  return (
    <div className="calendar-wrapper">

      {/* ================== LEFT PAGE MOOD BOX ================== */}
      <div className="mood-box">
        {moodDisplay ? (
          <>
            <div className="mood-row">
              <span className="mood-label">Mood:</span>
              <span className="mood-value">
                {moodDisplay.emoji} {moodDisplay.coreMood}
              </span>
            </div>

            <div className="sentiment-row">
              <span className="sentiment-label">Sentiment:</span>
              <div className="sentiment-bar">
                <div
                  className="sentiment-fill"
                  style={{ width: `${moodDisplay.sentimentPercent}%` }}
                ></div>
              </div>
              <span className="sentiment-number">
                {Math.round(moodDisplay.sentimentPercent)}%
              </span>
            </div>
          </>
        ) : (
          <div className="mood-placeholder">No entry for this day</div>
        )}
      </div>

      {/* ================== CALENDAR ================== */}
      <Calendar
        onChange={handleDateChange}
        value={date}
        view="month"
        tileContent={renderTileContent}
        className="custom-calendar"
        maxDate={new Date()}
      />
    </div>
  );
}
