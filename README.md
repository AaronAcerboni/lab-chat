# Lab-chat

This software monitors the #l4rp irc channel on freenode for shared hyperlinks.

It was born out of a [L4RP Hackday](http://lanyrd.com/2012/l4rp-nld3/).

The intention of the software is to display these links somewhere on the 
[L4RP website](http://l4rp.com).

The possible hyperlinks are:

- `generic` for any old website.
- `code` for code shared as a gist or on pastebin.
- `image` for a hyperlink linking directly to an image.

# How it works

Links which are collected are pushed as an 
[interesting json object](https://github.com/AaronAcerboni/lab-chat/blob/master/link%20type%20schema.md) to a listening client websocket. 
This client then draws them on the page.

# Modules

## app.js

Starts the application and the nosey IRC bot.

## discover.js

Figures out what type of link it is.

## expander.js

Actually creates the shared link. Uses JDOM for scraping out code for `Code`
type links.