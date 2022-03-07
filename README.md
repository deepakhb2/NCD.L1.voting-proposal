# NEAR Ballot Tool

📄  Introduction
================

NEAR Ballot is a smart contract based where you can create ballot for multiple proposals and voters can vote for proposals. Later the proposal with highest number of votes will be announced as winner. The voters will be keept secret. The following are the main functionality:
1. Initialise and deploy the contract.
2. Create a ballot with 3 proposals (Chairperson).
3. Register the voters
4. Voter can vote of one proposal.
5. Chairperson can vote for 2 proposals.
6. Reveal the winner.

📦 Installation
================

To run this project locally you need to follow the next steps:

Step 1: Prerequisites
------------------------------

1. Make sure you've installed [Node.js] ≥ 12 (we recommend use [nvm])
2. Make sure you've installed yarn: `npm install -g yarn`
3. Install dependencies: `yarn install`
4. Create a test near account [NEAR test account]
5. Install the NEAR CLI globally: [near-cli] is a command line interface (CLI) for interacting with the NEAR blockchain

    yarn install --global near-cli

Step 2: Configure your NEAR CLI
-------------------------------

Configure your near-cli to authorize your test account recently created:

    near login

Step 3: Build and make a smart contract development deploy  
--------------------------------

Build the NEAR library smart contract code and deploy the local development server: `yarn build:release` (see `package.json` for a full list of `scripts` you can run with `yarn`). This script return to you a provisional smart contract deployed (save it to use later). You can also follow the instructions on the folder *scripts*.


📑 Exploring the NEAR library smart contract methods 
==================

The following commands allow you to interact with the smart contract methods using the NEAR CLI (for this you need to have a provisional smart contract deployed).

Information: the command for rigister, vote and winningProposal will require especific data i.e is set as environment variables.
 
Environment variables: 

    - $CONTRACT is the deployed contract account.
    - ACCOUNT_ID is the chairperson account.
    - VOTTER_ID is the voter account.  
    - VOTE is the proposal number (eg. 1/2/3).    


Command to initialise the ballot: 
--------------------------------------------

```bash
near call $CONTRACT init '{"name":"ballot","proposals":3}' --account-id $ACCOUNT_ID
```

Command to register a voter:
--------------------------------------------

```bash
near call $CONTRACT register --account-id $VOTER_ID
```

Command to vote a proposal:
--------------------------------------------

```bash
near call $CONTRACT vote "{\"toProposal\": $VOTE}" --account-id $VOTER_ID
```

Command to reveal the winning proposal:
--------------------------------------------

```bash
near call $CONTRACT winningProposal --account-id $ACCOUNT_ID
```
