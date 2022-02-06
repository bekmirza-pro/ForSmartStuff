const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/post', postController.create)
router.get('/post', authMiddleware, postController.getAll)
router.get('/:id', postController.getOne)


module.exports = router