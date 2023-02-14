/*
 * File: RequestLoggerProvider.ts
 * Created Date: Feb 07, 2023
 * Copyright (c) 2023 Steve Krenek (https://github.com/skrenek)
 * Author: Steve Krenek (https://github.com/skrenek)
 * -----
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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
