declare module '@ioc:Adonis/Addons/RequestLogger' {
  export enum LogFormatProperties {
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

  export enum LogFormats {
    Combined = '%h %l %u %t "%r" %s "%{Referer}" "%{User-agent}',
  }
}
