import express from 'express';


const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

})

router.post('/signup', (req, res) => {
  const { email, password } = req.body;

})

export default router