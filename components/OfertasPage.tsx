
import React from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from './types';
import type { Currency } from './currency';
import { allProducts } from './products';

const OfertasPage: React.FC<{
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
}> = ({ currency, onAddToCart, onQuickAddToCart, onProductSelect, onQuickView }) => {
    
    // Filtrar por marcas y categorías solicitadas
    const giftIdeas = allProducts.filter(p => 
        p.brand.includes('Milk & Honey') || p.name.includes('Magnolia') || p.tag === 'SET'
    );
    const makeupOffers = allProducts.filter(p => 
        (p.category === 'makeup' || p.brand.includes('Giordani') || p.brand.includes('THE ONE')) && p.tag === 'OFERTA'
    );

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Promo Hero Oriflame 2026 */}
            <div className="bg-black text-white py-24 px-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
                <div className="container mx-auto relative z-10">
                    <span className="text-[#E0C3FC] font-black uppercase tracking-[0.4em] text-xs mb-4 block">Exclusividad Oriflame 2026</span>
                    <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-8 italic">Ofertas Oro</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-2xl font-medium">Las mejores ideas para regalar y las últimas tendencias en maquillaje profesional con descuentos históricos.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-16">
                
                {/* Section: Ideas para Regalar (Milk & Honey & Magnolia) */}
                <section className="mb-24">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
                        <div className="max-w-xl">
                            <h2 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter mb-2">Ideas para Regalar</h2>
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">El lujo de Milk & Honey Gold y la frescura de Magnolia</p>
                        </div>
                        <div className="h-[2px] bg-black flex-grow mx-8 hidden lg:block mb-4"></div>
                        <span className="bg-[#E0C3FC] text-black px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest">Edición Regalo</span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {giftIdeas.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                currency={currency}
                                onAddToCart={onAddToCart}
                                onQuickAddToCart={onQuickAddToCart}
                                onProductSelect={onProductSelect}
                                onQuickView={onQuickView}
                            />
                        ))}
                    </div>
                </section>

                {/* Banner Intermedio - Oriflame Makeup Focus */}
                <div className="bg-gray-100 rounded-[40px] p-8 md:p-16 mb-24 flex flex-col md:flex-row items-center justify-between border border-gray-200">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <span className="text-gray-400 font-black uppercase tracking-widest text-xs mb-4 block">Makeup Experience</span>
                        <h3 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter leading-none mb-6">Maquillaje <br/> <span className="text-[#f78df6]">THE ONE 2026</span></h3>
                        <p className="text-gray-600 text-lg mb-8 max-w-sm">Tecnología de adaptación inteligente y pigmentos de alta definición para un acabado profesional.</p>
                        <button 
                            onClick={() => window.scrollTo({ top: document.getElementById('makeup-section')?.offsetTop, behavior: 'smooth' })}
                            className="bg-black text-white font-black py-4 px-10 rounded-full hover:scale-105 transition-transform uppercase tracking-widest text-[10px]"
                        >
                            Ver Maquillaje
                        </button>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <img src="https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F42120%2F42120_1.png" className="h-64 md:h-96 w-auto drop-shadow-2xl animate-bounce-subtle" alt="Maquillaje Oriflame" />
                    </div>
                </div>

                {/* Section: Makeup Offers 2026 */}
                <section id="makeup-section">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
                        <div className="max-w-xl">
                            <h2 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter mb-2">Maquillaje Profesional</h2>
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Giordani Gold, THE ONE y OnColour</p>
                        </div>
                        <div className="h-[2px] bg-black flex-grow mx-8 hidden lg:block mb-4"></div>
                        <span className="bg-red-500 text-white px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest">Ofertas 2026</span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {makeupOffers.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                currency={currency}
                                onAddToCart={onAddToCart}
                                onQuickAddToCart={onQuickAddToCart}
                                onProductSelect={onProductSelect}
                                onQuickView={onQuickView}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default OfertasPage;
