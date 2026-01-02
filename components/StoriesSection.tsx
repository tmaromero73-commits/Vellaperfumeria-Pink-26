
import React from 'react';
import type { View } from './types';

interface Story {
    id: number;
    title: string;
    image: string;
    category: string;
    view?: View;
    payload?: any;
}

const stories: Story[] = [
    {
        id: 1,
        title: "The Blonde Look",
        image: "https://images.unsplash.com/photo-1610339674844-38686e744ec4?auto=format&fit=crop&q=80&w=600", // Imagen de modelo rubia similar a la sugerida
        category: "Estilismo",
        view: "ia"
    },
    {
        id: 2,
        title: "Milk & Honey",
        image: "https://images.unsplash.com/photo-1556228852-6d45a7d8a341?auto=format&fit=crop&q=80&w=600",
        category: "Nutrición",
        view: "products",
        payload: "personal-care"
    },
    {
        id: 3,
        title: "Elegancia Oro",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=600",
        category: "Lanzamientos",
        view: "ofertas"
    },
    {
        id: 4,
        title: "Power Makeup",
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600",
        category: "Tendencia",
        view: "products",
        payload: "makeup"
    },
    {
        id: 5,
        title: "Fragancias",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600",
        category: "Exclusive",
        view: "products",
        payload: "perfume"
    }
];

const StoriesSection: React.FC<{ onNavigate: (view: View, payload?: any) => void }> = ({ onNavigate }) => {
    return (
        <section className="py-12 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black uppercase tracking-widest text-black">Vella <span className="text-[#f78df6]">Stories</span> 2026</h3>
                    <div className="h-[1px] flex-grow bg-[#f78df6]/20 mx-6"></div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Desliza para explorar</span>
                </div>
                
                <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide no-scrollbar">
                    {stories.map((story) => (
                        <div 
                            key={story.id} 
                            onClick={() => onNavigate(story.view || 'products', story.payload)}
                            className="flex-shrink-0 group cursor-pointer text-center"
                        >
                            <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#f78df6] to-white group-hover:scale-105 transition-transform duration-300">
                                <div className="bg-white p-1 rounded-full">
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-transparent group-active:border-[#f78df6]">
                                        <img 
                                            src={story.image} 
                                            alt={story.title} 
                                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all"
                                        />
                                    </div>
                                </div>
                                {/* Label Bubble */}
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#f78df6]/90 backdrop-blur-md text-white text-[8px] font-black uppercase px-3 py-1 rounded-full shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                    {story.category}
                                </div>
                            </div>
                            <p className="mt-4 text-[10px] font-black uppercase tracking-tighter text-black">{story.title}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    );
};

export default StoriesSection;
