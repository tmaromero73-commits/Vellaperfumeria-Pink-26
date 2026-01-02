
import React, { useState, useEffect, useCallback } from 'react';
import type { View } from './types';

interface HeroCarouselProps {
    onNavigate: (view: View) => void;
}

const slides = [
    {
        // Foto de la mujer rubia solicitada (Estilismo & Color 2026)
        imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1200', 
        title: 'Estilismo & Color 2026',
        subtitle: 'Captura tu esencia con nuestra selección exclusiva. Únete y obtén un 15% de descuento fidelidad.',
        buttonText: 'DESCUBRE LA TIENDA',
        view: 'products' as View,
    },
    {
        imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=1200',
        title: 'Oro Líquido: Milk & Honey',
        subtitle: 'Nutrición suprema para tu piel este invierno con extractos naturales.',
        buttonText: 'VER SELECCIÓN',
        view: 'ofertas' as View,
    },
    {
        imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=1200',
        title: 'Fragancias Giordani',
        subtitle: 'La sofisticación italiana capturada en cada gota de nuestras fragancias.',
        buttonText: 'EXPLORAR PERFUMES',
        view: 'products' as View,
    },
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
                    className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                    style={{ backgroundImage: `url(${slide.imageUrl})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/10 to-transparent flex items-center">
                        <div className="container mx-auto px-8 md:px-20">
                            <div className="max-w-3xl">
                                <span className="bg-black text-[#f78df6] px-4 py-1.5 font-black text-[10px] uppercase tracking-[0.4em] mb-6 inline-block animate-pop shadow-lg">igualalavellaperfumeria.com</span>
                                <h2 className="text-6xl md:text-9xl font-black text-black uppercase tracking-tighter mb-4 leading-[0.85] italic drop-shadow-sm">{slide.title}</h2>
                                <p className="text-lg md:text-2xl font-bold text-gray-800 mb-10 uppercase tracking-widest max-w-lg leading-snug">{slide.subtitle}</p>
                                <div className="flex flex-col sm:flex-row gap-5">
                                    <button
                                        onClick={() => onNavigate(slide.view)}
                                        className="bg-black text-white font-black py-5 px-14 rounded-full shadow-2xl hover:bg-[#f78df6] hover:text-black transition-all transform hover:scale-105 active:scale-95 uppercase tracking-widest text-[11px]"
                                    >
                                        {slide.buttonText}
                                    </button>
                                    <div className="flex items-center px-8 py-3 border-2 border-black/10 rounded-full bg-white/50 backdrop-blur-md">
                                        <span className="text-black font-black text-[10px] uppercase tracking-widest">LOYALTY: -15% DTO.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            
            <div className="absolute bottom-12 left-20 hidden md:flex gap-4">
                {slides.map((_, i) => (
                    <button 
                        key={i} 
                        onClick={() => setCurrentIndex(i)} 
                        className={`h-[3px] transition-all rounded-full ${i === currentIndex ? 'w-24 bg-black' : 'w-8 bg-black/20 hover:bg-black/40'}`}
                        aria-label={`Ir a diapositiva ${i + 1}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
