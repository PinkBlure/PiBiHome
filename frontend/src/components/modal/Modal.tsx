import { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClick = (e: MouseEvent) => {
      const rect = dialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        onClose();
      }
    };

    dialog.addEventListener('click', handleClick);
    return () => dialog.removeEventListener('click', handleClick);
  }, [onClose]);

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl'
  };

  return (
    <dialog
      ref={dialogRef}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0 border-none bg-transparent z-50 p-4 backdrop:bg-black/60 "
      onClose={onClose}
    >
      <div className={`bg-white rounded-3xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto`}>
        {title && (
          <div className="flex text-black items-center justify-between p-8 border-none bg-gradient-to-b c rounded-t-3xl gap-4">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r">
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="transition-all duration-300 p-3 rounded-2xl hover:bg-pink-400 hover:scale-110 active:scale-95 group"
              aria-label="Cerrar modal"
            >
              <i className="fas fa-times text-lg group-hover:rotate-90 transition-transform duration-300 "></i>
            </button>
          </div>
        )}
        <div className={title ? 'p-8' : 'p-0'}>
          {children}
        </div>
      </div>
    </dialog>
  );
};