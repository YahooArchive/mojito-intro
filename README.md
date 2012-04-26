# Intro to Mojito

This is an example Mojito application which introduces Mojito. The deck itself is also a mojit.

## Installing Mojito

First [install Node.js](http://nodejs.org/#download), then:

    $ sudo npm i mojito -g
    $ sudo npm i supervisor -g

## Git These Slides

[install git](http://git-scm.com/download), then:

    $ git clone git://github.com/gzip/mojito-app.git && cd mojito-app
    $ npm i highlight
    $ supervisor -w . -e 'js|json|html' start.js

And open your browser to http://localhost:8777/slides/
