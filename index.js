import express from "express";
import urlRoute from "./routes/url.js";
import connectDB from "./config/connect.js";
import URL from "./model/urlData.js";

const app = express();
const PORT = 8000;

//connecting to DB and starting server
connectDB("mongodb://127.0.0.1:27017/urlShortner").then(() => {
  console.log("db connected");
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

//routes
app.use("/url", urlRoute);
// app.get("/:id", async (req, res) => {
//   const shortUrl = req.params.id;
//   //   let shorturl = await URL.find({ shortData: shortUrl });
//   let shorturl = await URL.findOneAndUpdate(
//     {
//       shortData: shortUrl,
//     },
//     {
//       $push: {
//         TotalClicks: {
//           timeStamp: new Date(Date.now()).toString(),
//         },
//       },
//     }
//   );
//   // console.log(shorturl)
//   await console.log("total clicks : "+shorturl.TotalClicks.length)
  
//   // res.redirect(shorturl.redirecUrl);
//   res.send(shorturl)
// });

app.get("/:id", async (req, res) => {
  const shortUrl = req.params.id;
  
  try {
    let shorturl = await URL.findOneAndUpdate(
      {
        shortData: shortUrl,
      },
      {
        $push: {
          TotalClicks: {
            timeStamp: new Date(Date.now()).toString(),
          },
        },
      }
    );

    // Check if shorturl is null before accessing its properties
    if (shorturl) {
      console.log("Total clicks: " + shorturl.TotalClicks.length);
      console.log("redi: " + shorturl.redirecUrl);
      res.redirect(shorturl.redirecUrl);
      
    } else {
      // Handle the case where no document is found
      res.status(404).send("Short URL not found");
    }
  } catch (error) {
    // Handle any errors that occur during the database operation
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});



