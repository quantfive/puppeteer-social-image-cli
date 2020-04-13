import fs from 'fs';
import puppeteer from 'puppeteer';
import renderSocialImage from 'puppeteer-social-image';

const COMPANY_NAME = "ResearchHub";
const LOGO_URL = "https://www.researchhub.com/static/ResearchHubLogo.png";

let browser;

export default async function image(
  title,
  subtitle = null,
  imageUrl = null,
  template = "fiftyfifty", // article, basic, or fiftyfifty
  size = "twitter",
) {
  const fileName = buildFileName(title);
  const filePath = "images/";
  const file = filePath + fileName + ".png";

  console.log("Generating image:", file);

  browser = browser || (await puppeteer.launch({}));

  const templates = {
    article: {
      backgroundImageOverlay: true, // dark background overlay
      color: "white", // text color
      eyebrow: COMPANY_NAME, // text above title
      googleFont: "Lato",
      title,
      watermark: "www.researchhub.com" // footer text,
    },
    basic: {
      backgroundImageOverlay: true, // dark background overlay
      color: "white", // text color
      eyebrow: COMPANY_NAME, // text above title
      googleFont: "Lato",
      logo: LOGO_URL,
      title,
      watermark: "www.researchhub.com" // footer text,
    },
    fiftyfifty: {
      googleFont: "Lato",
      logo: LOGO_URL,
      split: "straight",
      title,
      watermark: "www.researchhub.com" // footer text,
    },
  };

  const templateParams = templates[template] || templates["fiftyfifty"];

  if (subtitle) {
    templateParams["subtitle"] = subtitle; // text below title
  }

  if (imageUrl) {
    templateParams["imageUrl"] = imageUrl;
  }

  const body = await renderSocialImage({
    template,
    templateParams,
    size, // twitter or facebook
    browser,
  });

  await fs.writeFile(file, body, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Done!");
    }
    process.exit();
  });
};

function buildFileName(title) {
  let fileName = title.toLowerCase();
  fileName = fileName.replace(/\s+/g, "_").trim();
  fileName = fileName + `-${Date.now()}`;
  return fileName;
};
