# Vectre Labs

## Motivation

## Installation
1. Install [Node.js v18.20 (npm 8.9.0)](https://nodejs.org/en/)
2. Install required dependencies (start from root directory then run the following):
    ```powershell
    cd backend
    npm install
    cd ../frontend
    npm install
    ```
3. Start backend (runs on port 8080)
    ```powershell
    cd backend
    npm run
    ```
4. Start frontend in seperate terminal (runs on port 3000)
    ```powershell
    cd frontend
    npm run
    ```

## Contribution
### Do you use gitflow?
Yes. 
- `master` contains our production product, 
- `develop` contains features & bug fixes for the current sprint
    - Changes are merged in `master` at the end of each sprint
- `feat`/`bug` branches will be merged into `develop` as their PRs are approved

### What do you name your branches?
Branches will use the following convention where `XXX` is the associated Jira ticket number:
- `VL-XXX/feat/{feat_name}`
- `VL-XXX/bug/{bug_name}`

### Do you use Github issues or another ticketing website?
We use Jira for our tickets

### Do you use pull requests?
Yes
