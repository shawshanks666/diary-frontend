export default async function sentimentAnalysis(text) {
	const emotionToNumber = {
	  joy: 0, excitement: 1, admiration: 2, neutral: 3, approval: 4,
	  pride: 5, gratitude: 6, surprise: 7, love: 8, relief: 9,
	  optimism: 10, realization: 11, caring: 12, amusement: 13,
	  annoyance: 14, desire: 15, disapproval: 16, curiosity: 17,
	  anger: 18, nervousness: 19, confusion: 20, sadness: 21,
	  disappointment: 22, fear: 23, grief: 24, disgust: 25,
	  embarrassment: 26, remorse: 27
	};
  
	const weights = {
	  positive: 1,
	  neutral: 0.1,
	  negative: -1
	};
  
	const sanitizedText = text.replace(/\n/g, "\\n");
	const apiKey = import.meta.env.REACT_APP_API_KEY;
  
	// ------------------- EMOTION (fixed endpoint) -------------------
	const response1 = await fetch(
	  "https://router.huggingface.co/hf-inference/models/SamLowe/roberta-base-go_emotions",
	  {
		headers: {
		  Authorization: `Bearer ${apiKey}`,
		  "Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify({ inputs: sanitizedText }),
	  }
	);
  
	if (!response1.ok) throw new Error("Failed to fetch mood data");
  
	const result1 = await response1.json();
	const mood = emotionToNumber[result1[0][0].label];
  
	// ------------------- SENTIMENT (fixed endpoint) -------------------
	const response2 = await fetch(
	  "https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
	  {
		headers: {
		  Authorization: `Bearer ${apiKey}`,
		  "Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify({ inputs: sanitizedText }),
	  }
	);
  
	if (!response2.ok) throw new Error("Failed to fetch sentiment data");
  
	const result2 = await response2.json();
	console.log(result2);
  
	let weightedSum = 0;
	let totalWeight = 0;
  
	result2[0].forEach(({ label, score }) => {
	  const weight = weights[label];
	  weightedSum += weight * score;
	  totalWeight += score;
	});
  
	const normalized = weightedSum / totalWeight;
	const shifted = (normalized + 1) / 2;
	const sentimentScore = shifted * 9 + 1;
	const intScore = Math.round(sentimentScore);
  
	console.log(sentimentScore);
  
	return {
	  mood,
	  sentimentScore: intScore,
	};
  }
  