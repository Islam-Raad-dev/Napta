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

const PROMPT = `أنت خبير متميز وعالم نبات زراعي دقيق للغاية. قد يتم تزويدك بصورة واحدة أو عدة صور (حتى 4 صور) لنفس النبات من زوايا ومسافات مختلفة (لقطات عامة، أوراق مقربة، سيقان، ثمار، أو جذور). 

مهمتك هي تحليل كافة الصور المرفقة بدقة فائقة ومجهرية، وتقديم فحص طبي زراعي متكامل خالٍ من الأخطاء:

1. إذا كانت الصور لا تحتوي على نبات على الإطلاق (مثلاً: صورة شخص، حيوان، سيارة، جماد، إلخ)، يجب أن يكون الرد كالتالي:
   - "status": "ليس نبات".
   - "plant_name": "غير معروف".
   - "scientific_name": "N/A".
   - "diagnosis": "هذه الصور لا تبدو كصور لنبات. يرجى التقاط صورة واضحة لنبات ليتمكن النظام من تحليله بشكل دقيق.".
   - "care_instructions": "".

2. إذا كان النبات مريضاً أو به إصابة، قم بتقديم:
   - اسم النبات (بالعربية الفصحى).
   - اسمه العلمي (بالإنجليزية).
   - نوع الإصابة أو المرض (تشخيص دقيق للغاية يحدد المسبب سواء كان فطرياً، بكتيرياً، حشرياً، أو بيئياً كنقص المغذيات أو الإجهاد المائي).
   - تشخيص مجهري شامل: اشرح بالتفصيل الممل كافة العلامات والأعراض التي تظهر في جميع الصور المرفقة (مثل شكل البقع على الأوراق، تلون العروق، شحوب اللون، نخر الأنسجة، وجود خيوط العنكبوت أو بيوض الحشرات، أو تلف السيقان).
   - توصيات تفصيلية وعملية للعلاج والعناية الفورية مقسمة في نقاط واضحة.

3. إذا كان النبات سليماً، قم بتقديم:
   - اسم النبات (بالعربية الفصحى).
   - اسمه العلمي (بالإنجليزية).
   - الحالة الصحية (سليم).
   - شرح تفصيلي يؤكد سلامة النبات بناءً على فحص الصور (سلامة تمثيل ضوئي، تماثل النمو، خلو الأوراق من البقع أو الطفيليات).
   - نصائح مخصصة للعناية العامة والوقاية للحفاظ على صحته وازدهاره.

4. إذا كانت الصور المرفوعة تحتوي على نباتات مختلفة أو غير متطابقة (مثلاً: صورة لنبات طماطم وصورة أخرى لشجرة ليمون أو نخلة في نفس الطلب)، يجب أن يكون الرد كالتالي:
   - "status": "نباتات مختلفة".
   - "plant_name": "غير متطابق".
   - "scientific_name": "N/A".
   - "diagnosis": "تظهر الصور المرفوعة نباتات مختلفة أو غير متطابقة. يرجى رفع صور لنفس النبات فقط من زوايا أو أجزاء مختلفة ليتمكن النظام من تقديم تحليل دقيق ومتناسق.".
   - "care_instructions": "".

يرجى تقديم الإجابة بتنسيق JSON حصراً كالتالي (لا تضف أي نص خارج الـ JSON):
{
  "plant_name": "اسم النبات بالعربية",
  "scientific_name": "Scientific Name in English",
  "status": "سليم",
  "confidence": "95%",
  "diagnosis": "وصف مجهري تحليلي تفصيلي للغاية للحالة الصحية للنبات وملاحظة كل صورة مرفقة بالتفصيل لمقارنة التفاصيل المجهرية والأعراض بدقة تامة وبدون أخطاء",
  "care_instructions": "• التعليمة الأولى للعناية أو العلاج بدقة.\n• التعليمة الثانية.\n• التعليمة الثالثة.\n• التعليمة الرابعة."
}

ملاحظات مهمة:
- ادرس كافة الصور المرفوعة وقارن بينها للوصول للتشخيص المثالي.
- قيمة "status" يجب أن تكون إما "سليم" أو "مصاب" أو "ليس نبات" أو "نباتات مختلفة" فقط.
- قيمة "confidence" هي نسبة ثقتك في التشخيص كنسبة مئوية مثل "97%".
- قيمة "care_instructions" يجب أن تكون نصاً واحداً مستمراً تبدأ كل نقطة بـ "• ".
- تأكد من أن جميع النصوص باللغة العربية الفصحى الراقية والمنظمة جداً.
- لا تضف أي نص أو شرح خارج حدود الـ JSON على الإطلاق لتجنب أخطاء التحليل.`;

