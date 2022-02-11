import React from "react";



export default function Paginado({recipesPerPage, allrecipes, paginado}){//declaro mi paginado
    const pageNumbers = [];

    for(let i=0; i <=Math.ceil(allrecipes/recipesPerPage); i++){//tomo el nro redondo del res de esta division
        pageNumbers.push(i+1) //pusheo el resultado al [] vacio
    }
    return(//renderizo
        <nav>
            <ul className="paginado">
                {pageNumbers &&   //si tengo este arreglo mapealo,devolve cda uno de los nros que te dev el paginado
                pageNumbers.map(number=>(
                    <li className="number" key={number}>
                    <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}

                

            </ul>
        </nav>
    )

}