// koneksi database
const mysql = require('mysql')

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "kampus_cuyuniverst"
})

// eksport keluar / dipakai diluar
module.exports = db

