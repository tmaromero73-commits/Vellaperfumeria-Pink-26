
import React from 'react';
import type { View, Product } from './types';
import { allProducts } from './products';
import { ProductCard } from './ProductCard';
import HeroBanner from './HeroCarousel';
import type { Currency } from './currency';
import InteractiveCatalogSection from './InteractiveCatalogSection';
import StoriesSection from './StoriesSection';

const MobileStoreSection: React.FC<{ onNavigate: (view: View) => void }> = ({ onNavigate }) => (
    <div className="bg-black py-24 overflow-hidden border-y border-white/5">
        <div className="container mx-auto px-6 lg:px-24">
            <div className="flex flex-col lg:flex-row items-center gap-20">
                
                {/* Visual Mobile Phone AR Frame */}
                <div className="relative w-[340px] h-[680px] bg-gray-900 rounded-[3.5rem] border-[10px] border-gray-800 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden shrink-0 animate-bounce-subtle z-20">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-gray-800 rounded-b-3xl z-30 shadow-inner"></div>
                    <div className="h-full w-full bg-white overflow-y-auto pt-14 p-5 custom-scrollbar">
                         {/* Simulation of App Store UI */}
                         <div className="flex justify-between items-center mb-8">
                            <div className="flex flex-col">
                                <span className="font-black text-[9px] uppercase tracking-widest text-[#f78df6]">Vella 2026</span>
                                <span className="font-black text-[14px] uppercase tracking-tighter">Gold Store</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-black text-[8px]">AR</span>
                            </div>
                         </div>
                         
                         <div className="h-44 bg-gray-100 rounded-[2rem] mb-6 overflow-hidden relative group">
                             <img src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                             <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 text-center">
                                 <span className="text-white font-black text-[9px] bg-[#f78df6] px-4 py-1.5 rounded-full animate-pulse shadow-lg mb-2">SCAN PACKAGING</span>
                                 <p className="text-white font-black text-[11px] leading-tight uppercase tracking-tighter">Ver en 3D & Probador Virtual</p>
                             </div>
                         </div>

                         <div className="space-y-4">
                             <p className="font-black text-[10px] uppercase tracking-widest text-gray-400">Favoritos Oriflame</p>
                             <div className="grid grid-cols-2 gap-4">
                                 {[43242, 42120, 22424, 13659].map(id => {
                                     const p = allProducts.find(prod => prod.id === id);
                                     return (
                                         <div key={id} className="bg-gray-50 p-3 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                                             <img src={p?.imageUrl} className="w-16 h-16 object-contain mb-2" />
                                             <p className="text-[9px] font-black leading-tight h-6 overflow-hidden">{p?.name}</p>
                                             <p className="text-[#f78df6] font-black text-[10px] mt-1">{p?.price}€</p>
                                         </div>
                                     )
                                 })}
                             </div>
                         </div>
                    </div>
                </div>

                <div className="max-w-2xl text-center lg:text-left">
                    <span className="bg-[#f78df6] text-black font-black text-[10px] px-6 py-2 rounded-full uppercase tracking-[0.4em] mb-10 inline-block">Innovación Beauty 2026</span>
                    <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter italic leading-[0.85] mb-10">
                        La Tienda <br/> <span className="text-[#f78df6]">En tu Mano</span> <br/> <span className="text-gray-500 font-medium">con AR</span>
                    </h2>
                    <p className="text-gray-400 text-xl md:text-2xl leading-relaxed mb-14 font-medium">
                        Experimenta el futuro del estilismo. Escanea el envase de tu base <span className="text-white">Giordani Gold</span> o tu crema <span className="text-white">Diamond Cellular</span> para ver cómo actúan en tu piel mediante Realidad Aumentada.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                        <button onClick={() => onNavigate('ia')} className="bg-white text-black font-black py-6 px-14 rounded-full uppercase text-[12px] tracking-[0.3em] hover:bg-[#f78df6] transition-all transform hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.2)]">
                            Probar AR Ahora
                        </button>
                        <button onClick={() => onNavigate('products', 'all')} className="bg-transparent border-2 border-white/20 text-white font-black py-6 px-14 rounded-full uppercase text-[12px] tracking-[0.3em] hover:bg-white/10 transition-all">
                            Ver todo el Catálogo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ProductList: React.FC<{
    onNavigate: (view: View, payload?: any) => void;
    onProductSelect: (product: Product) => void;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    currency: Currency;
    onQuickView: (product: Product) => void;
}> = ({ onNavigate, onProductSelect, onAddToCart, onQuickAddToCart, currency, onQuickView }) => {
    
    const trendingProducts = allProducts.filter(p => p.tag === 'NOVEDAD' || p.tag === 'OFERTA').slice(0, 4);
    const goldSelection = allProducts.filter(p => p.brand === 'Giordani Gold' || p.brand === 'Royal Velvet' || p.tag === 'SET').slice(0, 4);

    return (
        <div className="space-y-0 bg-white">
            
            <HeroBanner onNavigate={onNavigate} />

            {/* Stories Shop Pink Model Section */}
            <StoriesSection onNavigate={onNavigate} />

            {/* SECCIÓN: LANZAMIENTOS & TENDENCIAS */}
            <div className="container mx-auto px-6 lg:px-20 py-24">
                <section>
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-6">
                        <div className="max-w-xl">
                            <span className="text-[#f78df6] font-black uppercase tracking-[0.5em] text-[9px] mb-4 block">Winter 2026 Collection</span>
                            <h3 className="text-5xl md:text-7xl font-black text-black tracking-tighter uppercase italic leading-[0.9]">Hot <span className="text-gray-300">Offers</span></h3>
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-[11px] mt-4">Los más deseados de Oriflame en oferta directa.</p>
                        </div>
                        <button onClick={() => onNavigate('products', 'all')} className="bg-black text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#f78df6] hover:text-black transition-all shadow-xl">Explorar Todo</button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                        {trendingProducts.map(product => (
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

            {/* INTERACTIVE MOBILE AR SECTION */}
            <MobileStoreSection onNavigate={onNavigate} />

            {/* SECCIÓN: SELECCIÓN ORO EXCLUSIVA */}
            <div className="container mx-auto px-6 lg:px-20 py-32">
                <div className="text-center mb-24">
                    <span className="text-gray-400 font-black uppercase tracking-[0.6em] text-[9px] mb-6 block">Elite Beauty Circle</span>
                    <h3 className="text-6xl md:text-8xl font-black text-black tracking-tighter uppercase italic">Selección <span className="text-[#f78df6]">Oro</span></h3>
                    <div className="w-32 h-2 bg-black mx-auto mt-10 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {goldSelection.map(product => (
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
                
                <div className="mt-24 text-center">
                    <button 
                        onClick={() => onNavigate('catalog')}
                        className="bg-gray-100 text-black font-black py-6 px-16 rounded-full hover:bg-black hover:text-white transition-all uppercase tracking-[0.4em] text-[11px] shadow-sm border border-black/5"
                    >
                        Abrir Catálogo Completo 2026
                    </button>
                </div>
            </div>
            
            <div className="container mx-auto px-6 lg:px-20 py-32">
                <InteractiveCatalogSection onNavigate={onNavigate} />
            </div>
        </div>
    );
};

export default ProductList;
