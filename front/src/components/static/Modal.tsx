import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Button } from './Button';

export interface GenericModalProps {
  isOpen: boolean;
  title: string | JSX.Element;
  subTitle?: string;
  children?: any;
  onCancel?: () => void;
  onConfirm?: (data?: any) => void;
  hideCancelButton?: boolean;
  cancelLabel?: string;
  confirmLabel?: string;
  customSize?: any;
  size?: number | string;
  closeable?: boolean;
}

export const GenericModal = (props: GenericModalProps) => {
  const [isOpen, setIsOpen] = useState(props.isOpen);

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  return (
    <Dialog open={isOpen} onClose={() => props.onCancel} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center p-4 ">
        <Dialog.Panel
          className="w-2/4 h-2/4 rounded-lg  p-2.5"
          style={{ backgroundColor: ' #9b9b9b', color: 'white' }}
        >
          <Dialog.Title style={{ padding: '20px 20px', fontSize: '2em' }}>
            {props.title}
          </Dialog.Title>
          <Dialog.Description>{props.subTitle}</Dialog.Description>
          {props.children && (
            <div style={{ paddingLeft: '20px', minHeight: '50%' }}>{props.children}</div>
          )}

          <div className=" flex justify-end self-end px-3">
            <Button
              style={{ cursor: 'pointer' }}
              onClick={() => {
                props.onCancel && props.onCancel();
              }}
              title={props.cancelLabel || 'Annuler'}
            />
          </div>

          {props.onConfirm && (
            <div className="flex self-end pb-2.5">
              <Button
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  props.onConfirm && props.onConfirm();
                }}
                title={props.confirmLabel || 'Valider'}
              />
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
