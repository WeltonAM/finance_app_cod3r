type ButtonProps = {
    onClick: () => void;
    icone?: React.ReactNode;
    texto?: string;
    classe?: string;
    defaultColor?: string;
};

export default function Button({ icone, texto, onClick, classe, defaultColor }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`
                flex justify-center items-center
                px-4 py-2 rounded-3xl
                text-white font-spartan
                ${defaultColor === "default" ? "bg-purple-700" : "bg-gray-800"}
                ${classe}
            `}
        >
            <div className="flex items-center justify-center gap-3">
                {icone && (
                    <div className="flex w-6 h-6 items-center justify-center bg-white rounded-full text-purple-700">
                        {icone}
                    </div>
                )}

                <p className="mt-1 font-extralight">
                    {texto}
                </p>
            </div>
        </button>
    );
}
