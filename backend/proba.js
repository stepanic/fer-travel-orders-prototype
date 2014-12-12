var NodePDF = require('nodepdf');
var pdf = new NodePDF(null, 'google2.pdf', {
    'content': '<html><body>Ovo stvarno radi<img src="media/fer.png" alt="google"/><table><tr><td>lijevo</td><td>desno</td></tr></table></body></html>',
    'viewportSize': {
        'width': 1440,
        'height': 900
    },
    'args': '--debug=true'
});

pdf.on('error', function(msg){
    console.log(msg);
});

pdf.on('done', function(pathToFile){
    console.log(pathToFile);
});

// listen for stdout from phantomjs
pdf.on('stdout', function(stdout){
     // handle
});

// listen for stderr from phantomjs
pdf.on('stderr', function(stderr){
    // handle
});
