import { validateZipCode } from "./app";
import jsdom from "jsdom";
const VirtualConsole = new jsdom.VirtualConsole();
VirtualConsole.sendTo(console);

test("validate zipcode", async () => {
  expect(validateZipCode(0)).toBe(false);
  expect(validateZipCode(37388)).toBe(true);
});
