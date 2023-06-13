const route = require('express').Router();

const apiController = require('./../controllers/apiController');
const authController = require('./../controllers/authController');
const fileController = require('./../controllers/fileController');

route.post('/signup', authController.signup);
route.post('/login', authController.login);


route
    .route('/')
    .get(authController.protect,apiController.getUser)
    .post(apiController.checkUser,apiController.saveUser);

route
    .route('/file')
    .post(fileController.upload.single('file'),fileController.getFileData)
route
    .route('/fileenerate')
    .get(fileController.createXLSXFile)

route
    .route('/:id')
    .get(apiController.getByid)
    .patch(apiController.updateUser)
    .delete(authController.protect,authController.restrictTo('admin'), apiController.deleteUser);
    

module.exports = route;