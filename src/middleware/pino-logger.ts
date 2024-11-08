import { pinoLogger } from 'hono-pino';
import pino from 'pino';
import pretty from 'pino-pretty';

export const customLogger = () => {
	return pinoLogger({
		pino: pino(pretty()),
		http: {
			reqId: () => crypto.randomUUID(),
		},
	});
};
