import  {expect, test} from '@playwright/test';

test("locator Playwright specific", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();

    await page.getByLabel("Employed").check();

    await page.getByLabel("Gender").selectOption("Female");

    await page.getByPlaceholder("Password").fill("!Lulu123");
    await page.locator("input[name='email']").fill("playwrightsatish@xyz.com");
    await page.locator("input[name='name']").first().fill("SatishKumarJena");
    await page.getByRole("button", {name:"Submit"}).click();

    expect(await page.getByText("Success! The Form has been submitted successfully!.").isVisible()).toBeTruthy();
    await page.getByRole("link", {name:"Shop"}).click();



    await page.pause();
});