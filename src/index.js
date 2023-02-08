import express from 'express'
import routerProd from './routes/product.js'
import { __dirname , __filename } from './path.js'
import multer from 'multer'
import {engine} from 'express-handlebars'
import * as path from 'path'
 

const app = express()
const PORT = 4000

// const upload = multer({dest:'src/public/img'}) Imagenes sin formato
// Multer, para procesar imagenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

//Guardo los datos de destino y nombre de la imagen en un objeto
const upload= multer({storage:storage})

//Middlewares
app.use(express.json()) //no se que hace esto
app.use(express.urlencoded({extended: true})) //no se que hace esto  
app.engine("handlebars", engine())
app.set("view engine" , "handlebars")
app.set("views", path.resolve(__dirname, "./views"))

//Routes
app.use('/static', express.static(__dirname +'public'))
app.use('/product', routerProd)
app.get('/static', (req, res)=> {
    const user = {
        nombre: "Agust",
        tel: "34343",
        rol: "Estudiante"
    }
    res.render("home", {
        titulo: "Titulo 1",
        mensaje: "ASD",
        user: user
    })

})
app.post('/upload', upload.single('product'), (req, res)=> {

    console.log(req.file)
    console.log(req.body)
    res.send("Imagen cargada")
})



app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`)
}) 