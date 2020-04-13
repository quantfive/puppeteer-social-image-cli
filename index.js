import image from "./src/image.js";

const program = require("commander");

program
  .arguments("<title>")
  .option("-s, --subtitle <subtitle>", "subtitle")
  .option("-u, --imageurl <imageurl>", "metatag image url")
  .option("-t, --template <template>", "template")
  .option("-z, --size <size>", "size")
  .action(async function(title, {subtitle, imageurl, template, size}) {
    await image(title, subtitle, imageurl, template, size);
  })
  .parse(process.argv);
