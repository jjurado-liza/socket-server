import Server from "./classes/server";
import router from "./routes/router";
import bodyParser from 'body-parser'
import cors from 'cors';

const server = Server.instance;

// BodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());
server.app.use(cors({ origin: true, credentials: true }));
// CORS
server.app.use('/', router)

server.start( () => {
    console.log(`El servidor esta corriendo en el puerto ${ server.port }`);
});