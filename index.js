import express from "express";
import urlRoute from "./routes/url.js";
import connectDB from "./config/connect.js";
import URL from "./model/urlData.js";
import staticData from "./routes/staticData.js"
import ejs from "ejs"
const app = express();
import path from "path"
const PORT = 8000;
const DB="mongodb://127.0.0.1:27017/urlShortner"
//connecting to DB and starting server
connectDB(DB).then(() => {
  console.log("DB connected");
  app.listen(PORT, () => {
    console.log("server started", PORT);
  });
})
.catch((error)=>{
  console.error("DB connection error ",error)
})

//middleware
app.use(express.json());
const validateJson = (req, res, next) => {
  // Parse the JSON request body
  const body = req.body;

  // Check if the request body is a valid JSON object
  if (!body || typeof body !== 'object') {
    // Return an error response if the request body is invalid
    return res.status(400).send({
      message: 'Invalid JSON request body'
    });
  }

  // Call the next middleware function
  next();
};
app.use(express.json());
app.set("view engine","ejs")
app.set("views",path.resolve('./views'))
//routes
app.use("/",staticData)
app.use("/url", urlRoute);

app.get("/:id", async (req, res) => {
  const shortUrl = req.params.id;
  // console.log(shortUrl)
  try {
    let shorturl = await URL.findOneAndUpdate(
      {
        shortData: shortUrl,
      },
      { $push: {"TotalClicks": {"stamp":["wefffffff"] } } }
    );
    // console.log(shortUrl)
    // Check if shorturl is null before accessing its properties
    if (shorturl) {
      // console.log("Total clicks: " + shorturl.TotalClicks.length);
      // console.log("redi: " + shorturl.redirecUrl);
      res.redirect(shorturl.redirecUrl);
      
    } else {
      // Handle the case where no document is found
      res.status(404).send("Short URL not found");
    }
  } catch (error) {
    // Handle any errors that occur during the database operation
    console.error("Error:",error);
    res.status(500).json(error);
  }
});



