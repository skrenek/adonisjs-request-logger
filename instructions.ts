/*
 * File: instructions.ts
 * Created Date: Feb 13, 2023
 * Copyright (c) 2023 Steve Krenek (https://github.com/skrenek)
 * Author: Steve Krenek (https://github.com/skrenek)
 * -----
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import * as sinkStatic from '@adonisjs/sink'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { join } from 'path'

/**
 * Returns absolute path to the stub relative from the templates
 * directory
 */
function getStub(...relativePaths: string[]) {
  return join(__dirname, 'templates', ...relativePaths)
}

/**
 * Instructions to be executed when setting up the package.
 */
export default async function instructions(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic
) {
  /**
   * Create Config file
   */
  const configPath = app.configPath('request-logger.ts')
  const arlConfig = new sink.files.MustacheFile(projectRoot, configPath, getStub('config.txt'))
  arlConfig.overwrite = true
  arlConfig.commit()
  const configDir = app.directoriesMap.get('config') || 'config'
  sink.logger.action('create').succeeded(`${configDir}/request-logger.ts`)
}
