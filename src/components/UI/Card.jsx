import React, { useContext, useState } from "react";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import CardsContext from "../../contexts/CardsContext";
import { CardsActionTypes } from "../../contexts/CardsContext";
import { Link } from "react-router-dom";

const StyledDiv = styled.div`
   border: 1px solid black;
   padding: 10px 20px;

   display: flex;
   flex-direction: column;
   gap: 10px;
   align-items: center;

   > h3{
    margin: 0;
   }
   > p{
    margin: 0;
    text-align: justify;
   }
   .edit-modal{
    display: flex;
    flex-direction: column;
    > input{
     text-align: center;
    }
    > textarea{
      text-align: center;
      width: 100%;
      height: 200px;
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
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  ) : null;
};

const Card = ({ data, location }) => {
  const { setCards } = useContext(CardsContext);
  const { loggedInUser } = useContext(UsersContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (title, description) => {
    setCards({
      type: CardsActionTypes.edit,
      id: data.id,
      data: {
        title: title,
        description: description
      }
    });
  };

  return ( 
    <StyledDiv>
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <Link to={`/cards/${data.id}`}>More info...</Link>
      {location.pathname !== "/cards/allCards" && loggedInUser.id === data.userId && (
        <>
          <button onClick={() => { 
            setCards({
              type: CardsActionTypes.delete,
              id: data.id
            });
          }}>Delete</button>
          <button onClick={handleEdit}>Edit</button>
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
