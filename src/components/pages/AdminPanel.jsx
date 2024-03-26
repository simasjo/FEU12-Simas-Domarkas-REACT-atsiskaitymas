import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import styled from "styled-components";
import UserCard from "../UI/UserCard";

const StyledSection = styled.section`

    >h1{
        text-align: center;
    }

`;

const AdminPanel = () => {

    const { users } = useContext(UsersContext);

    return ( 
        <StyledSection>
        <h1>Admin Panel</h1>
        <div>
            {
                users.map(user =>
                   <UserCard
                    key={user.id}
                    user={user}
                   /> 
                )
            }
        </div>
        </StyledSection>
     );
}
 
export default AdminPanel;