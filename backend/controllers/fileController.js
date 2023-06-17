const csv = require('csv-parser');
const fs = require('fs');
const Stock = require('./../models/stockModel');
const multer = require('multer');
const path = require('path');

const excelJS = require("exceljs");



// Create a Multer storage configuration
const storage = multer.diskStorage({
    destination: 'uploads/', // Specify the directory to store uploaded files
    filename: function (req, file, cb) {
      // Generate a unique filename for the uploaded file
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.csv');
    },
  });
  
// Create the Multer instance with the configured storage
const upload = multer({ storage });

const getFileData =  async (req,res) =>{
    const file = req.file;
    console.log(file.filename);

    const results = [];
    const objtData = []; 
 
  fs.createReadStream(`uploads/${file.filename}`)
    .pipe(csv())
    .on('data', (data) => {
        results.push(data);
    })
    .on('end', () => {
    Stock.insertMany(results)
        .then(() => {
          console.log('Stocks saved successfully');
          res.status(200).json({
            status: 'success',
            message: 'Stocks saved successfully',
          });
        })
        .catch((error) => {
          console.error('Error saving stocks:', error);
          res.status(500).json({
            status: 'error',
            message: 'Error saving stocks',
          });
        });
    });
    res.status(200).json({
        status: 'success',
        data: 'data'
    });
}

const createXLSXFile = async (req, res) => {
    try {
    // Fetch data from the database using aggregation
    /*
        getting unique data by using _id passing VARIANT
        push to array if there is any duplication
    */
    let stocks = await Stock.aggregate([ 
        {
            "$group": {
              "_id": "$variant",
              "stock": { "$push" : { "$toString": "$stock" } } 
            }
        }
    ]);
    //using higher order function to convert array to string 
    stocks = stocks.map(el => ({varaint: el._id,stock: el.stock.join('|')}))

    const workbook = new excelJS.Workbook();  // Create a new workbook
    const worksheet = workbook.addWorksheet("My Stock"); // New Worksheet

    const uploadFolder = path.join(__dirname, './../uploads');
    // Column for data in excel. key must match data key
    worksheet.columns = [
        { header: "Variant", key: "varaint", width: 20 }, 
        { header: "Stock ", key: "stock", width: 10 },
    ];
    worksheet.addRows(stocks);

    // Making first line in excel bold
    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
    });
    const data = await workbook.xlsx.writeFile(`${uploadFolder}/stock.xlsx`)
    .then(() => {
        res.send({
            status: "success",
            message: "file successfully downloaded",
            link: `/stock.xlsx`,
        });
    });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while generating and saving the XLSX file.' });
        
    }
};
  

module.exports ={
    getFileData,
    upload,
    createXLSXFile
}