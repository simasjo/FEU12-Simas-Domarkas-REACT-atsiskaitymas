import { useContext, useState } from "react";
import UsersContext from "../../contexts/UsersContext";
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import styled from 'styled-components';
import bcrypt from 'bcryptjs';

const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 70px;

    > h1{
        font-size: 3rem;
    }
    > form{
        display: flex;
        flex-direction: column;
        gap: 5px;
        
        >div{
            display: grid;
            grid-template-columns: 1fr 2fr;

            >p{
                grid-column: span 3;
                color: red;
                text-align: center;

            }
        }
        +p{
            color: red;
        }
    }
`;

const Login = () => {

    const navigate = useNavigate();
    const [wrongCredentials, setWrongCredentials] = useState(false);
    const { users, setLoggedInUser } = useContext(UsersContext);

    const formik = useFormik({
        initialValues: {
            userName: "",
            password: ""
        },
        onSubmit: (values) => {
            const loggedInUser = users.find(user => user.userName === values.userName && bcrypt.compareSync(values.password, user.password));

            if (loggedInUser === undefined) {
                setWrongCredentials(true);
            } else {
                setLoggedInUser(loggedInUser);
                navigate('/');
            }

        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .required('Šitas langas turi būri užpildytas')
                .trim(),
            password: Yup.string()
                .required('Šitas langas turi būri užpildytas')
                .trim()
        })
    });

    return (
        <StyledSection>
            <h1>Prisijungti</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="userName">Vartotojo vardas:</label>
                    <input
                        type="text"
                        name="userName" id="userName"
                        placeholder="Įveskite vartotojo vardą..."
                        value={formik.values.userName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {
                        formik.touched.userName && formik.errors.userName &&
                        <p>{formik.errors.userName}</p>
                    }
                </div>
                <div>
                    <label htmlFor="password">Slaptažodis:</label>
                    <input
                        type="password"
                        name="password" id="password"
                        placeholder="Įveskite slaptažodį..."
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {
                        formik.touched.password && formik.errors.password &&
                        <p>{formik.errors.password}</p>
                    }
                </div>
                <input type="submit" value="Prisijungti" />
            </form>
            {
                wrongCredentials && <p>Nėra tokio vartotojo vardo arba slaptažodžio</p>
            }
        </StyledSection>
    );
}

export default Login;