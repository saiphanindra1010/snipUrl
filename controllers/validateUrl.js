import { nanoid } from "nanoid";
import URL from "../model/urlData.js";

function isValidUrl(url) {
  const urlRegex =
    /^(https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(?:\/[^\s]*)?$/;
    
    console.log(urlRegex.test(url))
  return urlRegex.test(url);
}
async function generateShotendUrl(req, res) {
  const body = req.body;
  console.log(body.url)
  if (!body.url) return res.status(400).json({ error: "url is required" });

  if (isValidUrl(body.url) == true) {
    let id = nanoid(9);

    await URL.create({
      shortData: id,
      redirecUrl: body.url,
      TotalClicks: [],
    });
    return res.json({ Shorturl: id });
  } else {
    return res.status(200).json({ error: "invalid json" });
  }

}
export default generateShotendUrl;
