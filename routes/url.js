import express from 'express'
import generateShotendUrl from '../controllers/validateUrl.js';
const router=express.Router();

router.post("/",generateShotendUrl)

export default router
