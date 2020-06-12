# Lightweight-Textarea-Highlighter
Native JS library to allow you to highlight ranges within &lt;textarea>s

##Introduction
It is not normally possible to highlight ranges within a normal HTML5 &lt;textarea>. However by placing an exact copy of the text behind the &lt;textarea> and highlighting that, you can get the appearance of highlighting within a text area. 

This project was inspired by things like Will Boyd’s [textarea highlighter tutorials](https://codersblock.com/blog/highlight-text-inside-a-textarea/) such as [his JQuery Plugin to get the same effect](https://github.com/lonekorean/highlight-within-textarea)

As well as Gary Sieling’s [JQuery-UI Plugin](http://garysieling.github.io/jquery-highlighttextarea/)

However, as you may notice, both of these solutions depend on JQuery. While JQuery certainly has its uses, what good is forcing small projects to include a massive library like JQuery for a simple feature like this that can be done easily in pure native Javascript. 

After Trying both of them for one of my projects, I decided both were too heavy for the work I was doing and decided to make my own.

|Author       |Libraries                       |Min bytes Imported|
|-------------|--------------------------------|------------------|
|Will Boyd    |highlight-within-textarea       |82.2 KB           |
|Garry Sieling|jquery-highlighttextarea        |357.7 KB          |
|James Oswald |Lightweight-Textarea-Highlighter|2.52              |

Calculations:  
Highlight-within-textarea:  
  70.6 KB : [jquery-3.5.1.slim.min.js](https://code.jquery.com/jquery-3.5.1.slim.min.js)   
  10.6 KB :  [jquery.highlight-within-textarea.js](https://github.com/lonekorean/highlight-within-textarea/blob/master/jquery.highlight-within-textarea.js)  
  0.959 KB : [jquery.highlight-within-textarea.css](https://github.com/lonekorean/highlight-within-textarea/blob/master/jquery.highlight-within-textarea.css)  
+----------------------------------------------------------  
82.2 KB  

jquery-highlighttextarea:  
  70.6 KB [jquery-3.5.1.slim.min.js](https://code.jquery.com/jquery-3.5.1.slim.min.js) 
  31.3 KB : jquery-ui.min.css  
  247 KB : jquery-ui.min.js  
  7.91 KB : [jquery.highlighttextarea.min.js](https://github.com/garysieling/jquery-highlighttextarea/blob/master/jquery.highlighttextarea.min.js)  
 0.915 KB  [jquery.highlighttextarea.min.css](https://github.com/garysieling/jquery-highlighttextarea/blob/master/jquery.highlighttextarea.min.css)  
+----------------------------------------------------------  
357.7 KB  


Lightweight-Textarea-Highlighter:  
+ 2.52 KB :  [lwtah.min.js](https://github.com/James-Oswald/Lightweight-Textarea-Highlighter/blob/master/build/lwtah.min.js)   
+----------------------------------------------------------
2.52 KB  



