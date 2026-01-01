
import React, { useState, useRef } from 'react';
import { allProducts } from './products';
import { ProductCard } from './ProductCard';
import type { Product } from './types';
import type { Currency } from './currency';

const INTERACTIVE_CATALOG_URL = 'https://es-catalogue.oriflame.com/oriflame/es/2026001-brp?HideStandardUI=true&Page=1';
const FALLBACK_CATALOG_URL = 'https://es.oriflame.com/products/digital-catalogue-current';

interface CatalogPageProps {
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
    currency: Currency;
}

const CatalogPage: React.FC<CatalogPageProps> = ({ onAddToCart, onQuickAddToCart, onProductSelect, onQuickView, currency }) => {
    const [quickAddCode, setQuickAddCode] = useState('');
    const [addStatus, setAddStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleQuickAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!quickAddCode.trim()) return;

        const code = parseInt(quickAddCode.trim());
        const product = allProducts.find(p => p.id === code);

        if (product) {
            onAddToCart(product, buttonRef.current, null);
            setAddStatus('success');
            setStatusMessage(`¡${product.name} añadido al carrito!`);
            setQuickAddCode('');
            
            setTimeout(() => {
                setAddStatus('idle');
                setStatusMessage('');
            }, 3000);
        } else {
            setAddStatus('error');
            setStatusMessage('Producto no encontrado en stock 2026. Consúltanos.');
            setTimeout(() => {
                setAddStatus('idle');
                setStatusMessage('');
            }, 3000);
        }
    };

    const catalogProducts = allProducts.slice(0, 8); 

    return (
        <div className="w-full px-4 py-8 bg-gray-50 min-h-screen">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-10">
                    
                    {/* Catalog Viewer */}
                    <div className="flex-grow">
                        <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-6">
                            <div className="flex items-center gap-6">
                                <img src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" className="h-16 w-auto" />
                                <div>
                                    <h1 className="text-4xl font-black text-black tracking-tight uppercase">Catálogo 2026</h1>
                                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-1">Lanzamiento Mundial - Temporada Invierno</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="relative aspect-[3/4] md:aspect-[16/9] w-full bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-black">
                            <iframe
                                src={INTERACTIVE_CATALOG_URL}
                                title="Catálogo Digital 2026"
                                className="w-full h-full"
                                frameBorder="0"
                                allowFullScreen
                            />
                        </div>
                        <div className="mt-4 text-center">
                            <button onClick={() => window.open(FALLBACK_CATALOG_URL, '_blank')} className="text-xs font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest">
                                Abrir en modo pantalla completa &nearr;
                            </button>
                        </div>
                    </div>

                    {/* Quick Order Sidebar */}
                    <div className="w-full lg:w-96 flex-shrink-0">
                        <div className="bg-black text-white p-8 rounded-2xl shadow-2xl sticky top-32">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                                <span className="bg-[#E0C3FC] text-black rounded-full p-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg></span>
                                Pedido Rápido 2026
                            </h2>
                            
                            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                Localiza el <strong>código de producto</strong> en las páginas del catálogo digital e ingrésalo aquí para añadirlo directamente a tu cesta sin esperas.
                            </p>

                            <form onSubmit={handleQuickAdd} className="space-y-4">
                                <input
                                    type="number"
                                    placeholder="Introduce Código (Ej: 46801)"
                                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#E0C3FC] text-white"
                                    value={quickAddCode}
                                    onChange={(e) => setQuickAddCode(e.target.value)}
                                />
                                <button
                                    ref={buttonRef}
                                    type="submit"
                                    className="w-full bg-[#E0C3FC] text-black font-black py-4 rounded-lg hover:bg-white transition-all transform active:scale-95 shadow-lg uppercase tracking-widest text-sm"
                                >
                                    Añadir a la Cesta
                                </button>
                            </form>

                            {statusMessage && (
                                <div className={`mt-6 p-4 rounded-lg text-sm font-bold text-center animate-fade-in ${addStatus === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                    {statusMessage}
                                </div>
                            )}

                            <div className="mt-8 pt-8 border-t border-gray-800">
                                <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest mb-4">Pagos 100% Seguros</p>
                                <div className="flex justify-center gap-4 opacity-50">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid de Productos */}
                <section className="mt-20">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl font-black text-black tracking-tighter uppercase">Favoritos de la Temporada 2026</h2>
                        <div className="h-[2px] bg-black flex-grow mx-8 hidden md:block"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {catalogProducts.map(product => (
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

export default CatalogPage;
