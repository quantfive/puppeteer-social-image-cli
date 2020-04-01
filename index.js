import image from "./src/image.js";

const program = require("commander");

program
  .arguments("<title>")
  .option("-s, --subtitle <subtitle>", "subtitle")
  .option("-u, --imageurl <imageurl>", "metatag image url")
  .option("-t, --template <template>", "template")
  .action(async function(title, {subtitle, imageurl, template}) {
    await image(title, subtitle, imageurl, template);
  })
  .parse(process.argv);
