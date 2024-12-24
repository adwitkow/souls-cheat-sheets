import React, { useState } from 'react';
import ProfilePicker from './components/ProfilePicker';
import { Col, Row } from 'react-bootstrap';
import ProfileEditor from './components/ProfileEditor';
import { useProfile } from '../../contexts/ProfileContext';

export interface InputState {
  active: boolean;
  createNew: boolean;
}

const SettingsPage = () => {
  const { activeProfile, addProfile, renameProfile, deleteProfile } = useProfile();
  const [input, setInput] = useState<InputState>({
    active: false,
    createNew: false,
  });

  const disableEditProfile = () => {
    setInput({ active: false, createNew: false });
  }

  const handleSaveProfile = (newProfile: string) => {
    if (input.createNew) {
      addProfile(newProfile);
    } else {
      renameProfile(activeProfile, newProfile);
    }

    disableEditProfile();
  }

  const handleCancelProfile = () => {
    disableEditProfile();
  }

  const handleNewProfile = () => {
    setInput({
      active: true,
      createNew: true,
    });
  }

  const handleEditProfile = () => {
    setInput({
      active: true,
      createNew: false,
    });
  }

  const handleDeleteProfile = () => {
    deleteProfile(activeProfile);
  }

  return (
    <>
      <Row>
        <Col>
          <h3>Profiles</h3>
          {input.active
            ? <ProfileEditor
              onSave={handleSaveProfile}
              onCancel={handleCancelProfile}
              createNew={input.createNew} />
            : <ProfilePicker
              onCreate={handleNewProfile}
              onEdit={handleEditProfile}
              onDelete={handleDeleteProfile} />
          }
        </Col>
      </Row>
    </>
  )
}

export default SettingsPage;