import { useState } from 'react';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const useGemini = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const analyzeImage = async (base64Image) => {
    if (!GEMINI_API_KEY) {
      setError("خطأ: مفتاح الـ API غير موجود. يرجى إعداده في لوحة تحكم المنصة.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const prompt = `
      أنت خبير في علم النبات والزراعة. قم بتحليل الصورة المرفقة لنبات بعناية.
      إذا كان النبات مريضاً أو به إصابة، قم بتقديم:
      1. اسم النبات (بالعربية والإنجليزية).
      2. نوع الإصابة أو المرض (تشخيص دقيق).
      3. توصيات للعلاج والعناية الفورية.

      إذا كان النبات سليماً، قم بتقديم:
      1. اسم النبات (بالعربية والإنجليزية).
      2. الحالة الصحية (سليم).
      3. نصائح للعناية العامة للحفاظ على صحته.

      يرجى تقديم الإجابة بتنسيق JSON حصراً كالتالي:
      {
        "name": "اسم النبات",
        "scientific_name": "Scientific Name",
        "status": "سليم / مصاب",
        "diagnosis": "التشخيص أو 'لا يوجد'",
        "recommendations": ["توصية 1", "توصية 2", "توصية 3"]
      }
      تأكد من أن النص باللغة العربية الفصحى ومرتب جداً.
    `;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: base64Image.split(",")[1],
                  },
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const textResponse = data.candidates[0].content.parts[0].text;
      // استخراج النص الموجود بين القوسين { } لضمان الحصول على JSON صحيح فقط
      const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : textResponse;
      
      const parsedResult = JSON.parse(jsonString);
      
      setResult(parsedResult);
    } catch (err) {
      console.error("Gemini API Error:", err);
      setError("عذراً، حدث خطأ أثناء تحليل الصورة. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return { analyzeImage, loading, error, result };
};
