import React, { useContext, useState, useEffect } from "react";
import UsersContext from "../../contexts/UsersContext";
import CardsContext, { CardsActionTypes } from "../../contexts/CardsContext";
import styled from 'styled-components';

const StyledDiv = styled.section`
display: flex;

>button{
  margin-right:10px;
  margin-bottom:10px;
}
>textarea{
  height: 50px;
  width: 150px;
  margin-right:10px;
}
`;

const Comment = ({ comment, cardId }) => {

  const { loggedInUser, users } = useContext(UsersContext);
  const { setCards } = useContext(CardsContext);
  const author = users.find(user => user.id === comment.authorId);
  const [likes, setLikes] = useState(
    () => parseInt(localStorage.getItem(`comment_likes_${comment.id}`)) || comment.likes || 0
  );
  const [dislikes, setDislikes] = useState(
    () => parseInt(localStorage.getItem(`comment_dislikes_${comment.id}`)) || comment.dislikes || 0
  );
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(`comment_likes_${comment.id}`, likes);
    localStorage.setItem(`comment_dislikes_${comment.id}`, dislikes);
  }, [likes, dislikes, comment.id]);

  const handleEdit = () => {
    if (loggedInUser.id === comment.authorId) {
      setIsEditModalOpen(true);
    } else {
      console.error('Jūs neturite galimybės redaguoti komentaro.');
    }
  };

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      setDislikes(dislikes + 1);
      setDisliked(true);
    }
  };


  const handleSaveEdit = (editedText) => {
    setCards({
      type: CardsActionTypes.editComment,
      cardId: cardId,
      commentId: comment.id,
      data: {
        text: editedText
      }
    });
    setIsEditModalOpen(false);
  };

  const EditModal = ({ isOpen, onClose, onSave }) => {
    const [editedText, setEditedText] = useState(comment.text);

    const handleSave = () => {
      onSave(editedText);
    };

    return isOpen ? (
      <StyledDiv>
        <textarea value={editedText} onChange={(e) => setEditedText(e.target.value)} />
        <button onClick={handleSave}>Išsaugoti</button>
        <button onClick={onClose}>Atšaukti</button>
      </StyledDiv >
    ) : null;
  };

  return (
    <>
      {
        users.length &&
        <div>
          <p>Komentarą sukūrė: {author.userName}</p>
          <p>{comment.text}</p>
          <StyledDiv>
            <button onClick={handleLike}>{liked ? 'Patinka' : 'Patinka'} ({likes})</button>
            <button onClick={handleDislike}>{disliked ? 'Nepatinka' : 'Nepatinka'} ({dislikes})</button>
          </StyledDiv >
          {
            loggedInUser.id === comment.authorId &&
            <StyledDiv>
              <button onClick={() => setCards({
                type: CardsActionTypes.deleteComment,
                commentId: comment.id,
                cardId: cardId
              })}>Ištrinti</button>
              <button className="mygtukaii" onClick={handleEdit}>Redaguoti</button>
            </StyledDiv>
          }
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSaveEdit}
          />
        </div>
      }
    </>
  );
}

export default Comment;
