const alumnoModel = require("../models/AlumnoModel")

// CRUD - MOSTRAR alumnos
/*
module.exports.mostrar = async(req, res)=>{ 
    const respuesta = await alumnoModel.find({})
    //res.send(respuesta)
    res.render("index", {alumnos: respuesta});
};
*/
module.exports.mostrar = async(req, res)=>{ 
    try {
        const respuesta = await alumnoModel.find({})
        //res.send(respuesta)
        res.render("index", {alumnos: respuesta});
    }
    catch(error){
        console.log("No se pudo encontrar los objetos. Error: ${error}")
    }
    
};


// CRUD - CREAR Alumno
module.exports.crear = async(req, res)=>{
    //console.log(req.body) //For TEST
    try{
        const newAlumno = {
            nombre: req.body.nombre,
            edad: req.body.edad
        }
        const respuesta = await new alumnoModel(newAlumno).save();
        res.redirect("/")
    }
    catch(error){
        console.log("No se pudo insertar el objeto. Error: ${error}")
    }
};


// CRUD - EDITAR Alumno
module.exports.editar = async(req, res)=>{
    //console.log(req.body) //For TEST
    try{
        const id = req.body.id_editar
        const nombre = req.body.nombre_editar
        const edad = req.body.edad_editar
        const respuesta = await alumnoModel.findByIdAndUpdate(id, {nombre, edad});
        res.redirect("/")
    }
    catch(error){
        console.log("No se pudo actualizar el objeto. Error: ${error}")
    }
};


//CRUD - ELIMINAR Alumno
module.exports.borrar = async(req, res)=>{
    //console.log(req.body) //For TEST
    try{
        const id = req.params.id
        console.log(id) //For TEST
        //const respuesta = await alumnoModel.findByIdAndRemove(id);
        const respuesta = await alumnoModel.findByIdAndDelete(id);
        res.redirect("/")
    }
    catch(error){
        console.log("No se pudo remover el objeto. Error: ${error}")
    }
};