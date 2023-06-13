const express  = require('express');
const cors = require('cors');
const path = require('path');

const apiRouter = require('./routes/api');
const globalErrorHandler = require('./controllers/errorController');
const application = express();



if(process.env.NODE_ENV === 'development'){
    //application.use(morgan('dev'));
}

application.use('/uploads', express.static(path.join(__dirname, './uploads')));
application.use(express.json());

application.use('/api/v1/users', apiRouter);

application.use(cors());


//handle invalid routes (404) (all) GET,POST,PUT/PATCH,DELETE
application.all('*',(req, res, next) => {
    next(new AppError('This route does not exist', 404));
})
//error handling middleware (GLobal Error Handler)
application.use(globalErrorHandler);



module.exports = application;


