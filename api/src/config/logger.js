import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

const logFormat = printf(info => {
    let logLine = `${info.timestamp} [${info.level}] Method '${info.method}'. ${info.message}. `;
    logLine += info.queryParameters ? `Parameters: ${info.queryParameters}.` : '';

    return logLine;
});

const logger = createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: './logs/error.log', level: 'error' }),
        new transports.File({ filename: './logs/info.log', level: 'info' })
    ]
});

export { logger };
