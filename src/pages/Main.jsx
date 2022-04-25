import React, { useContext, useEffect, useState } from 'react';
import {
  getPostItList, postPostIt, putPostIt, deletePostIt,
} from '../helpers';
import UserContext from '../context/UserContext';
import Header from '../components/Header';
import PostItCard from '../components/PostItCard';
import Form from '../components/Form';

export default function Main() {
  const [postIts, setPostIts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLogged } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [hidden, alterHidden] = useState(true);
  const TWO_SECONDS = 2000;

  async function updatePostIts(token) {
    setIsLoading(true);
    const PostItList = await getPostItList(token);
    PostItList.sort((a, b) => a.id - b.id);
    if (PostItList.length) {
      setIsLoading(false);
      setPostIts(PostItList);
    }
  }

  const handleEdit = async (postIt, token, id = 0) => {
    let error = false;
    if (id === 0) {
      const { error: fetchError } = await postPostIt(postIt, token);
      error = fetchError;
    } else {
      const { error: fetchError } = await putPostIt(id, postIt, token);
      error = fetchError;
    }
    if (error) {
      setErrorMessage(error);
      alterHidden(false);
      setTimeout(() => {
        alterHidden(true);
      }, TWO_SECONDS);
      return;
    }
    updatePostIts(token);
  };

  const handleDelete = async (id, token) => {
    const { error } = await deletePostIt(id, token);
    if (error) {
      setErrorMessage(error);
      alterHidden(false);
      setTimeout(() => {
        alterHidden(true);
      }, TWO_SECONDS);
      return;
    }
    updatePostIts(token);
  };

  useEffect(() => {
    updatePostIts(user.token);
  }, []);

  return (
    <div className="main-container">
      <Header />
      <div className="main-content-2">
        { isLogged
        && (
          <Form
            handleEdit={handleEdit}
          />
        ) }
        { isLoading
          ? (
            <div>Your list is Empty!</div>
          ) : (
            <div className="postit-container">
              { postIts.length > 1 && postIts.map((postItInfo) => (
                <PostItCard
                  postIt={postItInfo}
                  handleDelete={handleDelete}
                  key={postItInfo.id}
                />
              )) }
            </div>
          )}
        <div hidden={hidden}>
          <span>
            {errorMessage}
          </span>
        </div>
      </div>
    </div>
  );
}
