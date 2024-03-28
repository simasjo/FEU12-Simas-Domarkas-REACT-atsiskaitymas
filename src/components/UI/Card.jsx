import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import CardsContext from "../../contexts/CardsContext";
import { CardsActionTypes } from "../../contexts/CardsContext";
import { Link } from "react-router-dom";

const StyledDiv = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  > h3 {
    margin: 0;
  }
  > p {
    margin: 0;
    text-align: justify;
  }
  .edit-modal {
    display: flex;
    flex-direction: column;
    > input {
      text-align: center;
    }
    > textarea {
      text-align: center;
      width: 100%;
      height: 200px;
    }
  }
  .LikeStyle{
    >button{
      margin-right: 10px;
    }
  }
`;

const EditModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    onSave(title, description);
    onClose();
    setTitle("");
    setDescription("");
  };

  return isOpen ? (
    <div className="edit-modal">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  ) : null;
};

const Card = ({ data, location }) => {
  const { setCards } = useContext(CardsContext);
  const { loggedInUser } = useContext(UsersContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [likes, setLikes] = useState(
    () => parseInt(localStorage.getItem(`likes_${data.id}`)) || data.likes || 0
  );
  const [dislikes, setDislikes] = useState(
    () => parseInt(localStorage.getItem(`dislikes_${data.id}`)) || data.dislikes || 0
  );
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    localStorage.setItem(`likes_${data.id}`, likes);
    localStorage.setItem(`dislikes_${data.id}`, dislikes);
  }, [likes, dislikes, data.id]);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (title, description) => {
    setCards({
      type: CardsActionTypes.edit,
      id: data.id,
      data: {
        title: title,
        description: description,
      },
    });
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

  return (
    <StyledDiv>
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <div className="LikeStyle">
        <button onClick={handleLike}>{liked ? "Patinka" : "Patinka"} ({likes})</button>
        <button onClick={handleDislike}>{disliked ? "Nepatinka" : "Nepatinka"} ({dislikes})</button>
      </div>
      <Link to={`/cards/${data.id}`}>Komentarai</Link>
      {location.pathname !== "/cards/allCards" && loggedInUser.id === data.userId && (
        <>
          <button
            onClick={() => {
              setCards({
                type: CardsActionTypes.delete,
                id: data.id,
              });
            }}
          >
            Delete
          </button>
          <button onClick={handleEdit}>Redaguoti</button>
        </>
      )}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
      />
    </StyledDiv>
  );
};

export default Card;
