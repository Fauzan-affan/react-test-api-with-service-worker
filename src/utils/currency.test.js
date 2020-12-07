import {convert} from './currency'
import {server, rest} from '../constant/testServer.js'

describe("testing currency high order function", () => {
    it("Should return a rates of USD with PHP destination", async () => {
        const rate = await convert('USD', 'PHP')
        
        expect(rate).toEqual(48.0549387285)
    })

    it("Handle failure", async () => {
        server.use(
            rest.get("https://api.exchangeratesapi.io/latest", (req, res, ctx) => {
                return res(
                    ctx.status(404)
                )
            })
        )

        await expect(convert("FAIL", "PHP")).rejects.toThrow("404")
    })
})