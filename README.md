# adonisjs-request-logger
> A simple request logger module for [AdonisJS](https://adonisjs.com/).

[![npm-image]][npm-url] [![license-image]][license-url] [![typescript-image]][typescript-url]

This module provides a request (access) logger for [AdonisJS](https://adonisjs.com/).  

The supported format codes approximate what [Apache log formats](https://httpd.apache.org/docs/2.4/mod/mod_log_config.html#formats) support, but not all formats are supported.  See the [LogFormatProperties enum](https://github.com/skrenek/adonisjs-request-logger/blob/b9cbdb45496791551c6b3d280f00de7a2a748284/adonis-typings/request-logger.ts#L14) for the currently supported formats.

A helper is also provided for an approximation of Apache log format's "combined" log format via the `LogFormat.combined` enum member.  This is the default format.

Finally, the log messages are created via AdonisJS's built in Logger class as info-level messages.

---
## Installation

`npm install @skrenek/adonisjs-request-logger`

`node ace configure @skrenek/adonisjs-request-logger`  

> The configure command adds the provider to your application and generates the default config file.

---
## Usage

### Registering the Middleware
Register the middleware in `start/kernel.ts` by adding:

`() => import('@ioc:Adonis/Addons/Skrenek/RequestLogger')` to your global middleware array.  See the example below.

```typescript
Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
  () => import('@ioc:Adonis/Addons/Skrenek/RequestLogger'), // <- add this line
])
```

### Configuring the Log Format
The log format can be customized by configuring it in `config/request-logger.ts`.  Only one property is exposed: `format`.  Set it to a string containing log formats, or use the shortcut string "combined" to set it to the best approximation of Apache's combined log format.

Supported log formats can be found [here](https://github.com/skrenek/adonisjs-request-logger/blob/b9cbdb45496791551c6b3d280f00de7a2a748284/adonis-typings/request-logger.ts#L14).

> One final note.  If you're using AdonisJS's supported authentication module, the remote user log format (%u) will display the authenticated user's email address if available.

[npm-image]: https://img.shields.io/npm/v/adonisjs-request-logger.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/adonisjs-request-logger "npm"

[license-image]: https://img.shields.io/npm/l/adonisjs-request-logger?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"
