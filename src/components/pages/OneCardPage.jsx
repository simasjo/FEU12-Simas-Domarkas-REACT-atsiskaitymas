import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import CardsContext from "../../contexts/CardsContext";
import { CardsActionTypes } from "../../contexts/CardsContext";

const StyledSection = styled.section`
  padding-top: 50px;

  > div{
    border: 1px solid black;
    padding: 10px 20px;

    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    
    > h3{
      margin: 0;
    }
    > p{
      margin: 0;
      text-align: justify;
    }
  }
`;

const OneCardPage = () => {

  const { id } = useParams();
  const navigation = useNavigate();
  const { loggedInUser } = useContext(UsersContext);
  const { setCards } = useContext(CardsContext);
  const [card, setCard] = useState([]);

  useEffect(()=>{
    fetch(`http://localhost:8080/cards/${id}`)
      .then(res => res.json())
      .then(data => setCard(data));
  },[id]);

  return (
    <StyledSection>
      <div>
        <h3>{card.title}</h3>
        <p>{card.description}</p>
        {
          loggedInUser.id === card.userId &&
          <button
            onClick={() => {
              setCards({
                type: CardsActionTypes.delete,
                id: card.id
              });
              navigation(-1);
            }}
          >Delete</button>
        }
      </div>
    </StyledSection>
  ); 
}
 
export default OneCardPage;