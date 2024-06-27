const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json());

const mongouri = process.env.MONGODB_URI;
try {
mongoose.connect(mongouri)
console.log("conectado a mogodb");
}catch(error){
    console.error("error de conexion",error);

}

const libroSchema = new mongoose.Schema({
titulo: String,
autor:String,

})
const Libro = mongoose.model("Libro",libroSchema);





app.get("/",(req,res)=>{
    res.send("Bienvenido a la  api de libros de Jose Zuluaga");

    

});
// asi se crea un nuevo libro
app.post("/libros",async(req,res)=>{
    const libro=  new Libro({
        titulo:req.body.titulo,
        autor: req.body.autor,
    })
    try{
await libro.save();
res.json(libro);
    }catch(error){
        res.status(500).send("errror al gurdar el libro")

    }
  
})
//asi se pide todos los libros
app.get("/libros", async (req, res) => {
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch (error) {
    res.status(500).send("Error al obtener libros");
  }
}); 

  // pedir un libro especifico por su id
  app.get("/libros/:id", async (req, res) => {
    try {
      const libro = await Libro.findById(req.params.id);
      if (libro) {
        res.json(libro);
      } else {
        res.status(404).send("Libro no encontrado");
      }
    } catch (error) {
      res.status(500).send("Error al buscar el libro");
    }
  });
  // Ruta para actualizar un libro específico por su ID
  app.put("/libros/:id", async (req, res) => {
    try {
      const libro = await Libro.findByIdAndUpdate(
        req.params.id,
        {
          titulo: req.body.titulo,
          autor: req.body.autor,
        },
        { new: true } // Esta opción hará que se devuelva el documento actualizado
      );

      if (libro) {
        res.json(libro);
      } else {
        res.status(404).send("Libro no encontrado");
      }
    } catch (error) {
      res.status(500).send("Error al actualizar el libro");
    }
  });
  // Ruta para eliminar un libro específico por su ID
  app.delete("/libros/:id", async (req, res) => {
    try {
      const libro = await Libro.findByIdAndRemove(req.params.id);
      if (libro) {
        res.status(204).send();
      } else {
        res.status(404).send("Libro no encontrado");
      }
    } catch (error) {
      res.status(500).send("Error al eliminar el libro");
    }
  });

const PORT = process.env.PORT  || 3000 ;
app.listen(3000,()=>{
    console.log("servidor ejecutandose en http://localhost:3000");
}
);