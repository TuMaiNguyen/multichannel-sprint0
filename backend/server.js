const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/healthz', (req, res) => res.json({ ok: true }))

// 12 món demo
const menu = [
  { id: 1,  name: 'Croissant Bơ',       price: 25000, image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772', desc: 'Bơ thơm, lớp vỏ giòn.' },
  { id: 2,  name: 'Bánh Mì Sourdough',  price: 45000, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73',   desc: 'Men tự nhiên, tốt cho tiêu hoá.' },
  { id: 3,  name: 'Brioche Trứng',      price: 38000, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a',   desc: 'Mềm ẩm, thơm sữa.' },
  { id: 4,  name: 'Bánh Su Kem',        price: 22000, image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0', desc: 'Nhân kem vani mát.' },
  { id: 5,  name: 'Tiramisu Ly',        price: 49000, image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55', desc: 'Cà phê & mascarpone.' },
  { id: 6,  name: 'Bánh Tart Trái Cây', price: 52000, image: 'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642', desc: 'Trái cây tươi theo mùa.' },
  { id: 7,  name: 'Bánh Quy Bơ',        price: 15000, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff', desc: 'Giòn bùi, thơm lừng.' },
  { id: 8,  name: 'Bánh Chuối',         price: 30000, image: 'https://images.unsplash.com/photo-1608219959302-9d4e1b4c1e9f', desc: 'Ngọt tự nhiên, moist.' },
  { id: 9,  name: 'Bánh Mousse Dâu',    price: 54000, image: 'https://images.unsplash.com/photo-1508737804141-4c3b688e2546', desc: 'Chua ngọt hài hoà.' },
  { id: 10, name: 'Bánh Kem Socola',    price: 65000, image: 'https://images.unsplash.com/photo-1551022370-1b2d3f5f7f2a',   desc: 'Đậm vị cacao.' },
  { id: 11, name: 'Bánh Phô Mai Nhật',  price: 60000, image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898', desc: 'Mịn nhẹ, tan ngay.' },
  { id: 12, name: 'Bánh Mì Baguette',   price: 18000, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff', desc: 'Vỏ giòn, ruột xốp.' },
]
app.get('/menu', (req, res) => res.json(menu))

const contact = {
  address: '159 Đào Duy Anh, Phường 9, Phú Nhuận, TP.HCM',
  phone: '028-1234-5678',
  open: '08:00–21:00'
}
app.get('/contact', (req, res) => res.json(contact))

let feedback = [{ name: 'Mai', message: 'Croissant ngon quá!', at: new Date().toISOString() }]
app.get('/feedback', (req, res) => res.json(feedback))
app.post('/feedback', (req, res) => {
  const { name, message } = req.body || {}
  if (!name || !message) return res.status(400).json({ error: 'name & message required' })
  const item = { name, message, at: new Date().toISOString() }
  feedback.unshift(item)
  res.status(201).json({ ok: true, item })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`API running on :${port}`))
