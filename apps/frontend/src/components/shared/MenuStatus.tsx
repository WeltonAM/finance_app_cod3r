import { useState, useEffect, useRef } from 'react';
import { IconCircleFilled } from '@tabler/icons-react';

export type MenuStatusProps = {
    onSelectStatus: (status: string) => void;
    isMenuStatusAberto: boolean;
};

const MenuStatus = ({ onSelectStatus, isMenuStatusAberto }: MenuStatusProps) => {
    const [selectedStatus, setSelectedStatus] = useState('');
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onSelectStatus(selectedStatus);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onSelectStatus, selectedStatus]);

    const handleStatusClick = (status: string) => {
        setSelectedStatus(status);
        onSelectStatus(status);
    };

    return (
        <>
            {isMenuStatusAberto && (
                <div ref={menuRef} className="absolute rounded-md shadow-xl bg-black font-inter">
                    <div className='font-spartan py-2 px-4'>Status</div>
                    <div className="border-t border-zinc-600"></div>
                    <div className='p-1'>
                        {['Pendente', 'Consolidado', 'Cancelado'].map((status) => (
                            <button
                                key={status}
                                className={`text-${status === 'Pendente' ? 'yellow' : status === 'Consolidado' ? 'green' : 'red'}-500 font-thin flex items-center px-2 py-2 text-sm w-full text-left rounded hover:bg-zinc-900 ${selectedStatus === status ? 'bg-zinc-900' : ''}`}
                                onClick={() => handleStatusClick(status)}
                            >
                                <IconCircleFilled size={10} className='mr-1' />
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default MenuStatus;
