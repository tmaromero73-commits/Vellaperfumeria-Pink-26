
import React from 'react';
import type { View, Product } from './types';
import { allProducts } from './products';
import { ProductCard } from './ProductCard';
import HeroBanner from './HeroCarousel';
import type { Currency } from './currency';
import FeaturesSection from './FeaturesSection';
import InteractiveCatalogSection from './InteractiveCatalogSection';

const ProductList: React.FC<{
    onNavigate: (view: View, payload?: any) => void;
    onProductSelect: (product: Product) => void;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    currency: Currency;
    onQuickView: (product: Product) => void;
}> = ({ onNavigate, onProductSelect, onAddToCart, onQuickAddToCart, currency, onQuickView }) => {
    
    const allProductsBlock = allProducts.slice(0, 8);
    const newestBlock = allProducts.filter(p => p.tag === 'NOVEDAD').slice(0, 4);
    
    const categoriesBlock = [
        { id: 'perfume', label: 'Fragancias Oriflame', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800' },
        { id: 'skincare', label: 'Cuidado Facial', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800' },
        { id: 'makeup', label: 'Maquillaje THE ONE', img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800' },
        { id: 'wellness', label: 'Wellness & Salud', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800' },
    ];

    return (
        <div className="space-y-20 bg-white">
            
            <HeroBanner onNavigate={onNavigate} />

            {/* SECCIÓN: LANZAMIENTOS */}
            <div className="container mx-auto px-4 lg:px-16">
                <section>
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12 border-b border-black/5 pb-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-3xl font-black text-black tracking-tighter uppercase italic">Lanzamientos 2026</h3>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">Novedades exclusivas Oriflame</p>
                        </div>
                        <button onClick={() => onNavigate('products', 'all')} className="mt-4 md:mt-0 text-[10px] font-black text-black hover:text-[#f78df6] transition-colors uppercase tracking-[0.3em] border-b-2 border-black hover:border-[#f78df6]">Ver todo el catálogo</button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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

            {/* SECCIÓN: EXPLORA CATEGORÍAS */}
            <div className="container mx-auto px-4 lg:px-16">
                <div className="text-center mb-12">
                    <h3 className="text-4xl font-black text-black tracking-tighter uppercase italic">Estilismo & Color</h3>
                    <div className="w-16 h-1 bg-[#f78df6] mx-auto mt-4"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {categoriesBlock.map((cat) => (
                        <div 
                            key={cat.id}
                            onClick={() => onNavigate('products', cat.id)}
                            className="group cursor-pointer relative overflow-hidden rounded-3xl aspect-[3/4] bg-white border border-gray-100 shadow-xl"
                        >
                            <img 
                                src={cat.img} 
                                alt={cat.label} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                <span className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full text-black font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl group-hover:bg-[#f78df6] transition-colors">
                                    {cat.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SECCIÓN: PRODUCTOS DESTACADOS */}
            <div className="container mx-auto px-4 lg:px-16">
                <section>
                    <div className="flex items-center mb-12">
                        <h3 className="text-3xl font-black text-black tracking-tighter uppercase italic whitespace-nowrap">Favoritos del Mes</h3>
                        <div className="h-[2px] bg-black/5 flex-grow ml-8"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {allProductsBlock.map(product => (
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

            <FeaturesSection />
            
            <div className="container mx-auto px-4 lg:px-16 pb-20">
                <InteractiveCatalogSection onNavigate={onNavigate} />
            </div>
        </div>
    );
};

export default ProductList;
