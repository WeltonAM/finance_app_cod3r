'use client'

import FinanceiroForm from '@/components/finance/FinanceiroForm';

export default function Inicio() {
    return (
        <div className="flex flex-col flex-1 w-full p-10 md:px-14 md:pt-16 lg:px-36 xl:px-44 overflow-y-auto h-screen items-center font-spartan registro-financeiro">
            <FinanceiroForm />
        </div>
    );
}
