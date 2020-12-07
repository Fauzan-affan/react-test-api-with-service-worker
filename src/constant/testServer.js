import {rest} from 'msw'
import {setupServer} from 'msw/node'

const server = setupServer(
    rest.get("https://api.exchangeratesapi.io/latest", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({rates: {PHP: 48.0549387285}})
        )
    }),
    rest.get("*", (req, res, ctx) => {
        console.log(`Error!!! Please add request handler for ${req.url.toString()}`)
        return res(
            ctx.status(500),
            ctx.json({ error: "Please add request handler"})
        )
    })
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

export {server, rest}