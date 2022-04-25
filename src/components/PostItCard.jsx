import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Button } from '@mui/material';
import UserContext from '../context/UserContext';
import PostItContext from '../context/PostItContext';

export default function PostItCard({
  postIt, handleDelete,
}) {
  const { id, title, description } = postIt;
  const { setPostItForm } = useContext(PostItContext);
  const { user: { token }, isLogged } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const expand = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setPostItForm(postIt);
    handleClose();
  };

  const handleDeleteBtn = () => {
    handleDelete(id, token);
    handleClose();
  };

  return (
    <div
      id={`${id}-postit-card`}
      key={`${id}-postit-card`}
      className="postit"
    >
      <div className="postit-header">
        { isLogged && (
          <div className="expand-menu">
            <Button
              aria-controls={expand ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={expand ? 'true' : undefined}
              onClick={handleClick}
              className="expand-btn"
            >
              ...
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={expand}
              onClose={handleClose}
            >
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDeleteBtn}>Delete</MenuItem>
            </Menu>
          </div>
        )}
      </div>
      <div className="postit-text">
        <h4>{ title }</h4>
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
