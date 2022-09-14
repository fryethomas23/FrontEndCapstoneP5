import { handleSubmit } from "./formHandler";
import { JSDOM } from "jsdom";

const documentHTML = `
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>Test</title>
    </head>

    <body>

        <header>
            <div class="">
                Logo
            </div>
            <div class="">
                navigation
            </div>
        </header>

        <main>
            <section>
                <form class="">
                    <input id="inputText" type="text" name="input" value="" placeholder="Text">
                    <input id="submit" type="submit" name="" value="submit">
                </form>
            </section>

            <section>
                <strong>Form Results:</strong>
                <div id="irony"></div>
                <div id="subjectivity"></div>
                <div id="text"></div>
            </section>
        </main>

        <footer>
            <p>This is a footer</p>
        </footer>

    </body>
</html>`;

global.window = new JSDOM(documentHTML).window;
global.document = global.window.document;

test("adds server response to webpage", async () => {
  document.getElementById("inputText").value = "test";
  await handleSubmit(new window.Event("click"));
  expect(document.getElementById("irony").textContent).toBe(`Irony: NONIRONIC`);
  expect(document.getElementById("subjectivity").textContent).toBe(
    `Subjectivity: OBJECTIVE`
  );
  expect(document.getElementById("text").textContent).toBe(`Text: \ntest`);
});
