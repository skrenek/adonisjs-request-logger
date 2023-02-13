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
