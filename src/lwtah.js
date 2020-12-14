"use strict"

let lwtahStyle;
let lwtahInit = false;
let lwtahUpdateOnInput = true;

let lwtahPreInitRanges = [];
function lwtahAddRange(textareaId, range, color){
    if(lwtahInit){
        let textarea = document.getElementById(textareaId);
        textarea.ranges.push(range);
        textarea.colors.push(color);
        lwtahOnInput(textarea, true);
    }else
        lwtahPreInitRanges.push([textareaId, range, color]);
}

function lwtahClear(textareaId){
    let textarea = document.getElementById(textareaId);
    textarea.ranges = [];
    textarea.colors = [];
    lwtahOnInput(textarea, true);
}

function lwtahSetUpdateOnInput(updateOnInput){
    lwtahUpdateOnInput = updateOnInput;
}

function lwtahUpdate(textareaId){
    lwtahOnInput(document.getElementById(textareaId), true);
}

function lwtahOnScroll(textarea){
    let cont = document.getElementById("lwtahBackdrop" + textarea.id);
    cont.scrollTop = textarea.scrollTop;
}

function lwtahOnInput(textarea, bypassUOI = false){
    let ranges = textarea.ranges;
    //future range validation, too lazy to add this in today
    /*for(let i = 0; i < ranges.length; i++){
        for(let j = 0; j < ranges.length; j++){
            if(i != j && ranges[i][0] > ranges)
        }
    }*/
    if(!lwtahUpdateOnInput && !bypassUOI)
        return;
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
    lwtahStyle = lwtahStyle.trim();
    document.head.innerHTML += `<style>${lwtahStyle}</style>`;
    let textAreas = document.getElementsByTagName("textarea");
    for(let i = 0; i < textAreas.length; i++){
        textAreas[i].setAttribute("oninput", "lwtahOnInput(this)");
        textAreas[i].setAttribute("onscroll", "lwtahOnScroll(this)");
        textAreas[i].style.margin = "0";
        textAreas[i].style.borderRadius = "0";
        let id = textAreas[i].id == "" ? "lwtahTextArea" + i : textAreas[i].id;
        textAreas[i].id = id;
        textAreas[i].outerHTML = `<div class="lwtahCont" id="lwtahCont${textAreas[i].id}"><div class="lwtahBackdrop" id="lwtahBackdrop${textAreas[i].id}" style=""><div class="lwtahHighlight" id="lwtahHighlight${textAreas[i].id}"></div></div>${textAreas[i].outerHTML}</div>`;
        let textarea = document.getElementById(id);
        let backdrop = document.getElementById("lwtahBackdrop" + textarea.id);
        let cont = document.getElementById("lwtahCont" + textarea.id);
        if(textarea.className != ""){
            let classes = textarea.className.split(" ");
            for(let j = 0; j < classes.length; j++){
                cont.classList.add(classes[j]);
                backdrop.classList.add(classes[j]);
            }
        }
        textarea.style.fontFamily = "monospace";
        textarea.style.fontSize = "12pt";
        backdrop.style.fontFamily = textarea.style.fontFamily;
        backdrop.style.fontSize = textarea.style.fontSize;
        backdrop.style.width = textarea.offsetWidth - 6 + "px";
        backdrop.style.height = textarea.offsetHeight - 6 + "px";
        textarea.ranges = [];
        textarea.colors = [];
        lwtahInit = true;
        lwtahOnInput(textarea);
    }
    for(let i = 0; i < lwtahPreInitRanges.length; i++)
        lwatahAddRange(lwtahPreInitRanges[i][0], lwtahPreInitRanges[i][1], lwtahPreInitRanges[i][2]);
});