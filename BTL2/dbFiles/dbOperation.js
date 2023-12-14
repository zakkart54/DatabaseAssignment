const config = require('./dbConfig'),
      sql    = require('mssql');


const getitemdata = async() =>{
    try {
        let pool = await sql.connect(config);
        let result = await pool.query('SELECT * FROM SAN_PHAM');
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
            .input('TEN_SAN_PHAM', sql.NVarChar(50), formData.TEN_SAN_PHAM)
            .input('GIA_CA', sql.Decimal(12, 2), formData.GIA_CA)
            .input('MO_TA', sql.NVarChar(100), formData.MO_TA)
            .input('LOAI_SAN_PHAM', sql.NVarChar(100), formData.LOAI_SAN_PHAM)
            .input('TINH_TRANG', sql.Bit, formData.TINH_TRANG)
            .query('INSERT INTO SAN_PHAM (TEN_SAN_PHAM, GIA_CA, MO_TA, LOAI_SAN_PHAM, TINH_TRANG) VALUES (@TEN_SAN_PHAM, @GIA_CA, @MO_TA, @LOAI_SAN_PHAM, @TINH_TRANG)');
    } catch (e) {
        console.log(e);
    }
}
const updateitem = async(formData) =>{
    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input('MA_SAN_PHAM', sql.Int, formData.MA_SAN_PHAM)
            .input('TEN_SAN_PHAM', sql.NVarChar(50), formData.TEN_SAN_PHAM)
            .input('GIA_CA', sql.Decimal(12, 2), formData.GIA_CA)
            .input('MO_TA', sql.NVarChar(100), formData.MO_TA)
            .input('LOAI_SAN_PHAM', sql.NVarChar(100), formData.LOAI_SAN_PHAM)
            .input('TINH_TRANG', sql.Bit, formData.TINH_TRANG)
            .query(`
                UPDATE SAN_PHAM
                SET
                TEN_SAN_PHAM = @TEN_SAN_PHAM,
                GIA_CA = @GIA_CA,
                MO_TA = @MO_TA,
                LOAI_SAN_PHAM = @LOAI_SAN_PHAM,
                TINH_TRANG = @TINH_TRANG
                WHERE
                MA_SAN_PHAM = @MA_SAN_PHAM
            `);
    } catch (e) {
        console.log(e);
    }
}

module.exports={
    getitemdata,
    updateitem,
    additem
}