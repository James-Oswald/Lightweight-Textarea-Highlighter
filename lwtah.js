

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

function lwtahOnInput(textarea){
    let ranges = textarea.ranges;
    let colors = textarea.colors;
    let text = textarea.value;
    text = text.replace(/\n$/g, "\n\n");
    let indexOffset = 0;
    for(let i = 0; i < ranges.length; i++){
        if(ranges[i][0] < text.length && ranges[i][1] < text.length){
            let markStart = "<mark class='lwtahMark' style='backgroundColor:" + colors[i] + ";'>";
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
        textarea{
            margin: 0;
            border-radius: 0;
            color: #444;
            background-color: transparent;
            display: block;
            position: absolute;
            z-index: 2;
            margin: 0;
        }

        .lwtahBackdrop{
            overflow: auto;
            background-color: #fff;
            position: absolute;
            z-index: 1;
        }
        
        .lwtahHighlight{
            white-space: pre-wrap;
            word-wrap: break-word;
            color: transparent;
        }

        .lwtahMark{
            color: transparent;
        }
    </style>`;
    let textAreas = document.getElementsByTagName("textarea");
    for(let i = 0; i < textAreas.length; i++){
        textAreas[i].setAttribute("oninput", "lwtahOnInput(this)");
        textAreas[i].setAttribute("onscroll", "lwtahOnInput(this)");
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
            </div>`
        textArea = document.getElementById(id);
        textArea.ranges = [];
        textArea.colors = [];
        lwtahOnInput(textArea);
    }
});