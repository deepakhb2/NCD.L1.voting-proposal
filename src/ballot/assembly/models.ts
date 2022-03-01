import { context, PersistentSet, storage } from "near-sdk-as"

export const BALLOT_KEY = "ballot"

@nearBindgen
export class Ballot {

  constructor(
    public name: string,
    public proposals: u32
  ) {  }


  static create(name: string, proposals: u32): void {
    assert(name.length > 0, "Ballot name may not be blank")

    // save the ballot to storage
    this.set(new Ballot(name, proposals))
  }

  static set(ballot: Ballot): void {
    storage.set(BALLOT_KEY, ballot);
  }
}
