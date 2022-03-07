import { storage, logging } from "near-sdk-as"
import { Ballot, BALLOT_KEY } from "./models"

export function init(name: string, proposals: u32): void {
  // contract may only be initialized once
  assert(!is_initialized(), "Contract is already initialized.");

  // Must have least 2 proposals to vote
  assert(proposals > 1, "More than one proposal is required");

  // create the ballot using incoming metadata
  Ballot.create(name, proposals)

  logging.log("Ballot was created")
}

export function register(): void {
  assert_contract_is_initialized()
  Ballot.register()
}

export function vote(toProposal: u32): void {
  assert_contract_is_initialized()
  Ballot.vote(toProposal)
}

export function winningProposal(): i32 {
  assert_contract_is_initialized()
  return Ballot.winningProposal()
}


function is_initialized(): bool {
  return storage.hasKey(BALLOT_KEY);
}

function assert_contract_is_initialized(): void {
  assert(is_initialized(), "Contract must be initialized first.");
}
