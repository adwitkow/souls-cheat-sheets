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
  const { activeProfile, addProfile, deleteProfile } = useProfile();
  const [input, setInput] = useState<InputState>({
    active: false,
    createNew: false,
  });

  const handleSaveProfile = (content: string) => {
    if (input.createNew) {
      addProfile(content);
    } else {
      // TODO: delete profile and its contents
      // TODO: create a new profile and paste the contents
    }

    disableEditProfile();
  }

  const handleCancelProfile = () => {
    disableEditProfile();
  }

  const disableEditProfile = () => {
    setInput({ active: false, createNew: false });
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
    setInput({
      active: false,
      createNew: false,
    })
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