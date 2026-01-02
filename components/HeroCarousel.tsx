
import React, { useState, useEffect, useCallback } from 'react';
import type { View } from './types';

interface HeroCarouselProps {
    onNavigate: (view: View) => void;
}

const slides = [
    {
        imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=1600', 
        title: 'Beauty AI Expert 2026',
        subtitle: 'Descubre el maquillaje perfecto analizado por nuestra Inteligencia Artificial. Prueba el probador virtual con tu móvil.',
        buttonText: 'PROBAR ASISTENTE IA',
        view: 'ia' as View,
    },
    {
        imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1600', 
        title: 'Maquillaje de Estilismo',
        subtitle: 'Domina las tendencias de Oriflame 2026. Únete al círculo exclusivo de Vellaperfumeria y ahorra un 15% en cada compra.',
        buttonText: 'VER MAQUILLAJE',
        view: 'products' as View,
    },
    {
        imageUrl: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=1600', 
        title: 'Caja Regalo Oro',
        subtitle: 'El detalle perfecto: Milk & Honey Gold en sets exclusivos. Bolsa de oferta y descuento directo para clientes VIP.',
        buttonText: 'IDEAS DE REGALO',
        view: 'ofertas' as View,
    }
];

const HeroCarousel: React.FC<HeroCarouselProps> = ({ onNavigate }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, []);

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 9000);
        return () => clearInterval(slideInterval);
    }, [nextSlide]);
    
    return (
        <div className="w-full h-[80vh] md:h-[95vh] relative group overflow-hidden bg-white">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                    style={{ backgroundImage: `url(${slide.imageUrl})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/20 to-transparent flex items-center">
                        <div className="container mx-auto px-6 md:px-24">
                            <div className="max-w-4xl">
                                <span className="bg-black text-[#f78df6] px-6 py-2.5 font-black text-[11px] uppercase tracking-[0.5em] mb-10 inline-block shadow-2xl animate-pop">
                                    Vellaperfumeria Store 2026
                                </span>
                                <h2 className="text-7xl md:text-[10.5rem] font-black text-black uppercase tracking-tighter mb-8 leading-[0.85] italic select-none">
                                    {slide.title}
                                </h2>
                                <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-14 uppercase tracking-[0.1em] max-w-2xl leading-tight">
                                    {slide.subtitle}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-8">
                                    <button
                                        onClick={() => onNavigate(slide.view)}
                                        className="bg-black text-white font-black py-7 px-20 rounded-full shadow-[0_40px_80px_rgba(0,0,0,0.4)] hover:bg-[#f78df6] hover:text-black transition-all transform hover:scale-105 active:scale-95 uppercase tracking-[0.3em] text-[13px] border-2 border-black"
                                    >
                                        {slide.buttonText}
                                    </button>
                                    <div className="hidden sm:flex items-center px-12 py-5 border-2 border-black/10 rounded-full bg-white/40 backdrop-blur-2xl shadow-2xl">
                                        <span className="text-black font-black text-[11px] uppercase tracking-[0.4em] flex items-center gap-4">
                                            <span className="w-3 h-3 bg-[#f78df6] rounded-full animate-pulse"></span>
                                            TIENDA ONLINE: -15% DTO. VIP
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            
            <div className="absolute bottom-20 left-24 hidden md:flex gap-8 z-20">
                {slides.map((_, i) => (
                    <button 
                        key={i} 
                        onClick={() => setCurrentIndex(i)} 
                        className={`h-[5px] transition-all duration-700 rounded-full ${i === currentIndex ? 'w-48 bg-black' : 'w-16 bg-black/20 hover:bg-black/40'}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
