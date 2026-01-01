
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";

interface Message {
    role: 'user' | 'model';
    text: string;
}

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-purple-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m1-9l2-2 2 2m-2 4v6m2-6l2 2-2 2M15 3l2 2-2 2m-2-4v4m2 4l2 2-2 2m-8 4h12" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const AsistenteIAPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [chat, setChat] = useState<Chat | null>(null);

    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const newChat = ai.chats.create({
                model: 'gemini-3-flash-preview',
                config: {
                    systemInstruction: 'Eres el Asistente Experto 2026 de Vellaperfumeria. Tienes conocimiento profundo del nuevo catálogo 2026 y las tendencias de belleza actuales. Tu objetivo es recomendar productos de alta gama basándote en el catálogo actual de Oriflame/Vellaperfumeria. Habla con elegancia y cercanía. Promueve las ofertas de la temporada 2026 y ayuda a resolver dudas sobre skincare, fragancias y maquillaje. Siempre prioriza la satisfacción del cliente y utiliza descripciones extensas y evocadoras para los productos.',
                },
            });
            setChat(newChat);
        } catch (e) {
            console.error("Error initializing Gemini 3:", e);
            setError("No se pudo conectar con el cerebro IA 2026. Reintenta en unos momentos.");
        }
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isProcessing]);

    const handleSendMessage = async (messageText: string) => {
        if (!messageText.trim() || isProcessing || !chat) return;

        const userMessage: Message = { role: 'user', text: messageText };
        setMessages(prev => [...prev, userMessage, { role: 'model', text: '' }]);
        setInput('');
        setIsProcessing(true);
        setError(null);

        try {
            const responseStream = await chat.sendMessageStream({ message: messageText });
            for await (const chunk of responseStream) {
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    lastMessage.text += chunk.text;
                    return newMessages;
                });
            }
        } catch (e) {
            setError("Error de conexión con la IA. Por favor, refresca la página.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-[75vh]">
                <div className="bg-black text-white p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-[#E0C3FC] p-3 rounded-full"><SparklesIcon /></div>
                        <div>
                            <h1 className="font-black uppercase tracking-widest text-lg">Beauty Expert 2026</h1>
                            <p className="text-[10px] text-[#E0C3FC] font-bold uppercase tracking-widest">Powered by Gemini 3 Flash</p>
                        </div>
                    </div>
                </div>

                <div ref={chatContainerRef} className="flex-grow p-8 overflow-y-auto space-y-6 bg-gray-50">
                    {messages.length === 0 && (
                        <div className="text-center py-20">
                            <h2 className="text-2xl font-black text-gray-300 uppercase tracking-tighter">¿Cómo podemos embellecer tu 2026?</h2>
                            <p className="text-gray-400 mt-2">Pregunta por el nuevo catálogo o una rutina personalizada.</p>
                        </div>
                    )}
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed max-w-[80%] ${msg.role === 'user' ? 'bg-black text-white rounded-br-none' : 'bg-white text-black border border-gray-200 rounded-bl-none'}`}>
                                {msg.text || (isProcessing && idx === messages.length -1 ? 'Pensando...' : '')}
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }} className="p-6 border-t bg-white">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Consulta sobre el Catálogo 2026..."
                            className="flex-grow bg-gray-100 border-none rounded-full px-6 py-4 focus:ring-2 focus:ring-[#E0C3FC] text-sm"
                        />
                        <button className="bg-black text-white rounded-full px-8 font-bold hover:bg-gray-800 transition-colors uppercase tracking-widest text-xs">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AsistenteIAPage;
