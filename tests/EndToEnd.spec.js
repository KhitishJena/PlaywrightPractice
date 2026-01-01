const {expect, test} = require('@playwright/test');

test("End to end Automation", async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    const emailBox = page.locator("#userEmail");
    const pswdBox = page.locator("#userPassword");
    const loginButton = page.locator('input[value="Login"]');
    const productTitles = page.locator('.card-body b');
    const products = page.locator('.card-body');
    const cartBtn = page.locator("[routerlink*='dashboard/cart']");
    const cartItems = page.locator("[class*='items']");
    const checkOutBtn = page.locator("button:has-text('Checkout')");
    const expDate = page.locator("select[class*='ddl']").first();
    const expYear = page.locator("select[class*='ddl']").last();
    const cvV = page.locator("div.small input").first();
    const coupon = page.locator("div.small input").last();
    const cardHolderName = page.locator("div.field input").nth(2);
    const applyCouponBtn = page.locator("div.field button");
    const applyCouponMsg = page.locator("p:has-text('* Coupon Applied')");
    const shippingInfo = page.locator("div[class*='details__user']");
    const shippingInfoEmail = page.locator("div input[type='text']");
    const shippingInfoEmailGrey = page.locator("div label");
    const shippingInfoCntry = page.locator("[placeholder*='Country']");
    const dyanmicDDoptionsBox = page.locator("section[class*='results']");
    const dyanmicDDoptionsListItems = page.locator("button.list-group-item");
    const placeOrderBtn = page.locator("a.btnn");
    const ordrConfPgBox = page.locator("td.box");
    const thnkUmsG = page.locator("h1.hero-primary");
    const orderId= page.locator("label.ng-star-inserted");
    const topBanner = page.locator("nav ul");
    const orderBtn = page.locator("[routerlink*='dashboard/myorders']");
    const orderItemsRow = page.locator("tbody tr");
    const orderItemsId = orderItemsRow.locator("th");
    const viewBtn =orderItemsRow.locator("td button.btn-primary");
    const viewOrderPageMsg = page.locator("p.tagline");
    const viewOrderPageOrderId = page.locator("div.-main");

    const requiredProduct = "ADIDAS ORIGINAL";
    const couponCode = "rahulshettyacademy";
    const cardName = "Satish Jena";
    const loginId = "playwrightsatish@xyz.com";
    const loginPswd = "!Lulu123";
    const thankYouMsg = " Thankyou for the order. ";
    const viewOrderPageMesg = "Thank you for Shopping With Us";

    await page.goto("https://rahulshettyacademy.com/client/");
    await emailBox.fill(loginId);
    await pswdBox.fill(loginPswd);
    await loginButton.click();
   // await page.waitForLoadState("networkidle"); //Getting flaky here
    await products.last().waitFor();

    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");

    const titles = await productTitles.allTextContents();
    console.log(titles);

    const productCount = await products.count();
    console.log("The total number of products are: ",productCount);

    for(let i =0;i<productCount;i++){

        if(await products.nth(i).locator("b").textContent() === requiredProduct){
            //.card-body button i[class*="shopping"]
            console.log(await products.nth(i).locator("b").textContent());
           // await products.nth(i).locator("button").locator("i[class*='shopping']").click();
           // the above logic can be used. Playwright allows to get location on basis of Text also as below
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await cartBtn.click();

    await cartItems.last().waitFor();   //waits till the last cart item is loaded

    const itemsAdded = await cartBtn.count();
    console.log("The number of items added in the cart are: ",itemsAdded);

    for(let j=0;j<itemsAdded;j++){

        if(await cartItems.nth(j).locator("text= ADIDAS ORIGINAL").isVisible()){
            console.log(await cartItems.nth(j).locator("text= ADIDAS ORIGINAL").textContent());
            await checkOutBtn.click();
            break;
        }

    }

    
    await expDate.selectOption("06");
    await expYear.selectOption("26");
    
    await cvV.fill("123");
    await cardHolderName.fill(cardName);
    await coupon.fill(couponCode);
    await applyCouponBtn.click();

    await applyCouponMsg.waitFor();
    expect(await applyCouponMsg.isVisible()).toBeTruthy();

    //console.log("Box: ",await shippingInfo.locator(shippingInfoEmail).textContent());
    console.log("Grey: ",await shippingInfo.locator(shippingInfoEmailGrey).textContent());

    console.log("%%%%%%%%%%%%%%%%%%%%");

    //toHaveText()-->matches exact string toContainText()-->Matches substring
    await expect(shippingInfo.locator(shippingInfoEmailGrey)).toHaveText(loginId);
    //await expect(shippingInfo.locator(shippingInfoEmail)).toContainText(loginId);

    await shippingInfo.locator(shippingInfoCntry).pressSequentially("ind", { delay: 100 });
    await dyanmicDDoptionsBox.waitFor();
    const optionCount = await dyanmicDDoptionsBox.locator(dyanmicDDoptionsListItems).count();
    console.log("Items came in dropDown: ",optionCount);
    
    for(let k=0;k<optionCount;k++){
        const text = await dyanmicDDoptionsBox.locator(dyanmicDDoptionsListItems).nth(k).textContent();
        if(text===" India"){
            console.log(text);
           await dyanmicDDoptionsBox.locator(dyanmicDDoptionsListItems).nth(k).click();
           break; 
        }

    }
    await shippingInfo.locator(placeOrderBtn).click();

    await ordrConfPgBox.last().waitFor();
    console.log("Success Oder Msg: ", await ordrConfPgBox.locator(thnkUmsG).textContent());
    await expect(ordrConfPgBox.locator(thnkUmsG)).toHaveText(thankYouMsg);

    const rawOrderId = await ordrConfPgBox.locator(orderId).textContent();
    //sample orderId--> | 69551148c941646b7a7383b4 | 
    const orderIdTxt = rawOrderId.split("|")[1].split("|")[0].trim();
    console.log("The Order Id created: ",orderIdTxt);

    await topBanner.locator(orderBtn).click();

    await orderItemsId.last().waitFor();
   
    const noOfOrderId = await orderItemsId.count();
    console.log("The number of OrderId's in Order history page: ",noOfOrderId);
    console.log("the number of line items ",await orderItemsRow.count());

    for(let i =0;i<noOfOrderId;i++){
        if(await orderItemsId.nth(i).textContent()===orderIdTxt){
            console.log(await orderItemsId.nth(i).textContent())
            await viewBtn.nth(i).click();
            break;
        }
    }

    await expect(viewOrderPageMsg).toHaveText(viewOrderPageMesg);
    await expect(viewOrderPageOrderId).toHaveText(orderIdTxt);



    await page.pause();
});