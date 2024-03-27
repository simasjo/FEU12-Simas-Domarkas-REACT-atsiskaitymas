import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import CardsContext from "../../contexts/CardsContext";
import { CardsActionTypes } from "../../contexts/CardsContext";

const Comment = ({ comment, cardId }) => {

  const { loggedInUser, users } = useContext(UsersContext);
  const { setCards } = useContext(CardsContext);
  const author = users.find(user => user.id === comment.authorId);

  return (
    <>
      {
        users.length && 
        <div>
          <p>Comment by: {author.userName}</p>
          <p>{comment.text}</p>
          {
            loggedInUser.id === comment.authorId &&
            <button
              onClick={()=> setCards({
                type: CardsActionTypes.deleteComment,
                commentId: comment.id,
                cardId: cardId
              })}
            >Delete</button>
          }
        </div>
      }
    </>
  );
}
 
export default Comment;