const callGeminiDirect = async (modelName, imageParts) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
  
  const parts = [
    { text: PROMPT },
    ...imageParts.map(img => ({
      inline_data: { mime_type: img.mimeType, data: img.base64Data }
    }))
  ];

  const response = await fetchWithTimeout(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: {
        temperature: 0.15,
        maxOutputTokens: 2048,
        responseMimeType: "application/json",
      }
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Gemini API Error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text;
};

const callOpenRouter = async (model, base64Images) => {
  const contentParts = [
    { type: "text", text: PROMPT }
  ];

  base64Images.forEach(img => {
    contentParts.push({ type: "image_url", image_url: { url: img } });
  });

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
          content: contentParts,
        },
      ],
      temperature: 0.15,
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
      resolve(canvas.toDataURL('image/jpeg', 0.7));
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

  const analyzeImage = async (images) => {
    setLoading(true);
    setError(null);
    setResult(null);

    const imagesArray = Array.isArray(images) ? images : [images];
    const validImages = imagesArray.filter(img => img && img.startsWith('data:image'));

    if (validImages.length === 0) {
      setError("يرجى اختيار صورة واحدة على الأقل صالحة من نوع JPG أو PNG للبدء بالتحليل.");
      setLoading(false);
      return;
    }

    if (validImages.length > 4) {
      setError("يمكنك رفع بحد أقصى 4 صور فقط للتحليل.");
      setLoading(false);
      return;
    }

    if (!GEMINI_API_KEY && !OPENROUTER_API_KEY) {
      setError("مفاتيح API غير متوفرة. يرجى التحقق من إعدادات النظام.");
      setLoading(false);
      return;
    }

    let compressedImages = [];
    try {
      console.log(`[Nabta AI] جاري ضغط عدد ${validImages.length} صور...`);
      compressedImages = await Promise.all(
        validImages.map(img => 
          compressImage(img).catch(err => {
            console.warn("[Nabta AI] فشل ضغط الصورة، سيتم استخدام الأصلية:", err.message);
            return img;
          })
        )
      );
      console.log("[Nabta AI] تم ضغط الصور بنجاح.");
    } catch (e) {
      console.warn("[Nabta AI] فشل عملية ضغط الصور بالتوازي:", e.message);
      compressedImages = validImages;
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

    if (GEMINI_API_KEY) {
      for (const modelName of GEMINI_DIRECT_MODELS) {
        try {
          console.log(`[Nabta AI] جاري تجربة نموذج جوجل: ${modelName}`);
          
          const imageParts = [];
          for (const img of compressedImages) {
            const parts = img.split(";base64,");
            if (parts.length < 2) continue;
            const mimeType = parts[0].split(":")[1] || "image/jpeg";
            const base64Data = parts[1];
            imageParts.push({ mimeType, base64Data });
          }

          if (imageParts.length === 0) continue;
          
          const textResponse = await callGeminiDirect(modelName, imageParts);
          if (textResponse) {
            console.log(`[Nabta AI] نجح التحليل باستخدام: ${modelName}`);
            const parsedResult = extractJSON(textResponse);
            processResult(parsedResult, `Google (${modelName})`);
            return;
          }
        } catch (err) {
          console.warn(`[Nabta AI] فشل الموديل ${modelName}:`, err.message);
          lastError = err;
        }
      }
    }

    if (OPENROUTER_API_KEY) {
      for (const model of OPENROUTER_MODELS) {
        try {
          console.log(`[Nabta AI] جاري تجربة OpenRouter: ${model}`);
          const textResponse = await callOpenRouter(model, compressedImages);
          if (textResponse) {
            console.log(`[Nabta AI] نجح التحليل عبر OpenRouter: ${model}`);
            const parsedResult = extractJSON(textResponse);
            processResult(parsedResult, `OpenRouter (${model})`);
            return;
          }
        } catch (err) {
          console.warn(`[Nabta AI] فشل OpenRouter ${model}:`, err.message);
          lastError = err;
        }
      }
    }

    console.error("[Nabta AI] فشلت جميع المحاولات:", lastError);
    
    const userFriendlyError = lastError?.message?.includes("endpoints") || lastError?.message?.includes("key")
      ? "عذراً، الخوادم مشغولة حالياً أو غير متاحة. يرجى المحاولة بعد قليل."
      : "عذراً، تعذّر التحليل. يرجى التأكد من أن الصورة واضحة أو المحاولة لاحقاً.";
    setError(userFriendlyError);
    setLoading(false);
  };

  return { analyzeImage, loading, error, result };
};