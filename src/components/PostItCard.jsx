import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import UserContext from '../context/UserContext';
import PostItContext from '../context/PostItContext';

export default function PostItCard({
  postIt, handleDelete,
}) {
  const { id, title, description } = postIt;
  const [expand, setExpand] = useState(true);
  const { setPostItForm } = useContext(PostItContext);
  const { user: { token }, isLogged } = useContext(UserContext);

  const handleExpand = () => {
    setExpand(!expand);
  };

  const handleEdit = () => {
    setPostItForm(postIt);
    setExpand(!expand);
  };

  const handleDeleteBtn = () => {
    handleDelete(id, token);
    setExpand(!expand);
  };

  return (
    <div
      id={`${id}-postit-card`}
      key={`${id}-postit-card`}
      className="postit"
    >
      <div className="postit-header">
        { isLogged && (
          <div className="postit-menu">
            <Button
              variant="contained"
              onClick={handleExpand}
            >
              ...
            </Button>
          </div>
        ) }
        <div hidden={expand}>
          <Button
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            onClick={handleDeleteBtn}
          >
            Delete
          </Button>
        </div>
      </div>
      <h4>{ title }</h4>
      <div>
        <p>{ description }</p>
      </div>
    </div>
  );
}

PostItCard.propTypes = {
  postIt: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
