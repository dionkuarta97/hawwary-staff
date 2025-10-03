import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';

function ModalConfirm({
  title,
  message,
  onAccept,
  onDecline,
  isOpen,
  setIsOpen,
}: {
  title: string;
  message: string;
  onAccept: () => void;
  onDecline: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <>
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">{message}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="cursor-pointer" onClick={onAccept}>
            Yakin
          </Button>
          <Button className="cursor-pointer" color="alternative" onClick={onDecline}>
            Tidak
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalConfirm;
