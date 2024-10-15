import express from 'express';
import ProductManager from './controllers/product-manager.js';

const app = express();
const PORT = 8080;
const productManager = new ProductManager("./src/models/productos.json")

app.use(express.json());

app.get('/api/products', async (req, res) =>{
    try{
        const limit = req.query.limit;
        const productos = await productManager.getProducts();

        if(limit){
            res.json(productos.slice(0, limit));
        }else{
            res.json(productos)
        }
    }catch(error){
        console.log('error al obtener productos', error);
        res.status(500).json({error:'Error del servidor'})
        
    }
})

app.get('/api/products/:pid', async (req, res) => {
    let id = req.params.pid;
    try{
        const producto = await productManager.getProductById(parseInt(id));
        if(!producto){
            res.json({
                error: 'Producto no encontrado'
            });
        }else{
            res.json(producto);
        }
    }catch(error){
        console.log('Error al obtener el producto', error);
        res.status(500).json({error:'error del servidor'});
    }
})

app.post('/api/products', async (req, res) => {
    const nuevoProducto = req.body;
    console.log(nuevoProducto);

    try{
        await productManager.addProduct(nuevoProducto);
        res.status(201).json({message: 'Producto agregado exitosamente'})
    }catch(error){
        console.log('Error al agregar producto', error);
        res.status(500).json({error:'Error del servidor'})
    }
})

app.put('/api/products/:pid', async(req, res) => {
    let id = req.params.pid;
    const productoActualizado = req.body;
    try{
        await productManager.updateProduct(parseInt(id),productoActualizado);
        res.json({message:'Producto actualiza correctamente'})
    }catch(error){
        console.log('no pudimos actualizar el producto', error);
        res.status(500).json({error:'error del servidor'})
    }
})
app.delete('/api/products/:pid', async(req, res) => {
    let id = req.params.pid;
    const productoEliminado = id;
    try{
        await productManager.deleteProduct(parseInt(id), productoEliminado);
        res.status(200).json({message:'Producto eliminado'})
    }catch(error){
        console.log('No pudimos eliminar el productoo', error);
        res.status(500).json({error: 'error del servidor'})
    }
})
app.listen(PORT,()=>{
    console.log('Escuchando en el puerto ',PORT);
});