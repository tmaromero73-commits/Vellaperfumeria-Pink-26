
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
    
    const makeupOffers = allProducts.filter(p => p.category === 'makeup' && p.tag === 'OFERTA');
    const news2026 = allProducts.filter(p => p.tag === 'NOVEDAD');

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Promo Hero */}
            <div className="bg-black text-white py-20 px-4 text-center">
                <div className="container mx-auto">
                    <span className="text-[#f78df6] font-black uppercase tracking-[0.3em] text-sm mb-4 block">Especial Maquillaje 2026</span>
                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6">Ofertas Irresistibles</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl">Consigue los iconos de THE ONE y OnColour con descuentos de hasta el 50% solo este mes.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10">
                {/* Featured Offer Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 border border-gray-100 mb-20">
                    <div className="w-full md:w-1/2">
                        <img src="https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F42120%2F42120_1.png" className="w-full h-auto max-h-[400px] object-contain drop-shadow-2xl animate-bounce-subtle" />
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                        <span className="bg-red-500 text-white font-black py-1 px-4 rounded text-xs uppercase">Oferta Estrella</span>
                        <h2 className="text-4xl font-black text-black uppercase tracking-tight">THE ONE Wonder Lash Ultra</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            La máscara 5 en 1 que define el 2026. Alarga, voluminiza y cuida tus pestañas por un precio nunca visto.
                        </p>
                        <div className="flex items-center gap-4">
                            <span className="text-5xl font-black text-red-600">8,99€</span>
                            <span className="text-2xl text-gray-300 line-through">16,00€</span>
                        </div>
                        <button 
                            onClick={() => onProductSelect(allProducts.find(p => p.id === 42120)!)}
                            className="bg-black text-white font-black py-4 px-10 rounded-full hover:bg-gray-800 transition-all uppercase tracking-widest text-sm shadow-xl"
                        >
                            Lo quiero ahora
                        </button>
                    </div>
                </div>

                {/* Section: Makeup Deals */}
                <section className="mb-20">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-3xl font-black text-black uppercase tracking-tighter">Maquillaje en Oferta</h3>
                        <div className="h-[2px] bg-black flex-grow mx-8"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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

                {/* Section: 2026 Arrivals */}
                <section>
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-3xl font-black text-black uppercase tracking-tighter">Novedades 2026</h3>
                        <div className="h-[2px] bg-black flex-grow mx-8"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {news2026.map(product => (
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
