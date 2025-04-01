import { useEffect } from "react";

type modalprops = {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: React.ReactNode;
}

const Modal = ({ className, isOpen, onClose, title, description, children }: modalprops) => {

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70">
            <div className={`${className} bg-white rounded-lg shadow-lg p-6 z-20 max-h-[80vh] min-w-[50vw] max-w-[70vw] relative`}>
                <button className="absolute top-6 right-6 text-gray-800 hover:text-gray-500 text-2xl font-bold" onClick={onClose}>
                    ✕
                </button>
                <div className="flex flex-col items-start">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    {description && <p className="text-gray-600 mb-4">{description}</p>}
                </div>
                <div className="overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;