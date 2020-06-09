const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url); 

    //set id to first table
    //gets length of table rows
    const tableSpecialMoves = await page.$eval('#post-1623 > div > table:nth-child(6)', tables => tables.id = 'special-moves');
    const tableSpecialMovesLength = await (await page.$$('#special-moves > tbody > tr')).length;

    //set id to first table
    //gets length of table rows
    const tableBasicMoves = await page.$eval('#post-1623 > div > table:nth-child(9)', tables => tables.id = 'basic-moves');
    const tableBasicMovesLength = await (await page.$$('#basic-moves > tbody > tr')).length;

    const fullXPath = '/html/body/div/div[1]/div[3]/div[1]/div/';

    console.log(tableSpecialMoves);
    console.log(tableSpecialMovesLength);
    console.log(tableBasicMoves);
    console.log(tableBasicMovesLength);


    const moves = ['command', 'hitLevel', 'damage', 'startUp', 'blockFrame', 'hitFrame', 'counterHitFrame', 'notes'];
    


    console.log('SPECIAL MOVES');
    for (i=1; i < tableSpecialMovesLength+1; i++){

    // grab command
    const [elCommand] = await page.$x(fullXPath+'table[1]/tbody/tr['+i+']/td[1]');
    const textContentCommand = await elCommand.getProperty('textContent');
    const command = await textContentCommand.jsonValue();

    //grab hit level
    const [elHitLevel] = await page.$x(fullXPath+'table[1]/tbody/tr['+i+']/td[2]');
    const textContentHitLevel = await elHitLevel.getProperty('textContent');
    const hitLevel = await textContentHitLevel.jsonValue();

    //grab damage
    const [elDamage] = await page.$x(fullXPath+'table[1]/tbody/tr['+i+']/td[3]');
    const textContentDamage = await elDamage.getProperty('textContent');
    const damage = await textContentDamage.jsonValue();

    //grab start up frame
    const [elStartUp] = await page.$x(fullXPath+'table[1]/tbody/tr['+i+']/td[4]');
    const textContentStartUp = await elStartUp.getProperty('textContent');
    const startUp = await textContentStartUp.jsonValue();

    //grab block frame
    const [elBlockFrame] = await page.$x(fullXPath+'table[1]/tbody/tr['+i+']/td[5]');
    const textContentBlockFrame= await elBlockFrame.getProperty('textContent');
    const blockFrame = await textContentBlockFrame.jsonValue();

    //grab hit frame
    const [elHitFrame] = await page.$x(fullXPath+'table[1]/tbody/tr['+i+']/td[6]');
    const textContentHitFrame= await elHitFrame.getProperty('textContent');
    const hitFrame = await textContentHitFrame.jsonValue();

    //grab ch frame
    const [elCounterHitFrame] = await page.$x(fullXPath+'table[1]/tbody/tr['+i+']/td[7]');
    const textContentCounterHitFrame = await elCounterHitFrame.getProperty('textContent');
    const counterHitFrame = await textContentCounterHitFrame.jsonValue();

    //grab notes
    const [elNotes] = await page.$x(fullXPath+'table[1]/tbody/tr['+i+']/td[8]');
    const textContentNotes = await elNotes.getProperty('textContent');
    const notes = await textContentNotes.jsonValue();
    //put it all into a charater object

    const specialMoves = {
        command: command,
        hitLevel: hitLevel,
        damage: damage,
        startUp: startUp,
        blockFrame: blockFrame,
        hitFrame: hitFrame,
        counterHitFrame: counterHitFrame,
        notes: notes,
    }

    console.log(specialMoves); 
    }

    console.log('BASIC MOVES');
    for (i=1; i < tableBasicMovesLength+1; i++){

        // grab command
        const [elCommand] = await page.$x(fullXPath+'table[1]/tbody/tr['+i+']/td[1]');
        const textContentCommand = await elCommand.getProperty('textContent');
        const command = await textContentCommand.jsonValue();
    
        //grab hit level
        const [elHitLevel] = await page.$x(fullXPath+'table[1]/tbody/tr['+i+']/td[2]');
        const textContentHitLevel = await elHitLevel.getProperty('textContent');
        const hitLevel = await textContentHitLevel.jsonValue();
    
        //grab damage
        const [elDamage] = await page.$x(fullXPath+'table[1]/tbody/tr['+i+']/td[3]');
        const textContentDamage = await elDamage.getProperty('textContent');
        const damage = await textContentDamage.jsonValue();
    
        //grab start up frame
        const [elStartUp] = await page.$x(fullXPath+'table[1]/tbody/tr['+i+']/td[4]');
        const textContentStartUp = await elStartUp.getProperty('textContent');
        const startUp = await textContentStartUp.jsonValue();
    
        //grab block frame
        const [elBlockFrame] = await page.$x(fullXPath+'table[1]/tbody/tr['+i+']/td[5]');
        const textContentBlockFrame= await elBlockFrame.getProperty('textContent');
        const blockFrame = await textContentBlockFrame.jsonValue();
    
        //grab hit frame
        const [elHitFrame] = await page.$x(fullXPath+'table[1]/tbody/tr['+i+']/td[6]');
        const textContentHitFrame= await elHitFrame.getProperty('textContent');
        const hitFrame = await textContentHitFrame.jsonValue();
    
        //grab ch frame
        const [elCounterHitFrame] = await page.$x(fullXPath+'table[1]/tbody/tr['+i+']/td[7]');
        const textContentCounterHitFrame = await elCounterHitFrame.getProperty('textContent');
        const counterHitFrame = await textContentCounterHitFrame.jsonValue();
    
        //grab notes
        const [elNotes] = await page.$x(fullXPath+'table[1]/tbody/tr['+i+']/td[8]');
        const textContentNotes = await elNotes.getProperty('textContent');
        const notes = await textContentNotes.jsonValue();
        //put it all into a charater object
    
        const basicMoves = {
            command: command,
            hitLevel: hitLevel,
            damage: damage,
            startUp: startUp,
            blockFrame: blockFrame,
            hitFrame: hitFrame,
            counterHitFrame: counterHitFrame,
            notes: notes,
        }
    
        console.log(basicMoves); 
        }
    // browser.close();
}

scrapeProduct('http://rbnorway.org/akuma-t7-frames/'); 

