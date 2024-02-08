import * as Dialog from '@radix-ui/react-dialog';
import { type HTMLAttributes, forwardRef } from 'react';

import { Icon } from '~/components/ui/icon.tsx';

export type ModalProps = HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  onClose?: () => void;

  title?: string;
  description?: string;

  trigger?: JSX.Element;
};

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, open, onClose, title, description, trigger }, ref): JSX.Element => {
    const Title = title && (
      <Dialog.Title className="text-sm font-medium" asChild>
        <h1 className="text-3xl font-bold leading-tight">{title}</h1>
      </Dialog.Title>
    );

    const Description = description && (
      <Dialog.Description className="text-sm font-medium" asChild>
        <h3 className="text-xl font-bold leading-tight">{description}</h3>
      </Dialog.Description>
    );

    const Trigger = trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>;

    return (
      <Dialog.Root open={open} onOpenChange={(open) => !open && onClose && onClose()}>
        {Trigger}
        <Dialog.Portal>
          <Dialog.Overlay
            forceMount
            className="bg-background/80 fixed inset-0 z-50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          />
          <Dialog.Content
            className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full"
            ref={ref}
          >
            {Title}
            {Description}
            <div className="pt-4">{children}</div>
            <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <Icon name="x" className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
);

Modal.displayName = 'Modal';

export { Modal };