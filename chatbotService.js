
const simulatedKnowledgeBase = [
  {
    keywords: ['hello', 'hi', 'hey'],
    response: "Hello! I am the HealNet AI Assistant. I can help answer general questions about our telemedicine services or triage symptoms. How can I help you today?"
  },
  {
    keywords: ['headache', 'migraine'],
    response: "Common causes include dehydration, stress, or lack of sleep. If symptoms are severe or include vision issues, please consult a doctor."
  },
  {
    keywords: ['fever', 'temperature', 'hot'],
    response: "Fever indicates your body may be fighting an infection. If it lasts more than 3 days or exceeds 103°F (39.4°C), consult a doctor."
  },
  {
    keywords: ['chest pain', 'heart', 'breathing', 'numbness'],
    response: "🚨 EMERGENCY: These symptoms may be life-threatening. Please seek immediate medical help or go to the nearest emergency room."
  },
  {
    keywords: ['book', 'appointment', 'schedule'],
    response: "You can book an appointment via the 'Doctors' section in the app."
  },
  {
    keywords: ['cost', 'insurance', 'price'],
    response: "For pricing and insurance details, please check our services page or contact support."
  }
];

function getLocalResponse(userInput) {
  const input = userInput.toLowerCase();

  for (let item of simulatedKnowledgeBase) {
    for (let keyword of item.keywords) {
      // Use dynamic regex word boundary matching to avoid partial substring bugs
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (regex.test(input)) {
        return item.response;
      }
    }
  }
  return null;
}

async function getGeminiResponse(userInput) {
  // Replace YOUR_API_KEY with your actual Gemini API key, or use import.meta.env.VITE_GEMINI_API_KEY
  const apiKey = import.meta.env?.VITE_GEMINI_API_KEY || "YOUR_API_KEY";

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: userInput
          }]
        }]
      })
    });

    const data = await response.json();

    // Check if the API returned an error (like invalid API key)
    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently having trouble connecting to my intelligence network (Check API Key). Please try again later or consult a doctor directly.";
  }
}

// Kept the function name as sendMessageToChatbot so we don't break the Chatbot.jsx UI
export async function sendMessageToChatbot(userInput) {
  // Simulate minor UI network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const localResponse = getLocalResponse(userInput);

  if (localResponse) {
    return localResponse;
  } else {
    return await getGeminiResponse(userInput);
  }

}
