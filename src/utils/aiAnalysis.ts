import {GoogleGenerativeAI} from '@google/generative-ai';
import RNFS from 'react-native-fs';
import config from '../config';
import {Alert, Dimensions} from 'react-native';

const genAI = new GoogleGenerativeAI(config.API_KEY);
const {width: imageWidth, height: imageHeight} = Dimensions.get('window');

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
              text: `Analyze this face for common skin concerns such as acne, dark circles, blackheads, and pores. Identify the severity of each concern as a percentage and provide a skin health score (0-100). 
  
                Additionally, annotate affected areas by returning approximate coordinates (x, y in percentage relative to the image dimensions) for each issue. 
                also give me image height and width 
                - **Dark Circles** must be located **only under the eyes**.
- **Blackheads** are primarily found on the **nose** and **cheeks**.
- **Acne** can appear on the **cheeks, forehead, and chin**.
- **Pores** are more prominent on the **nose and surrounding areas**.

only give coordinates if these are present
provide accurate skin age and health
                The response must be a structured JSON in the following format:
  
                {
                  "skinHealth": <integer>, 
                  "skinAge": <integer>, 
                  "concerns": [
                    {"name": "Pores", "percentage": <integer>},
                    {"name": "Acne", "percentage": <integer>},
                    {"name": "Dark Circles", "percentage": <integer>},
                    {"name": "Dark Spots", "percentage": <integer>}
                  ],
                  "imageHeight" : <integer>,
                   "imageWidth" : <integer>,
                  "annotations": [
                    {
                      "label": "Dark Circles",
                      "coordinates": [{"x": <integer>, "y": <integer>}] // Must be directly below the eyes
                    },
                    {
                      "label": "Blackheads",
                      "coordinates": [{"x": <integer>, "y": <integer>}]  // Primarily on the nose and cheeks
                    },
                    {
                      "label": "Acne",
                      "coordinates": [{"x": <integer>, "y": <integer>}]  // Can appear on cheeks, forehead, or chin
                    }
                  ]
                }
  
                Ensure the coordinates are relative to the image dimensions (in percentage). **Return only the JSON response** without any additional text.`,
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
    console.log('Extracted JSON:', extractedJson);
    return extractedJson;
  } catch (error) {
    console.error('Error analyzing face:', error);
    return null;
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
