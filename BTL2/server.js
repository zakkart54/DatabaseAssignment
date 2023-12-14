const   express     = require('express'),
        dbOperation = require('./dbFiles/dbOperation'),
        cors        = require('cors');

const API_PORT =process.env.PORT || 5000;
const app =express();

let client
let session
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/api',function(req,res) {
    console.log('Called');
    res.send({result: 'api'})
})

app.post('/hello',function(req,res) {
    console.log('Called');
    res.send({result: 'hello '})
})

app.post('/api/data', (req, res) => {
    const requestData = req.body;
    console.log('Received data:', requestData);
  
    // Xử lý dữ liệu và gửi phản hồi về frontend
    res.json({ status: 'success', data: 'Data received successfully' });
  });

app.get('/api/sanpham', async (req, res) => {
    const itemdata=await dbOperation.getitemdata()
    res.json(itemdata.recordset);
});

app.post('/api/themsanpham', async (req, res) => {
    const formData = req.body;
    dbOperation.additem(formData)
    res.json({ message: 'Sản phẩm được thêm thành công' });
  });

app.post('/api/chinhsuasanpham', async (req, res) => {
    const formData = req.body;
    dbOperation.updateitem(formData)
    res.json({ message: 'Sản phẩm được chỉnh thành công' });
  });

// app.get('/api/themsanpham', async (req, res) => {
//     const itemdata=await dbOperation.getitemdata()
//     res.json(itemdata.recordset);
// });

// dbOperation.inserttest()

// dbOperation.gettest().then(res =>{
//     console.log(res.recordset)
// })

 app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));