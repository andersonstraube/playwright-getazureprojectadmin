# Playwright Get Azure Project Admin

Playwright project to read a list of projects, find the project admin and save to a csv

## Steps

### Install Dependencies

```
npm install -D @playwright/test
```

### Insert project list into file

```
data/links.txt
```

### Config Storage State

I'm using storageState to store the login, see more details in the documentation:

https://playwright.dev/docs/test-auth

tests/azuredevops.spec.ts (line 4)
```
test.use({ storageState: 'auth.json' });
```

### Run

```
npx playwright test tests/azuredevops.spec.ts
```
