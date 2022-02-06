const { Router } = require("express");
const { Diet } = require("../db.js");

const router = Router();

const getTypes = async () =>{
    const types = await Diet.findAll();
    return types;
};

router.get('/types', async (req, res) =>{
    const data = await getTypes();
    if (data.length > 0) {
        res.status(200).json(data)
    } else {
        res.status(404).send({ msg: "No se encontraron resultados"});
    }
});


module.exports = router;
