/*
 * File: request-logger.ts
 * Created Date: Feb 08, 2023
 * Copyright (c) 2023 Steve Krenek (https://github.com/skrenek)
 * Author: Steve Krenek (https://github.com/skrenek)
 * -----
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare module '@ioc:Adonis/Addons/Skrenek/RequestLogger' {
  import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

  export const enum LogFormatProperties {
    clientIp = '%a',
    firstLine = '%r',
    referrer = '%{Referer}',
    remoteHost = '%h',
    requestProtocol = '%H',
    remoteLogName = '%l',
    requestMethod = '%m',
    requestPort = '%p',
    queryString = '%q',
    responseStatus = '%s',
    timestamp = '%t',
    remoteUser = '%u',
    requestUrlPath = '%U',
    userAgent = '%{User-Agent}',
  }

  export const enum LogFormats {
    Combined = '%h %l %u %t "%r" %s "%{Referer}" "%{User-Agent}"',
  }

  export interface RequestLoggerMiddlewareContract {
    new (format: string): {
      handle(ctx: HttpContextContract, next: () => Promise<void>)
    }
  }

  const RequestLoggerMiddleware: RequestLoggerMiddlewareContract
  export default RequestLoggerMiddleware
}
