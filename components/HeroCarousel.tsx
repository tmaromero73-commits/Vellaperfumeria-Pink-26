
import React, { useState, useEffect, useCallback } from 'react';
import type { View } from './types';

interface HeroCarouselProps {
    onNavigate: (view: View) => void;
}

const slides = [
    {
        // Imagen solicitada: Mujer rubia con sombras de ventana (Estilismo & Color)
        imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1600', 
        title: 'Estilismo & Color 2026',
        subtitle: 'Captura la esencia de la belleza pura con Oriflame. Únete a nuestro círculo exclusivo y ahorra un 15% hoy.',
        buttonText: 'VER COLECCIÓN',
        view: 'products' as View,
    },
    {
        imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=1600',
        title: 'Oriflame Experience',
        subtitle: 'Tecnología sueca para el cuidado de tu piel. Maquillaje profesional y fragancias que cuentan historias.',
        buttonText: 'EXPLORAR TIENDA',
        view: 'products' as View,
    }
];

const HeroCarousel: React.FC<HeroCarouselProps> = ({ onNavigate }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, []);

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 7000);
        return () => clearInterval(slideInterval);
    }, [nextSlide]);
    
    return (
        <div className="w-full h-[70vh] md:h-[85vh] relative group overflow-hidden bg-white">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                    style={{ backgroundImage: `url(${slide.imageUrl})` }}
                >
                    {/* Overlay Suave */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/10 to-transparent flex items-center">
                        <div className="container mx-auto px-6 md:px-16">
                            <div className="max-w-4xl">
                                <span className="bg-black text-[#f78df6] px-5 py-2 font-black text-[10px] uppercase tracking-[0.5em] mb-6 inline-block shadow-2xl animate-pop">
                                    VELLAPERFUMERIA PREMIUM
                                </span>
                                <h2 className="text-6xl md:text-[9rem] font-black text-black uppercase tracking-tighter mb-4 leading-[0.8] italic select-none">
                                    {slide.title}
                                </h2>
                                <p className="text-lg md:text-3xl font-bold text-gray-800 mb-10 uppercase tracking-[0.15em] max-w-2xl leading-tight">
                                    {slide.subtitle}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-5">
                                    <button
                                        onClick={() => onNavigate(slide.view)}
                                        className="bg-black text-white font-black py-5 px-14 rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:bg-[#f78df6] hover:text-black transition-all transform hover:scale-105 active:scale-95 uppercase tracking-[0.2em] text-[12px] border-2 border-black"
                                    >
                                        {slide.buttonText}
                                    </button>
                                    <div className="hidden sm:flex items-center px-8 py-4 border-2 border-black/5 rounded-full bg-white/40 backdrop-blur-xl shadow-lg">
                                        <span className="text-black font-black text-[10px] uppercase tracking-[0.35em] flex items-center gap-3">
                                            <span className="w-2.5 h-2.5 bg-[#f78df6] rounded-full animate-pulse"></span>
                                            OFERTA CLIENTE: -15% DTO.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            
            <div className="absolute bottom-12 left-16 hidden md:flex gap-4 z-20">
                {slides.map((_, i) => (
                    <button 
                        key={i} 
                        onClick={() => setCurrentIndex(i)} 
                        className={`h-[4px] transition-all duration-700 rounded-full ${i === currentIndex ? 'w-32 bg-black' : 'w-10 bg-black/20 hover:bg-black/40'}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
