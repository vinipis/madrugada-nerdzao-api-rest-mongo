import * as express from 'express';
import * as request from 'request';
import * as bodyParser from 'body-parser';

import database from './database';
import controller from './controller';

const cors = require('cors');

class App {
    public app : express.Application;
    public database : database;
    public controller : controller;

    constructor(){
        this.app = express();
        this.middleware();
        this.routes();
        this.database = new database();
        this.database.createConnection();
        this.controller = new controller();
    }

    middleware(){
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    routes(){
        this.app.route("/").get((req, res) => res.status(200).json({"hello" : "World"}));
        this.app.route('/api/refresh').get(this.getEndPoint.bind(this));
        this.app.route('/api/dados').get((req, res) => this.controller.getDados(req, res));
        this.app.route('/api/dados/:id').get((req, res) => this.controller.getDadosOne(req, res));
        this.app.route('/api/dados/:id').delete((req, res) => this.controller.deleteDados(req, res));
        this.app.route('/api/dados/:id').put((req, res) => this.controller.putDados(req, res));
    }

    getEndPoint(req, res){
        request('https://casainteligentejose.mybluemix.net/fcamara', (error, response, body) => this.controller.create(body, res));
    }
}

export default new App();