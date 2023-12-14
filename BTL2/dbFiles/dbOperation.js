const config = require('./dbConfig'),
      sql    = require('mssql');


const getitemdata = async(data) =>{
    try {
        let pool = await sql.connect(config);
        // let result = await pool
        // .input('nid', sql.Int, data)
        // .query(
        //     `
        //     SELECT San_pham.*
        //     FROM San_pham
        //     JOIN Ban ON San_pham.Ma_san_pham = Ban.Ma_san_pham_BAN
        //     WHERE Ban.Ma_nguoi_dung_BAN = @nid;
        //     `   
        //     );
         let result = await pool.query( 'Select * from San_pham');
         return result
    }
    catch(e){
        console.log(e)
    }
}

const additem = async(formData) =>{
    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input('Ten_san_pham', sql.NVarChar(50), formData.Ten_san_pham)
            .input('Gia_ca', sql.Decimal(12, 2), formData.Gia_ca)
            .input('Mo_ta_san_pham', sql.NVarChar(100), formData.Mo_ta_san_pham)
            .input('Tinh_trang', sql.Bit, formData.Tinh_trang)
            .query('INSERT INTO San_pham (Ten_san_pham, Gia_ca, Mo_ta_san_pham, Tinh_trang) VALUES (@Ten_san_pham, @Gia_ca, @Mo_ta_san_pham, @Tinh_trang)');
    } catch (e) {
        console.log(e);
    }
}
const updateitem = async(formData) =>{
    try {
        let pool = await sql.connect(config);
        pool.request()
            .input('Ma_san_pham', sql.Int, formData.Ma_san_pham)
            .input('Ten_san_pham', sql.NVarChar(100), formData.Ten_san_pham)
            .input('Gia_ca', sql.Int, formData.Gia_ca)
            .input('Mo_ta_san_pham', sql.NVarChar(100), formData.Mo_ta_san_pham)
            .input('Tinh_trang', sql.Bit, formData.Tinh_trang)
            .query(`
                UPDATE San_pham
                SET
                Ten_san_pham = @Ten_san_pham,
                Gia_ca = @Gia_ca,
                Mo_ta_san_pham = @Mo_ta_san_pham,
                Tinh_trang = @Tinh_trang
                WHERE
                Ma_san_pham = @Ma_san_pham
            `);
    } catch (e) {
        console.log(e);
    }
}

const account = async(data) =>{
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('taikhoan', sql.NVarChar(100), data.username)
            .input('matkhau',sql.NVarChar(255),  data.password)
            .query(
                `SELECT Nd.Ma_nguoi_dung, Nd.Ho_ten
                FROM Tai_khoan Tk
                JOIN Nguoi_dung Nd ON Tk.Ma_nguoi_dung = Nd.Ma_nguoi_dung
                WHERE Tk.Tai_khoan = @taikhoan AND Tk.Mat_khau = @matkhau`
            );
        return result
    }
    catch (e){
        console.log(e);
    }
}

const laydonhang = async(data) =>{
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('id', sql.NVarChar(100), data.id)
            .query(
                `EXEC TruyXuatDonHangTheoKhachHang @id`
            );
        return result
    }
    catch (e){
        console.log(e);
    }
}
const laybaocao = async(data) =>{
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('id', sql.NVarChar(100), data.id)
            .query(
                `EXEC GetSalesReport @startDate='2021-01-01 00:00:00', @endDate='2023-12-31 23:59:59', @doanhThuNguong=54321`
            );
        return result
    }
    catch (e){
        console.log(e);
    }
}

module.exports={
    getitemdata,
    updateitem,
    additem,
    account,
    laydonhang,
    laybaocao
}