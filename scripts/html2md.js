// #!/usr/bin/env node

const pagesDir = 'temp/vonunsbekommtihrnix.noblogs.org/wp-json/wp/v2/pages/';
const outDir = 'src/';

var TurndownService = require('turndown')
//var turndownPluginGfm = require('turndown-plugin-gfm')
const fs = require('fs');

var turndownService = new TurndownService()

//var turndownServiceTables = new TurndownService()
//turndownServiceTables.use(turndownPluginGfm.tables);

//var markdown = turndownService.turndown('<h1>Hello world!</h1>')

fs.mkdirSync(outDir, { recursive: true });

const was_is_erlaubt = fs.readFileSync('temp/was_is_erlaubt.md', 'utf8'); // png -> ocr -> odt -> html -> tidy -> markdown
const Kontoschaubild = fs.readFileSync('temp/Kontoschaubild.md', 'utf8');

for (const pageId of fs.readdirSync(pagesDir)) {
  //console.log(`pageId = ${pageId}`);
  const page = JSON.parse(fs.readFileSync(pagesDir + pageId, 'utf8'));
  //console.dir(page);
  const title = turndownService.turndown(page.title.rendered);
  let content = turndownService.turndown(page.content.rendered);

  content = content.replace(/\]\(https:\/\/vonunsbekommtihrnix.noblogs.org\/files\//g, '](files/');
  content = content.replace(/\]\(https:\/\/vonunsbekommtihrnix.noblogs.org\/([^\/]*?)\//g, ']($1.md');

  content = content.replace(/!\[\]\(files\/\d+\/\d+\/zurueck-300x102.png\)/g, 'zurück');
  content = content.replace(/!\[\]\(files\/\d+\/\d+\/weiter-300x102.png\)/g, 'weiter');
  content = content.replace(/!\[\]\(files\/\d+\/\d+\/online_lesen.png\)/g, 'online lesen');
  content = content.replace(/!\[\]\(files\/\d+\/\d+\/PDF_runter_laden.png\)/g, 'PDF runter laden');

  // tables
  content = content.replace(/!\[\]\(files\/\d+\/\d+\/was_is_erlaubt.png\)/g, '\n' + was_is_erlaubt + '\n');
  content = content.replace(/!\[\]\(files\/\d+\/\d+\/Kontoschaubild.png\)/g, '\n' + Kontoschaubild + '\n');

/*
Orf-3.png
Schulden-Geld.png
Orf-2-zentriert.png
Orf-1-Klein.png
*/

  // images
  content = content.replace(/!\[\]\(files\/\d+\/\d+\/(Orf-3\.png)\)/g, '![](images/$1.webp)'); // 2-3-woher-weiss-die-gerichtsvollzieherin-ueberhaupt-was-sie-pfaenden-darf-2.md
  content = content.replace(/!\[\]\(files\/\d+\/\d+\/(Schulden-Geld\.png)\)/g, '![](images/$1.webp)'); // 2-4-5-ein-leben-im-bankrott-2.md
  content = content.replace(/!\[\]\(files\/\d+\/\d+\/(Orf-2-zentriert\.png)\)/g, '![](images/$1.webp)'); // 2-12-persoenliche-erfahrungsberichte-2.md
  content = content.replace(/!\[\]\(files\/\d+\/\d+\/(Orf-1-Klein\.png)\)/g, '![](images/$1.webp)'); // 3-1-2-erzwingungshaft-2.md

  // files
  content = content.replace(/]\(files\/\d+\/\d+\/(Von_uns_bekommt_ihr_nix\.pdf)\)/g, '](files/$1)'); // startseite.md
  var s = '[PDF runter laden](files/Von_uns_bekommt_ihr_nix.pdf)';
  content = content.replace(s, `[//]: # ( ${s} )`); // startseite.md

  content = content.replace(/!\[\]\((files\/\d+\/\d+\/([^ \/]+).png)\)/g, '\n\n[//]: # ($2)\n[//]: # ($1)\n');

  //const slug = (page.slug == 'startseite') ? 'README' : page.slug;
  const slug = page.slug;

  const outFile = outDir + slug + '.md';
  fs.writeFileSync(outFile, `# ${title}\n\n${content}\n`, 'utf8');
  console.log(`done ${outFile}`);
}
