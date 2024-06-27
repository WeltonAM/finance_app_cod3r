import { useState, useEffect, useRef } from 'react';
import { IconCircleFilled } from '@tabler/icons-react';

export type MenuStatusProps = {
    onSelectStatus: (status: string) => void;
    isMenuStatusAberto: boolean;
};

const MenuStatus = ({ onSelectStatus, isMenuStatusAberto }: MenuStatusProps) => {
    const [isOpen, setIsOpen] = useState(isMenuStatusAberto);
    const [selectedStatus, setSelectedStatus] = useState('');

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleStatusClick = (status: string) => {
        setSelectedStatus(status);
        onSelectStatus(status);
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && (
                <div
                    ref={menuRef}
                    className="
                        absolute 
                        rounded-md shadow-xl 
                        bg-black font-inter
                    "
                >
                    <div className='font-spartan py-2 px-4'>Status</div>

                    <div className="border-t border-zinc-600"></div>

                    <div className='p-1'>
                        <button
                            className={`text-yellow-500 font-thin flex items-center  px-2 py-2 text-sm w-full text-left rounded hover:bg-zinc-900 ${selectedStatus === 'Pendente' ? 'bg-zinc-900' : ''}`}
                            onClick={() => handleStatusClick('Pendente')}
                        >
                            <IconCircleFilled size={10} className='mr-1' />
                            Pendente
                        </button>

                        <button
                            className={`text-green-500 font-thin flex items-center px-2 py-2 text-sm w-full text-left rounded  hover:bg-zinc-900 ${selectedStatus === 'Consolidado' ? 'bg-zinc-900' : ''}`}
                            onClick={() => handleStatusClick('Consolidado')}
                        >
                            <IconCircleFilled size={10} className='mr-1' />
                            Consolidado
                        </button>


                        <button
                            className={`text-red-500 font-thin flex items-center  px-2 py-2 text-sm w-full text-left rounded hover:bg-zinc-900 ${selectedStatus === 'Cancelado' ? 'bg-zinc-900' : ''}`}
                            onClick={() => handleStatusClick('Cancelado')}
                        >
                            <IconCircleFilled size={10} className='mr-1' />
                            Cancelado
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default MenuStatus;
