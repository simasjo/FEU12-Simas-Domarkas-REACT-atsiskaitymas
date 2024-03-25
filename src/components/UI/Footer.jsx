import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledFooter = styled.footer`
    height: 150px;
    border-top: 3px solid black;
    padding: 0 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    >div{
        height: 80%;
        display: flex;
        align-items: center;
        gap: 10px;
        > a{
            height: 50%;
            >img{
            height: 100%;
            }
        }
    }

    >ul{
    list-style-type: none;
    > li:first-child{
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 10px;
    }
    li{
        margin-bottom: 5px;
        >a{
            text-decoration: none;
            >i{
                font-size: 20px;
                margin-right: 10px;
            }
        }
    }
    }
`;

const Footer = () => {
    return ( 
        <StyledFooter>
            <div>
                <Link to='/'>
                    <img 
                    src="https://www.freelogodesign.org/assets/img/home/icones/free.svg" 
                    alt="freeLogo" 
                />
                </Link>
                <p>Coppyrights &copy; 2024 by Simas</p>
            </div>
            <ul>
                <li>Legal</li>
                <li><Link>Terms & Conditions</Link></li>
                <li><Link>Privacy Policy</Link></li>
                <li><Link>Terms of use</Link></li>
            </ul>
            <ul>
                <li>Socials</li>
                <li>
                <Link><i className="bi bi-facebook"></i></Link>
                <Link><i className="bi bi-instagram"></i></Link>
                </li>
                <li>
                <Link><i className="bi bi-twitter-x"></i></Link>
                <Link><i className="bi bi-linkedin"></i></Link>
                </li>
            </ul>
        </StyledFooter>        
     );
}
 
export default Footer;