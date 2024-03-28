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
    >button{
      margin-right: 10px;
    }
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
  const [sortByComments, setSortByComments] = useState(false);
  const [showAnswered, setShowAnswered] = useState(false);

  const handleSortByComments = () => {
    setSortByComments(!sortByComments);
  };

  const handleToggleAnswered = () => {
    setShowAnswered(!showAnswered);
  };

  const sortCardsByComments = (cards) => {
    return cards.slice().sort((a, b) => {
      if (sortByComments) {
        return (a.comments?.length || 0) - (b.comments?.length || 0);
      } else {
        return (b.comments?.length || 0) - (a.comments?.length || 0);
      }
    });
  };

  const filterCardsByAnswered = (cards) => {
    if (showAnswered) {
      return cards.filter((card) => card.comments && card.comments.length > 0);
    } else {
      return cards;
    }
  };

  return (
    <StyledSection>
      <h1>Komentarai</h1>
      {loggedInUser && <p><Link to="/cards/addNew">Pridėti naują komentarą</Link></p>}
      <p>
        <button onClick={handleSortByComments}>
          {sortByComments ? 'Rykiuoti mažiausiai komentuotus' : 'Rykiuoti daugiausiai komentuotus'}
        </button>
        <button onClick={handleToggleAnswered}>
          {showAnswered ? 'Rodyti visus komentarus' : 'Rodyti pakomentuotus komentarus'}
        </button>
      </p>
      <div>
        {sortCardsByComments(filterCardsByAnswered(cards)).map((card) => (
          <Card key={card.id} data={card} location={location} />
        ))}
      </div>
    </StyledSection>
  );
};

export default Cards;
