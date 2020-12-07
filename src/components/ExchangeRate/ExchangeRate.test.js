import ExchangeRate from "./ExchangeRate";
import { render } from "@testing-library/react";
import { SWRConfig, cache } from "swr";
import { rest, server } from "../../constant/testServer";

afterEach(() => cache.clear());

test("Should render right rate", async () => {
  const { findByText } = render(
    <SWRConfig value={{ dedupingInterval: 0 }}>
      <ExchangeRate />
    </SWRConfig>
  );

  const key = await findByText(/PHP/i);
  const separator = await findByText(/:/i);
  const value = await findByText(/48.0549387285/i);

  expect(key).toBeInTheDocument();
  expect(separator).toBeInTheDocument();
  expect(value).toBeInTheDocument();
});

test("Should handle error", async () => {
  server.use(
    rest.get("https://api.exchangeratesapi.io/latest", (req, res, ctx) => {
      return res(ctx.status(404));
    })
  );

  const { findByText } = render(
    <SWRConfig value={{ dedupingInterval: 0 }}>
      <ExchangeRate />
    </SWRConfig>
  );

  const element = await findByText(/Error/i);
  expect(element).toBeInTheDocument();
});
