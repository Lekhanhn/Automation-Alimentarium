Steps to initialize Playwright:
1. Initialize the Project:
    Create a project folder in local machine and open it in VS Code.
    Open terminal,
    npm init -y 

2. Install Playwright:
    npm init playwright@latest
    Answer like this:
    ✔TypeScript or JavaScript?       → JavaScript
    ✔ Tests folder?                   → tests
    ✔ Add GitHub Actions?             → No (We'll do it later)
    ✔ Install browsers?               → Yes

3. Modify package.json
    "type": "module"

4. Test Now:
    npm run test

5. Install dotenv
    npm install dotenv

To create Excel report :
    Install ExcelJS 
    npx install ExcelJS
    Create ExcelReport.js uncer utils



To send email,
    Install nodemailer
    npx install nodemailer