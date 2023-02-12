import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class RequestLoggerProvider {
  constructor(protected app: ApplicationContract) {}

  public static needsApplication = true

  public register() {
    this.app.container.bind('Adonis/Addons/RequestLogger', () => {
      const { RequestLoggerMiddleware } = require('../src/RequestLogger/index')
      return RequestLoggerMiddleware
    })
  }

  public boot() {}
}
