
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
                    systemInstruction: `Eres "Vella Beauty AI 2026", el asistente experto exclusivo de Vellaperfumeria. 
                    Solo recomiendas productos de Oriflame. Tienes prohibido mencionar otras marcas externas.
                    
                    Tus especialidades para este 2026 son:
                    1. IDEAS PARA REGALAR: Eres un experto en la línea Milk & Honey Gold (nutrición profunda) y la fragancia Magnolia Enchante (elegancia floral).
                    2. MAQUILLAJE PROFESIONAL: Conoces a fondo Giordani Gold (lujo antiedad), THE ONE (tecnología y larga duración) y OnColour (color vibrante accesible).
                    3. RITUALES DE BELLEZA: Sabes cómo combinar el Exfoliante de Miel con la Crema Corporal para un regalo inolvidable.
                    
                    Tu tono es sofisticado, experto, cálido y enfocado en el lujo accesible de Oriflame. Siempre que el usuario busque un regalo, sugiere Milk & Honey. Si busca maquillaje impecable, sugiere THE ONE o Giordani Gold.
                    
                    Utiliza descripciones extensas y seductoras. Habla de los ingredientes como "Extractos biológicos", "Pigmentos minerales" y "Serum Prebiótico".`,
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
            setMessages(prev => [...prev, { role: 'model', text: response.text || "Disculpa, estoy consultando el catálogo 2026 de Oriflame." }]);
        } catch (e) {
            setMessages(prev => [...prev, { role: 'model', text: "Lo siento, la conexión con mi base de datos de Oriflame ha fallado. Por favor, reintenta." }]);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 flex justify-center">
            <div className="w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-[80vh]">
                <div className="bg-black p-10 flex items-center gap-8">
                    <div className="bg-[#E0C3FC] p-4 rounded-2xl shadow-lg shadow-[#E0C3FC]/20">
                        <SparklesIcon />
                    </div>
                    <div>
                        <h2 className="text-white text-3xl font-black uppercase tracking-tighter italic">Vella Beauty AI 2026</h2>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-[#E0C3FC] text-[10px] font-bold uppercase tracking-widest">Experto en Oriflame: Milk & Honey, Magnolia & Makeup</span>
                        </div>
                    </div>
                </div>

                <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-10 space-y-8 bg-gray-50/50">
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30">
                            <img src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" className="h-24 w-auto grayscale" alt="Logo" />
                            <p className="text-2xl font-black text-gray-500 uppercase tracking-widest">¿Buscas el regalo perfecto o maquillaje 2026?</p>
                        </div>
                    )}
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-6 rounded-3xl shadow-sm leading-relaxed text-sm ${msg.role === 'user' ? 'bg-black text-white rounded-tr-none' : 'bg-white text-black border border-gray-100 rounded-tl-none'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isProcessing && (
                        <div className="flex justify-start">
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                <span className="flex gap-2">
                                    <span className="w-2 h-2 bg-[#E0C3FC] rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-[#E0C3FC] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                    <span className="w-2 h-2 bg-[#E0C3FC] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSendMessage} className="p-10 bg-white border-t border-gray-100">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ej: ¿Qué me recomiendas para regalar de Milk & Honey?"
                            className="flex-grow bg-gray-100 border-none rounded-2xl px-8 py-5 focus:ring-2 focus:ring-[#E0C3FC] text-sm font-medium"
                        />
                        <button 
                            type="submit"
                            disabled={isProcessing}
                            className="bg-black text-white px-12 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-gray-800 transition-all shadow-lg disabled:opacity-50"
                        >
                            Preguntar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AsistenteIAPage;
