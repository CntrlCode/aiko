# IMPORTANT

download CodeMirror 5.65.7 from [here](https://codemirror.net/5/codemirror.zip), and copy the folder inside the .zip into this folder.
the project should then look like this:
<pre>
- [folder you cloned aiko into]
    - aiko/
        - lib/
            - codemirror-5.65.7/
e.t.c. (all the other files and folders)
</pre>

then go into codemirror-5.65.7/lib/codemirror.css and change lines 5 & 6
```css
font-family: monospace;
height: 300px;
```
to
```css
height: 91vh;
```