import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  getPostItList,
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
  const navigate = useNavigate();
  // const TWO_SECONDS = 2000;

  async function updatePostIts(token) {
    setIsLoading(true);
    const filmsList = await getPostItList(token);
    if (filmsList.length) {
      setIsLoading(false);
      setPostIts(filmsList);
    }
  }

  useEffect(() => {
    if (isLogged) {
      updatePostIts(user.token);
    } else {
      navigate('/signin', { replace: true });
    }
  }, []);

  return (
    <div className="main-container">
      <Header />
      { isLogged
      && (
        <Form />
      ) }
      { isLoading
        ? (
          <div>Your list is Empty!</div>
        ) : (
          <div>
            { postIts && postIts.map((postItInfo) => (
              <PostItCard
                postIt={postItInfo}
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
  );
}
