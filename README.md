# NG Storyblok

The purpose of this library is to offer a simple way to integrate Storyblok into your Angular application.

## Config

### tsconfig.json
Update your `tsconfig.json` to include the `dom.iterable` lib.

This is required as `ng-storyblok` uses the `storyblok-js-client`.

```json
//tsconfig.json
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
