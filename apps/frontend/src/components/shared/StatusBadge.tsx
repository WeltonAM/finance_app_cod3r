import { IconCircleFilled } from "@tabler/icons-react";

export type StatusBadgeProps = {
    status: string;
    icon?: any;
};

export default function StatusBadge({ status, icon }: StatusBadgeProps) {
    const getStatusStyles = (status: string) => {
        switch (status.toLowerCase()) {
            case 'consolidado':
                return 'bg-green-500 text-green-500';
            case 'pendente':
                return 'bg-yellow-500 text-yellow-500';
            case 'cancelado':
                return 'bg-red-500 text-red-500';
            default:
                return 'bg-gray-500 text-gray-500';
        }
    };

    return (
        <div className={`flex items-center justify-center px-3 py-0 rounded-md bg-opacity-20 select-none ${getStatusStyles(status)}`}>
            {
                icon ?? (
                    <IconCircleFilled size={7} className="mr-1" />
                )
            }
            <span className="font-semibold mt-1">{status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}</span>
        </div>
    );
}
