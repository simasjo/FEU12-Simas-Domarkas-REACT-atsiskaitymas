import styled from "styled-components";
import { useContext } from "react";
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
`;

const Card = ({ data, location }) => {

   const { setCards } = useContext(CardsContext);
   const { loggedInUser } = useContext(UsersContext);

    return ( 
        <StyledDiv>
        <h3>{data.title}</h3>
        <p>{data.description}</p>
        <Link to={`/cards/${data.id}`}>More info...</Link>
        {
         location.pathname !== "/cards/allCards" &&
         loggedInUser.id === data.userId &&
         <button
         onClick={() => { 
            setCards({
               type: CardsActionTypes.delete,
               id: data.id
            })
         }}
        >Delete</button>
        }
        </StyledDiv>
     );
}
 
export default Card;