import { storage, Context, logging } from "near-sdk-as"
import { Ballot, BALLOT_KEY } from "./models"

export function init(name: string, proposals: u32): void {
  // contract may only be initialized once
  assert(!storage.hasKey(BALLOT_KEY), "Contract is already initialized.");

  // Must have least 2 proposals to vote
  assert(proposals > 1, "More than one proposal is required");

  // create the ballot using incoming metadata
  Ballot.create(name, proposals)

  logging.log("Ballot was created")
}
