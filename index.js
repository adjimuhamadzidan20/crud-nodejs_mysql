const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const koneksi = require('./koneksi_db/koneksi')
const response = require('./response')

// get input bermethod post
app.use(bodyParser.urlencoded({
	extended: true
}))

// template engine html
app.set('view engine', 'ejs')
app.set('views', 'views')

// cek koneksi
koneksi.connect((error) => {
	if (error) throw error
	console.log('Connection DB OK')
})

// halaman index / dashboard
app.get('/', (req, res) => {
	res.render("index")
})

// === crud hal mahasiswa ===
// tampil data mahasiswa
app.get('/mahasiswa', (req, res) => {
	const sql = "SELECT * FROM mahasiswa"
	koneksi.query(sql, (error, hasil) => {
		if (error) throw error
		// response(200, result, "get all data from table mahasiswa", res)
		res.render("mahasiswa", {
			data: hasil
		})
	})
})

// input data mahasiswa
app.post('/add-mahasiswa', (req, res) => {
	const npm = req.body.npm
	const nama = req.body.nama
	const kelas = req.body.kelas
	const alamat = req.body.alamat

	const sql = `INSERT INTO mahasiswa (npm, nama_lengkap, kelas, alamat) VALUES (${npm}, '${nama}', '${kelas}', '${alamat}')`
	koneksi.query(sql, (error, hasil) => {
		if (error) throw error
		res.redirect("/mahasiswa")
		// response(200, hasil.insertId, "Data Added Success", res)
	})
})

// update data mahasiswa
app.get('/mahasiswa/update/:npm', (req, res) => {
	const npm = req.params.npm
	const sql = `SELECT * FROM mahasiswa WHERE npm = ${npm}`
	koneksi.query(sql, (error, hasil) => {
		if (error) throw error
		// response(200, hasil, "show data npm from table mahasiswa", res)	
		const text = "Edit Data Mahasiswa"
		res.render("update_mahasiswa", {
			tulisan: text,
			id: hasil[0].id,
			npm: hasil[0].npm,
	    		nama: hasil[0].nama_lengkap,
	    		kelas: hasil[0].kelas,
	    		alamat: hasil[0].alamat
		})
	})
})
app.post('/mahasiswa-update/:id', (req, res) => {
	const id = req.params.id
	const npm = req.body.npm
	const nama = req.body.nama
	const kelas = req.body.kelas
	const alamat = req.body.alamat

	const sql = `UPDATE mahasiswa SET npm = ${npm}, nama_lengkap = '${nama}', kelas = '${kelas}', alamat = '${alamat}' WHERE id = ${id}`
	koneksi.query(sql, (error, hasil) => {
		if (error) throw error	
		res.redirect("/mahasiswa")
	})
})

// delete data mahasiswa
app.get('/mahasiswa/delete/:npm', (req, res) => {
	const npm = req.params.npm
	const sql = `DELETE FROM mahasiswa WHERE npm = ${npm}`
	koneksi.query(sql, (error, hasil) => {
		if (error) throw error	
		res.redirect("/mahasiswa")
	})
})

// cari data mahasiswa
app.post('/mahasiswa/search-mahasiswa', (req, res) => {
	const data = req.body.cari
	const sql = `SELECT * FROM mahasiswa WHERE npm LIKE '%${data}%' OR nama_lengkap LIKE '%${data}%' OR kelas LIKE '%${data}%' OR alamat LIKE '%${data}%'`
	koneksi.query(sql, (error, hasil) => {
		if (error) throw error
		// response(200, hasil, "data ada", res)
		res.render("mahasiswa", {
			data: hasil
		})
	})
	app.get('/mahasiswa/search-mahasiswa', (req, res) => {
		res.redirect('/mahasiswa')
	})
})

// === crud hal dosen ===
// tampil data dosen
app.get('/dosen', (req, res) => {
	const sql = "SELECT * FROM dosen"
	koneksi.query(sql, (error, hasil) => {
		if (error) throw error
		// response(200, hasil, "get data dosen from table dosen", res)
		res.render("dosen", {
			data: hasil
		})
	})
})

// input data dosen
app.post("/add-dosen", (req, res) => {
	const npd = req.body.npd
	const nama = req.body.nama
	const alamat = req.body.alamat
	const email = req.body.email

	const sql = `INSERT INTO dosen (npd, nama_lengkap, alamat, email) VALUES (${npd}, '${nama}', '${alamat}', '${email}')`
	koneksi.query(sql, (error, hasil) => {
		if (error) throw error
		// response(200, hasil, "data masuk", res)
		res.redirect("/dosen")
	})
})

