# aiko
![version](https://img.shields.io/github/package-json/v/lillupad/aiko)
![license](https://img.shields.io/github/license/lillupad/aiko)
<br>
an unusual code editor written in javascript

## installation
you will need `node`, `npm`, and `git`


1. clone the `aiko` repository with one of the 3 commands:
    * `git clone https://lillupad/aiko.git` via https
    * `git clone git@github.com:lillupad/aiko.git` via ssh
    * `gh repo clone lillupad/aiko` via github cli
    * or using github desktop
2. open the `aiko` repo in a terminal
3. **!!READ [IMPORTANT.md](aiko/lib/IMPORTANT.md) FOR INSTRUCTIONS ON CONFIGURING CODEMIRROR!!**
3. run the command `npm install` to install the dependencies
4. run `npm start` to open aiko

a window should open, looking something like this:
![aiko v0.1 mac](https://i.imgur.com/mbNf3TH.png)

obviously, it would look different on windows or linux, because i'm using macos

note: if it looks more like this:
![aiko v0.1 mac, codemirror failed](https://i.imgur.com/NS8JrpI.png)
you haven't configured codemirror properly. see [IMPORTANT.md](aiko/lib/IMPORTANT.md)

## todo
* add support for custom themes
* add syntax highlighting for more languages
* migrate to tauri
* migrate to codemirror 6
