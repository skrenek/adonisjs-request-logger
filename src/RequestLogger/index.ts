/// <reference path="../../adonis-typings/request-logger.ts" />

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ConfigContract } from '@ioc:Adonis/Core/Config'
import { LoggerContract } from '@ioc:Adonis/Core/Logger'
import { inject } from '@adonisjs/application'
import { LogFormatProperties, LogFormats } from '@ioc:Adonis/Addons/Skrenek/RequestLogger'

@inject(['Adonis/Core/Config', 'Adonis/Core/Logger'])
export class RequestLoggerMiddleware {
  private format: string
  private formatParts: string[]

  constructor(config: ConfigContract, private logger: LoggerContract) {
    this.format = config.get('request-logger.format', 'combined')
    this.initFormat()
  }

  private initFormat() {
    if (this.format === 'combined') {
      this.format = LogFormats.Combined
    }
    this.formatParts = this.format.split(' ')
  }

  private lookup(format: string, ctx: HttpContextContract): string {
    const f = format.replace(/"/g, '')
    let ret: string = ''
    switch (f) {
      case LogFormatProperties.clientIp:
        ret = ctx.request.ip()
        break
      case LogFormatProperties.firstLine:
        ret = `${ctx.request.method()} ${ctx.request.url()} ${ctx.request.request.httpVersion}`
        break
      case LogFormatProperties.referrer:
        ret = ctx.request.header('referer', '-')
        break
      case LogFormatProperties.remoteHost:
        ret = ctx.request.host() || ''
        break
      case LogFormatProperties.requestProtocol:
        ret = ctx.request.protocol()
        break
      case LogFormatProperties.remoteLogName:
        ret = '-'
        break
      case LogFormatProperties.requestMethod:
        ret = ctx.request.method()
        break
      case LogFormatProperties.requestPort:
        const host = ctx.request.host()
        const parts = host?.split(':')
        let port = parts && parts.length > 1 ? parts[1] : '443'
        if (port === '443' && ctx.request.protocol() === 'http') {
          port = '80'
        }
        ret = port
        break
      case LogFormatProperties.queryString:
        ret = ctx.request.parsedUrl.query || '-'
        break
      case LogFormatProperties.responseStatus:
        ret = `${ctx.response.getStatus()}`
        break
      case LogFormatProperties.timestamp:
        ret = new Date().toISOString()
        break
      case LogFormatProperties.remoteUser:
        // @ts-ignore
        if (ctx.auth && ctx.auth.user) {
          // @ts-ignore
          ret = ctx.auth.user.email || '-'
        } else {
          ret = '-'
        }
        break
      case LogFormatProperties.requestUrlPath:
        ret = ctx.request.parsedUrl.pathname || '-'
        break
      case LogFormatProperties.userAgent:
        ret = ctx.request.header('user-agent', '-')
        break
      default:
        ret = ''
        break
    }
    if (format !== f) {
      return format.replace(f, ret)
    }
    return ret
  }

  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    await next()
    this.logger.info(this.formatParts.map((value) => this.lookup(value, ctx)).join(' '))
  }
}
