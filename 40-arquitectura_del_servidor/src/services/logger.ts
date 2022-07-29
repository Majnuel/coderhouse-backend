// require Log4js
import winston from "winston";

const { format } = winston;
const { combine, printf, timestamp, colorize } = format;

/**
 * Ejemplo basico de Logging usando Winston
 * Podemos crear varios transportes para un mismo logger
 * Y a su vez configurarle a cada transporte su nivel
 * Podemos asignarle al Logger un nivel de default, por si algun transporte no define su nivel
 */

const logConfiguration: any = {
  level: "info",
  format: combine(
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    colorize(),
    printf((info) => `${info.level}|${[info.timestamp]}|${info.message}`)
  ),
  transports: [
    new winston.transports.Console({ level: "verbose" }),
    new winston.transports.File({
      filename: "./logs/error-logs.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "./logs/general-logs.log",
    }),
  ],
};

export const logger = winston.createLogger(logConfiguration);

// Log a message for demo:
// logger.silly("Imprimimos Silly");
// logger.debug("Imprimimos Debug");
// logger.verbose("Imprimimos Verbose");
// logger.info("Imprimimos Info");
// logger.warn("Imprimimos Warn");
// logger.error("Imprimimos Error");
