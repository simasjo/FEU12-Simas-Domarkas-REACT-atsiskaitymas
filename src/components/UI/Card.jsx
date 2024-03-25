import styled from "styled-components";

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

const Card = ({ data }) => {
    return ( 
        <StyledDiv>
        <h3>{data.title}</h3>
        <p>{data.description}</p>
        </StyledDiv>
     );
}
 
export default Card;