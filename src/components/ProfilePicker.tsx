import React from 'react';
import { Button, Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { useProfile } from '../contexts/ProfileContext';

const ProfilePicker = () => {
  const { activeProfile, setActiveProfile, profiles } = useProfile();

  function handleProfileChange(chosenProfile: string) {
    setActiveProfile(chosenProfile);
  }

  return (
    <InputGroup className="mb-3">
      <DropdownButton
        title={activeProfile}>
        {profiles.map(profile => (
          <Dropdown.Item
            onClick={() => handleProfileChange(profile)}>
            {profile}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <Button>
        New
      </Button>
      <Button>
        Edit
      </Button>
    </InputGroup>
  )
}

export default ProfilePicker;