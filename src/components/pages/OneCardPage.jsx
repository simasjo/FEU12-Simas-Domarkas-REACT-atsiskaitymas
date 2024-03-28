import React, { useContext } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import UsersContext from "../../contexts/UsersContext";
import CardsContext, { CardsActionTypes } from "../../contexts/CardsContext";
import Comment from "../UI/Comment";

const StyledSection = styled.section`
  padding-top: 50px;

  > div {
    border: 1px solid black;
    background-color: #fce7e7;
    border-radius: 20px;
    padding: 10px 20px;
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;

    > h3 {
      margin: 0;
    }
    > p {
      margin: 0;
      text-align: justify;
    }
  }
  .CommentStyle{
    display: flex;
    flex-direction: column;
    align-items: center;
    > textarea{
      height: 50px;
      width: 300px;
      text-align: center;
      margin-bottom: 10px;
    }
  }
  .KomentaruDiv{
    display: flex;
    justify-content: space-around;
    gap: 50px;
  }
`;

const OneCardPage = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const { loggedInUser } = useContext(UsersContext);
  const { setCards, cards } = useContext(CardsContext);
  const card = cards.find((card) => card.id === id);

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: Yup.object({
      text: Yup.string()
        .min(10, "Komentaras turi būti sudarytas bent iš 10 simbolių")
        .max(500, "Komentaras negali viršyti 500 simbolių")
        .required("Šitas laukas privalo būti užpildytas")
        .trim(),
    }),
    onSubmit: (values) => {
      const newComment = {
        text: values.text,
        id: uuid(),
        authorId: loggedInUser.id,
      };

      setCards({
        type: CardsActionTypes.addComment,
        comment: newComment,
        cardId: card.id,
      });
      formik.resetForm();
    },
  });

  const handleDelete = () => {
    if (loggedInUser && loggedInUser.id === card.userId) {
      setCards({
        type: CardsActionTypes.delete,
        id: card.id,
      });
      navigation(-1);
    } else {
      console.error("Tik prisijungę vartotojai gali trinti korteles");
    }
  };

  return (
    <StyledSection>
      {card && (
        <div>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          {loggedInUser && loggedInUser.id === card.userId && (
            <button onClick={handleDelete}>Ištrinti</button>
          )}
          <div className="KomentaruDiv">
            {card.comments?.map((comment) => (
              <Comment key={comment.id} comment={comment} cardId={card.id} />
            ))}
          </div>
          {loggedInUser && (
            <form onSubmit={formik.handleSubmit}>
              <div className="CommentStyle">
                <label htmlFor="text">Komentaras:</label>
                <textarea
                  name="text"
                  id="text"
                  placeholder="Parašyk savo komentarą..."
                  value={formik.values.text}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.text && formik.errors.text && (
                  <p>{formik.errors.text}</p>
                )}
              </div>
              <input type="submit" value="Komentuoti" />
            </form>
          )}
        </div>
      )}
    </StyledSection>
  );
};

export default OneCardPage;
