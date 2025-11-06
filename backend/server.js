const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

const db = require('./data.json')

// Products
app.get('/products', (req,res)=> res.json(db.products))

// Feedback
app.get('/feedback', (req,res)=> res.json(db.feedback))

// Posts
app.get('/posts', (req,res)=> res.json(db.posts))
app.post('/posts', (req,res)=>{
  const post = { id: Date.now(), ...req.body }
  db.posts.unshift(post)
  res.json(post)
})

// Messages
app.get('/messages', (req,res)=> res.json(db.messages))

// Schedule
app.get('/schedule', (req,res)=> res.json(db.schedule))

// AI captions (demo)
app.post('/ai/captions', (req,res)=>{
  const { product='bánh ngọt', flavor='vanilla', tone='Cute', channel='Facebook', price } = req.body || {}
  const pick = a => a[Math.floor(Math.random()*a.length)]
  const CTA = ['Đặt ngay hôm nay nhé!','Ghé tiệm làm ngọt ngày bạn nha!','Inbox để giữ suất tươi mỗi ngày!']
  const EM = ['🍰','🎂','🫶','✨','🌸']
  const tag = pick(EM)+pick(EM)
  const priceStr = price ? ` chỉ từ ${Number(price).toLocaleString()}đ` : ''
  const base = {
    Cute: [
      `${tag} ${product} vị ${flavor} vừa ra lò${priceStr}. ${pick(CTA)}`,
      `${tag} Một miếng ${product}, một ngày dịu dàng. ${pick(CTA)}`
    ],
    Promo: [
      `${tag} ${product} ${flavor} - mua 2 tặng 1 tuần này${priceStr}.`,
      `${tag} Ưu đãi nhẹ nhàng: ${product} ${flavor}${priceStr}.`
    ]
  }[tone||'Cute']
  const suffix = { Facebook:'\n#SweetHeaven #Bakery', Zalo:'\nĐặt nhanh trên Zalo nhé!' }[channel] || ''
  res.json(base.map(c=>c+suffix))
})

const port = process.env.PORT || 3001
app.listen(port, ()=> console.log('Mock API on http://localhost:'+port))
