const GEMINI_API_KEY = "AIzaSyDvWIEPIH2fHBLypFFf0fsabvHkk3Wx4q0";

async function listGeminiModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  const models = data.models.filter(m => m.supportedGenerationMethods.includes("generateContent")).map(m => m.name);
  console.log("Gemini Models:", models);
}

async function listOpenRouterModels() {
  const res = await fetch("https://openrouter.ai/api/v1/models");
  const data = await res.json();
  const freeVision = data.data.filter(m => m.id.includes("free") && (m.id.includes("vision") || m.id.includes("pixtral") || m.id.includes("gemini")));
  console.log("OpenRouter Free Vision Models:", freeVision.map(m => m.id));
}

async function run() {
  await listGeminiModels();
  await listOpenRouterModels();
}

run();
