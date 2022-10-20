// entire editor
const editor = document.getElementById('.wysiwyg-form');
const toolbar = document.getElementById('.toolbar');
const buttons = document.querySelectorAll('.editor-btn');
const contentArea = document.getElementById('.content-area');
const modal = document.getElementById('.modal');
const visuellView = document.getElementById('.textarea')

document.addEventListener('selectionchange', selectionChange);

// visuellView.addEventListener('paste', pasteEvent());
// document.addEventListener('DOMContentLoaded', function(event){
// contentArea.addEventListener("keyup", addParagraphTag);
// });

console.log(buttons);

for (let i = 0; i<buttons.length; i++) {
    let button = buttons[i];

    button.addEventListener('click', function(e) {
        let action = this.dataset.action;
        console.log(button);

        switch(action) {
            case 'toggle-view':
                execCodeAction(this, editor);
                break;
                case 'createLink':
                    execLinkAction();
                    break;
                default:
                    execDefaultAction(action);
        }
    });
};

function execCodeAction(button, editor) {
    if(button.classList.contains('active')) {
        visuellView.innerHTML = htmlView.value;
        htmlView.style.display = 'none';
        visuellView.style.display = 'block';

        button.classList.remove('active');
    } else {
        htmlView.innerText = visuellView.innerHTML;
        visuellView.style.display = 'none';
        htmlView.style.dsiplay='block';

        button.classList.add('active');
    };
};

function execLinkAction(){
    modal.style.display = 'block';
    let selection = saveSelection();
    
    let submit = modal.querySelectorAll('button.done')[0];
    let close = modal.querySelectorAll('.close')[0];

    submit.addEventListener('click', function(e) {
        e.preventDefault();
        let newTabCheckbox = modal.querySelectorAll('#new-tab')[0];
        let linkInput = modal.querySelectorAll('#linkValue')[0];
        let linkValue = linkInput.value;
        let newTab = newTabCheckbox.checked;

        restoreSelection(selection);

        if(window.getSelection().toString()) {
            let a = document.createElement('a');
            a.href=linkValue;
            if(newTab) a.target = '_blank';
            window.getSelection().getRangeAt(0).surroundContents(a);
        }
    
        modal.style.display = 'none';
        linkInput.value = '';

        submit.removeEventListener('click', arguments.callee);
        close.removeEventListener('click', arguments.callee);
    });

    close.addEventListener('click', function(e) {
        e.preventDefault();
        let linkInput = modal.querySelectorAll('#linkValue')[0];

        modal.style.display = 'none';
        linkInput.value = '';

        submit.removeEventListener('click', arguments.callee);
        close.removeEventListener('click', arguments.callee);
    });
};

function execDefaultAction(action) {
    document.execCommand(action, false);
};

function saveSelection() {
    if(window.getSelection) {
        sel = window.getSelection();
        if(sel.getRangeAt && sel.rangeCount) {
            let ranges = [];
            for(var i=0, len = sel.rangeCount; i<len; ++i) {
                ranges.push(sel.getRangeAt(i));
            }
            return ranges;
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
};

function restoreSelection(savedSel) {
    if(savedSel) {
        if(window.getSelection) {
            sel = window.getSelection();
            sel.removeAllRanges();
            for(var i=0, len = savedSel.length; i<len; ++i) {
                sel.addRange(savedSel[i]);
            }
        } else if (document.selection && savedSel.select) {
            savedSel.select();
        }
    }
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



function parentTagActive(elem) {
    if(!elem || !elem.classList || elem.classList.contains('visuell-view')) return false;

    let toolbarButton;
    
    let tagName = elem.tagName.toLowerCase();
    toolbarButton = document.querySelectorAll(`.toolbar .editor-btn[data-tag-name="${tagName}"]`)[0];

    if(toolbarButton) {
        toolbarButton.classList.add('active')
        }
        return
        parentTagActive(elem.parentNode);
};

function pasteEvent(e) {
    e.preventDefault();
    
    let text = (e.originalEvent || e.clipboardData.getData('text/plain'));

    document.execCommand('insertHTML', false, text);
};

// function addParagraphTag(evt) {
//     if (evt.keyCode == '13') {
//         if(window.getSelection().anchorNode.parentNode.tagName === 'LI') return;
//         document.execCommand('formatBlock', false, 'p');
//     }
// };