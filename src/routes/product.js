import {Router} from "express"
import {ProductManager} from '../controllers/ProductManager.js'

const productManager = new ProductManager('src/models/db.txt')
const routerProd = Router()

routerProd.get('/:id', async (req,res) => {    
    const producto = await productManager.getProductsById(parseInt(req.params.id))
    console.log(producto)
    res.send(`Se esta mostrando por consola el producto: ${req.params.id} `)
   
})

routerProd.get('/', async (req,res) => {
    let {limite} = req.query 
    if(limite){
        const limitProds = await productManager.getProducts(limite)
        console.log(limitProds)
        res.send(`Se esta mostrando por consola los primeros: ${limite} productos `)
    }
    else{
        const allProds = await productManager.getProducts()
        console.log(allProds)
        res.send(`Se esta mostrando por consola todos los productos`)
    }   

})

routerProd.delete('/:id', async (req, res) => {
    let mensaje = await productManager.deleteProduct(parseInt(req.params.id)) 
    res.send(mensaje)
})

routerProd.put('/:id', async (req, res) => { 
    let mensaje = await productManager.updateProduct(req.params.id, req.body)
    res.send(mensaje)
})

routerProd.post('/', async (req, res) => { 
    let mensaje = await productManager.addProduct(req.body)
    res.send(mensaje)
})




export default routerProd