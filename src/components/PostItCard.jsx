import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../context/UserContext';
import PostItContext from '../context/PostItContext';

export default function PostItCard({
  postit, handleDelete,
}) {
  const { id, title, description } = postit;
  const [expand, setExpand] = useState(true);
  const { setPostItForm } = useContext(PostItContext);
  const { user: { token } } = useContext(UserContext);

  function handleExpand() {
    setExpand(!expand);
  }

  function handleEdit() {
    setPostItForm(postit);
    setExpand(!expand);
  }

  function handleDeleteBtn() {
    handleDelete(id, token);
    setExpand(!expand);
  }

  return (
    <div id={`${id}-postit-card`} key={`${id}-postit-card`}>
      <div>
        <button type="button" onClick={handleExpand}>...</button>
      </div>
      <div hidden={expand}>
        <button type="button" onClick={handleEdit}>Edit</button>
        <button type="button" onClick={handleDeleteBtn}>Delete</button>
      </div>
      <h4>{ title }</h4>
      <div>
        <p>{ description }</p>
      </div>
    </div>
  );
}

PostItCard.propTypes = {
  postit: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
