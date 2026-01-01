
import React, { useState, useEffect, useCallback } from 'react';
import type { View } from './types';

interface HeroCarouselProps {
    onNavigate: (view: View) => void;
}

const slides = [
    {
        imageUrl: 'https://media-cdn.oriflame.com/digitalPromotionsMedia/images/banner-media/ES/20899847/20866148.jpg',
        title: 'Mirada Magnética 2026',
        subtitle: 'Descubre la nueva Máscara Wonder Lash Ultra - ¡Oferta Lanzamiento!',
        buttonText: 'COMPRAR AHORA',
        view: 'products' as View,
    },
    {
        imageUrl: 'https://media-cdn.oriflame.com/digitalPromotionsMedia/images/banner-media/ES/20900001/20866153.jpg',
        title: 'Maquillaje The ONE & OnColour',
        subtitle: 'Hasta un 50% de descuento en la colección de invierno',
        buttonText: 'VER OFERTAS',
        view: 'ofertas' as View,
    },
    {
        imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200',
        title: 'Tu Asistente de Belleza IA',
        subtitle: 'Encuentra tu tono perfecto de The ONE con inteligencia artificial',
        buttonText: 'PROBAR IA',
        view: 'ia' as View,
    },
];

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const HeroCarousel: React.FC<HeroCarouselProps> = ({ onNavigate }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, []);

    const prevSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    };

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000);
        return () => clearInterval(slideInterval);
    }, [nextSlide]);
    
    return (
        <div className="w-full h-[60vh] max-h-[600px] relative group overflow-hidden bg-black">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                    style={{ backgroundImage: `url(${slide.imageUrl})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex items-center justify-center">
                        <div className="text-center text-white p-6 max-w-4xl">
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 animate-pop">{slide.title}</h2>
                            <p className="text-lg md:text-2xl font-bold text-[#E0C3FC] mb-8 uppercase tracking-widest">{slide.subtitle}</p>
                            <button
                                onClick={() => onNavigate(slide.view)}
                                className="bg-white text-black font-black py-4 px-12 rounded-full shadow-2xl hover:bg-[#E0C3FC] transition-all transform hover:scale-105 active:scale-95 uppercase tracking-widest text-sm"
                            >
                                {slide.buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 p-2 rounded-full text-white backdrop-blur-sm transition-all"><ChevronLeftIcon /></button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 p-2 rounded-full text-white backdrop-blur-sm transition-all rotate-180"><ChevronLeftIcon /></button>
        </div>
    );
};

export default HeroCarousel;
