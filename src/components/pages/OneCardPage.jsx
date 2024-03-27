import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import CardsContext, { CardsActionTypes } from "../../contexts/CardsContext";
import Comment from "../UI/Comment";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';

const StyledSection = styled.section`
  padding-top: 50px;

  > div{
    border: 1px solid black;
    padding: 10px 20px;

    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    
    > h3{
      margin: 0;
    }
    > p{
      margin: 0;
      text-align: justify;
    }
  }
  .CommentDiv{
    display: flex;
    flex-direction: column;
    align-items: center;
    >textarea{
      width: 400px;
      height: 100px;
      text-align: center;
    }
  }
  .komentavimas{
    display: block;
    margin: 0 auto;
  }
  
`;

const OneCardPage = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const { loggedInUser } = useContext(UsersContext);
  const { setCards, cards } = useContext(CardsContext);
  const card = cards.find(card => card.id === id);

  const formik = useFormik({
    initialValues: {
      text: ''
    },
    validationSchema: Yup.object({
      text: Yup.string()
        .min(10, 'Comment must be at least 10 symbols length')
        .max(500, "Comment can't be longer than 500 symbols")
        .required('This field must be filled')
        .trim()
    }),
    onSubmit: (values) => {
      const newComment = {
        text: values.text,
        id: uuid(),
        authorId: loggedInUser.id
      }
      
      setCards({
        type: CardsActionTypes.addComment,
        comment: newComment,
        cardId: card.id
      });
      formik.resetForm();
    }
  });

  return (
    <StyledSection>
      {card && (
        <>
          <div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            {loggedInUser.id === card.userId && (
              <button
                onClick={() => {
                  setCards({
                    type: CardsActionTypes.delete,
                    id: card.id
                  });
                  navigation(-1);
                }}
              >
                Delete
              </button>
            )}
          </div>
          <div>
            {card.comments?.map(comment => (
              <Comment
                key={comment.id}
                comment={comment}
                cardId={card.id}
              />
            ))}
          </div>
          {loggedInUser && (
            <form onSubmit={formik.handleSubmit}>
              <div className="CommentDiv">
                <label htmlFor="text">Comment:</label>
                <textarea
                  name="text"
                  id="text"
                  placeholder="Write your comment..."
                  value={formik.values.text}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.text && formik.errors.text && (
                  <p>{formik.errors.text}</p>
                )}
              </div>
              <input className="komentavimas" type="submit" value="Comment" />
            </form>
          )}
        </>
      )}
    </StyledSection>
  );
}
 
export default OneCardPage;
