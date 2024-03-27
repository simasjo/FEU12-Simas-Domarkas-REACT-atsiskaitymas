import React, { useContext, useState, useEffect } from "react";
import UsersContext from "../../contexts/UsersContext";
import CardsContext, { CardsActionTypes } from "../../contexts/CardsContext";

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
      console.error('You are not allowed to edit this comment.');
    }
  };

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    }
    // Update the comment's like count on the server
    // This should be done similarly to how you update the comment's other properties
  };

  const handleDislike = () => {
    if (!disliked) {
      setDislikes(dislikes + 1);
      setDisliked(true);
    } 
    // Update the comment's dislike count on the server
    // This should be done similarly to how you update the comment's other properties
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
      <div className="edit-modal">
        <textarea value={editedText} onChange={(e) => setEditedText(e.target.value)} />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    ) : null;
  };

  return (
    <>
      {
        users.length && 
        <div>
          <p>Comment by: {author.userName}</p>
          <p>{comment.text}</p>
          <div>
            <button onClick={handleLike}>{liked ? 'Liked' : 'Like'} ({likes})</button>
            <button onClick={handleDislike}>{disliked ? 'Disliked' : 'Dislike'} ({dislikes})</button>
          </div>
          {
            loggedInUser.id === comment.authorId &&
            <>
              <button onClick={()=> setCards({
                type: CardsActionTypes.deleteComment,
                commentId: comment.id,
                cardId: cardId
              })}>Delete</button>
              <button onClick={handleEdit}>Edit</button>
            </>
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
