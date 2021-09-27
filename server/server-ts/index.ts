import express from 'express';
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDb } = require('./models/index');
const { router } = require('./routes/authRoutes');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET","POST"],
  credentials: true,
  secure:false
}));
app.use(cookieParser());
app.use(router);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`express running on port: ${PORT}`);
  })
})