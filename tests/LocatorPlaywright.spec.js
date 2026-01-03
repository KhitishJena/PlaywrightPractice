import  {expect, test} from '@playwright/test';

test("locator Playwright specific", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();

    await page.getByLabel("Employed").check();

    await page.getByLabel("Gender").selectOption("Female");

    await page.getByPlaceholder("Password").fill("!Lulu123");
    await page.getByLabel("Password").fill("");
    await page.getByLabel("Password").fill("!Lulu123");
    await page.locator("input[name='email']").fill("playwrightsatish@xyz.com");
    await page.locator("input[name='name']").first().fill("SatishKumarJena");
    await page.getByRole("button", {name:"Submit"}).click();

    expect(await page.getByText("Success! The Form has been submitted successfully!.").isVisible()).toBeTruthy();
    await page.getByRole("link", {name:"Shop"}).click();

    await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button").click();

    await page.pause();
});

test.only("Calendar Test",async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    const monthNo = "June";
    const year = "2027";
    const day = "15";

    const topDeals = page.locator("div a[class*='cart']");
    

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");

    const [newPage] = await Promise.all(
    [context.waitForEvent("page"),
    topDeals.nth(1).click()]);

    await newPage.locator("div button[class*='calendar-button']").click();

    await newPage.locator(".react-calendar").waitFor();
    await newPage.locator(".react-calendar").locator(".react-calendar__navigation__label").click();
    await newPage.locator(".react-calendar").locator(".react-calendar__navigation__label").click();

    await newPage.locator(".react-calendar").getByText(year).click();
    await newPage.locator(".react-calendar").getByText(monthNo).click();
    await newPage.locator(".react-calendar").getByText(day).click();


    await newPage.pause();

});