import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useProfile } from '../../../contexts/ProfileContext';

interface ProfileEditorProps {
  onSave: (content: string) => void;
  onCancel: () => void;
  createNew: boolean;
}

const ProfileEditor = ({ onSave, onCancel, createNew }: ProfileEditorProps) => {
  const { activeProfile } = useProfile();
  const [content, setContent] = useState<string>(() => {
    return createNew ? '' : activeProfile;
  });

  function handleContentChange(event: any): void {
    const newContent = event.target.value;
    setContent(newContent);
  }

  const label = createNew
    ? 'New profile'
    : `Editing \'${activeProfile}\'`;

  return (
    <InputGroup>
      <InputGroup.Text>{label}</InputGroup.Text>
      <Form.Control
        placeholder='Profile name'
        onChange={handleContentChange}
        value={content} />
      <Button onClick={() => onSave(content)}>Save</Button>
      <Button onClick={onCancel} variant='secondary'>Cancel</Button>
    </InputGroup>
  )
}

export default ProfileEditor;