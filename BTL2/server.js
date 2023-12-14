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


app.post('/api/data', (req, res) => {
    const requestData = req.body;
    console.log('Received data:', requestData);
  
    // Xử lý dữ liệu và gửi phản hồi về frontend
    res.json({ status: 'success', data: 'Data received successfully' });
  });

app.get('/api/sanpham', async (req, res) => {
    const itemdata=await dbOperation.getitemdata(req.query.id)
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

app.post('/api/login', async (req, res) => {
  let datares
  dbOperation.account(req.body).then(response =>{
    if (response.recordset && response.recordset.length>0){
      const Ma_nguoi_dung = response.recordset[0].Ma_nguoi_dung;
      const Ho_ten = response.recordset[0].Ho_ten;
      datares= { success: true, userId: Ma_nguoi_dung,nameOfUser: Ho_ten,message:"Đăng nhập thành công"}
    }
    else{
      datares= { success: false, userId: '',nameOfUser:'',message:"Sai tên tài khoản hoặc mật khẩu"}
    }
    res.json(datares);
  })

});

app.post('/api/donhang', async (req, res) => {
  dbOperation.laydonhang(req.body).then(response =>{
    // console.log(response.recordset);
    res.json(response.recordset);
  })
});

app.post('/api/baocao', async (req, res) => {
  dbOperation.laybaocao(req.body).then(response =>{
    // console.log(response.recordset);
    res.json(response.recordset);
  })
});

// dbOperation.laydonhang({id:'3'}).then(response =>{
//   console.log(response.recordset);
// })
 app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));