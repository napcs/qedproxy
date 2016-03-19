# QEDproxy

When developing front-end apps, you need an API. But that API might not support 
CORS. That means you have to write your own proxy and serve your app
from the same server as your proxy. 

QEDproxy can serve your client-side app and let you proxy requests to a remote
endpoint.

Directory listing is supported, and `index.html` is a default filename.

## Example

You're writing a cool app that shows who's in space right now.

The api <http://api.open-notify.org/astros.json> is a fantastic resource but
it's not available locally. 

QEDProxy to the rescue.  

Put your app in the `public` folder.

Then run `qedproxy` and pass it the public folder where your pages are, and the root of the
remote URL's endpoint. 

```
$ qedproxy public http://api.open-notify.org
```

A server starts on port  `4242`.

* Visit <http://localhost:4242> to see your pages.
* Visit <http://localhost:4242/api/astros.json> to see the result of the proxied request.

A request to `/api` on your local server maps to `/` on the remote server, which should work in most cases.

## CORS

CORS headers are set up to be wide-open. So you don't have to use this as a static server if you don't want to. Fire this up on
some port and hit it from wherever. Should work great.


## Install

QEDproxy has a binary.

```
$ npm install -g qedproxy
```

It's also something you could install per project.

```
$ npm install qedproxy --save-dev
```

Although this will be placed in `node_modules` instead so you should start it appropriately.

## Tests

Tests are written with Mocha and Should.js. To run them, run

```
$ npm test
```


## Contributing

Contributions are welcome.

Fork, write a **single feature** or **single bugfix** with passing tests. Make a pull request **that justifies why this feature should exist((, but please don't touch the REAMDE file or bump the version.

New features without justification will be closed automatically. 

License: MIT

See `LICENSE` for details.


