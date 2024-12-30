import React, { useState } from 'react';
import { Button, Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { useProfile } from '../../../contexts/ProfileContext';
import DeleteModal from './DeleteModal';

interface ProfilePickerProps {
  onCreate: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ProfilePicker = ({ onCreate, onEdit, onDelete }: ProfilePickerProps) => {
  const { activeProfile, setActiveProfile, profiles } = useProfile();
  const [modalShown, setModalShown] = useState(false);

  const handleProfileChange = (chosenProfile: string) => {
    setActiveProfile(chosenProfile);
  }

  const handleShowDeleteModal = () => {
    setModalShown(true);
  }

  return (
    <>
      <InputGroup>
        <DropdownButton
          title={activeProfile}>
          {profiles.map(profile => (
            <Dropdown.Item
              key={profile}
              onClick={() => handleProfileChange(profile)}>
              {profile}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <Button onClick={onCreate}>New</Button>
        <Button onClick={onEdit}>Edit</Button>
        <Button variant='danger' onClick={handleShowDeleteModal}>Delete</Button>
      </InputGroup>

      <DeleteModal
        profile={activeProfile}
        show={modalShown}
        setShow={setModalShown}
        onConfirm={onDelete} />
    </>
  )
}

export default ProfilePicker;