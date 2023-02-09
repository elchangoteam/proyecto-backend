import { promises as fs } from 'fs'



export class ProductManager {
   
    constructor(title, description, price, thumbnail, stock) {
        this.code = ProductManager.codeIncrement()
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.stock = stock
    }

    static codeIncrement() {
        if (this.idIncrement) { //Undefined lo creo, si es verdadera +1
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }

    async addProduct({title, description, price, thumbnail, stock}) {
        const prods = JSON.parse(await fs.readFile('src/models/db.txt', 'utf-8'))        
  
        if (title, description, price, thumbnail, stock) {
            prods.push (new ProductManager(title, description, price, thumbnail, stock))
            await fs.writeFile('src/models/db.txt', JSON.stringify(prods))
            return "Producto Actualizado"
        }
        else {
            return "ERROR: Todos los datos para poder cargar el producto son obligatorios"
        }
    }

    async getProducts(limite) {
        let resultado = await fs.readFile('src/models/db.txt', 'utf-8')
        products = JSON.parse(resultado)
    
        if (products.length === 0) {
            console.log("AVISO: No hay productos para mostrar");
        }
        else if (limite) {
            console.log(products.slice(0, limite));
        }
        else {
            console.log(products);
        }
    }

    async getProductsById(id) {
        let resultado = await fs.readFile('src/models/db.txt', 'utf-8')
        products = JSON.parse(resultado)
    
        let findProduct = products.find(products => products.code === id)
    
        if (findProduct) {
            console.log(findProduct)
        }
        else {
            console.log("AVISO: No se encontro el producto buscado")
        }
    }

    

    async updateProduct(id, {title, description, price, thumbnail, stock}) {
        const prods = JSON.parse(await fs.readFile('src/models/db.txt', 'utf-8'))
        if(prods.some(prod => prod.code === parseInt(id))) {
            let index= prods.findIndex(prod => prod.code === parseInt(id))
            prods[index].title = title
            prods[index].description = description
            prods[index].price = price
            prods[index].thumbnail = thumbnail            
            prods[index].stock = stock
            await fs.writeFile('src/models/db.txt', JSON.stringify(prods))
           
            return "Producto actualizado"
        } else {
            return "Producto no encontrado"
        }
    }


    
    async deleteProduct(id) {
        let resultado = await fs.readFile('src/models/db.txt', 'utf-8')
        products = JSON.parse(resultado)
    
        if (products.some(products => products.code === id)) {
            products = products.filter(products => products.code !== id)
    
            await fs.writeFile('src/models/db.txt', JSON.stringify(products))
            return "AVISO: Producto Eliminado"
        }
        else {
    
           return "AVISO: No existe el producto a eliminar"
        }
    
    }

}

    





 


