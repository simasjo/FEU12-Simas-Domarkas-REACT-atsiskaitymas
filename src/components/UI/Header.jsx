import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import UsersContext from "../../contexts/UsersContext";
import { useContext } from "react";

const StyledHeader = styled.header`
   padding: 0 20px;
   border-bottom : 1px solid black;
   height: 80px;

   display: flex;
   justify-content: space-between;
   align-items: center;
   
   >div:nth-child(1){
    height: 80%;
    >a{
        >img{
            height: 100%;
        }
    }
   }

   >nav{
    >ul{
        margin: 0;
        padding: 0;
        list-style-type: none;
        display: flex;
        gap: 10px;
      >li{
        >a{
            text-decoration: none;
            font-size: 1.5rem;
            color: black;
            font-weight: bold;
        }
        >a.active{
            color: #0296aa;
        }
        >a:hover{
            color: #b40057;
        }
       } 
    }
   }

   > div:nth-child(3){
    display: flex;
    gap: 10px;
    align-items: center;
    >p{
        >a{
            color: black;
            text-decoration: none;
        }
    }
   }
`;

const Header = () => {

    const navigate = useNavigate();
    const { loggedInUser, setLoggedInUser } = useContext(UsersContext);

    return (
        <StyledHeader>
            <div>
                <Link to='/'>
                    <img
                        src="https://www.freelogodesign.org/assets/img/home/icones/free.svg"
                        alt="freeLogo"
                    />
                </Link>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/cards/allCards'>Forumas</NavLink>
                    </li>
                </ul>
            </nav>
            {
                loggedInUser ?
                    <div>
                        <p>
                            <Link to={`/user/${loggedInUser.userName}`}>{loggedInUser.userName}</Link>
                        </p>
                        <button
                            onClick={() => {
                                setLoggedInUser(false);
                                navigate('/');
                            }}
                        >Atsijungti</button>
                    </div> :
                    <nav>
                        <ul>
                            <li>
                                <NavLink to='/user/register'>Registruotis</NavLink>
                            </li>
                            <li>
                                <NavLink to='/user/login'>Prisijungti</NavLink>
                            </li>
                        </ul>
                    </nav>

            }
        </StyledHeader>
    );
}

export default Header;
