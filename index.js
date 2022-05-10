const express = require('express');
const app = express();
const PDFDocument = require('pdfkit');
const fs = require('fs');
const bodyParser = require('body-parser');
// mandatory to use this code for using body parser
app.use(bodyParser.urlencoded({extended:true}));

// Create a document
const doc = new PDFDocument();

app.get('/home',(req,res)=>{
    res.sendFile(__dirname+'/bill.html');
})

app.post('/invoice',(req,res)=>{

    // use body parser to capture fields
    const name = req.body.customerName;
    const email = req.body.customerEmail;
    const mobile = req.body.mobile;
    const amount = req.body.Amount;
    const startdate = req.body.startDate;
    const enddate = req.body.endDate;

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream('output.pdf'));
    doc
    .fontSize(16)
    .text('XYZ Enterprise Invoice',{
        align: 'center'
    })
    .moveDown()
    .moveDown()
    .fontSize(14)
    .text('Invoice Number: XYZ/' + Math.floor(Math.random() * 900) + 100,{
        align: 'Left'
    })
    .moveUp()
    .text('Date:' + new Date().getDate()+"/"+ new Date().getMonth() + "/" + new Date().getFullYear(),{
        align: 'right'
    })
    .fontSize(12)
    .moveDown()
    .text("Customer Name: "+ name)
    .text("Customer Email: " + email)
    .text("Mob Number: " + mobile)
    .moveDown()
    .moveDown()
    .moveTo(0, doc.y)
    .lineTo(1000, doc.y)
    .stroke()
    .moveDown()    
    .text("Start Date: " + startdate,{
        align: 'left'
    })
    .moveUp()
    .text("End Date: " + enddate,{
        align: 'center'
    })
    .moveUp()
    doc.font('Helvetica-Bold')
    .text("Due Amount (INR): " + amount,{
        align: 'right'
    })
    .moveUp()
    .moveDown()
    .moveTo(0, doc.y)
    .lineTo(1000, doc.y)
    .stroke()
    .moveDown()
    .fontSize(8)
    .text("Disclaimer: Amount should be paid within 15 days after generation of invoice, Failing which, a fine of 100 rupees will be added.")
    .moveDown()
    doc.image('img/signa.png',400,doc.y,{ fit: [100, 100],align:'right',valign:'center'})
    .moveDown()
    .text("Authorized signatory",400,doc.y+80)
    // Finalize PDF file
    doc.end();
    res.sendFile(__dirname+'/response.html')
})

app.listen(3000,function(){
    console.log('Listening to port 3000...');
})