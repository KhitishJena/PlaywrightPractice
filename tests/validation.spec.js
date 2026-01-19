import {test, expect} from '@playwright/test';

test("More validations", async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   // await page.goto("https://google.com");
   // await page.goBack();            //Navigations
    //await page.goForward();         //in the browser 
    //await page.goBack();            //like forward and backward

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    await page.locator("#confirmbtn").click();
    page.on("dialog",dialog => dialog.accept());
    //page.on("dialog",dialog => dialog.dismiss());

    await page.locator("#mousehover").hover();


    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textContent = await framesPage.locator(".text h2").textContent();

    const subcriberCount = await textContent.split(" ")[1].split(" ")[0];
    console.log(subcriberCount);
    await page.pause();

});