import { setupServer } from "msw/node";
import { rest } from "msw";

export function createServer(handlerConfig) {
	const handlers = handlerConfig.map((config) => {
		return rest[config.method || "get"](config.url, (req, res, ctx) => {
			return res(
				ctx.status(config.status || 200),
				ctx.json(config.res(req, res, ctx))
			);
		});
	});

	const server = setupServer(...handlers);

	beforeAll(() => {
		server.listen();
	});

	afterEach(() => {
		server.resetHandlers();
	});

	afterAll(() => {
		server.close();
	});
}
