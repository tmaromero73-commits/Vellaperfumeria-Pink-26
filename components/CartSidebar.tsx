
import React, { useEffect, useMemo, useRef } from 'react';
import type { CartItem, View } from './types';
import type { Currency } from './currency';
import { formatCurrency } from './currency';

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    currency: Currency;
    onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
    onRemoveItem: (cartItemId: string) => void;
    onCheckout: () => void;
    isCheckingOut: boolean;
    checkoutError: string | null;
    onNavigate: (view: View, payload?: any) => void;
}

const FREE_SHIPPING_THRESHOLD = 35;
const DISCOUNT_THRESHOLD = 35;
const DISCOUNT_PERCENTAGE = 0.15;
const SHIPPING_COST = 6.00;

const CloseIcon = () => (
    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.919 6.066l-1.475 5.422 5.571-1.469z"/></svg>
);

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cartItems, currency, onUpdateQuantity, onRemoveItem, onCheckout, isCheckingOut, checkoutError, onNavigate }) => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const subtotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }, [cartItems]);

    const discountAmount = useMemo(() => {
        return subtotal >= DISCOUNT_THRESHOLD ? subtotal * DISCOUNT_PERCENTAGE : 0;
    }, [subtotal]);

    const shippingCost = useMemo(() => {
        const hasShippingSaver = cartItems.some(item => item.product.isShippingSaver);
        return (hasShippingSaver || subtotal >= FREE_SHIPPING_THRESHOLD) ? 0 : SHIPPING_COST;
    }, [subtotal, cartItems]);

    const total = subtotal - discountAmount + shippingCost;

    const handleWhatsAppOrder = () => {
        const phone = "34661202616";
        let message = "¡Hola! Quiero confirmar este pedido:%0A%0A";
        cartItems.forEach(item => {
            message += `• ${item.product.name} (x${item.quantity}) - ${formatCurrency(item.product.price * item.quantity, currency)}%0A`;
        });
        message += `%0A*Subtotal:* ${formatCurrency(subtotal, currency)}`;
        if (discountAmount > 0) message += `%0A*Descuento (15%):* -${formatCurrency(discountAmount, currency)}`;
        message += `%0A*Envío:* ${shippingCost === 0 ? 'Gratis' : formatCurrency(shippingCost, currency)}`;
        message += `%0A*TOTAL:* ${formatCurrency(total, currency)}`;
        message += `%0A%0APor favor, dime los pasos para completar el envío.`;

        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    };

    return (
        <div className={`fixed inset-0 z-[200] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div ref={sidebarRef} className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-500 ease-expo ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-black uppercase tracking-tighter">Mi Carrito</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><CloseIcon /></button>
                </div>

                {cartItems.length > 0 ? (
                    <div className="flex-grow flex flex-col overflow-hidden">
                        <div className="flex-grow overflow-y-auto p-6 space-y-6">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                    <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-contain mix-blend-multiply" />
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-sm leading-tight line-clamp-2">{item.product.name}</h3>
                                        <div className="flex items-center justify-between mt-3">
                                            <p className="font-black text-black">{formatCurrency(item.product.price * item.quantity, currency)}</p>
                                            <div className="flex items-center bg-white border rounded-lg">
                                                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 font-bold">-</button>
                                                <span className="px-2 text-xs font-black">{item.quantity}</span>
                                                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 font-bold">+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => onRemoveItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors"><TrashIcon /></button>
                                </div>
                            ))}
                        </div>

                        <div className="p-8 border-t bg-gray-50 space-y-4">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Subtotal</span>
                                    <span className="font-black">{formatCurrency(subtotal, currency)}</span>
                                </div>
                                {discountAmount > 0 && (
                                    <div className="flex justify-between text-[#f78df6]">
                                        <span className="font-bold uppercase tracking-widest text-[10px]">Descuento VIP (15%)</span>
                                        <span className="font-black">-{formatCurrency(discountAmount, currency)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Envío</span>
                                    <span className="font-black">{shippingCost === 0 ? 'GRATIS' : formatCurrency(shippingCost, currency)}</span>
                                </div>
                            </div>
                            <div className="flex justify-between font-black text-2xl border-t pt-4">
                                <span className="uppercase tracking-tighter">Total</span>
                                <span>{formatCurrency(total, currency)}</span>
                            </div>
                            
                            <div className="pt-4 space-y-3">
                                <button onClick={onCheckout} className="w-full bg-black text-white font-black py-5 rounded-2xl hover:bg-[#f78df6] hover:text-black transition-all transform active:scale-95 uppercase tracking-widest text-[11px] shadow-xl">
                                    Pagar con Tarjeta
                                </button>
                                <button onClick={handleWhatsAppOrder} className="w-full bg-green-500 text-white font-black py-5 rounded-2xl hover:bg-green-600 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[11px] shadow-xl">
                                    <WhatsAppIcon />
                                    Pedir por WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-grow flex flex-col items-center justify-center p-12 text-center">
                        <div className="bg-gray-100 p-8 rounded-full mb-6">
                            <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tighter mb-2">Tu bolsa está vacía</h3>
                        <p className="text-gray-400 text-sm mb-8 font-medium">¿A qué esperas para conseguir tu 15% de descuento?</p>
                        <button onClick={() => { onClose(); onNavigate('products', 'all'); }} className="bg-black text-white font-black py-4 px-10 rounded-full hover:bg-[#f78df6] hover:text-black transition-all uppercase tracking-widest text-[10px]">
                            Ir a la Tienda
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartSidebar;
