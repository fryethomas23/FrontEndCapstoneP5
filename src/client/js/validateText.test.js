import { validateText } from "./validateText";
import jsdom from "jsdom";
const VirtualConsole = new jsdom.VirtualConsole();
VirtualConsole.sendTo(console);

test("validates that there text", async () => {
  expect(validateText("test")).toBe(true);
  expect(validateText(" ")).toBe(false);
});
