import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PostItContext from '../context/PostItContext';
import UserContext from '../context/UserContext';

export default function Form({ handleEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [hidden, alterHidden] = useState(true);
  const { PostItForm, setPostItForm } = useContext(PostItContext);
  const { token } = useContext(UserContext);
  const TWO_SECONDS = 2000;

  const handleChange = ({ target }) => {
    if (target.name === 'title') {
      setTitle(target.value);
    }
    if (target.name === 'description') {
      setDescription(target.value);
    }
  };

  function verifyInputs() {
    if (title === '') {
      setError('Title cannot be empty');
      alterHidden(false);
      setTimeout(() => {
        alterHidden(true);
      }, TWO_SECONDS);
    } else if (description === '') {
      setError('Description cannot be empty');
      alterHidden(false);
      setTimeout(() => {
        alterHidden(true);
      }, TWO_SECONDS);
    } else {
      return true;
    }
    return false;
  }

  function handleSubmit() {
    if (verifyInputs()) {
      const postIt = {
        title,
        description,
      };
      if (PostItForm.id !== 0) {
        handleEdit(PostItForm.id, postIt, token);
      } else {
        handleEdit(postIt, token);
      }
      setPostItForm({
        id: 0,
        title: '',
        description: '',
      });
    }
  }

  useEffect(() => {
    setTitle(PostItForm.title);
    setDescription(PostItForm.description);
  }, [PostItForm, setTitle, setDescription]);

  return (
    <>
      <div hidden={hidden}>
        <span>
          {error}
        </span>
      </div>
      <form>
        <label htmlFor="description">
          <input
            name="title"
            placeholder="Title"
            value={title}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          <textarea
            name="description"
            placeholder="Description"
            value={description}
            onChange={handleChange}
          />
        </label>
        <div>
          <button type="button" onClick={handleSubmit}>{PostItForm.id !== 0 ? 'Edit' : 'Add'}</button>
        </div>
      </form>
    </>
  );
}

Form.propTypes = {
  handleEdit: PropTypes.func.isRequired,
};
