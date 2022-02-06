const uuid = require('uuid')
const path = require('path');
const { Postchat } = require('../models/model')
const ApiError = require('../error/ApiError');


class PostController {
    async create(req, res, next) {
        try {
            let { body, userId } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const post = await Postchat.create({ body, img: fileName, userId });

            return res.json(post)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        const posts = await Postchat.findAll()
        return res.json(posts)
    }
    async getOne(req, res) {
        const { id } = req.params
        const post = await Postchat.findOne({
            where: { id },
        }, )
        return res.json(post)
    }
}

module.exports = new PostController()