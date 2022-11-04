// requires and variables for use
// const fs = require('fs');
// const pdf = require('pdf-parse');

const fileInput = document.getElementById('input');
const textArea = document.getElementById('textArea');

// const selectedFile = document.getElementById('input').files[0];

// const localTestFile = `C:/Users/Joe/Documents/test2pageprint.pdf`;

// let dataBuffer = fs.readFileSync(localTestFile);

// pdf(dataBuffer).then(function (data) {

//     let pageCount = data.numpages;
//     // number of rendered pages
//     // console.log(data.numrender);
//     // PDF info
//     let info = data.info;
//     let title = info.Title;
//     let osAuthor = info.Author;
//     let dateCreated = info.CreationDate;
//     // PDF metadata
//     let metadata = data.metadata;
//     // PDF.js version
//     // check https://mozilla.github.io/pdf.js/getting_started/
//     // console.log(data.version);
//     // PDF text
//     let content = data.text;
//     console.log(`${title} written by ${osAuthor}\n${pageCount} Pages\nContent:\n${content}`)
// }).catch((err) => {
//     console.log(err)
// });


fileInput.addEventListener('change', (event) => {
    event.preventDefault();

    const selectedFile = fileInput.files[0];

    let dataBuffer = fs.readFileSync(selectedFile);

    pdf(dataBuffer).then(function (data) {

        let pageCount = data.numpages;
        // number of rendered pages
        // console.log(data.numrender);
        // PDF info
        let info = data.info;
        let title = info.Title;
        let osAuthor = info.Author;
        let dateCreated = info.CreationDate;
        // PDF metadata
        let metadata = data.metadata;
        // PDF.js version
        // check https://mozilla.github.io/pdf.js/getting_started/
        // console.log(data.version);
        // PDF text
        let content = data.text;
        
        if (!content || !pageCount){
            alert('oops, please provide a valid PDF file.')
        } else {
            textArea.textContent = content
        }


        console.log(`${title} written by ${osAuthor}\n${pageCount} Pages\nContent:\n${content}`)
    }).catch((err) => {
        console.log(err)
        alert(`oops, something went wrong with PDF-parse: ${err}`)
    });

})