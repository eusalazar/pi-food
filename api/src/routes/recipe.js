const { Router } = require("express");
const { Recipe } = require("../db.js");


const router = Router();

router.post('/recipe', async (req,res) =>{
    console.log(req.body)
    const {name, summary, score, healthScore, stepByStep} = req.body;
      try {  
        console.log(Recipe)
        const newRecipe2 = await Recipe.create ({
            name,
            summary,
            score: parseFloat(score),
            healthScore: parseFloat(healthScore),
            stepByStep,
        })
       res.status(200).send(newRecipe2)

    } catch (err){
        console.log(err)
        res.status(500).send({ msg: "Algo salió mal" });
    }

    
})










module.exports = router;