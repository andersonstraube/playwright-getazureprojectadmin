import { test, expect } from '@playwright/test';
const fs = require('fs');

test.use({ storageState: 'auth.json' });

test('getProjectAdmin', async ({ page }) => {

    var links = fs.readFileSync('data/links.txt')
        .toString() 
        .split('\n') 
        .map(e => e.trim())

    const header = 'Projeto;Url do projeto;Responsável e/ou Admin\n';
    let csvContent = '';
    csvContent = header;

    for (const link of links) {
        
        await page.goto(link);
        
        // get real page url after redirect
        const url = await page.url();

        await page.locator('a:has-text("Project settings")').click();
        await page.waitForLoadState("load");        
        await page.locator('.project-admins').waitFor();

        let users = [];

        try {
            await page.waitForSelector(".project-admins div.person-panel-row.flex-row >> nth=0", {state: "visible", timeout: 100 });
            let listItems = page.locator('.project-admins div.person-panel-row.flex-row');
            
            for (let i = 0; i < await listItems.count(); i++) {

                const user = await listItems.nth(i).locator('label.persona-title').textContent();
                const mail = await listItems.nth(i).locator('label.persona-secondary-title').textContent();

                users.push(user + ' ' + mail);
            }

        } catch(e) {
            console.log('Link: ' + link) + ' Exception: ' + e;
            users.push('Projeto sem admin');
        }

        const projetName = await page.locator('input[aria-label="Name"]').inputValue();
        csvContent += projetName+ ';'+ url + ';"' + users.join('\n') + '"\r\n';

        console.log(projetName);
        console.log(url);
        console.log(users);
    }

    fs.writeFileSync('data/projects.csv',  csvContent,"utf-8");
 
});