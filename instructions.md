The package has been configured successfully.

See the config/request-logger.ts for configuration settings.

To utilize the logger, add the following to your start/kernel.ts file in the global middleware array at or near the end of the array.

`() => import('@ioc:Adonis/Addons/Skrenek/RequestLogger'),`