
import React, { useState, useRef, useEffect } from 'react';
import type { View } from './types';
import type { Currency } from './currency';

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
    children: React.ReactNode, 
    className?: string,
    onMouseEnter?: () => void,
    onMouseLeave?: () => void
}> = ({ onClick, children, className, onMouseEnter, onMouseLeave }) => {
    const defaultClass = "text-white hover:text-[#f78df6] transition-all duration-300 uppercase tracking-[0.25em] text-[11px] font-black py-5 px-8 flex items-center h-full relative group";
    return (
        <button 
            onClick={onClick} 
            className={`${defaultClass} ${className || ''}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <span className="relative z-10">{children}</span>
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#f78df6] transition-all duration-300 group-hover:w-full"></span>
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

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
        { key: 'perfume', name: 'Fragancias' },
        { key: 'skincare', name: 'Cuidado Facial' },
        { key: 'makeup', name: 'Maquillaje' },
        { key: 'wellness', name: 'Wellness' },
    ];

    return (
        <header className="sticky top-0 z-[100] flex flex-col w-full shadow-lg">
            {/* Loyalty Bar */}
            <div className="bg-[#f78df6] text-black py-2.5 text-[10px] font-black tracking-[0.3em] text-center uppercase">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <span className="hidden md:inline">✨ igualalavellaperfumeria.com — DESCUENTO FIDELIDAD: 15% EN TODA TU CESTA ✨</span>
                    <span className="md:hidden">FIDELIDAD: -15% DTO.</span>
                    <div className="flex items-center space-x-4">
                         <select
                            value={currency}
                            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                            className="bg-transparent border-none focus:ring-0 cursor-pointer text-[10px] font-black p-0 uppercase"
                        >
                            <option value="EUR">EUR (€)</option>
                            <option value="USD">USD ($)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Branding Bar */}
            <div className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-between h-20 md:h-28 relative">
                        <div className="w-1/3 flex items-center">
                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                                className="md:hidden bg-black text-white p-2.5 rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                <MenuIcon />
                            </button>
                            <div className="hidden md:flex flex-col">
                                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Estilismo & Color</span>
                                <span className="text-[12px] text-black font-black uppercase tracking-tighter">Vellaperfumeria Store</span>
                            </div>
                        </div>

                        <div className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer" onClick={() => onNavigate('home')}>
                             <img 
                                src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" 
                                alt="Vellaperfumeria" 
                                className="h-16 md:h-24 w-auto hover:scale-105 transition-transform duration-500" 
                            />
                        </div>

                        <div className="w-1/3 flex items-center justify-end">
                            <button onClick={onCartClick} className="relative p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all shadow-xl group">
                                <CartIcon />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#f78df6] text-black text-[11px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white animate-pop">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* FULL WIDTH BLACK MENU */}
            <nav className="hidden md:block bg-black w-full border-b border-white/5 relative overflow-visible">
                <div className="container mx-auto">
                    <div className="flex justify-center items-center h-16">
                        <NavLink onClick={() => onNavigate('home')}>Inicio</NavLink>
                        
                        <div 
                            className="h-full relative group"
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                        >
                            <NavLink onClick={() => onNavigate('products', 'all')}>
                                Tienda
                                <svg className={`w-3.5 h-3.5 ml-2 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                            </NavLink>

                            {/* DROPDOWN MENU - VISIBLE ON HOVER */}
                            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-64 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t border-[#f78df6] transition-all duration-300 z-[150] ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                                <ul className="py-4">
                                    {categories.map(cat => (
                                        <li key={cat.key}>
                                            <button 
                                                onClick={() => { onNavigate('products', cat.key); setIsDropdownOpen(false); }}
                                                className="w-full text-left px-8 py-3.5 text-white hover:bg-white/10 hover:text-[#f78df6] font-black uppercase tracking-widest text-[10px] transition-all"
                                            >
                                                {cat.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <NavLink onClick={() => onNavigate('catalog')}>Catálogo</NavLink>
                        <NavLink onClick={() => onNavigate('ia')} className="text-[#E0C3FC]">Asistente IA</NavLink>
                        <NavLink onClick={() => onNavigate('ofertas')} className="text-red-400">Ofertas</NavLink>
                        <NavLink onClick={() => onNavigate('blog')}>Blog</NavLink>
                    </div>
                </div>
            </nav>

            {/* Mobile Nav Overlay */}
            <div className={`md:hidden fixed inset-0 bg-black/95 z-[200] transition-all duration-500 flex flex-col p-12 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                 <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8 text-white">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>
                 <nav className="flex flex-col space-y-8 text-white font-black uppercase tracking-[0.2em] text-xl mt-12">
                     <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }}>Inicio</button>
                     <button onClick={() => { onNavigate('products', 'all'); setIsMobileMenuOpen(false); }}>Tienda</button>
                     <button onClick={() => { onNavigate('ofertas'); setIsMobileMenuOpen(false); }} className="text-red-400">Ofertas</button>
                     <button onClick={() => { onNavigate('catalog'); setIsMobileMenuOpen(false); }}>Catálogo</button>
                     <button onClick={() => { onNavigate('ia'); setIsMobileMenuOpen(false); }}>Asistente IA</button>
                 </nav>
            </div>
        </header>
    );
};

export default Header;