// update data dosen
app.get("/dosen/update/:npd", (req, res) => {
	const npd = req.params.npd
	const sql = `SELECT * FROM dosen WHERE npd = ${npd}`
	koneksi.query(sql, (error, hasil) => {
		if (error) throw error
		// response(200, hasil, "get data dosen where npd from table dosen", res)
		const text = "Edit Data Dosen"
		res.render("update_dosen", {
			tulisan: text,
			id: hasil[0].id,
			npd: hasil[0].npd,
			nama: hasil[0].nama_lengkap,
			alamat: hasil[0].alamat,
			email: hasil[0].email,
		})
	})
})
app.post("/dosen-update/:id", (req, res) => {
	const id = req.params.id
	const npd = req.body.npd
	const nama = req.body.nama
	const alamat = req.body.alamat
	const email = req.body.email

	const sql = `UPDATE dosen SET npd = ${npd}, nama_lengkap = '${nama}', alamat = '${alamat}', email = '${email}' WHERE id = ${id}`
	koneksi.query(sql, (error, hasil) => {
		if (error) throw error
		res.redirect("/dosen")
	})
})

// delete data dosen
app.get("/dosen/delete/:npd", (req, res) => {
	const npd = req.params.npd
	const sql = `DELETE FROM dosen WHERE npd = ${npd}`
	koneksi.query(sql, (error, hasil) => {
		if (error) throw error
		res.redirect("/dosen")
	})
})

// cari data dosen
app.post('/dosen/search-dosen', (req, res) => {
	const data = req.body.cari
	const sql = `SELECT * FROM dosen WHERE npd LIKE '%${data}%' OR nama_lengkap LIKE '%${data}%' OR alamat LIKE '%${data}%' OR email LIKE '%${data}%'`
	koneksi.query(sql, (error, hasil) => {
		if (error) throw error
		// response(200, hasil, "data ada", res)
		res.render("dosen", {
			data: hasil
		})
	})
	app.get('/dosen/search-dosen', (req, res) => {
		res.redirect('/dosen')
	})
})

// === crud hal matkul ===
// tampil data matkul
app.get('/matkul', (req, res) => {
	const sql = "SELECT * FROM matkul"
	koneksi.query(sql, (error, hasil) => {
		if (error) throw error
		// response(200, hasil, "get data matkul from table matkul", res)	
		res.render("matkul", {
			data: hasil
		})
	})
})

// input data matkul
app.post('/add-matkul', (req, res) => {
	const matkul = req.body.matkul
	const prodi = req.body.prodi
	const sks = req.body.sks
	const semester = req.body.semester
	const dosen = req.body.dosen

	const sql = `INSERT INTO matkul (matakuliah, prodi, sks, semester, dosen_pengajar) VALUES ('${matkul}', '${prodi}', ${sks}, ${semester}, '${dosen}')`
	koneksi.query(sql, (error, hasil) => {
		if (error) throw error
		res.redirect("/matkul")
	})
})

// update data matkul
app.get('/matkul/update/:id', (req, res) => {
	const id = req.params.id
	const sql = `SELECT * FROM matkul WHERE id = ${id}`
	koneksi.query(sql, (error, hasil) => {
		if (error) throw error
		// response(200, hasil, "get data matkul where id", res)
		const text = "Edit Data Matakuliah"
		res.render("update_matkul", {
			tulisan: text,
			id: hasil[0].id,
			matkul: hasil[0].matakuliah,
			prodi: hasil[0].prodi,
			sks: hasil[0].sks,
			semester: hasil[0].semester,
			dosen: hasil[0].dosen_pengajar
		})
	})
}) 
app.post('/matkul-update/:id', (req, res) => {
	const id = req.params.id
	const matkul = req.body.matkul
	const prodi = req.body.prodi
	const sks = req.body.sks
	const semester = req.body.semester
	const dosen = req.body.dosen

	const sql = `UPDATE matkul SET matakuliah = '${matkul}', prodi = '${prodi}', sks = ${sks}, semester = ${semester}, dosen_pengajar = '${dosen}' WHERE id = ${id}`
	koneksi.query(sql, (error, hasil) => {
		if (error) throw error
		res.redirect("/matkul")
	})
})

// delete data matkul
app.get('/matkul/delete/:id', (req, res) => {
	const id = req.params.id
	const sql = `DELETE FROM matkul WHERE id = ${id}`
	koneksi.query(sql, (error, hasil) => {
		if (error) throw error
		res.redirect('/matkul')
	})
})

// cari data matkul
app.post('/matkul/search-matkul', (req, res) => {
	const data = req.body.cari
	const sql = `SELECT * FROM matkul WHERE matakuliah LIKE '%${data}%' OR prodi LIKE '%${data}%' OR sks LIKE '%${data}%' 
	OR semester LIKE '%${data}%' OR dosen_pengajar LIKE '%${data}%'`
	koneksi.query(sql, (error, hasil) => {
		if (error) throw error
		// response(200, hasil, "data ada", res)
		res.render("matkul", {
			data: hasil
		})
	})
	app.get('/matkul/search-matkul', (req, res) => {
		res.redirect('/matkul')
	})
})

// koneksi server
app.listen(port, () => {
  console.log(`Server OK port ${port}`)
})
