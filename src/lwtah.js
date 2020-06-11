"use strict"

function scrollBarWidth(){
    document.body.style.overflow = 'hidden'; 
    let width = document.body.clientWidth;
    document.body.style.overflow = 'scroll'; 
    width -= document.body.clientWidth; 
    if(!width) width = document.body.offsetWidth - document.body.clientWidth;
        document.body.style.overflow = ''; 
    return width; 
  } 

function lwatahAddRange(textarea, range, color){
    textarea.ranges.push(range);
    textarea.colors.push(color);
    lwtahOnInput(textarea);
}

function lwatahClear(textarea){
    textarea.ranges = [];
    textarea.colors = [];
    lwtahOnInput(textarea);
}

function lwtahOnScroll(textarea){
    let cont = document.getElementById("lwtahBackdrop" + textarea.id);
    cont.scrollTop = textarea.scrollTop;
}

function lwtahOnInput(textarea){
    let ranges = textarea.ranges;
    let colors = textarea.colors;
    let text = textarea.value;
    text = text.replace(/\n$/g, "\n\n");
    let indexOffset = 0;
    for(let i = 0; i < ranges.length; i++){
        if(ranges[i][0] < text.length && ranges[i][1] < text.length){
            let markStart = "<mark class='lwtahMark' style='background-Color:" + colors[i] + ";'>";
            let markEnd = "</mark>";
            text = text.slice(0, ranges[i][0] + indexOffset) + markStart + text.slice(ranges[i][0] + indexOffset)
            indexOffset += markStart.length;
            text = text.slice(0, ranges[i][1] + indexOffset) + markEnd + text.slice(ranges[i][1] + indexOffset)
            indexOffset += markEnd.length;
        }
    }
    document.getElementById("lwtahHighlight" + textarea.id).innerHTML = text; 
}

window.addEventListener("load", function(event){
    document.head.innerHTML += `<style>
        lwtahCont{
            display: block;
        }
    
        textarea{
            margin: 0;
            border-radius: 0;
            color: #444;
            background-color: transparent;
            display: block;
            position: relative;
            z-index: 2;
            margin: 0;
            border: 1px solid black;
            resize: none;
            overflow-y: scroll;
            font-family: inherit; 
        }

        .lwtahBackdrop{
            margin: 0;
            border-radius: 0;
            overflow: auto;
            background-color: #fff;
            position: absolute;
            z-index: 1;
            padding: 3px;
            overflow-y:scroll;
        }
        
        .lwtahHighlight{
            white-space: pre-wrap;
            word-wrap: break-word;
            /*color: transparent;*/
        }

        .lwtahMark{
            /*color: transparent;*/
        }
    </style>`;
    let textAreas = document.getElementsByTagName("textarea");
    for(let i = 0; i < textAreas.length; i++){
        textAreas[i].setAttribute("oninput", "lwtahOnInput(this)");
        textAreas[i].setAttribute("onscroll", "lwtahOnScroll(this)");
        textAreas[i].style.margin = "0";
        textAreas[i].style.borderRadius = "0";
        let id = textAreas[i].id == "" ? "lwtahTextArea" + i : textAreas[i].id;
        textAreas[i].id = id;
        textAreas[i].outerHTML = `
        <div class="lwtahCont" id="lwtahCont${textAreas[i].id}">
            <div class="lwtahBackdrop" id="lwtahBackdrop${textAreas[i].id}" style="">
                <div class="lwtahHighlight" id="lwtahHighlight${textAreas[i].id}"></div>
            </div>
            ${textAreas[i].outerHTML}
        </div>`;
        let textarea = document.getElementById(id);
        let cont = document.getElementById("lwtahBackdrop" + textarea.id);
        if(textarea.style.font == ""){
            textarea.style.fontFamily = "monospace";
            textarea.style.fontSize = "12pt";
        }
        cont.style.fontFamily = textarea.style.fontFamily;
        cont.style.fontSize = textarea.style.fontSize;
        cont.style.width = textarea.offsetWidth - 6 + "px";
        cont.style.height = textarea.offsetHeight - 6 + "px";
        textarea.ranges = [];
        textarea.colors = [];
        lwtahOnInput(textarea);
    }
});