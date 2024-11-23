import express from "express"; // Importa o framework Express para criar a apliacação web
import multer from "multer"; // Importa o Multer para lidar com uploads de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost} from "../controllers/postsController.js"; // Importa as funções controladoras para lidar com a lógica dos posts
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //Especifica o diretório para armazenar as imagens enviadas
        cb(null, 'uploads/'); // Substitua por seu caminhho de upload desejado
    },
    filename: function (req, file, cb) {
        // Mantém o nome original do arquivo por simplicidade
        cb(null, file.originalname); // Considere usar uma estratégia de
    }
})

const upload = multer({dest: "./uploads", storage})
// Linux ou no Mac:
// const upload = multer({dest: "./uploads"})

const routes = (app) => {
    // Permite que o servidor interprete requisições com corpo no formato JSON
    app.use(express.json());
    // Rota pra buscar todos os posts
    app.use(cors(corsOptions))
    app.get("/posts", listarPosts);
    // Rota para criar um post
    app.post("/posts", postarNovoPost); // Chama a função controladora para a criação de posts
    // Rota para upload de imagens (assumindo uma única imagem camada "imagem")
    app.post("/upload", upload.single("imagem"), uploadImagem); // Chama a função controladora para processamento da imagem
    app.put("/upload/:id", atualizarNovoPost)
};

export default routes;