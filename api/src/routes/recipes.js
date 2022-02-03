
const { Router } = require("express");
const { Recipe, Diet } = require("../db.js");
const axios = require("axios").default;
const { SPOONACULAR_API_KEY } = process.env;

const BASE_URL = 'https://api.spoonacular.com';

const router = Router();

const getApi = async () =>{ //llamamos al endpind de la api_traigo esta info de la api
    const path = 'recipes/complexSearch';
    const params = `number=30&addRecipeInformation=true&apiKey=${SPOONACULAR_API_KEY}`;
    const apiUrl = `${BASE_URL}/${path}+${params}`;
    const rawData = await axios.get(apiUrl);  //data limpia
    const parseReceipt = (r) => ({////creo quna fn y le paso r como parametro
        id: r.id,                //unifica la forma de acceder a la info
        name: r.title,           //lo puedo hacer con destructuring
        img: r.image,
        type: r.dishTypes,
        score: r.healthScore,
   }); 

    const data = await rawData.data.results.map(parseReceipt);
    return data;           
};

   const getDb = async () =>{
    const data = await Recipe.findAll({//es una fn de busq que encuentra todo lo que le pase
         include: {
            model: Diet,
            attributes: ["name"], //solo traigo name xq el id lo trae x autom(diet.js)
        },
    });
    return data
};

const getAll = async () =>{
    try {
        const apiData = await getApi();
        const dbData = await getDb();
        const data = [...apiData, ...dbData];
        return data;
    }  catch (err){
        console.log(err)
        return [];
    }
};


router.get('/recipes', async (req, res) =>{ //el query ?name(atributo)...(y lo q le pase x q )
    const { name } = req.query; //preg si hay un query con prop name
    const recipes = await getAll();
    if(name){
        const filteredRecipes = await recipes.filter((r) => 
        r.name.toLowerCase().includes(name.toLowerCase()) //cheque que todo este en minuscula
        ); 
        if (filteredRecipes.length > 0) {
            res.status(200).send(filteredRecipes)
        } else {
            res.status(404).send({ msg: "No se encuentran resultados" });
        }
    } else {
        res.status(200).send(recipes);
    }
});











module.exports = router;