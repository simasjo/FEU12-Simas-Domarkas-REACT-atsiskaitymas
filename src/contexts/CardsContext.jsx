import { createContext, useEffect, useReducer } from "react";

const CardsContext = createContext();

export const CardsActionTypes = {
  getAll: 'fetches all data on initial load',
  addNew: 'adds new card to the data',
  delete: 'delete one specific card',
  edit: 'edit one specific card',
  editComment: 'edit one specific comment',
  addComment: 'add new comment to a specific card',
  deleteComment: 'delete one specific comment from a card',
  likeCard: 'Like',
  dislikeCard: 'Dislike'
}

const reducer = (state, action) => {
  switch(action.type){
    case CardsActionTypes.getAll:
      return action.data.map(card => ({ ...card, likes: 0, dislikes: 0 }));
    case CardsActionTypes.addNew:
      fetch(`http://localhost:8080/cards`, {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(action.data)
      });
      return [...state, action.data];
    case CardsActionTypes.delete:
      fetch(`http://localhost:8080/cards/${action.id}`,{ method: "DELETE" });
      return state.filter(el => el.id !== action.id);

    case CardsActionTypes.edit:
      const editedCardIndex = state.findIndex(el => el.id === action.id);
      if (editedCardIndex === -1) {
        console.error('Card not found.');
        return state;
      }
      const updatedCards = [...state];
      updatedCards[editedCardIndex] = {
        ...updatedCards[editedCardIndex],
        ...action.data
      };
      fetch(`http://localhost:8080/cards/${action.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(action.data)
      });
      return updatedCards;

    case CardsActionTypes.editComment:
      const cardToEditComment = state.find(el => el.id === action.cardId);
      const commentIndex = cardToEditComment.comments.findIndex(comment => comment.id === action.commentId);
      if (commentIndex === -1) {
        console.error('Comment not found.');
        return state;
      }
      const updatedComments = [...cardToEditComment.comments];
      updatedComments[commentIndex] = {
        ...updatedComments[commentIndex],
        ...action.data
      };
      const updatedCardWithComment = {
        ...cardToEditComment,
        comments: updatedComments
      };
      fetch(`http://localhost:8080/cards/${action.cardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedCardWithComment)
      });
      return state.map(el => {
        if (el.id === action.cardId) {
          return updatedCardWithComment;
        } else {
          return el;
        }
      });

    case CardsActionTypes.addComment:
      const cardToAddComment = state.find(el => el.id === action.cardId);
      const commentedCard = {
        ...cardToAddComment,
        comments: cardToAddComment.comments ? [...cardToAddComment.comments, action.comment] : [action.comment]
      };
      fetch(`http://localhost:8080/cards/${action.cardId}`,{
        method: "PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(commentedCard)
      });
      return state.map(el => {
        if(el.id === action.cardId){
          return commentedCard;
        } else {
          return el;
        }
      });

    case CardsActionTypes.deleteComment:
      const cardToChange = state.find(el => el.id === action.cardId);
      const changedCard = {
        ...cardToChange,
        comments: cardToChange.comments.filter(comment => comment.id !== action.commentId)
      };
      fetch(`http://localhost:8080/cards/${action.cardId}`,{
        method: "PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(changedCard)
      });
      return state.map(el => {
        if(el.id === action.cardId){
          return changedCard;
        } else {
          return el;
        }
      });

    case CardsActionTypes.likeCard:
      const likedCardIndex = state.findIndex(el => el.id === action.cardId);
      if (likedCardIndex === -1) {
        console.error('Card not found.');
        return state;
      }
      const updatedCardsLiked = [...state];
      updatedCardsLiked[likedCardIndex] = {
        ...updatedCardsLiked[likedCardIndex],
        likes: (updatedCardsLiked[likedCardIndex].likes || 0) + 1,
        dislikes: updatedCardsLiked[likedCardIndex].dislikes || 0 // Nepakeiskite nepatikti skaičiaus
      };
      fetch(`http://localhost:8080/cards/${action.cardId}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      });
      return updatedCardsLiked;

    case CardsActionTypes.dislikeCard:
      const dislikedCardIndex = state.findIndex(el => el.id === action.cardId);
      if (dislikedCardIndex === -1) {
        console.error('Card not found.');
        return state;
      }
      const updatedCardsDisliked = [...state];
      updatedCardsDisliked[dislikedCardIndex] = {
        ...updatedCardsDisliked[dislikedCardIndex],
        likes: updatedCardsDisliked[dislikedCardIndex].likes || 0, // Nepakeiskite patikti skaičiaus
        dislikes: (updatedCardsDisliked[dislikedCardIndex].dislikes || 0) + 1
      };
      fetch(`http://localhost:8080/cards/${action.cardId}/dislike`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      });
      return updatedCardsDisliked;

    default:
      console.error(`No such reducer actions: ${action.type}`);
      return state;
  }
}

const CardsProvider = ({ children }) => {

  const [cards, setCards] = useReducer(reducer, []);

  useEffect(()=>{
    fetch(`http://localhost:8080/cards`)
      .then(res => res.json())
      .then(data => setCards({
        type: CardsActionTypes.getAll,
        data: data
      }));
  },[]);

  return(
    <CardsContext.Provider
      value={{
        cards,
        setCards
      }}
    >
      { children }
    </CardsContext.Provider>
  )
}

export { CardsProvider };
export default CardsContext;