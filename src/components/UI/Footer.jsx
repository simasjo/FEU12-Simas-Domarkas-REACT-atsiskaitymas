import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledFooter = styled.footer`
    height: 150px;
    border-top: 1px solid black;
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
    display: flex;
    gap: 10px;
    
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
                <p>Autorių teisės &copy; 2024 Simas</p>
            </div>
            <ul>
                <li><Link>Taisyklės ir sąlygos</Link></li>
                <li><Link>Privatumo politika</Link></li>
                <li><Link>Naudojimo salygos</Link></li>
            </ul>
            <ul>
                <li>Socialiniai tinklai</li>
                <li>
                    <Link><i className="bi bi-facebook"></i></Link>
                    <Link><i className="bi bi-instagram"></i></Link>
                    <Link><i className="bi bi-twitter-x"></i></Link>
                    <Link><i className="bi bi-linkedin"></i></Link>
                </li>
            </ul>
        </StyledFooter>
    );
}

export default Footer;