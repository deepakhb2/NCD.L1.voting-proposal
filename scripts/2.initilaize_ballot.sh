#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 0: Check for environment variable with contract name"
echo ---------------------------------------------------------
echo

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$CONTRACT" ] || echo "Found it! \$CONTRACT is set to [ $CONTRACT ]"

[ -z "$ACCOUNT_ID" ] && echo "Missing \$ACCOUNT_ID environment variable" && exit 1
[ -z "$ACCOUNT_ID" ] || echo "Found it! \$ACCOUNT_ID is set to [ $ACCOUNT_ID ]"

echo
echo
echo ---------------------------------------------------------
echo "Step 1: Call 'init' functions on the contract"
echo
echo "(run this script again to see changes made by this file)"
echo ---------------------------------------------------------
echo

near call $CONTRACT init '{"name":"ballot","proposals":3}' --account-id $ACCOUNT_ID

echo
echo
echo ---------------------------------------------------------
echo "Step 2: Prepare your environment for next steps"
echo
echo "(a) Create new account on test net using https://wallet.testnet.near.org/ link"
echo "    register the account to vote: [ Account id: voter1.testnet ]"
echo
echo "(b) set an environment variable using this account id"
echo "    see example below (this may not work on Windows)"
echo
echo ---------------------------------------------------------
echo 'export VOTER_ID=voter1.testnet'
echo 'export VOTE=0'
# uncomment this line for a useful hint when using the singleton style
# echo "near call \$CONTRACT init --accountId \$CONTRACT"
echo ---------------------------------------------------------
echo

exit 0
