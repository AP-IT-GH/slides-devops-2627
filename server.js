/* official Reveal docs give the impression each presentation needs an instance of the source code
 * this wrapper application allows us to write presentations separately from the source code */
const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8000;
const presentationTemplateFilePath = "presentation.ejs";
const overviewTemplateFilePath = "overview.ejs";

const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
const numberingRegex = /\d+ *- */;

app.get('/', (_req, res, next) => {
    presentationsWithImage = getDirectories(__dirname)
        .filter((s) => !s.startsWith(".") && !["node_modules", "voorbeeldslides"].includes(s))
        .map((s) => {
            let imageLocation = "fallback-onderwerp.png";
            let specificImageLocation = path.join(__dirname, s, "onderwerp.png")
            if (fs.existsSync(specificImageLocation)) {
                imageLocation = path.join(s, "onderwerp.png");
            }
            return { presentation: s, presentationImage: imageLocation, presentationName: s.replace(numberingRegex, "") }
        });

    ejs.renderFile(
        overviewTemplateFilePath,
        { presentationsWithImage },
        (err, str) => {
            if (err) return next(err);
            res.send(str);
        });
});

app.get('/:topic', (req, res, next) => {
    const topic = req.params["topic"];
    // don't add path prefix like /presentations
    // this makes it easier to deal with relative links
    presentations = getDirectories(__dirname)
        .filter((s) => !s.startsWith(".") && !["node_modules", "voorbeeldslides"].includes(s));
    if (!presentations.includes(topic)) {
        next();
    }
    else {
        const staticDir = path.join(__dirname, topic);
        // enables relative linking of images from within presentations
        // okay to do this here
        // don't need to serve static files that will not be viewed
        app.use(express.static(staticDir));
        const contentFilePath = path.join(staticDir, "index.md");
        const markdownContent = fs.readFileSync(contentFilePath, 'utf8');
        ejs.renderFile(
            presentationTemplateFilePath,
            { markdownContent, folderName: topic },
            (err, str) => {
                if (err) {
                    console.error(err);
                }
                else {
                    res.send(str);
                }
            });
    }
});

// have to serve fixed files
app.use(express.static("."));
app.use("/reveal.js", express.static(__dirname + "/node_modules/reveal.js"))
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
