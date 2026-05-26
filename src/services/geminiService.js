/**
 * Asynchronously sends a prompt to the backend server to generate text content using Gemini.
 *
 * @param {string} prompt - The text prompt for the Gemini model.
 * @returns {Promise<string>} The generated text payload from the backend.
 * @throws {Error} Throws an error if the request fails or if there is a network issue.
 */
export async function generateGeminiContent(prompt) {
  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    throw new Error('Prompt must be a non-empty string.');
  }

  try {
    // Send POST request to the proxied backend endpoint /api/generate
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    // Implement network and status error handling
    if (!response.ok) {
      let errorMessage = `Server error! Status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.detail) {
          errorMessage = errorData.detail;
        }
      } catch (jsonErr) {
        // Fallback if response is not JSON
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    // Ensure response payload contains the expected 'text' property
    if (!data || typeof data.text !== 'string') {
      throw new Error('Invalid response structure received from server.');
    }

    return data.text;
  } catch (error) {
    console.error('Error in generateGeminiContent:', error);
    
    // Handle standard connection/network errors
    if (error instanceof TypeError && error.message.includes('failed to fetch')) {
      throw new Error('Network error: Unable to connect to the backend server. Please verify the backend is running.');
    }
    
    throw error;
  }
}
