import express from 'express';
import { getEvents, registerEvents } from './controller.js';

const router = express.Router();

router.get('/',getEvents)
router.post('/register/:id',registerEvents)

export default  router