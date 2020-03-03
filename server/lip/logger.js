// 参考原文地址 https://blog.csdn.net/weixin_34038652/article/details/93182168
const winston = require('winston')

const options = {
  // 我们在这里定义日志的等级
  levels: { error: 0, warning: 1, notice: 2, info: 3, debug: 4 },
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' })
  ),
  transports: [
    // 文件中我们只打印 warning 级别以上的日志（包含 warning）
    new winston.transports.File({ filename: 'warning.log', level: 'warning' }),
    new winston.transports.File({ filename: 'debug.log', level: 'debug' })
  ]
}

// 开发环境，我们将日志也输出到终端，并设置上颜色
if (process.env.NODE_ENV === 'development') {
  options.format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.colorize(),
    winston.format.json()
  )

  // 输出到终端的信息，我们调整为 simple 格式，方便看到颜色；
  // 并设置打印 debug 以上级别的日志（包含 debug）
  options.transports.push(new winston.transports.Console({
    format: winston.format.simple(), level: 'debug'
  }))
}

winston.loggers.add('access', {
  levels: { access: 0 },
  level: 'access',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'access.log', level: 'access' })
  ]
})

const logger = winston.createLogger(options)

module.exports = {
  logger,
  accessLogger: winston.loggers.get('access')

}
