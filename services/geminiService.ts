
import { GoogleGenAI, Type } from "@google/genai";
import { Release, MarketingContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMarketInsights = async (artistGenre: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Quais são as 3 maiores oportunidades e tendências para artistas independentes de ${artistGenre} no ano de 2026, especificamente focando em mercados emergentes como Angola e Brasil?`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  
  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

export const generateMarketingContent = async (release: Release): Promise<MarketingContent> => {
  const prompt = `
    Você é um especialista em marketing musical de elite da Audios On. 
    Gere conteúdo promocional atraente para o seguinte lançamento de 2026:
    Título: ${release.title}
    Artista: ${release.artist}
    Gênero: ${release.genre}
    
    O conteúdo deve ser futurista e focado em 2026.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          facebook: { type: Type.STRING },
          instagram: { type: Type.STRING },
          youtubeDescription: { type: Type.STRING },
          tiktokCaptions: { type: Type.STRING },
          smartLinkSlogan: { type: Type.STRING },
        },
        required: ["facebook", "instagram", "youtubeDescription", "tiktokCaptions", "smartLinkSlogan"]
      },
    },
  });

  return JSON.parse(response.text || "{}") as MarketingContent;
};
