import { createContext, useEffect, useReducer } from "react";

const CardsContext = createContext();

export const CardsActionTypes = {
    getAll: 'fetches all data on initial load',
    addNew: 'adds new card to the data'
}

const reducer = (state, action) => {
    switch(action.type){
        case CardsActionTypes.getAll:
            return action.data;
        case CardsActionTypes.addNew:
            fetch(`http://localhost:8080/cards`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(action.data)
            });
            return [...state, action.data];
        default:
            console.error(`No such reducer actions: ${action.type}`);
            return state;
    }
}

const CardsProvider = ({ children }) => {

    const [cards, setCards] = useReducer(reducer, []);

    useEffect(()=>{
        fetch(`http://localhost:8080/cards`)
        .then(res => res.json())
        .then(data => setCards({
            type: CardsActionTypes.getAll,
            data: data
        }));
    },[]);

    return(
        <CardsContext.Provider
            value={{
                cards,
                setCards
            }}
        >
            { children }
        </CardsContext.Provider>
    )
}

export { CardsProvider };
export default CardsContext;