const route = require('express').Router();
const { Mongoose } = require('mongoose');
const MRes = require('../lib/MRes');
const getMessage = require('../lib/MValid');
const Kas = require('../model/Kas');
const validation = require('../validation/validation');

const createBukuKas = async ({
    name = null, idUser
}) => {
    let dataCreate;
    if (name == null) {
        dataCreate = {
            name: 'Buku kas 1',
            idUser: idUser
        }
    } else {
        dataCreate = {
            name: name,
            idUser: idUser
        }
    }
    let bukuKas = Kas(dataCreate)
    return await bukuKas.save()
}

route.get('/', async (req, res) => {
    try {
        const getBukukas = await Kas.find({
            idUser: req.currentUser.id
        })

        if (getBukukas.length == 0) {
            let resultCreateBukuKas = await createBukuKas({
                idUser: req.currentUser.id
            })
            return res.send(MRes(1, 'berhasil mendapatkan data buku kas', {
                buku: [resultCreateBukuKas]
            }))
        }
        return res.send(MRes(1, 'berhasil mendapatkan data buku kas', {
            buku: getBukukas
        }))
    } catch (error) {
        return res.send(MRes(0, 'ada yang error'))
    }
})

route.post('/single', async (req, res) => {
    try {
        const getBukukas = await Kas.findById(req.body.id)

        return res.send(MRes(1, 'berhasil mendapatkan data buku kas', {
            buku: getBukukas
        }))
    } catch (error) {
        return res.send(MRes(1, 'buku kas tidak ditemukan', {
            buku: {}
        }))
    }
})

route.post('/create', async (req, res) => {
    let data = req.body

    let { error } = validation.createUpdateKas(data);

    if (error) {
        return res.send(MRes(0, getMessage(error)))
    }

    try {

        let resultCreateBukuKas = await createBukuKas({
            idUser: req.currentUser.id,
            name: data.name
        })

        return res.send(MRes(1, 'berhasil membuat buku kas', {
            buku: resultCreateBukuKas
        }))
    } catch (error) {
        return res.send(MRes(0, 'ada yang error'))
    }
})

route.delete('/delete', async (req, res) => {
    try {
        await Kas.findOneAndDelete(req.body.id)

        return res.send(MRes(1, 'berhasil menghapus buku kas'));
    } catch (error) {
        return res.send(MRes(0, 'ada yang error'))
    }
})

route.put('/update', async (req, res) => {
    let { error } = validation.createUpdateKas(req.body)

    if (error) {
        return res.send(MRes(0, getMessage(error)))
    }

    try {
        let updateBukuKas = await Kas.findOneAndUpdate({ _id: req.body.id }, {
            name: req.body.name
        })

        return res.send(MRes(1, 'berhasil mengubah buku kas', {
            buku: updateBukuKas
        }));
    } catch (error) {
        return res.send(MRes(0, 'gagal mengubah nama buku kas'))
    }
})

module.exports = route