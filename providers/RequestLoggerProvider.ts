import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class RequestLoggerProvider {
  constructor(protected app: ApplicationContract) {}

  public static needsApplication = true

  public register() {
    this.app.container.bind('Adonis/Addons/Skrenek/RequestLogger', () => {
      const { RequestLoggerMiddleware } = require('../src/RequestLogger')
      return RequestLoggerMiddleware
    })
  }

  public boot() {}
}
