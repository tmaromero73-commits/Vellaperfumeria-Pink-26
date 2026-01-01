
import React, { useState, useRef, useEffect } from 'react';
import type { View } from './types';
import type { Currency } from './currency';

// Social Icons
const ThreadsIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8.01 3.51c-1.35 0-2.45 1.1-2.45 2.45v.38c0 .28.22.5.5.5h1.5c.28 0 .5-.22.5-.5v-.38c0-.69.56-1.25 1.25-1.25h.19c.69 0 1.25.56 1.25 1.25v2.87c0 1.35-1.1 2.45-2.45 2.45h-.87c-.28 0-.5.22-.5.5v1.5c0 .28.22.5.5.5h.87c2.21 0 4-1.79 4-4V5.96c0-1.35-1.1-2.45-2.45-2.45h-2.12zm-3.09 3.1h-1.5c-.28 0-.5.22-.5.5v.38c0 1.35 1.1 2.45 2.45 2.45h.19c.69 0 1.25-.56 1.25-1.25V5.96c0-1.35-1.1-2.45-2.45-2.45H3.01c-1.35 0-2.45 1.1-2.45 2.45v2.12c0 2.21 1.79 4 4 4h.87c.28 0 .5-.22.5-.5v-1.5c0-.28-.22-.5-.5-.5h-.87c-.69 0-1.25-.56-1.25-1.25v-.38c0-.28-.22-.5-.5-.5z"/>
    </svg>
);

const InstagramIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919A118.663 118.663 0 0112 2.163zm0 1.442c-3.143 0-3.509.011-4.72.067-2.694.123-3.997 1.433-4.12 4.12C3.109 9.12 3.098 9.486 3.098 12c0 2.514.011 2.88.067 4.72.123 2.686 1.427 3.996 4.12 4.12 1.21.055 1.577.067 4.72.067 3.143 0 3.509-.011 4.72-.067 2.694-.123 3.997-1.433 4.12-4.12.056-1.84.067-2.206.067-4.72 0-2.514-.011-2.88-.067-4.72-.123-2.686-1.427-3.996-4.12-4.12-1.21-.055-1.577.067-4.72-.067zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm0 1.44a2.31 2.31 0 110 4.62 2.31 2.31 0 010-4.62zM18.88 6.54a1.32 1.32 0 100-2.64 1.32 1.32 0 000 2.64z" clipRule="evenodd" />
    </svg>
);

const FacebookIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.919 6.066l-1.475 5.422 5.571-1.469z" />
    </svg>
);

const MenuIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const CartIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const NavLink: React.FC<{ 
    onClick?: () => void, 
    href?: string, 
    children: React.ReactNode, 
    className?: string,
    onMouseEnter?: () => void,
    onMouseLeave?: () => void
}> = ({ onClick, href, children, className, onMouseEnter, onMouseLeave }) => {
    const defaultClass = "text-white hover:text-[#E0C3FC] transition-colors duration-200 uppercase tracking-widest text-[11px] font-bold py-5 px-4";
    
    if (href) {
        return (
            <a 
                href={href} 
                className={`${defaultClass} ${className || ''}`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span className="hover-underline-effect">{children}</span>
            </a>
        );
    }
    return (
        <button 
            onClick={onClick} 
            className={`${defaultClass} ${className || ''}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <span className="hover-underline-effect">{children}</span>
        </button>
    );
};


interface HeaderProps {
    onNavigate: (view: View, payload?: any) => void;
    currency: Currency;
    onCurrencyChange: (currency: Currency) => void;
    cartCount: number;
    onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currency, onCurrencyChange, cartCount, onCartClick }) => {
    const [cartPulse, setCartPulse] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cartCount > 0) {
            setCartPulse(true);
            const timer = setTimeout(() => setCartPulse(false), 500);
            return () => clearTimeout(timer);
        }
    }, [cartCount]);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const categories = [
        { key: 'all', name: 'Todos los productos' },
        { key: 'skincare', name: 'Cuidado Facial' },
        { key: 'makeup', name: 'Maquillaje' },
        { key: 'perfume', name: 'Fragancias' },
        { key: 'wellness', name: 'Wellness' },
        { key: 'hair', name: 'Cuidado del Cabello' },
        { key: 'personal-care', name: 'Cuidado Personal' },
        { key: 'accessories', name: 'Accesorios' },
    ];

    return (
        <header className="sticky top-0 z-50 flex flex-col w-full shadow-lg">
            {/* Top Bar (Pink) */}
            <div className="bg-[#f78df6] text-black py-1.5 text-[10px] font-bold tracking-[0.1em]">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <span className="cursor-pointer hover:opacity-75 transition-opacity"><ThreadsIcon /></span>
                        <span className="cursor-pointer hover:opacity-75 transition-opacity"><InstagramIcon /></span>
                        <span className="cursor-pointer hover:opacity-75 transition-opacity"><FacebookIcon /></span>
                        <span className="cursor-pointer hover:opacity-75 transition-opacity"><WhatsAppIcon /></span>
                    </div>
                    <div className="hidden md:block text-center uppercase">
                        NUEVA TEMPORADA 2026 | ENVÍO GRATIS DESDE 35€
                    </div>
                    <div className="flex items-center space-x-2">
                        <select
                            value={currency}
                            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                            className="bg-transparent border-none focus:ring-0 cursor-pointer text-[10px] font-bold p-0"
                        >
                            <option value="EUR">EUR</option>
                            <option value="USD">USD</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Main Header (White) */}
            <div className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4 h-24 relative">
                        <div className="flex items-center w-1/3">
                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                                className="md:hidden bg-black text-white p-2 rounded hover:bg-gray-800 transition-colors"
                            >
                                <MenuIcon />
                            </button>
                            <div className="hidden md:block">
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] border-l-2 border-[#E0C3FC] pl-3">Tu Esencia, Tu Belleza</span>
                            </div>
                        </div>

                        <div className="absolute left-1/2 transform -translate-x-1/2">
                            <button onClick={() => onNavigate('home')} className="block">
                                <img 
                                    src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" 
                                    alt="Vellaperfumeria" 
                                    className="h-20 md:h-28 w-auto hover:scale-105 transition-transform" 
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-end w-1/3 space-x-6">
                            <button onClick={onCartClick} className="relative group p-2 hover:bg-gray-50 rounded-full transition-colors">
                                <CartIcon />
                                {cartCount > 0 && (
                                    <span className={`absolute -top-1 -right-1 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white ${cartPulse ? 'animate-pop' : ''}`}>
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Black Navigation Bar - Full Width */}
            <nav className="hidden md:block bg-black w-full shadow-2xl overflow-visible">
                <div className="container mx-auto px-4 flex justify-center relative">
                    <div className="flex items-center">
                        <NavLink onClick={() => onNavigate('home')}>Inicio</NavLink>
                        
                        {/* Mega Menu Trigger */}
                        <div 
                            className="relative"
                            onMouseEnter={() => setIsMegaMenuOpen(true)}
                            onMouseLeave={() => setIsMegaMenuOpen(false)}
                        >
                            <NavLink onClick={() => onNavigate('products', 'all')} className={isMegaMenuOpen ? 'text-[#E0C3FC]' : ''}>
                                Tienda
                                <svg className={`w-3 h-3 ml-1 inline transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </NavLink>

                            {/* Mega Menu Dropdown */}
                            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-[80vw] max-w-[900px] bg-black text-white p-10 grid grid-cols-3 gap-10 shadow-[0_25px_50px_rgba(0,0,0,0.6)] border-t border-gray-800 transition-all duration-300 ease-out z-50 ${isMegaMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}>
                                <div className="col-span-1 space-y-5 border-r border-gray-800 pr-5">
                                    <h4 className="text-[#E0C3FC] font-black text-xs uppercase tracking-widest mb-4 border-b border-gray-800 pb-2">Catálogo 2026</h4>
                                    {categories.map(cat => (
                                        <button 
                                            key={cat.key}
                                            onClick={() => { onNavigate('products', cat.key); setIsMegaMenuOpen(false); }}
                                            className="block text-[11px] font-bold hover:text-[#E0C3FC] transition-colors uppercase tracking-widest w-full text-left"
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                                <div className="col-span-2 grid grid-cols-2 gap-6">
                                    <div 
                                        onClick={() => { onNavigate('ofertas'); setIsMegaMenuOpen(false); }}
                                        className="bg-gray-900 rounded-lg p-5 flex flex-col justify-end h-48 group cursor-pointer overflow-hidden relative border border-gray-800 hover:border-[#E0C3FC] transition-colors"
                                    >
                                        <img src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=400" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700" alt="Novedades" />
                                        <div className="relative z-10">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-[#E0C3FC]">Ediciones Especiales</p>
                                            <h5 className="font-black text-base uppercase tracking-tight">Novedades Invierno</h5>
                                        </div>
                                    </div>
                                    <div 
                                        onClick={() => { onNavigate('catalog'); setIsMegaMenuOpen(false); }}
                                        className="bg-gray-900 rounded-lg p-5 flex flex-col justify-end h-48 group cursor-pointer overflow-hidden relative border border-gray-800 hover:border-[#E0C3FC] transition-colors"
                                    >
                                        <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=400" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700" alt="Top Ventas" />
                                        <div className="relative z-10">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-[#E0C3FC]">Favoritos 2026</p>
                                            <h5 className="font-black text-base uppercase tracking-tight">Top Más Vendidos</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <NavLink onClick={() => onNavigate('ofertas')} className="text-red-400 font-black">Ofertas</NavLink>
                        <NavLink onClick={() => onNavigate('catalog')}>Catálogo 2026</NavLink>
                        <NavLink onClick={() => onNavigate('ia')}>Asistente IA</NavLink>
                        <NavLink onClick={() => onNavigate('blog')}>Blog Belleza</NavLink>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                 <div ref={navRef} className="md:hidden absolute top-full left-0 w-full bg-black text-white shadow-2xl border-t border-gray-900 p-8 z-50">
                     <nav className="flex flex-col space-y-8 uppercase tracking-widest text-[11px] font-bold">
                         <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className="text-left py-2 hover:text-[#E0C3FC]">Inicio</button>
                         <div className="space-y-4">
                            <span className="text-[#E0C3FC] block text-[9px] mb-2">Categorías de Tienda</span>
                            {categories.slice(1, 5).map(cat => (
                                <button key={cat.key} onClick={() => { onNavigate('products', cat.key); setIsMobileMenuOpen(false); }} className="block text-left pl-3 text-gray-300 hover:text-white">{cat.name}</button>
                            ))}
                         </div>
                         <button onClick={() => { onNavigate('ofertas'); setIsMobileMenuOpen(false); }} className="text-left py-2 text-red-400">Ofertas Especiales</button>
                         <button onClick={() => { onNavigate('catalog'); setIsMobileMenuOpen(false); }} className="text-left py-2 hover:text-[#E0C3FC]">Catálogo 2026</button>
                         <button onClick={() => { onNavigate('ia'); setIsMobileMenuOpen(false); }} className="text-left py-2 hover:text-[#E0C3FC]">Asistente IA</button>
                         <button onClick={() => { onNavigate('blog'); setIsMobileMenuOpen(false); }} className="text-left py-2 hover:text-[#E0C3FC]">Blog</button>
                     </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
