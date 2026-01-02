
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

const InstagramIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919A118.663 118.663 0 0112 2.163zm0 1.442c-3.143 0-3.509.011-4.72.067-2.694.123-3.997 1.433-4.12 4.12C3.109 9.12 3.098 9.486 3.098 12c0 2.514.011 2.88.067 4.72.123 2.686 1.427 3.996 4.12 4.12 1.21.055 1.577.067 4.72.067 3.143 0 3.509-.011 4.72-.067 2.694-.123 3.997-1.433 4.12-4.12.056-1.84.067-2.206.067-4.72 0-2.514-.011-2.88-.067-4.72-.123-2.686-1.427-3.996-4.12-4.12-1.21-.055-1.577.067-4.72-.067zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm0 1.44a2.31 2.31 0 110 4.62 2.31 2.31 0 010-4.62zM18.88 6.54a1.32 1.32 0 100-2.64 1.32 1.32 0 000 2.64z"/></svg>
);

const FacebookIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
);

const WhatsAppIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.919 6.066l-1.475 5.422 5.571-1.469z"/></svg>
);

const NavLink: React.FC<{ 
    onClick?: () => void, 
    children: React.ReactNode, 
    className?: string,
    onMouseEnter?: () => void,
    onMouseLeave?: () => void
}> = ({ onClick, children, className, onMouseEnter, onMouseLeave }) => {
    const defaultClass = "text-white hover:text-[#f78df6] transition-all duration-300 uppercase tracking-[0.3em] text-[10px] font-black py-6 px-8 flex items-center h-full relative group whitespace-nowrap";
    return (
        <button 
            onClick={onClick} 
            className={`${defaultClass} ${className || ''}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <span className="relative z-10">{children}</span>
            <span className="absolute bottom-0 left-0 w-0 h-1.5 bg-[#f78df6] transition-all duration-300 group-hover:w-full"></span>
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

    const handleHomeRedirect = () => {
        window.location.href = "https://vellaperfumeria.com";
    };

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
        { key: 'makeup', name: 'Maquillaje Profesional' },
        { key: 'skincare', name: 'Cuidado Facial 2026' },
        { key: 'perfume', name: 'Fragancias de Lujo' },
        { key: 'personal-care', name: 'Higiene & Bienestar' },
        { key: 'accessories', name: 'Complementos' },
    ];

    return (
        <header className="sticky top-0 z-[100] flex flex-col w-full shadow-2xl">
            {/* Top Bar - Club Information & Socials - Transparent Vella Pink Style */}
            <div className="bg-[#f78df6]/20 backdrop-blur-md text-black py-2.5 text-[10px] font-black tracking-[0.4em] uppercase border-b border-[#f78df6]/30">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <a href="https://instagram.com" className="hover:text-white transition-colors"><InstagramIcon /></a>
                        <a href="https://facebook.com" className="hover:text-white transition-colors"><FacebookIcon /></a>
                        <a href="tel:+34661202616" className="flex items-center gap-2 hover:text-white">
                             <WhatsAppIcon />
                             <span className="hidden sm:inline">+34 661 202 616</span>
                        </a>
                    </div>
                    
                    <span className="flex-grow text-center px-4 animate-pulse text-black hidden sm:block">
                        ✨ OFERTAS ORO 2026: -15% DTO. DIRECTO EN TU BOLSA ✨
                    </span>

                    <div className="flex items-center space-x-4">
                         <select
                            value={currency}
                            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                            className="bg-transparent border-none focus:ring-0 cursor-pointer text-[10px] font-black p-0 uppercase text-black"
                        >
                            <option value="EUR">EUR (€)</option>
                            <option value="USD">USD ($)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Branding Section - Updated to Solid Black (No White Background) */}
            <div className="bg-black border-b border-white/5">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-between h-24 relative">
                        <div className="w-1/4 flex items-center">
                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                                className="md:hidden bg-white text-black p-4 rounded-2xl hover:bg-[#f78df6] transition-colors shadow-lg"
                            >
                                <MenuIcon />
                            </button>
                            <div className="hidden md:flex flex-col">
                                <span className="text-[10px] text-[#f78df6] font-black uppercase tracking-[0.4em] mb-1">Estilismo & Color</span>
                                <span className="text-[14px] text-white font-black uppercase tracking-tighter italic">Vellaperfumeria.com</span>
                            </div>
                        </div>

                        <div className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer" onClick={handleHomeRedirect}>
                             <img 
                                src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" 
                                alt="Vellaperfumeria" 
                                className="h-16 md:h-24 w-auto hover:scale-110 transition-transform duration-500 ease-expo grayscale invert brightness-0 invert" 
                                style={{ filter: 'brightness(0) invert(1)' }}
                            />
                        </div>

                        <div className="w-1/4 flex items-center justify-end">
                            <button onClick={onCartClick} className="relative p-5 bg-white text-black rounded-full hover:bg-[#f78df6] transition-all shadow-2xl group active:scale-90">
                                <CartIcon />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 bg-[#f78df6] text-black text-[11px] font-black w-7 h-7 rounded-full flex items-center justify-center border-2 border-black animate-pop">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Nav - Solid Black Full Width */}
            <nav className="hidden md:block bg-black w-full border-b border-white/5 relative">
                <div className="container mx-auto">
                    <div className="flex justify-center items-center h-20">
                        <NavLink onClick={handleHomeRedirect}>Inicio</NavLink>
                        
                        {/* Visible Dropdown on Black */}
                        <div 
                            className="h-full relative"
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                        >
                            <NavLink onClick={() => onNavigate('products', 'all')}>
                                Tienda Online
                                <svg className={`w-3.5 h-3.5 ml-3 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M19 9l-7 7-7-7" /></svg>
                            </NavLink>

                            {/* Dropdown Container - Solid Black */}
                            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-80 bg-black shadow-[0_40px_80px_rgba(0,0,0,0.95)] border-t-2 border-[#f78df6] transition-all duration-300 z-[150] ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-6'}`}>
                                <ul className="py-8">
                                    {categories.map(cat => (
                                        <li key={cat.key}>
                                            <button 
                                                onClick={() => { onNavigate('products', cat.key); setIsDropdownOpen(false); }}
                                                className="w-full text-left px-12 py-4 text-white hover:bg-white/5 hover:text-[#f78df6] font-black uppercase tracking-[0.35em] text-[10px] transition-all"
                                            >
                                                {cat.name}
                                            </button>
                                        </li>
                                    ))}
                                    <li className="pt-6 border-t border-white/10 mt-4">
                                        <button 
                                            onClick={() => { onNavigate('ofertas'); setIsDropdownOpen(false); }}
                                            className="w-full text-left px-12 py-4 text-[#f78df6] hover:bg-white/5 font-black uppercase tracking-[0.35em] text-[10px] transition-all animate-pulse"
                                        >
                                            Ofertas 2026 🔥
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <NavLink onClick={() => onNavigate('catalog')}>Catálogo Digital</NavLink>
                        <NavLink onClick={() => onNavigate('ia')} className="text-[#E0C3FC]">Beauty AI Analysis</NavLink>
                        <NavLink onClick={() => onNavigate('ofertas')} className="text-red-400">Promociones Oro</NavLink>
                        <NavLink onClick={() => onNavigate('blog')}>Novedades</NavLink>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay - Fully Black Mobile-Type Menu */}
            <div className={`md:hidden fixed inset-0 bg-black z-[200] transition-all duration-500 flex flex-col p-12 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                 <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-10 right-10 text-[#f78df6]">
                    <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>
                 <nav className="flex flex-col space-y-12 text-white font-black uppercase tracking-[0.4em] text-4xl mt-24">
                     <button onClick={handleHomeRedirect} className="text-left border-b border-white/10 pb-8 hover:text-[#f78df6] transition-colors">Inicio</button>
                     <button onClick={() => { onNavigate('products', 'all'); setIsMobileMenuOpen(false); }} className="text-left border-b border-white/10 pb-8 hover:text-[#f78df6] transition-colors">Tienda</button>
                     <button onClick={() => { onNavigate('ofertas'); setIsMobileMenuOpen(false); }} className="text-left border-b border-white/10 pb-8 text-red-400 hover:text-red-300 transition-colors">Ofertas 2026</button>
                     <button onClick={() => { onNavigate('catalog'); setIsMobileMenuOpen(false); }} className="text-left border-b border-white/10 pb-8 hover:text-[#f78df6] transition-colors">Catálogo</button>
                     <button onClick={() => { onNavigate('ia'); setIsMobileMenuOpen(false); }} className="text-left text-[#E0C3FC] hover:text-white transition-colors">Beauty AI</button>
                     <button onClick={() => { onNavigate('blog'); setIsMobileMenuOpen(false); }} className="text-left border-b border-white/10 pb-8 hover:text-[#f78df6] transition-colors">Blog</button>
                 </nav>
            </div>
        </header>
    );
};

export default Header;
