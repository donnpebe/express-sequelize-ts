import { Request, Response } from 'express';
import morgan, { TokenIndexer } from 'morgan';

type Tokens = TokenIndexer<Request, Response>;

morgan.token('client-ip', function getPathname(req: Request): string {
  return req.clientIp ?? '-';
});

morgan.token('route', function getRoute(req: Request): string {
  return req.path;
});

function jsonFormat(tokens: Tokens, req: Request, res: Response): string {
  const responseTime = tokens['response-time'](req, res) ?? '-1';
  const responseTimeMs = parseFloat(responseTime);

  const status = parseInt(tokens['status'](req, res) ?? '-1', 10);
  const statusNum = Number.isNaN(status) ? -1 : status;

  const length = parseInt(tokens['res'](req, res, 'content-length') ?? '-1', 10);
  const contentLength = Number.isNaN(length) ? -1 : length;

  return JSON.stringify({
    date: tokens['date'](req, res, 'iso'),
    clientIp: tokens['client-ip'](req, res),
    method: tokens['method'](req, res),
    statusCode: statusNum,
    route: tokens['route'](req, res),
    query: req.query,
    responseTime: responseTimeMs,
    contentLength: contentLength,
  });
}

export function logger() {
  return morgan(jsonFormat);
}
