
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";

interface Message {
    role: 'user' | 'model';
    text: string;
}

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E0C3FC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m1-9l2-2 2 2m-2 4v6m2-6l2 2-2 2M15 3l2 2-2 2m-2-4v4m2 4l2 2-2 2m-8 4h12" />
    </svg>
);

const AsistenteIAPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const newChat = ai.chats.create({
                model: 'gemini-3-flash-preview',
                config: {
                    systemInstruction: `Eres "Vella Beauty AI", el asistente experto oficial de Vellaperfumeria para la temporada 2026. 
                    Eres un especialista de alto nivel en maquillaje de las marcas THE ONE, OnColour y Giordani Gold. 
                    Tu tono es elegante, profesional, empoderador y muy conocedor de las tendencias 2026.
                    
                    Tus tareas principales:
                    1. Recomendar productos de maquillaje (Bases Everlasting Sync, Máscaras Wonder Lash, Labiales OnColour).
                    2. Explicar las descripciones extensas y beneficios técnicos de cada producto.
                    3. Ayudar a los usuarios a elegir tonos basándote en su tipo de piel.
                    4. Mencionar siempre las Ofertas 2026 disponibles en la tienda.
                    
                    Habla como un maquillador profesional de pasarela. Si te preguntan por Skincare, relaciónalo con la preparación de la piel para un maquillaje perfecto con THE ONE.`,
                },
            });
            setChat(newChat);
        } catch (e) {
            console.error("Error AI:", e);
        }
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isProcessing]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isProcessing || !chat) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsProcessing(true);

        try {
            const response = await chat.sendMessage({ message: userMessage.text });
            setMessages(prev => [...prev, { role: 'model', text: response.text || "Lo siento, estoy actualizando mi catálogo 2026." }]);
        } catch (e) {
            setMessages(prev => [...prev, { role: 'model', text: "Error de conexión con el cerebro de belleza. Inténtalo de nuevo." }]);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 flex justify-center">
            <div className="w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-[80vh]">
                <div className="bg-black p-8 flex items-center gap-6">
                    <div className="bg-[#E0C3FC] p-4 rounded-2xl shadow-lg shadow-[#E0C3FC]/20 animate-pop">
                        <SparklesIcon />
                    </div>
                    <div>
                        <h2 className="text-white text-2xl font-black uppercase tracking-tighter">Vella Beauty AI 2026</h2>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-[#E0C3FC] text-[10px] font-bold uppercase tracking-widest">Experto en THE ONE & OnColour</span>
                        </div>
                    </div>
                </div>

                <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-8 space-y-6 bg-gray-50/50">
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                            <SparklesIcon />
                            <p className="text-xl font-black text-gray-400 uppercase tracking-widest">¿Qué look 2026 diseñamos hoy?</p>
                        </div>
                    )}
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-5 rounded-3xl shadow-sm leading-relaxed text-sm ${msg.role === 'user' ? 'bg-black text-white rounded-tr-none' : 'bg-white text-black border border-gray-100 rounded-tl-none'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isProcessing && (
                        <div className="flex justify-start">
                            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                                <span className="flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSendMessage} className="p-8 bg-white border-t border-gray-100">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ej: ¿Qué base de THE ONE me recomiendas para piel grasa?"
                            className="flex-grow bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#E0C3FC] text-sm"
                        />
                        <button 
                            type="submit"
                            disabled={isProcessing}
                            className="bg-black text-white px-10 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-800 transition-colors shadow-lg disabled:opacity-50"
                        >
                            Consultar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AsistenteIAPage;
