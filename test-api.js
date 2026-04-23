const GEMINI_API_KEY = "AIzaSyDvWIEPIH2fHBLypFFf0fsabvHkk3Wx4q0";
const OPENROUTER_API_KEY = "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";

// Dummy 1x1 transparent pixel base64
const base64Data = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
const mimeType = "image/png";
const finalImage = "data:image/png;base64," + base64Data;
const PROMPT = "Hello";

async function testGemini() {
  const modelName = "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
  
  console.log("Testing Gemini...");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: PROMPT },
          { inline_data: { mime_type: mimeType, data: base64Data } }
        ]
      }]
    })
  });
  const text = await res.text();
  console.log("Gemini Status:", res.status);
  console.log("Gemini Response:", text.substring(0, 500));
}

async function testOpenRouter(model) {
  console.log("Testing OpenRouter Model:", model);
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://napta.app",
      "X-Title": "Nabta AI",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: PROMPT },
            { type: "image_url", image_url: { url: finalImage } },
          ],
        },
      ]
    })
  });
  const text = await res.text();
  console.log(`OpenRouter (${model}) Status:`, res.status);
  console.log(`OpenRouter (${model}) Response:`, text.substring(0, 500));
}

async function run() {
  await testGemini();
  await testOpenRouter("meta-llama/llama-3.2-11b-vision-instruct:free");
}

run();
