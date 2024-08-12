# Lightweight-Textarea-Highlighter
Native JS library to allow you to highlight ranges within &lt;textarea>s

!!!Disclaimer!!!: this project is very janky. It should not be used as a serious library for serious projects,
please consider the later jquery solutions if you need a fully fledged solution. 

## Examples

* [Single text box with some highlights](https://james-oswald.github.io/Lightweight-Textarea-Highlighter/examples/example1.html)
* [Multiple text boxes with dif fonts and colors](https://james-oswald.github.io/Lightweight-Textarea-Highlighter/examples/example2.html)
* [Dynamically adding and removing highlights](https://james-oswald.github.io/Lightweight-Textarea-Highlighter/examples/example3.html)

## Introduction
It is not normally possible to highlight ranges within a normal HTML5 &lt;textarea>. However by placing an exact copy of the text behind the &lt;textarea> and highlighting that, you can get the appearance of highlighting within a text area. 

This project was inspired by things like Will Boyd’s [textarea highlighter tutorials](https://codersblock.com/blog/highlight-text-inside-a-textarea/) such as his [JQuery Plugin to get the same effect](https://github.com/lonekorean/highlight-within-textarea) and Gary Sieling’s [JQuery-UI Plugin](http://garysieling.github.io/jquery-highlighttextarea/).

However, as you may notice, both of these solutions depend on JQuery. While JQuery certainly has its uses, what good is forcing small projects to include a massive library like JQuery for a simple feature like this that can be done easily in pure native Javascript. 

After Trying both of them for one of my projects, I decided both were too heavy for the work I was doing and decided to make my own library in pure native Javascript.

## Usage

On the releases page (or in the build dir) you will find `lwtah.js`(~5 KB) and `lwtah.min.js` (~3 KB), to enable the library copy one of these files into your project, include it with a script tag in the head, and you’re good to go, it’s that easy. 

```html
<script src="lwtah.min.js"></script>
```
Or
```html
<script src="lwtah.js"></script>
```
Once included, the library exposes a few functions and globals prefixed with lwtah to be accessed, however most of them are for internal use, The only three functions that should be used externally are:

`lwtahAddRange(textAreaId, range, color)` Adds a range to be highlighted within a textarea
+ `textAreaId`: The id of the &lt;textarea> to apply highlight to as a string
+ `range`: The range to highlight as an array in the form [start_index, end_index],start_index must be greater then 0, start_index must be less then end_index, and end_index must not exceed the length of text in the text box. 
+ `color`: The color of the highlight, any valid css color string. 

`lwtahClear(textAreaId)` Removes all highlights from the given textarea
+ `textAreaId`: The id of the &lt;textarea> to apply highlight to as a string

`lwtahUpdate(textAreaId)` call to update highlighting if textarea’s .value or .innerHTML is modified by a script rather then input
+ `textAreaId`: The id of the &lt;textarea> to apply highlight to as a string

See examples in the `/example/` folder for some sample code using these functions as you would in a normal project. 

## Limitations

This project isn’t fully completed there are quite a few restrictions on usage

1) When adding ranges via lwtahAddRange, ranges must be added in the order that they appear in the textbox, not doing so will cause undefined behavior. 

2) When adding ranges via lwtahAddRange, ranges may not overlap, having overlapping ranges will cause undefined behavior


## Comparison

|Library                         |Min bytes Imported|
|--------------------------------|------------------|
|highlight-within-textarea       |82.2 KB           |
|jquery-highlighttextarea        |357.7 KB          |
|Lightweight-Textarea-Highlighter|2.6 KB            |

Calculations:  
highlight-within-textarea:  
&nbsp;70.6 KB : [jquery-3.5.1.slim.min.js](https://code.jquery.com/jquery-3.5.1.slim.min.js)   
&nbsp;10.6 KB :  [jquery.highlight-within-textarea.js](https://github.com/lonekorean/highlight-within-textarea/blob/master/jquery.highlight-within-textarea.js)  
&nbsp;0.959 KB : [jquery.highlight-within-textarea.css](https://github.com/lonekorean/highlight-within-textarea/blob/master/jquery.highlight-within-textarea.css)  
+----------------------------------------------------------  
&nbsp;82.2 KB  

jquery-highlighttextarea:  
&nbsp;70.6 KB [jquery-3.5.1.slim.min.js](https://code.jquery.com/jquery-3.5.1.slim.min.js)  
&nbsp;31.3 KB : jquery-ui.min.css  
&nbsp;247 KB : jquery-ui.min.js  
&nbsp;7.91 KB : [jquery.highlighttextarea.min.js](https://github.com/garysieling/jquery-highlighttextarea/blob/master/jquery.highlighttextarea.min.js)  
&nbsp;0.915 KB [jquery.highlighttextarea.min.css](https://github.com/garysieling/jquery-highlighttextarea/blob/master/jquery.highlighttextarea.min.css)  
+----------------------------------------------------------  
&nbsp;357.7 KB  


Lightweight-Textarea-Highlighter:  
&nbsp;2.52 KB :  [lwtah.min.js](https://github.com/James-Oswald/Lightweight-Textarea-Highlighter/blob/master/build/lwtah.min.js)   
+----------------------------------------------------------  
&nbsp;2.52 KB  

