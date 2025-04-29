import {GoogleGenerativeAI} from '@google/generative-ai';
import RNFS from 'react-native-fs';
import config from '../config';
import {Alert, Dimensions} from 'react-native';

const genAI = new GoogleGenerativeAI(config.API_KEY);
const {width: imageWidth, height: imageHeight} = Dimensions.get('window');

function filterConcerns(data) {
  const present = new Set(
    data.annotations.filter(a => a.present).map(a => a.label),
  );
  return {
    ...data,
    concerns: data.concerns.filter(concern => present.has(concern.name)),
  };
}

export const analyzeFace = async (photoUri, faces) => {
  try {
    // Convert image to base64
    const base64Image = await convertImageToBase64(photoUri);
    if (!base64Image) {
      throw new Error('Failed to convert image to base64');
    }
    console.log('base64', base64Image);

    // Load Gemini AI model
    const model = genAI.getGenerativeModel({model: 'gemini-1.5-pro-latest'});

    // Send request to Gemini AI
    const response = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `You are analyzing a facial image for skin concerns. Your goal is to identify and return data in JSON format only.
    
    Analyze the image for these skin concerns:
    - Acne
    - Dark Circles
    - Blackheads
    - Pores
    - Dark Spots
    
    For each concern, provide:
    - Name (e.g., "Acne")
    - Severity as a percentage (0-100)
    - Severity level as one of: "Mild", "Moderate", or "Severe"
    - Description: Provide a longer, natural-sounding explanation (2–3 sentences) that includes only the reasons why the issue is present in the scanned face. Focus on contributing factors such as excess oil production, clogged pores, buildup of dead skin cells, environmental pollution, stress, genetics, lifestyle habits, or irregular cleansing routines. Do not include a generic definition or explanation of what the concern is.
    - Advice: Provide actionable advice with recommendations for skincare routines, and if applicable, suggest one or more products from the following Sophie Cosmetics products:
      - Sophie Cosmetics London - Anti-Aging Cream (Anti-Aging)
      - Sophie Cosmetics London - Face Cleanser
      - Sophie Cosmetics London - Hair Care Oil 
      - Sophie Cosmetics London - Moisturizer Hydrating Cream 
      - Sophie Cosmetics London - Two Phase Make-Up Remover
    Include the product name and URL (if applicable) in your advice when relevant. The advice should be approximately 2 sentences long.
    
    Additionally, report presence detection only for each issue. For this, return an "annotations" array. For each concern in "annotations", provide:
    - Label: Name of the concern
    - Present: true if the issue is detected, false otherwise
    
    Do not include any coordinates or location data.
    
    Return strictly valid JSON in this format:
    
    {
      "skinHealth": <integer>,
      "skinAge": <integer>,
      "concerns": [
        {
          "name": "Pores",
          "percentage": <integer>,
          "severityLevel": "Mild" | "Moderate" | "Severe",
          "description": "<string>",
          "advice": "<string>"
        },
        {
          "name": "Acne",
          "percentage": <integer>,
          "severityLevel": "Mild" | "Moderate" | "Severe",
          "description": "<string>",
          "advice": "<string>"
        },
        {
          "name": "Dark Circles",
          "percentage": <integer>,
          "severityLevel": "Mild" | "Moderate" | "Severe",
          "description": "<string>",
          "advice": "<string>"
        },
        {
          "name": "Dark Spots",
          "percentage": <integer>,
          "severityLevel": "Mild" | "Moderate" | "Severe",
          "description": "<string>",
          "advice": "<string>"
        },
        {
          "name": "Blackheads",
          "percentage": <integer>,
          "severityLevel": "Mild" | "Moderate" | "Severe",
          "description": "<string>",
          "advice": "<string>"
        }
      ],
      "annotations": [
        { "label": "Dark Circles", "present": true | false },
        { "label": "Blackheads", "present": true | false },
        { "label": "Acne", "present": true | false },
        { "label": "Pores", "present": true | false },
        { "label": "Dark Spots", "present": true | false }
      ]
    }
    
    Respond with only the JSON object. No explanations, no additional text. Ensure the JSON is strictly valid.`,
            },
            {inlineData: {mimeType: 'image/jpeg', data: base64Image}},
          ],
        },
      ],
    });
    console.log('response ai', response);

    // Extract AI response
    const textResponse =
      response.response?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textResponse) {
      throw new Error('Invalid response from Gemini AI');
    }
    console.log('text res ai', textResponse);

    // Extract JSON from the AI response
    const extractedJson = extractJsonFromText(textResponse);
    const filteredJson = filterConcerns(extractedJson);

    console.log('Extracted JSON:', filteredJson);
    return filteredJson;
  } catch (error) {
    console.error('Error analyzing face:', error);
    return null;
  }
};

export const detectFacePresence = async photoUri => {
  try {
    const base64Image = await RNFS.readFile(photoUri, 'base64');

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-pro-latest',
    });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Does this image contain at least one clearly visible human face? Respond with only "true" or "false". Do not include any other text.`,
            },
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: base64Image,
              },
            },
          ],
        },
      ],
    });

    const answer =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    return answer?.toLowerCase() === 'true';
  } catch (error) {
    console.error('Error detecting face presence:', error);
    return false;
  }
};

export const checkIfFaceOrNot = async photoUri => {
  try {
    const base64Image = await convertImageToBase64(photoUri);
    if (!base64Image) {
      throw new Error('Failed to convert image to base64');
    }
    const model = genAI.getGenerativeModel({model: 'gemini-1.5-pro'});

    const result = await model.generateContent([
      {text: "Does this image contain a face? Reply only 'yes' or 'no'."},
      {inlineData: {mimeType: 'image/jpeg', data: base64Image}},
    ]);

    const responseText = result?.response?.text()?.toLowerCase() || '';
    console.log('resp', responseText);

    return responseText;
  } catch (error) {
    console.error('Gemini API error:', error);
    Alert.alert('Error', 'Could not analyze face');
  }
};

const convertImageToBase64 = async imageUri => {
  try {
    return await RNFS.readFile(imageUri, 'base64');
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return null;
  }
};

export const extractJsonFromText = textResponse => {
  try {
    // Use regex to extract JSON inside code block
    const jsonMatch = textResponse.match(/```json\s*([\s\S]*?)\s*```/);

    if (jsonMatch && jsonMatch[1]) {
      const jsonString = jsonMatch[1].trim();
      return JSON.parse(jsonString); // ✅ Convert extracted JSON string to object
    } else {
      console.warn('No valid JSON found in AI response.');
      return null;
    }
  } catch (error) {
    console.error('Error parsing JSON from AI response:', error);
    return null;
  }
};
