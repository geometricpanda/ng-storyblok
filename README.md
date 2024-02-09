# NG Storyblok

The purpose of this library is to offer a simple way to integrate Storyblok into your Angular
application.

## Config

### tsconfig.json

Update your `tsconfig.json` to include the `dom.iterable` lib.

This is required as `ng-storyblok` uses the `storyblok-js-client`.

```json
// tsconfig.json
{
...
    compilerOptions: {
        lib: [
            "es2020",
            "dom",
            "dom.iterable" // <-- Required due to upstream types
        ]
    }
...
}
```

## Using Preview on localhost

You'll need to create a localhost SSL key: see
https://www.storyblok.com/faq/setup-dev-server-https-proxy

then update your `angular.json` (or `project.json`) serve schematic to include:

```json
// angular.json
    "options": {
        "ssl": true,
        "sslCert": "./localhost.pem",
        "sslKey": "./localhost-key.pem"
    },
```

## Flickering

If you're experiencing flickering when using `ng-storyblok`, this is probably because of this
esbuild issue which will hopefully be resolved soon https://github.com/angular/angular/issues/53191
