import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;

app.get('/health', (req,res)=> res.json({ok:true, service:'backend'}));

app.post('/schedule', (req,res)=>{
  const { title='Demo post', channel='facebook', scheduledAt=new Date().toISOString() } = req.body || {};
  return res.json({ ok:true, id: 'SCH-'+Math.random().toString(36).slice(2,8), title, channel, scheduledAt });
});

app.post('/messages/webhook', (req,res)=>{
  const text = (req.body && req.body.text) ? String(req.body.text) : '';
  const matched = text.toLowerCase().includes('gia');
  const reply = matched ? 'Xin chào, giá niêm yết là 399k.' : 'Cảm ơn bạn, nhân viên sẽ phản hồi sớm!';
  return res.json({ ok:true, matched, reply, stored:true });
});

app.get('/kpi', (req,res)=>{
  const now = new Date();
  const days = 7;
  const data = Array.from({length: days}).map((_,i)=>{
    const d = new Date(now.getTime() - (days-1-i)*24*3600*1000);
    const date = d.toISOString().slice(0,10);
    const reach = 200 + Math.floor(Math.random()*300);
    const er = +(0.03 + Math.random()*0.04).toFixed(3);
    const response_time = +(1 + Math.random()*3).toFixed(1);
    return { date, reach, er, response_time };
  });
  res.json({ ok:true, channel: req.query.channel || 'facebook', range: req.query.range || '7d', data });
});

app.listen(PORT, ()=> console.log(`Backend running on :${PORT}`));
