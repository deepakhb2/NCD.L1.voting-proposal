import { VMContext } from "near-sdk-as";
import * as contract from "../assembly";

/**
 * == CONFIG VALUES ============================================================
 */
const NAME = "ballot";
const BALLOT_ACCOUNT_ID = "chairman.test.near";
const PROPOSALS = 3;

/**
 * == HELPER FUNCTIONS =========================================================
 */
const useBallotAsPredecessor = (): void => {
  VMContext.setPredecessor_account_id(BALLOT_ACCOUNT_ID);
};

describe("Ballot", () => {
  describe("Ballot initialization", () => {
    beforeEach(useBallotAsPredecessor)

    it("prevents double initialization", () => {
      contract.init(NAME, PROPOSALS)

      expect(() => {
        contract.init(NAME, PROPOSALS)
      }).toThrow("Contract is already initialized")
    });

    it("requires title not to be blank", () => {
      expect(() => {
        contract.init("", PROPOSALS)
      }).toThrow("Ballot name may not be blank")
    });
  });

  describe("Ballot voter registration", () => {
    beforeEach(() => {
      useBallotAsPredecessor
      contract.init(NAME, PROPOSALS)
    });

    it("chairman cannot register", () => {
      expect(() => {
        contract.register()
      }).toThrow("Chairman cannot register")
    })
  });

  describe("Ballot voting", () => {
    beforeEach(() => {
      useBallotAsPredecessor
      contract.init(NAME, PROPOSALS)
      VMContext.setPredecessor_account_id('voter1.test.near');
      contract.register()
    });

    it("vote for a proposal", () => {
      VMContext.setPredecessor_account_id('voter1.test.near');
      expect(() => {
        contract.vote(1)  
      }).not.toThrow()
    })
  });

  describe("Ballot winning proposal", () => {
    beforeEach(() => {
      useBallotAsPredecessor
      contract.init(NAME, PROPOSALS)
      contract.vote(2)
      contract.vote(2)
      VMContext.setPredecessor_account_id('voter1.test.near');
      contract.register()
      contract.vote(0)
      VMContext.setPredecessor_account_id('voter2.test.near');
      contract.register()
      contract.vote(1)
    });

    it("winning proposal", () => {
      expect(contract.winningProposal()).toBe(2)
    })
  });
})
