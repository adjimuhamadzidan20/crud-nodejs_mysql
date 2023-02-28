const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const koneksi = require('./koneksi')
const response = require('./response')

app.use(bodyParser.json())

koneksi.connect((error) => {
	if (error) throw error
	console.log('Koneksi DB OKE')
})

// default API
app.get('/', (req, res) => {
  response(200, "API v1 ready", "Success", res)
})

// tampil data
app.get('/mahasiswa', (req, res) => {
	const sql = "SELECT * FROM mahasiswa"
	koneksi.query(sql, (error, result) => {
		if (error) throw error
		response(200, result, "get all data from table mahasiswa", res)
		console.log(result)
	})
})

// tampil data berdasarkan npm
app.get('/mahasiswa/:npm', (req, res) => {
	const npm = req.params.npm
	const sql = `SELECT * FROM mahasiswa WHERE npm = ${npm}`
	koneksi.query(sql, (error, hasil) => {
		if (error) throw error
		response(200, hasil, "show data npm from table mahasiswa", res)
  	console.log(hasil)
	})
})

// input data
app.post('/mahasiswa', (req, res) => {
	const {npm, nama_lengkap, kelas, alamat} = req.body
	const sql = `INSERT INTO mahasiswa (npm, nama_lengkap, kelas, alamat) VALUES (${npm}, '${nama_lengkap}', '${kelas}', '${alamat}')`
	koneksi.query(sql, (error, hasil) => {
		if (error) throw error
		if (hasil.affectedRows) {
			response(200, hasil.insertId, "Data Added Success", res)
			console.log(req.body)
		} else {
			console.log('Gagal ditambah')
		}
	})
})

// update data
app.put('/mahasiswa', (req, res) => {
	const {nama_lengkap, kelas, alamat, npm} = req.body
	const sql = `UPDATE mahasiswa SET nama_lengkap = '${nama_lengkap}', kelas = '${kelas}', alamat = '${alamat}' WHERE npm = ${npm}`
	koneksi.query(sql, (error, hasil) => {
		if (error) response(500, "invalid", "error", res)
		if (hasil?.affectedRows) {
			response(200, "Data Update", "Update Success", res)
			console.log(hasil)
		} else {
			response(404, "not found", "error", res)
		}
	})
})

// delete data
app.delete('/mahasiswa', (req, res) => {
	const {npm} = req.body
	const sql = `DELETE FROM mahasiswa WHERE npm = ${npm}`
	koneksi.query(sql, (error, hasil) => {
		if (error) response(500, "invalid", "error", res)
		if (hasil?.affectedRows) {
			response(200, "Data delete", "Delete Success", res)
			console.log(hasil)
		} else {
			response(404, "not found", "error", res)
		}
	})
})

// koneksi server
app.listen(port, () => {
  console.log(`Server OK port ${port}`)
})