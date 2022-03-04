import { context, PersistentMap, PersistentSet, storage } from "near-sdk-as"

export const BALLOT_KEY = "ballot"

@nearBindgen
export class Ballot {

  constructor(
    public name: string,
    public chairperson: string,
    public proposals: i32
  ) {
    voters.set(chairperson, new Voter(2, false))
  }


  static create(name: string, proposals: i32): void {
    assert(name.length > 0, "Ballot name should not be blank")

    // save the ballot to storage
    this.set(new Ballot(name, context.predecessor, proposals))
  }

  static set(ballot: Ballot): void {
    storage.set(BALLOT_KEY, ballot);
  }

  static get(): Ballot {
    return storage.getSome<Ballot>(BALLOT_KEY)
  }
  
  static register(): void {
    let ballot: Ballot = this.get()
    assert(context.predecessor != ballot.chairperson, "Chairperson cannot register")
    voters.set(context.predecessor, new Voter(1, false))
  }

  static vote(toProposal: i32): void {
    let ballot: Ballot = this.get()
    let voter = voters.get(context.predecessor)
    assert(voter != null, "Account is not registered")
    assert(voter != null && !voter.voted, "You have already voted!")
    assert(toProposal > -1 && toProposal < ballot.proposals, "Proposal is invalid")
    if(voter) {
      voter.setVotes(voter.votes + 1)
      if(voter.votes == voter.weight) {
        voter.setVoted()
      }
      voters.set(context.predecessor, voter)
    }
    let proposal = proposals.get(toProposal)
    if(proposal) {
      proposal.voteCount = proposal.voteCount+1
      proposals.set(toProposal, proposal)
    } else {
      proposals.set(toProposal, new Proposal(1)) 
    }
  }

  static winningProposal(): i32 {
    let ballot: Ballot = this.get()
    let winningVoteCount: i32 = 0
    let winningProposal: i32 = 0
    for(let i: i32 = 1; i <= ballot.proposals; i++) {
      let proposal = proposals.get(i)
      if(proposal != null && proposal.voteCount > winningVoteCount) {
        winningVoteCount = proposal.voteCount
        winningProposal = i
      }
    }
    return winningProposal
  }
}

@nearBindgen
export class Voter {
  public votes: i32

  constructor(
    public weight: i32,
    public voted: bool,
  ) { 
    this.votes = 0
  }

  setVotes(vote: i32): void {
    this.votes = vote
  }

  setVoted(): void {
    this.voted = true
  }
}

@nearBindgen
export class Proposal {
  constructor(
    public voteCount: i32
  ) { }
}

const voters = new PersistentMap<string, Voter>("v")
const proposals = new PersistentMap<i32, Proposal>("p")