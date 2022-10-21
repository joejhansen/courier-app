const editor = document.getElementById('.wysiwyg-form');
const toolbar = document.getElementById('.toolbar');
const buttons = document.querySelectorAll('.editor-btn');
const contentArea = document.getElementById('.textarea');
const modal = document.getElementById('.modal');
const visuellView = document.getElementById('.visuell-view');
const postBtn = document.querySelector('.post-btn');

for (let i = 0; i<buttons.length; i++) {
    let button = buttons[i];

    button.addEventListener('click', function(e) {
        let action = this.dataset.action;
        console.log(button);
        execDefaultAction(action);
        })
    };


function execDefaultAction(action) {
    document.execCommand(action, false);
};


function selectionChange(e) {

    document.addEventListener("DOMContentLoaded", function(event) {
        function childOf(child, parent) {
        return parent.contains(child);
    };
   


    for (let i=0; i<buttons.length; i++) {
        let button = buttons[i];
        
        if(button.dataset.action === 'toggle-view') continue;
       
        button.classList.remove('active');
    }

    if(!childOf(window.getSelection().anchorNode.parentNode, editor))
    return false;

    parentTagActive(window.getSelection().anchorNode.parentNode);
});
};

postBtn.addEventListener('click', function(event) {
    event.preventDefault;
    let text = visuellView.textContent();
    console.log(text);
    console.log(textTwo);
})