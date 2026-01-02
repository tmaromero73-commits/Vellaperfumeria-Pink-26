
import React, { useRef, useState } from 'react';
import { type Currency, formatCurrency } from './currency';
import type { Product } from './types';

// --- ICONS ---
const HeartIcon: React.FC<{isFilled: boolean}> = ({ isFilled }) => (
    <svg className="h-6 w-6" fill={isFilled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

const StarIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg className={`w-3 h-3 ${className}`} style={style} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

interface ProductCardProps {
    product: Product;
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
}

// Adding ProductCard component and exporting it to fix the import errors in other files
export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    currency,
    onAddToCart,
    onQuickAddToCart,
    onProductSelect,
    onQuickView
}) => {
    const [isWishlist, setIsWishlist] = useState(false);
    const btnRef = useRef<HTMLButtonElement>(null);

    const isOutOfStock = product.stock === 0;
    const isDiscounted = product.regularPrice && product.regularPrice > product.price;

    return (
        <div className="group relative flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 overflow-hidden h-full">
            {/* Tag Badge */}
            {product.tag && (
                <div className="absolute top-4 left-4 z-10">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg ${
                        product.tag === 'NOVEDAD' ? 'bg-[#f78df6] text-black' : 
                        product.tag === 'OFERTA' ? 'bg-red-500 text-white' : 
                        'bg-black text-white'
                    }`}>
                        {product.tag}
                    </span>
                </div>
            )}

            {/* Wishlist Button */}
            <button 
                onClick={(e) => { e.stopPropagation(); setIsWishlist(!isWishlist); }}
                className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-300 ${isWishlist ? 'text-red-500 bg-white' : 'text-gray-400 bg-white/50 hover:bg-white hover:text-red-500 shadow-sm'}`}
            >
                <HeartIcon isFilled={isWishlist} />
            </button>

            {/* Image Container */}
            <div 
                className="relative aspect-square overflow-hidden cursor-pointer bg-white p-4"
                onClick={() => onProductSelect(product)}
            >
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
                        className="bg-white/90 backdrop-blur-md text-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-black hover:text-white"
                    >
                        Vista Rápida
                    </button>
                </div>
            </div>

            {/* Content Container */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-2">
                    <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest">{product.brand}</span>
                    <h3 
                        className="text-sm font-bold text-gray-900 line-clamp-2 min-h-[40px] leading-tight hover:text-[#f78df6] cursor-pointer transition-colors"
                        onClick={() => onProductSelect(product)}
                    >
                        {product.name}
                    </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon 
                                key={i} 
                                className={i < Math.floor(product.rating || 0) ? 'text-amber-400' : 'text-gray-200'} 
                            />
                        ))}
                    </div>
                    {product.reviewCount && (
                        <span className="text-[10px] text-gray-400 font-bold">({product.reviewCount})</span>
                    )}
                </div>

                {/* Price & Action */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                        <span className="text-lg font-black text-black">
                            {formatCurrency(product.price, currency)}
                        </span>
                        {isDiscounted && (
                            <span className="text-[10px] text-gray-400 line-through font-bold">
                                {formatCurrency(product.regularPrice!, currency)}
                            </span>
                        )}
                    </div>
                    
                    <button
                        ref={btnRef}
                        onClick={(e) => { e.stopPropagation(); onQuickAddToCart(product, btnRef.current, null); }}
                        disabled={isOutOfStock}
                        className={`p-3 rounded-xl transition-all duration-300 ${
                            isOutOfStock 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-black text-white hover:bg-[#f78df6] hover:text-black shadow-lg shadow-black/5 hover:shadow-[#f78df6]/20'
                        }`}
                        aria-label="Añadir al carrito"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
