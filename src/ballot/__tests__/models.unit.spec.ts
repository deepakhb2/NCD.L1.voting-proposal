import { VMContext } from "near-sdk-as";
import { Ballot } from "../assembly/models";

beforeEach(() => {
  VMContext.setPredecessor_account_id('chairperson.test.user');
  Ballot.create('ballot', 3)
})

describe('Ballot', () => {
  it("verify name, chairperson and proposals", () => {
    let ballot: Ballot = Ballot.get()
    expect(ballot.name).toBe('ballot')
    expect(ballot.chairperson).toBe('chairperson.test.user')
    expect(ballot.proposals).toBe(3)
  })

  it("Ballot name cannot be blank", () => {
    expect(() => {
      Ballot.create("", 3)
    }).toThrow("Ballot name should not be blank")
  })

  describe("register", () => {
    it("register non chairperson account", () => {
      VMContext.setPredecessor_account_id('voter1.test.user');
      expect(() => {
        Ballot.register()
      }).not.toThrow("Chairperson cannot register")
    })

    it("Throw when chairperson tries to register", () => {
      expect(() => {
        Ballot.register()
      }).toThrow("Chairperson cannot register")
    })
  })

  describe("vote", () => {
    it("vote before register", () => {
      VMContext.setPredecessor_account_id('voter1.test.user');
      expect(() => {
        Ballot.vote(1)
      }).toThrow("Account is not registered")
    })

    it("try to vote again", () => {
      VMContext.setPredecessor_account_id('voter1.test.user');
      Ballot.register()
      Ballot.vote(1)
      expect(() => {
        Ballot.vote(1)
      }).toThrow("You have already voted!")
    })

    it("try to vote for proposal that don't exist", () => {
      VMContext.setPredecessor_account_id('voter1.test.user');
      Ballot.register()
      expect(() => {
        Ballot.vote(4)
      }).toThrow("Proposal is invalid")
    })
  })

  describe("winningProposal", () => {
    it("return the winning proposal", () => {
      Ballot.vote(2)
      Ballot.vote(2)
      VMContext.setPredecessor_account_id('voter1.test.user');
      Ballot.register()
      Ballot.vote(1)
      VMContext.setPredecessor_account_id('voter2.test.user');
      Ballot.register()
      Ballot.vote(3)

      expect(Ballot.winningProposal()).toBe(2)
    })
  })
})
