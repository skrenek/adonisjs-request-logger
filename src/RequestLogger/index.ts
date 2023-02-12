import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ConfigContract } from '@ioc:Adonis/Core/Config'
import { LoggerContract } from '@ioc:Adonis/Core/Logger'
import { LogFormatProperties, LogFormats } from '@ioc:Adonis/Addons/RequestLogger'
import { inject } from '@adonisjs/application'

@inject(['Adonis/Core/Config', 'Adonis/Core/Logger'])
export class RequestLoggerMiddleware {
  private format: string
  private formatParts: string[]

  constructor(config: ConfigContract, private logger: LoggerContract) {
    this.format = config.get('request-logger.format')
    this.logger = logger
    this.initFormat()
  }

  private initFormat() {
    if (this.format === 'combined') {
      this.format = LogFormats.Combined
    }
    this.formatParts = this.format.split(' ')
  }

  private lookup(format: string, ctx: HttpContextContract): string {
    switch (format) {
      case LogFormatProperties.clientIp:
        return ctx.request.ip()
      case LogFormatProperties.firstLine:
        return `${ctx.request.method()} ${ctx.request.url()} ${ctx.request.request.httpVersion}`
      case LogFormatProperties.referrer:
        return ctx.request.header('referer', '-')
      case LogFormatProperties.remoteHost:
        return ctx.request.host() || ''
      case LogFormatProperties.requestProtocol:
        return ctx.request.protocol()
      case LogFormatProperties.remoteLogName:
        return '-'
      case LogFormatProperties.requestMethod:
        return ctx.request.method()
      case LogFormatProperties.requestPort:
        const host = ctx.request.host()
        const parts = host?.split(':')
        let port = parts && parts.length > 1 ? parts[1] : '443'
        if (port === '443' && ctx.request.protocol() === 'http') {
          port = '80'
        }
        return port
      case LogFormatProperties.queryString:
        return ctx.request.parsedUrl.query || '-'
      case LogFormatProperties.responseStatus:
        return `${ctx.response.getStatus()}`
      case LogFormatProperties.timestamp:
        return new Date().toISOString()
      case LogFormatProperties.remoteUser:
        // @ts-ignore
        return ctx.request.auth?.user?.email || '-'
      case LogFormatProperties.requestUrlPath:
        return ctx.request.parsedUrl.pathname || '-'
      case LogFormatProperties.userAgent:
        return ctx.request.header('user-agent', '-')
      default:
        return ''
    }
  }

  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    await next()
    this.logger.info(this.formatParts.map((value) => this.lookup(value, ctx)).join(' '))
  }
}
