const {test, expect} = require('@playwright/test');


test('Browser Fixture Context Playwright Test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('input#username');
    const passWord = page.locator('input#password');
    const signInBtn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body .card-title a");
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    
    await userName.fill("satish");
    await passWord.fill("learning");
    await signInBtn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await passWord.fill("");
    await passWord.fill("learning");
    await signInBtn.click();

    //console.log(await cardTitles.nth(0).textContent());
    //console.log(await cardTitles.nth(1).textContent());
    //console.log(await page.locator(".card-body .card-title a").first().textContent());

    //await page.waitForLoadState("networkidle"); //helps in waiting till the network goes idle after all calls
    await cardTitles.last().waitFor(); //helps in waiting till the network goes idle after all calls as the above is flaky at sometimes
    const allCardTitles = await cardTitles.allTextContents();
    console.log(allCardTitles); 

});

test('UI Test practice page', async ({page})=>
{
    const userName = page.locator('input#username');
    const passWord = page.locator('input#password');
    const signInBtn = page.locator("#signInBtn");
    const dropDown = page.locator("select[class='form-control']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await userName.fill("rahulshettyacademy");
    await passWord.fill("learning");
    console.log("Before Check if the radio Button is checked or not: ",await page.locator(".customradio").nth(1).isChecked());
    await page.locator(".customradio").nth(1).click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".customradio").nth(1)).toBeChecked();
    console.log("After Check if the radio Button is checked or not: ",await page.locator(".customradio").nth(1).isChecked());
    await dropDown.selectOption("consult");

    await console.log("************");

    console.log("Before Check if the checkbox is checked or not: ",await page.locator("#terms").isChecked());
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    console.log("After Check if the checkbox is checked or not: ",await page.locator("#terms").isChecked());
    await page.locator("#terms").uncheck();
    console.log("After Check if the checkbox is checked or not: ",await page.locator("#terms").isChecked());
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await signInBtn.click();

    await console.log("************");

    const blinkText = page.locator("a[target='_blank']");
    await expect(blinkText).toHaveAttribute("class","blinkingText");

});

test("Child window Handling", async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const blinkText = page.locator("a[target='_blank']");

    const [newPage] = await Promise.all(
    [context.waitForEvent("page"),
    blinkText.click()])
    
    const text = await newPage.locator(".red").textContent();
    console.log(text);

    const domainName = await text.split("@");
    const userId = await domainName[1].split(" ")[0].split(".")[0];
    console.log(userId);

    const userName = page.locator('input#username');
    const passWord = page.locator('input#password');
    const signInBtn = page.locator("#signInBtn")

    await userName.fill(userId);
    //inputValue() helps in grabbing the value that is entered by user and not attached to the DOM
    console.log("The entered userId is:- ",await userName.inputValue());
    await passWord.fill("learning")
    await signInBtn.click();

    //await page.pause();

});

test('Page Fixture Playwright Test', async ({page})=>
{
    /*
        As no context is created so the parameter is passed in the function above as "page" which 
        inbuilt creates the context and page.
    const context = await browser.newContext();
    const page = await context.newPage();
    */
    await page.goto("https://google.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});