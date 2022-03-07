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
echo "Step 1: Call 'winningProposal' functions on the contract"
echo
echo ---------------------------------------------------------
echo

near call $CONTRACT winningProposal --account-id $ACCOUNT_ID

echo
echo
echo ---------------------------------------------------------
echo "Step 2: Prepare your environment for clean"
echo
echo "(a) set BENEFICIARY environment variable using this account id"
echo
echo ---------------------------------------------------------
echo 'export BENEFICIARY=<chairperson.test.near>'
# uncomment this line for a useful hint when using the singleton style
# echo "near call \$CONTRACT init --accountId \$CONTRACT"
echo ---------------------------------------------------------
echo

exit 0
