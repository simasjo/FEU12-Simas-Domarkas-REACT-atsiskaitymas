import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from 'styled-components';

const StyledHeader = styled.header`
   padding: 0 20px;
   border-bottom : 3px solid black;
   height: 80px;

   display: flex;
   justify-content: space-between;
   align-items: center;
   
   >div{
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
            color: green;
        }
        >a:hover{
            color: red;
        }
       } 
    }
   }
`;

const Header = () => {
    return ( 
        <StyledHeader>
            <div>
                <Link>
                    <img 
                    src="https://www.freelogodesign.org/assets/img/home/icones/free.svg" 
                    alt="freeLogo" 
                />
                </Link>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/cards/allCards'>Cards</NavLink>
                    </li>
                </ul>
            </nav>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/user/register'>Register</NavLink>
                    </li>
                    <li>
                        <NavLink to='/user/login'>Login</NavLink>
                    </li>
                </ul>
            </nav>
        </StyledHeader>
     );
}
 
export default Header;