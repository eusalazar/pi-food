import axios from 'axios';
export const GET_ALL_RECIPES= 'GET_ALL_RECIPES';



//conexion con el back
export function getRecipes(){
    return async function(dispatch){
    const json = await axios.get("http://localhost:3001/recipes");
    return dispatch({
        type: 'GET_ALL_RECIPES',
        payload: json.data
    })
    }
}