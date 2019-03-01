import pino from 'pino'

export const L = pino({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL,
})
