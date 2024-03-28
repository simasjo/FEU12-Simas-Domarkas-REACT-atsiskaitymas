import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CardsContext from "../../contexts/CardsContext";
import Card from "../UI/Card";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";

const StyledSection = styled.section`
  > h1 {
    text-align: center;
  }
  > p {
    text-align: center;
  }
  > div {
    margin: 0 auto;
    width: 80%;
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
  }
`;

const Cards = () => {
  const { cards } = useContext(CardsContext);
  const { loggedInUser } = useContext(UsersContext);
  const location = useLocation();
  const [filtered, setFiltered] = useState(false);

  const handleFilter = () => {
    setFiltered(!filtered);
  };

  return (
    <StyledSection>
      <h1>All Our Cards</h1>
      {loggedInUser && <p><Link to="/cards/addNew">Add New Card</Link></p>}
      <p><button onClick={handleFilter}>{filtered ? 'Show All Cards' : 'Filter Commented Cards'}</button></p>
      <div>
        {filtered
          ? cards
              .filter((card) => card.comments && card.comments.length > 0)
              .map((card) => (
                <Card key={card.id} data={card} location={location} />
              ))
          : cards.map((card) => <Card key={card.id} data={card} location={location} />)}
      </div>
    </StyledSection>
  );
};

export default Cards;
