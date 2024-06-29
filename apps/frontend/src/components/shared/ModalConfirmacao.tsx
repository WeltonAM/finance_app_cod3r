import { IconAlertTriangle, IconDashboard } from "@tabler/icons-react";
import Button from "./Button";

interface ModalConfirmacaoProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function ModalConfirmacao({ isOpen, onCancel, onConfirm }: ModalConfirmacaoProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 bg-gray-800 bg-opacity-60 backdrop-blur-sm"></div>

                <div className="relative z-50 bg-gray-700 rounded-md shadow-lg">
                    <div className="rounded flex justify-center p-6">
                        <IconAlertTriangle stroke={1.5} size={30} color="red" className="mr-3 mt-1 bg-red-200 rounded-full p-2" />
                        <div>
                            <p className="text-xl font-semibold text-white">Atenção!</p>

                            <p className="text-white">Tem certeza que deseja excluir este registro?</p>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6 bg-slate-800 p-3">
                        <button
                            className="bg-red-700 text-white w-[5rem] 
                            font-spartan pt-2 py-1 px-6 
                            rounded-3xl text-sm flex items-center justify-center"
                            onClick={onConfirm}
                        >
                            Excluir
                        </button>
                        <button
                            className="bg-zinc-500 text-white w-[5rem] 
                            font-spartan pt-2 py-1 px-6 
                            rounded-3xl text-sm flex items-center justify-center"
                            onClick={onCancel}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
