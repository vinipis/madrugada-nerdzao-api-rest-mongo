import * as mongoose from 'mongoose';;

const CrushSchema = new mongoose.Schema({
    horaentrada : { type: String, required : true },
    presenca : { type: String, required : true },
    horasaida : { type: String, required : true }
});

const model = mongoose.model('Trouxas', CrushSchema);

class Controller {
    constructor() { }

    create(req, res) {
        const dados = JSON.parse(req);
        const dadosSensor = {
            horaentrada: dados['Hora de entrada'],
            presenca: dados['Presença'],
            horasaida: dados['Hora de saída']
        }

        this.createTrouxa(dadosSensor)
        .then(dados => res.status(200).json({"resultado" : dados}))
        .catch(err => res.status(400).json({"resultado" : err}));
    }

    createTrouxa(data) {
        return model.create(data);
    }

    getDados(req, res) {
        this.getTrouxas()
        .then(dados => res.status(200).json({"resultado" : dados}))
        .catch(err => res.status(400).json({"resultado" : err}));
    }

    getTrouxas() {
        return model.find({ });
    }

    getDadosOne(req, res){
        const id = { _id: req.params.id }
        this.getTrouxasOne(id)
        .then(dados => res.status(200).json({"resultado" : dados}))
        .catch(err => res.status(400).json({"resultado" : err}));
    }

    getTrouxasOne(id){
        return model.find(id);
    }

    deleteDados(req, res){
        const id = { _id: req.params.id }
        this.deleteTrouxas(id)
        .then(dados => res.status(200).json({"resultado" : "dados apagados com sucesso!!"}))
        .catch(err => res.status(400).json({"resultado" : err}));
    }

    deleteTrouxas(id){
        return model.deleteOne(id);
    }

    putDados(req, res) {
        const id = { _id: req.params.id }
        const dadoTrouxa = req.body;

        this.putTrouxas(id, dadoTrouxa)
        .then(dados => res.status(200).json({"resultado" : "dados apagados com sucesso!!"}))
        .catch(err => res.status(400).json({"resultado" : err}));
    }

    putTrouxas(id, dadoTrouxa){
        return model.findOneAndUpdate(id,dadoTrouxa);
    }
}

export default Controller;