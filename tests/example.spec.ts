import {writeFileSync} from "fs";
import {Eyes} from "@applitools/eyes-playwright";
import {test} from "@playwright/test";

const myApiKey = process.env.EYES_API_KEY ?? null;

test("check my website looks the same", async ({page}) => {
    if (myApiKey === null) {
        throw new Error("EYES_API_KEY environment variable is not set");
    }

    const eyes = new Eyes();
    eyes.setApiKey(myApiKey);
    await eyes.open(page, "My website", "First test");
    await page.goto("https://www.example.com/");
    await eyes.checkWindow("Main Page");
    const results = await eyes.close();
    writeFileSync("url.txt", results.url);
});
