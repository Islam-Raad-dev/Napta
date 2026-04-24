import { useState } from 'react';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY?.trim();
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY?.trim();


const OPENROUTER_MODELS = [
  "google/gemini-2.5-pro",
  "google/gemini-2.5-flash",
  "google/gemini-2.0-pro-exp-02-05:free",
  "google/gemini-2.0-flash-lite-preview-02-05:free",
  "anthropic/claude-3.7-sonnet",
  "anthropic/claude-3.5-sonnet",
  "openai/gpt-4o",
  "openai/gpt-4o-mini",
  "qwen/qwen-vl-plus:free",
  "x-ai/grok-vision-beta",
  "nvidia/nemotron-nano-12b-v2-vl:free",
  "openrouter/auto"
];

const GEMINI_DIRECT_MODELS = [
  "gemini-2.5-pro",
  "gemini-2.5-flash",
  "gemini-2.0-pro-exp-02-05",
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite-preview-02-05",
  "gemini-1.5-pro-latest",
  "gemini-1.5-flash-latest",
  "gemini-1.5-flash-8b-latest"
];

const PROMPT = `أنت خبير في علم النبات والزراعة. قم بتحليل الصورة المرفقة لنبات بعناية شديدة.

إذا كان النبات مريضاً أو به إصابة، قم بتقديم:
1. اسم النبات (بالعربية).
2. اسمه العلمي (بالإنجليزية).
3. نوع الإصابة أو المرض (تشخيص دقيق).
4. توصيات تفصيلية للعلاج والعناية الفورية.

إذا كان النبات سليماً، قم بتقديم:
1. اسم النبات (بالعربية).
2. اسمه العلمي (بالإنجليزية).
3. الحالة الصحية (سليم).
4. نصائح للعناية العامة للحفاظ على صحته.

يرجى تقديم الإجابة بتنسيق JSON حصراً كالتالي (لا تضف أي نص خارج الـ JSON):
{
  "plant_name": "اسم النبات بالعربية",
  "scientific_name": "Scientific Name in English",
  "status": "سليم",
  "confidence": "95%",
  "diagnosis": "وصف تفصيلي للحالة الصحية للنبات أو التشخيص الدقيق للمرض",
  "care_instructions": "• التعليمة الأولى للعناية أو العلاج.\n• التعليمة الثانية.\n• التعليمة الثالثة.\n• التعليمة الرابعة."
}

ملاحظات مهمة:
- قيمة "status" يجب أن تكون إما "سليم" أو "مصاب" فقط.
- قيمة "confidence" هي نسبة ثقتك في التشخيص كنسبة مئوية مثل "92%".
- قيمة "care_instructions" يجب أن تكون نصاً واحداً مستمراً تبدأ كل نقطة بـ "• ".
- تأكد من أن جميع النصوص باللغة العربية الفصحى ومرتبة جداً.
- لا تضف أي نص أو شرح خارج حدود الـ JSON.`;

const callGeminiDirect = async (modelName, base64Data, mimeType) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
  
  const response = await fetchWithTimeout(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: PROMPT },
          { inline_data: { mime_type: mimeType, data: base64Data } }
        ]
      }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 1024,
        responseMimeType: "application/json",
      }
    })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || `Gemini API Error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text;
};

const callOpenRouter = async (model, base64Image) => {
  const response = await fetchWithTimeout("https://openrouter.ai/api/v1/chat/completions", {
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
            { type: "image_url", image_url: { url: base64Image } },
          ],
        },
      ],
      temperature: 0.1,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `OpenRouter Error: ${response.status}`);
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content;
};

const extractJSON = (text) => {
  try {
    let cleanJson = text;
    if (cleanJson.includes("```")) {
      const match = cleanJson.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
      if (match) cleanJson = match[1];
    }
    
    const start = cleanJson.indexOf('{');
    const end = cleanJson.lastIndexOf('}');
    if (start !== -1 && end !== -1) {
      cleanJson = cleanJson.substring(start, end + 1);
    }

    cleanJson = cleanJson.replace(/(?<=:\s*")([\s\S]*?)(?="[,}])/g, (match) => {
      return match.replace(/\n/g, '\\n').replace(/\r/g, '');
    });

    return JSON.parse(cleanJson);
  } catch (e) {
    console.error("[Nabta AI] فشل استخراج JSON من النص:", text);
    console.error("[Nabta AI] خطأ التحليل:", e.message);
    throw new Error("لم يتمكن النظام من قراءة التشخيص. يرجى المحاولة مرة أخرى.");
  }
};

