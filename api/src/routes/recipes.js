
const { Router } = require("express");
const { Recipe, Diet } = require("../db.js");
const axios = require("axios").default;
const { SPOONACULAR_API_KEY } = process.env;


const router = Router();



const getApi = async () =>{ //llamamos al endpind de la api_traigo esta info de la api
    const apiUrl = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?number=20&addRecipeInformation=true&apiKey=${SPOONACULAR_API_KEY}`   //le pido que me mande esta info
    );
    const data = await apiUrl.data.results.map((r) =>{//me trae la info en .data
     return {
         id: r.id,                //unifica la forma de acceder a la info
         name: r.title,           //lo puedo hacer con destructuring
         img: r.image,
         type: r.dishTypes,
         score: r.healthScore,

    };
    });
    return data            
};

   const getDb = async () =>{
    const data = await Recipe.findAll({//es una fn de busq que encuentra todo lo que le pase
         include :{
         model: Diet,
         attributes: ["name"], //solo traigo name xq el id lo trae x autom(diet.js)
         through: { attributes: [] },  //me traigo la tabla ,es una comproba que va siempre
    },
    });
    return data
};

const getAll = async () =>{
    try {
    const apiData = getApi();
    const dbData =  getDb ();
    const data = apiData.concat(dbData);
    return data;
} catch (e){
    return 'Error'
}
};







module.exports = router;