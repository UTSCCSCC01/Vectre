# Vectre

<img width="860" alt="vectre-image" src="https://user-images.githubusercontent.com/64259077/170800123-2a4079de-9c36-4e0a-8608-2e52e82897cc.png">

## Motivation
Vectre is an all-in-one social platform for web3 communities.

Our vision is for users to connect their Metamask wallet within our platform, where they will be able to showcase their NFTs on a personal dashboard, communicate directly with holders of specific NFT collections, and leaders to foster productive community interactions with a fair set of guidelines.
Furthermore, Vectre ensures that the true ownership of digital assets is maintained, validated and appropriately indicated to prevent fraud.

We hope that Vectre will allow web3 communities, specifically NFT communities, to thrive by providing a platform by which verified members can interact with one another and call Vectre their home.

## Installation
1. Install [Node.js v18.5.0 (npm 8.12.1)](https://nodejs.org/en/download/current/)
2. Install required dependencies (start from `vectre/` directory then run the following):
   ```powershell
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
3. Create `.env.production` and `.env.development` files in the `vectre/backend` directory, both with the following config
   (credentials located in the Vectre Labs `#project-files` discord channel)
   ```
   FRONTEND_BASE_URL=
   NEO4J_DB_URL=
   NEO4J_DB_USERNAME=
   NEO4J_DB_PASSWORD=
   JWT_SECRET_TOKEN=
   IMGUR_CLIENT_ID=
   ETHERSCAN_TOKEN=
   ```
4. Start backend (runs on port 8080)
   ```powershell
   cd backend
   
   # production environment
   npm run start 
   
   # dev environment
   npm run dev
   ```
5. Start frontend in seperate terminal (runs on port 3000)
   ```powershell
   cd frontend
   npm run start
   ```

## Contribution
### Do you use gitflow?
Yes.
- `master` contains production app
- `develop` contains new features & bug fixes
    - Changes are merged into `master` at the end of each sprint
- `task`/`bug` branches will be merged into `develop` as their PRs are approved

### What do you name your branches?
Branches will use the following convention where `VEC-XXX` is the associated Jira ticket number:
- `VEC-XXX/task/{feat_name}`
- `VEC-XXX/bug/{bug_name}`

### Do you use Github issues or another ticketing website?
We use Jira for our tickets

### Do you use pull requests?
Yes. All branches must have their pull request approved before merging.