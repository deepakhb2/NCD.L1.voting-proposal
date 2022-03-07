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

[ -z "$VOTER_ID" ] && echo "Missing \$VOTER_ID environment variable" && exit 1
[ -z "$VOTER_ID" ] || echo "Found it! \$VOTER_ID is set to [ $VOTER_ID ]"

echo
echo
echo ---------------------------------------------------------
echo "Step 1: Call 'register' functions on the contract"
echo
echo ---------------------------------------------------------
echo

near call $CONTRACT register --account-id $VOTER_ID

echo
echo
echo ---------------------------------------------------------
echo "Step 2: call 'vote' function on the contract"
echo
echo "(a) Vote for the proposal"
echo
echo ---------------------------------------------------------

near call $CONTRACT vote "{\"toProposal\": $VOTE}" --account-id $VOTER_ID

echo
echo
echo ---------------------------------------------------------
echo "Step 3: Run this step again (once more than move on to step4) with another different account id and vote"
echo
echo "(a) Create new account on test net using https://wallet.testnet.near.org/ link"
echo "    it will look like this: [ Account id: voter2.testnet ]"
echo
echo "(b) set an environment variable using this account id"
echo "    see example below (this may not work on Windows)"
echo
echo ---------------------------------------------------------
echo 'export VOTER_ID=voter2.testnet'
echo 'export VOTE=1'
echo ---------------------------------------------------------
echo

echo
echo
echo ---------------------------------------------------------
echo "Step 4: Run this step again with by using ACCOUNT_ID that was used to initialise"
echo "ACCOUNT_ID is chairparson he can vote 2 times"
echo
echo
echo ---------------------------------------------------------
echo 'export VOTER_ID=$ACCOUNT_ID'
echo 'export VOTE=2'
echo 'Finally run this step again with same values and voting is complete'
echo ---------------------------------------------------------
echo

exit 0
