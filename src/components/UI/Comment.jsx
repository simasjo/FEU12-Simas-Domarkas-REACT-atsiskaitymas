import { useContext, useState } from "react";
import UsersContext from "../../contexts/UsersContext";
import CardsContext, { CardsActionTypes } from "../../contexts/CardsContext";

const Comment = ({ comment, cardId }) => {

  const { loggedInUser, users } = useContext(UsersContext);
  const { setCards } = useContext(CardsContext);
  const author = users.find(user => user.id === comment.authorId);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    if (loggedInUser.id === comment.authorId) {
      setIsEditModalOpen(true);
    } else {
      // Jei vartotojas nėra prisijungęs arba bandė redaguoti ne savo komentarą,
      // galite čia atlikti tinkamus veiksmus, pvz., išvesti klaidos pranešimą arba nukreipti į prisijungimo puslapį.
      console.error('You are not allowed to edit this comment.');
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
