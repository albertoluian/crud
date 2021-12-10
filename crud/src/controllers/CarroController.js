const Carro = require('../models/Carro')
module.exports = {
   async store(req, res){
     const { marca, cor, placa, temabs, ano, usuario_id } = req.body;
     const carro = await Carro.create({
        marca: marca, cor: cor, placa: placa,
        temabs: temabs, ano: ano,
        usuario_id: usuario_id
     }).catch(err => { return err});

     return res.json(carro);
   },
   async getAll(req, res){
    const carro = await Carro.findAll().catch(err => { return err});

    return res.json(carro);
  },
  async getOne(req, res){
    const { id } = req.params;
    const carro = await Carro.findByPk(id).catch(err => { return err});
   
    return res.json(carro);
  },
  async deleteOne(req, res){
    const { id } = req.params;
    const carro = await Carro.destroy({where: {id:id}}).catch(err => { return err});
   
    return res.json(carro);
  },
  async updateOne(req, res){
    const { id } = req.params;
    const { marca, cor, placa, temabs, ano, usuario_id } = req.body;
    const carro = await Carro.update({
       marca: marca, cor: cor, placa: placa,
       temabs: temabs, ano: ano,
       usuario_id: usuario_id
      },
      { where: {id:id}}
    ).catch(err => { return err});
   
    return res.json(carro);
  }
   
};