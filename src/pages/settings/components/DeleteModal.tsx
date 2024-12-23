import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface DeleteModalProps {
  profile: string;
  show: boolean;
  setShow: (state: boolean) => void;
  onConfirm: () => void;
}

const DeleteModal = ({ profile, show, setShow, onConfirm }: DeleteModalProps) => {
  const handleClose = () => setShow(false);

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete profile '{profile}'? This operation cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='danger' onClick={handleConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal;