import { useContext } from "react";
import CardsContext from "../../contexts/CardsContext";
import Card from "../UI/Card";
import styled from "styled-components";

const StyledSection = styled.section`

> h1{
    text-align: center;
}
> div{
    margin: 0 auto;
    width: 80%;
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
}   
`;

const Cards = () => {

    const { cards } = useContext(CardsContext);

    return ( 
        <StyledSection>
            <h1>All Our Cards</h1>
            <div>
            {
                cards.map(card =>
                    <Card
                    key={card.id}
                    data={card}
                    />
                    )
            }
            </div>
        </StyledSection>
     );
}
 
export default Cards;