const compressImage = async (base64Image) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 1024;
      const MAX_HEIGHT = 1024;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.7)); // ضغط الصورة لتقليل الحجم
    };
    img.onerror = () => reject(new Error("فشل تحميل الصورة أثناء الضغط"));
    img.src = base64Image;
  });
};

const fetchWithTimeout = async (url, options, timeout = 25000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
};

export const useGemini = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const analyzeImage = async (base64Image) => {
    setLoading(true);
    setError(null);
    setResult(null);

    if (!base64Image || !base64Image.startsWith('data:image')) {
      setError("صيغة الصورة غير صحيحة. يرجى اختيار صورة من نوع JPG أو PNG.");
      setLoading(false);
      return;
    }

    if (!GEMINI_API_KEY && !OPENROUTER_API_KEY) {
      setError("مفاتيح API غير متوفرة. يرجى التحقق من إعدادات النظام.");
      setLoading(false);
      return;
    }

    let finalImage = base64Image;
    try {
      console.log("[Nabta AI] جاري ضغط الصورة...");
      finalImage = await compressImage(base64Image);
      console.log("[Nabta AI] تم ضغط الصورة بنجاح.");
    } catch (e) {
      console.warn("[Nabta AI] فشل ضغط الصورة، سيتم استخدام الأصلية:", e.message);
    }

    const processResult = (parsedResult, usedModel) => {
      const finalResult = {
        plant_name: parsedResult.plant_name || parsedResult.name || "نبات غير محدد",
        scientific_name: parsedResult.scientific_name || parsedResult.scientific || "Unknown",
        status: parsedResult.status || "غير محدد",
        confidence: parsedResult.confidence || "—",
        diagnosis: parsedResult.diagnosis || parsedResult.description || "لا يوجد تشخيص محدد.",
        care_instructions:
          parsedResult.care_instructions ||
          (Array.isArray(parsedResult.recommendations)
            ? parsedResult.recommendations.map((r) => `• ${r}`).join("\n")
            : parsedResult.recommendations) ||
          parsedResult.treatment ||
          "لا توجد تعليمات محددة.",
        used_model: usedModel || "Unknown",
      };
      setResult(finalResult);
      setLoading(false);
    };

    let lastError = null;

    // 1. تجربة كل نماذج Gemini Direct المتاحة
    if (GEMINI_API_KEY) {
      for (const modelName of GEMINI_DIRECT_MODELS) {
        try {
          console.log(`[Nabta AI] جاري تجربة نموذج جوجل: ${modelName}`);
          
          const parts = finalImage.split(";base64,");
          if (parts.length < 2) continue;
          
          const mimeType = parts[0].split(":")[1] || "image/jpeg";
          const base64Data = parts[1];
          
          const textResponse = await callGeminiDirect(modelName, base64Data, mimeType);
          if (textResponse) {
            console.log(`[Nabta AI] ✅ نجح التحليل باستخدام: ${modelName}`);
            const parsedResult = extractJSON(textResponse);
            processResult(parsedResult, `Google (${modelName})`);
            return;
          }
        } catch (err) {
          console.warn(`[Nabta AI] ⚠️ فشل الموديل ${modelName}:`, err.message);
          lastError = err;
        }
      }
    }

    // 2. إذا فشل جوجل المباشر، ننتقل لـ OpenRouter
    if (OPENROUTER_API_KEY) {
      for (const model of OPENROUTER_MODELS) {
        try {
          console.log(`[Nabta AI] جاري تجربة OpenRouter: ${model}`);
          const textResponse = await callOpenRouter(model, finalImage);
          if (textResponse) {
            console.log(`[Nabta AI] ✅ نجح التحليل عبر OpenRouter: ${model}`);
            const parsedResult = extractJSON(textResponse);
            processResult(parsedResult, `OpenRouter (${model})`);
            return;
          }
        } catch (err) {
          console.warn(`[Nabta AI] ⚠️ فشل OpenRouter ${model}:`, err.message);
          lastError = err;
        }
      }
    }

    console.error("[Nabta AI] فشلت جميع المحاولات:", lastError);
    // إخفاء الأخطاء التقنية عن المستخدم وعرض رسالة ودية
    const userFriendlyError = lastError?.message?.includes("endpoints") || lastError?.message?.includes("key")
      ? "عذراً، الخوادم مشغولة حالياً أو غير متاحة. يرجى المحاولة بعد قليل."
      : "عذراً، تعذّر التحليل. يرجى التأكد من أن الصورة واضحة أو المحاولة لاحقاً.";
    setError(userFriendlyError);
    setLoading(false);
  };

  return { analyzeImage, loading, error, result };
};