
import React from 'react';
import type { View, Product } from './types';
import { allProducts } from './products';
import { ProductCard } from './ProductCard';
import HeroBanner from './HeroCarousel';
import type { Currency } from './currency';
import FeaturesSection from './FeaturesSection';
import InteractiveCatalogSection from './InteractiveCatalogSection';

const MobileStoreSection: React.FC<{ onNavigate: (view: View) => void }> = ({ onNavigate }) => (
    <div className="bg-black py-24 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-20">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                {/* Visual Mobile Phone */}
                <div className="relative w-[320px] h-[640px] bg-gray-900 rounded-[3rem] border-[8px] border-gray-800 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden shrink-0 animate-bounce-subtle">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20"></div>
                    <div className="h-full w-full bg-white overflow-y-auto pt-12 p-4 custom-scrollbar">
                         {/* Mini Store Layout inside Phone */}
                         <div className="flex justify-between items-center mb-6">
                            <span className="font-black text-[10px] uppercase">Vella Store</span>
                            <div className="flex gap-2">
                                <span className="w-4 h-4 bg-black rounded-full"></span>
                                <span className="w-4 h-4 bg-[#f78df6] rounded-full"></span>
                            </div>
                         </div>
                         <div className="h-40 bg-gray-100 rounded-2xl mb-4 overflow-hidden relative">
                             <img src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                 <span className="text-white font-black text-[10px] bg-[#f78df6] px-3 py-1 rounded-full animate-pulse">AR VIEW ACTIVE</span>
                             </div>
                         </div>
                         <div className="grid grid-cols-2 gap-3">
                             {[43242, 42120, 38497, 22424].map(id => {
                                 const p = allProducts.find(prod => prod.id === id);
                                 return (
                                     <div key={id} className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                                         <img src={p?.imageUrl} className="w-full h-12 object-contain mb-1" />
                                         <p className="text-[8px] font-black line-clamp-1">{p?.name}</p>
                                     </div>
                                 )
                             })}
                         </div>
                    </div>
                </div>

                <div className="max-w-2xl">
                    <span className="text-[#f78df6] font-black text-xs uppercase tracking-[0.4em] mb-6 block">Tecnología Beauty 2026</span>
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-none mb-8">
                        Realidad <br/> Aumentada <br/> <span className="text-gray-400">En tu móvil</span>
                    </h2>
                    <p className="text-gray-400 text-xl md:text-2xl leading-relaxed mb-12">
                        Escanea el packaging de tus productos Oriflame para ver tutoriales exclusivos, probar tonos virtualmente y acceder a ofertas secretas del Club Loyalty.
                    </p>
                    <div className="flex flex-wrap gap-6">
                        <button onClick={() => onNavigate('ia')} className="bg-white text-black font-black py-5 px-12 rounded-full uppercase text-[12px] tracking-widest hover:bg-[#f78df6] transition-colors">
                            Abrir Probador AR
                        </button>
                        <button onClick={() => onNavigate('products')} className="bg-transparent border-2 border-white/20 text-white font-black py-5 px-12 rounded-full uppercase text-[12px] tracking-widest hover:bg-white/10 transition-colors">
                            Ver toda la tienda
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
    
    const newestBlock = allProducts.filter(p => p.tag === 'NOVEDAD').slice(0, 4);
    const featuredBlock = allProducts.filter(p => p.tag === 'SET' || p.price > 25).slice(0, 4);

    return (
        <div className="space-y-0 bg-white">
            
            <HeroBanner onNavigate={onNavigate} />

            {/* SECCIÓN: LANZAMIENTOS */}
            <div className="container mx-auto px-4 lg:px-16 py-24">
                <section>
                    <div className="flex flex-col md:flex-row items-center justify-between mb-16 border-b border-black/5 pb-8">
                        <div className="text-center md:text-left">
                            <h3 className="text-4xl font-black text-black tracking-tighter uppercase italic">Tendencias 2026</h3>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px] mt-2">Maquillaje de Estilismo & Color Oriflame</p>
                        </div>
                        <button onClick={() => onNavigate('products', 'all')} className="mt-6 md:mt-0 text-[11px] font-black text-black hover:text-[#f78df6] transition-colors uppercase tracking-[0.3em] border-b-2 border-black hover:border-[#f78df6]">Ver Catálogo Completo</button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {newestBlock.map(product => (
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

            {/* NEW MOBILE AR SECTION */}
            <MobileStoreSection onNavigate={onNavigate} />

            {/* SECCIÓN: FAVORITOS LUXURY */}
            <div className="container mx-auto px-4 lg:px-16 py-24">
                <div className="text-center mb-16">
                    <h3 className="text-5xl font-black text-black tracking-tighter uppercase italic">Selección Exclusive</h3>
                    <div className="w-24 h-1.5 bg-[#f78df6] mx-auto mt-6"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                    {featuredBlock.map(product => (
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
            </div>

            <FeaturesSection />
            
            <div className="container mx-auto px-4 lg:px-16 py-24">
                <InteractiveCatalogSection onNavigate={onNavigate} />
            </div>
        </div>
    );
};

export default ProductList;
