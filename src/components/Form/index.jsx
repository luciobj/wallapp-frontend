import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import PostItContext from '../../context/PostItContext';
import UserContext from '../../context/UserContext';
import './style.css';

export default function Form({ handleEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const { PostItForm, setPostItForm } = useContext(PostItContext);
  const { user: { token } } = useContext(UserContext);

  function verifyInputs() {
    if (title === '') {
      setTitleError('Title cannot be empty');
    } else {
      setTitleError('');
    }
    if (description === '') {
      setDescriptionError('Description cannot be empty');
    } else {
      setDescriptionError('');
    }
    if (title !== '' && description !== '') {
      return true;
    }
    return false;
  }

  const handleChange = ({ target }) => {
    if (target.name === 'title') {
      setTitle(target.value);
    }
    if (target.name === 'description') {
      setDescription(target.value);
    }
  };

  const handleSubmit = () => {
    if (verifyInputs()) {
      const postIt = {
        title,
        description,
      };
      if (PostItForm.id !== 0) {
        handleEdit(postIt, token, PostItForm.id);
      } else {
        handleEdit(postIt, token);
      }
      setPostItForm({
        id: 0,
        title: '',
        description: '',
      });
    }
  };

  useEffect(() => {
    if (title !== '') {
      setTitleError('');
    }
    if (description !== '') {
      setDescriptionError('');
    }
  }, [title, description]);

  useEffect(() => {
    setTitle(PostItForm.title);
    setDescription(PostItForm.description);
  }, [PostItForm, setTitle, setDescription]);

  return (
    <div className="forms-container">
      <form className="postit-form">
        <TextField
          name="title"
          label="Title"
          variant="filled"
          value={title}
          onChange={handleChange}
          error={titleError !== ''}
          helperText={titleError}
          margin="normal"
          size="small"
        />
        <TextField
          name="description"
          label="Description"
          variant="filled"
          value={description}
          onChange={handleChange}
          error={descriptionError !== ''}
          helperText={descriptionError}
          className="input"
          margin="normal"
          size="small"
          multiline="true"
          minRows="3"
          maxRows="3"
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          className="forms-button"
          size="small"
        >
          {PostItForm.id !== 0 ? 'Edit' : 'Add'}
        </Button>
      </form>
    </div>
  );
}

Form.propTypes = {
  handleEdit: PropTypes.func.isRequired,
};
