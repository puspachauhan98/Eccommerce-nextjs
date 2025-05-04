"use client";
import { useCartStore } from '../../../store/cart-store';
import Link from 'next/link';
import { useEffect } from 'react';



export default function SuccesPage() {
    const { clearCart } = useCartStore();
    useEffect(() => {
        clearCart();

    }, [clearCart]);
    return (
        <div className='container mx-auto px-4 py-8 text-center'>
            <h1 className='text-3xl font-bold mb-4'> Payment Successful</h1>
            <p className='mb-4'> Thankyou for your purchase. your order is being processed</p>
            <Link href={'/products'} className='text-blue-600'> Continue Shopping</Link>
        </div>
    )
}