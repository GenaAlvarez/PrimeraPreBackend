import express from 'express';
import productsRouter from './routes/product.router.js'
import cartsRouter from './routes/carts.router.js'

const app = express();
const PUERTO = 8080;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.send("Siii funciona");
})

//Rutas 
app.use("/api", productsRouter);
app.use("/api", cartsRouter);



app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})