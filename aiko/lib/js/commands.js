const commandline = document.getElementById('command');

let cmdopen;
let commandsplit;
let strings;
let cwdt = document.getElementById('cwd');
let mode = document.getElementById('mode');
let currentopenfile = ""

function parsecommands() {
    cmdsplit = commandline.value.split(" ");
    switch(cmdsplit[0]) {
        case "echo":
            strings = ""
            for(i=1;i<cmdsplit.length; i++) {
                if(i === 1) {
                    strings += cmdsplit[i];
                } else {
                    strings += " " + cmdsplit[i];
                }
            }
            ipcRenderer.invoke('echo', strings);
            break;
        case "touch":
            strings = ""
            for(i=1;i<cmdsplit.length; i++) {
                if(i === 1) {
                    strings += cmdsplit[i];
                } else {
                    strings += " " + cmdsplit[i];
                }
            }
            if(existsSync(strings)) {
                console.log('exists');
            } else {
                appendFile(strings, '', (err) => {
                    if (err) console.log(err);
                });
            }
            break;
        case "rm":
            strings = ""
            for(i=1;i<cmdsplit.length; i++) {
                if(i === 1) {
                    strings += cmdsplit[i];
                } else {
                    strings += " " + cmdsplit[i];
                }
            }
            unlink(strings, (err) => {
                if(err) ipcRenderer.send('asynchronous-message', ['rmfilenotfound', strings])
            })
            break;
        case "chdir":
            strings = ""
            for(i=1;i<cmdsplit.length; i++) {
                if(i === 1) {
                    strings += cmdsplit[i];
                } else {
                    strings += " " + cmdsplit[i];
                }
            }
            try {
                process.chdir(strings);
            } catch(err) {
                ipcRenderer.send('asynchronous-message', ['directorynotfound', strings])
            }
            cwdt.innerText = process.cwd();
            break;
        case "cwd":
            alert(process.cwd());
            break;
        case "mkdir":
            strings = ""
            for(i=1;i<cmdsplit.length; i++) {
                if(i === 1) {
                    strings += cmdsplit[i];
                } else {
                    strings += " " + cmdsplit[i];
                }
            }
            mkdir(strings, (err) => {
                if(err) ipcRenderer.send('asynchronous-message', ['folderexists', strings])
            });
            break;
        case "open":
            strings = ""
            for(i=1;i<cmdsplit.length; i++) {
                if(i === 1) {
                    strings += cmdsplit[i];
                } else {
                    strings += " " + cmdsplit[i];
                }
            }
            readFile(strings, "utf8", (err, data) => {
                if (err) {
                    ipcRenderer.send('asynchronous-message', ['filenotfound', strings])
                } else {
                    editor.setValue(data);
                    document.getElementById("wintitle").innerText = "aiko @ " + join(process.cwd(), strings);
                    if(strings.endsWith(".py") || strings.endsWith(".pyw")) {
                        editor.setOption("mode", "python");
                        mode.innerText = "python"
                    } else if(strings.endsWith(".js")) {
                        editor.setOption("mode", "javascript");
                        mode.innerText = "javascript";
                    } else if(strings.endsWith(".c") || strings.endsWith(".h")) {
                        editor.setOption("mode", "text/x-csrc");
                        mode.innerText = "c";
                    } else if(strings.endsWith(".cpp") || strings.endsWith(".hpp") || strings.endsWith(".C") || strings.endsWith(".c++") || strings.endsWith(".cxx") || strings.endsWith(".hxx") || strings.endsWith(".H") || strings.endsWith(".h++")) {
                        editor.setOption("mode", "text/x-c++src");
                        mode.innerText = "c++";
                    }
                }

                currentopenfile = strings;
            })
            break;
        case "write":
            writeFile(currentopenfile, editor.getValue(), (err) => {
                if(err) console.log(err);
            })
            break;
        default:
            ipcRenderer.send('asynchronous-message', ['invalidcmd', cmdsplit[0]]);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cmdopen = false;
    process.chdir(homedir());
    cwdt.innerText = process.cwd();
})

document.body.addEventListener('keydown', (e) => {
    if(e.key === "/") {
        if(e.metaKey) {
            commandline.style.display = "block";
            commandline.focus();
            cmdopen = true;
        }
    }
})

commandline.addEventListener('keydown', (e) => {
    if(e.key === "Enter") {
        parsecommands();
        commandline.style.display = "none";
        commandline.value = "";
    }
})