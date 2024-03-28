import styled from "styled-components";

const StyledSection = styled.section`
    display: grid;
    justify-items: center;
    grid-template-columns: 3fr 2fr;
    padding-top: 50px;

        >h1{
            grid-area: 1 / 1 / 2 / -1;
            font-size: 3rem;
        }
        >p{
            font-size: 2rem;
            text-align: justify;
            width: 30ch;
            justify-self: start;
        }
        >img{
            height: 300px;
            width: 700px;
        }
`;

const Home = () => {
    return (
        <StyledSection>
            <h1>AK-47 Forumas</h1>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/65/AK-47_type_II_noBG.png"
                alt="ak47"
            />
            <p>
                Sveiki atvykę į ginklų forumą, jame galėsite rasti informacijos apie populiariausius ginklus. Forumo tikslas - leisti užduoti klausimus, į juos atsakinėti ir žymėti patinkančius arba nepatinkančius atsakymus ir klausimus.
            </p>
        </StyledSection>
    );
}

export default Home;