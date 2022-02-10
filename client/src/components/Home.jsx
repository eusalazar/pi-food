import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";


export default function Home(){
    const dispatch = useDispatch(); //con esta const voy despachando mis acciones
    const allrecipes = useSelector((state) => state.recipes)//con uS traeme en una const todo lo que esta en state.recip


    useEffect(() => {
        dispatch(getRecipes());
      }, [dispatch]);//lo paso como segundo par para que no se genere un bucle infinito,es una dependecia,se monta    
                      //mientras suceda el dispatch
        
    function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
                      }
    return(
        <div>
            <Link to='/recipes'>Crear Recetas</Link>
            <h1>Bienvenidos a mi Aplicacion de Comidas</h1>
            <button onClick={e => {handleClick(e)}}>  
                Volver a cargar las recetas
                </button>
                <div>
                     <select>
                        <option value ='alf'>Alfabeticamente</option>
                        <option value ='aaz'>A a Z</option>
                        <option value ='zaa'>Z a A</option>
                    </select> 
                <select>
                    <option value = 'punt'>Puntuacion</option>
                    <option value = 'asc'>Ascendente</option>
                    <option value = 'desc'>Desedente</option>
                    
                </select>
                <select>
                    <option value ='diet'>Tipos de dietas</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="ketogenic">Keto</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="lacto vegetarian">Lacto-Vegetarian</option>
                    <option value="ovo vegetarian">Ovo-Vegetarian</option>
                    <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescetarian">Pescetarian</option>
                    <option value="paleolithic">Paleo</option>
                    <option value="primal">Primal</option>
                    <option value="low fodmap">Low FODMAP</option>
                    <option value="whole 30">Whole30</option>
                    <option value="dairy free">Dairy Free</option>
                

                </select>
                {
                    allrecipes ?.map(r =>{
                        return(
                            <Fragment>
                            <Link to={'/home/' + r.id} >
                            <Card
                            key={r.id}
                            name={r.name}
                            img={r.img}
                            type={r.type}
                            diets={r.diets}
                            healthScore={r.score}/>
                        </Link>
                        </Fragment>
                        )
                    })
                }
        </div>        
        </div>

       )



    }                         

