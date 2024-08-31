import express from 'express'
const router=express.Router();
import URL from "../model/urlData.js";
router.get("/",async (req,res)=>
    {
      const allUrls=await URL.find({})
      console.log(allUrls)
      return res.render('home',{
        urls:allUrls,
      })
    })

export default router
