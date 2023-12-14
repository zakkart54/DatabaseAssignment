
const config = {
    server: 'MSI',// You can use 'localhost\\instance' to connect to named instance 
    database: 'test1',
    user: 'test12',
    password: '123',
    port: 1433,
    options: {
        instancename: 'SQLEXPRESS',
        trustServerCertificate: true,
        trustedConnection: false,
        enableAirthAbort: true,
    }
    
}
module.exports=config;