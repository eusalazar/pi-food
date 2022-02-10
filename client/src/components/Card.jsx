import React from "react";
import { Link } from "react-router-dom";



function CardRecipe({ name, img, type, diets, healthScore, id }){
    return(
        <Link to={`/home/recipe/${id}`}>
        <div>
            <img src={img} alt="imagen" />
            <h3>{name}</h3>
            <h3>{healthScore}</h3>
            <h3>{type}</h3>
            <h3>{diets}</h3>
        </div>
        </Link>
    )
}

export default CardRecipe ;