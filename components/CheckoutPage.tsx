
import React, { useEffect, useMemo } from 'react';
import type { CartItem, View } from './types';
import type { Currency } from './currency';
import { formatCurrency } from './currency';

interface CheckoutPageProps {
    cartItems: CartItem[];
    currency: Currency;
    onClearCart: () => void;
    onNavigate: (view: View, payload?: any) => void;
}

const WhatsAppIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.919 6.066l-1.475 5.422 5.571-1.469z"/></svg>
);

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, currency, onNavigate }) => {
    const CHECKOUT_BASE_URL = 'https://vellaperfumeria.com/checkout/';

    const checkoutUrl = useMemo(() => {
        if (cartItems.length === 0) return CHECKOUT_BASE_URL;
        const productIds: number[] = [];
        cartItems.forEach(item => {
            for (let i = 0; i < item.quantity; i++) {
                productIds.push(item.product.id);
            }
        });
        return `${CHECKOUT_BASE_URL}?add-to-cart=${productIds.join(',')}`;
    }, [cartItems]);

    const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const discount = subtotal >= 35 ? subtotal * 0.15 : 0;
    const shipping = (subtotal >= 35) ? 0 : 6.00;
    const total = subtotal - discount + shipping;

    const handleWhatsAppCheckout = () => {
        const phone = "34661202616";
        let message = "¡Hola! Quiero confirmar mi pedido con estos datos:%0A%0A";
        message += "*DETALLE DEL PEDIDO:*%0A";
        cartItems.forEach(item => {
            message += `• ${item.product.name} (x${item.quantity}) - ${formatCurrency(item.product.price * item.quantity, currency)}%0A`;
        });
        message += `%0A*TOTAL A PAGAR:* ${formatCurrency(total, currency)}%0A`;
        message += `%0A*DIRECCIÓN DE ENVÍO:*%0A(Escribe aquí tu dirección completa: Calle, Nº, C.P, Ciudad)%0A`;
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    };

    return (
        <div className="container mx-auto px-4 py-24 max-w-5xl">
            <h1 className="text-6xl font-black uppercase tracking-tighter mb-16 text-center italic">Mi Pedido</h1>
            
            <div className="grid lg:grid-cols-2 gap-16 bg-white rounded-[50px] shadow-3xl overflow-hidden border border-gray-100 p-14">
                {/* Product List Summary */}
                <div className="space-y-10">
                    <h2 className="text-2xl font-black uppercase tracking-widest border-b border-black/5 pb-8">Resumen de Bolsa</h2>
                    <div className="space-y-8 max-h-[550px] overflow-y-auto pr-6 custom-scrollbar">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex gap-8 items-center bg-gray-50/80 p-8 rounded-[35px] group border border-transparent hover:border-[#f78df6]/20 transition-all shadow-sm">
                                <img src={item.product.imageUrl} className="w-28 h-28 object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                                <div className="flex-grow">
                                    <p className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">{item.product.brand}</p>
                                    <p className="font-black text-xl leading-tight line-clamp-2">{item.product.name}</p>
                                    <div className="flex justify-between items-center mt-4">
                                        <p className="font-black text-[#f78df6] text-lg">{formatCurrency(item.product.price * item.quantity, currency)}</p>
                                        <span className="bg-black text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase">Cant: {item.quantity}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Totals & Actions */}
                <div className="flex flex-col justify-between">
                    <div className="bg-black text-white p-12 rounded-[45px] shadow-2xl space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10"><img src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" className="h-20 grayscale invert" /></div>
                        
                        <div className="space-y-5 text-[11px] font-black uppercase tracking-[0.3em]">
                            <div className="flex justify-between border-b border-white/10 pb-5">
                                <span className="text-gray-400">Subtotal</span>
                                <span>{formatCurrency(subtotal, currency)}</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-[#f78df6] border-b border-white/10 pb-5 animate-pulse">
                                    <span>DTO. LOYALTY CLUB (15%)</span>
                                    <span>-{formatCurrency(discount, currency)}</span>
                                </div>
                            )}
                            <div className="flex justify-between border-b border-white/10 pb-5">
                                <span className="text-gray-400">Gastos de Envío</span>
                                <span>{shipping === 0 ? 'GRATIS' : formatCurrency(shipping, currency)}</span>
                            </div>
                            <div className="flex justify-between text-5xl font-black pt-8">
                                <span className="tracking-tighter italic">Total</span>
                                <span>{formatCurrency(total, currency)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 mt-16">
                        <button 
                            onClick={() => window.location.href = checkoutUrl}
                            className="w-full bg-[#f78df6] text-black font-black py-8 rounded-3xl hover:scale-105 active:scale-95 transition-all shadow-[0_30px_60px_rgba(247,141,246,0.4)] uppercase tracking-[0.3em] text-[14px] border-2 border-[#f78df6]"
                        >
                            Finalizar Pedido Online
                        </button>
                        
                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                            <div className="relative flex justify-center text-[10px] uppercase font-black"><span className="bg-white px-6 text-gray-400 tracking-[0.5em]">Atención Personalizada</span></div>
                        </div>

                        <button 
                            onClick={handleWhatsAppCheckout}
                            className="w-full bg-green-500 text-white font-black py-8 rounded-3xl hover:bg-green-600 transition-all flex items-center justify-center gap-5 shadow-2xl uppercase tracking-[0.3em] text-[14px]"
                        >
                            <WhatsAppIcon />
                            Enviar pedido por WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
