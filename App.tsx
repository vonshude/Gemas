
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { Message, Role } from './types';
import { SYSTEM_INSTRUCTION } from './constants';

const App: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        if (!process.env.API_KEY) {
          throw new Error("API_KEY no está configurada. Asegúrate de que la variable de entorno process.env.API_KEY esté disponible.");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const chatSession = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          },
        });
        setChat(chatSession);
        
        // Initial message from the assistant
        setMessages([
          {
            role: Role.Model,
            content: "¡Hola! Soy tu Asesor de Tesis virtual de La Cantuta. Estoy aquí para guiarte en cada paso de tu investigación. ¿En qué etapa de tu tesis te encuentras? ¿O tienes alguna consulta sobre metodología o Normas APA?",
            id: Date.now(),
          },
        ]);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'Ocurrió un error desconocido al inicializar el chat.';
        console.error("Initialization Error:", errorMessage);
        setError(`Error al inicializar: ${errorMessage}`);
      }
    };
    initializeChat();
  }, []);

  const handleSendMessage = useCallback(async (userInput: string) => {
    if (!chat || isLoading || !userInput.trim()) return;

    setIsLoading(true);
    setError(null);
    const userMessage: Message = { role: Role.User, content: userInput, id: Date.now() };
    setMessages(prev => [...prev, userMessage]);

    const modelMessageId = Date.now() + 1;
    // Add a placeholder for the model's response
    setMessages(prev => [...prev, { role: Role.Model, content: "", id: modelMessageId }]);

    try {
      const stream = await chat.sendMessageStream({ message: userInput });

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === modelMessageId ? { ...msg, content: msg.content + chunkText } : msg
          )
        );
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Ocurrió un error al contactar al modelo de IA.';
      console.error("API Error:", errorMessage);
      setError(`Lo siento, ocurrió un error: ${errorMessage}`);
      // Update the placeholder with an error message
      setMessages(prev =>
        prev.map(msg =>
          msg.id === modelMessageId ? { ...msg, content: `Error: No se pudo obtener respuesta. Por favor, intenta de nuevo.` } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [chat, isLoading]);
  
  const handleTopicSelect = (topic: string) => {
    handleSendMessage(topic);
  };


  return (
    <div className="flex flex-col h-screen font-sans bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onTopicSelect={handleTopicSelect} />
        <main className="flex-1 flex flex-col overflow-hidden">
          <ChatWindow messages={messages} isLoading={isLoading} onSendMessage={handleSendMessage} error={error} />
        </main>
      </div>
    </div>
  );
};

export default App;
