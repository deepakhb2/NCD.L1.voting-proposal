import { VMContext } from "near-sdk-as";
import * as contract from "../assembly";

/**
 * == CONFIG VALUES ============================================================
 */
const NAME = "usain";
const BALLOT_ACCOUNT_ID = "museum";
const PROPOSALS = 3;

/**
 * == HELPER FUNCTIONS =========================================================
 */
const useMuseumAsPredecessor = (): void => {
  VMContext.setPredecessor_account_id(BALLOT_ACCOUNT_ID);
};

describe("Ballot initialization", () => {
  beforeEach(useMuseumAsPredecessor)

  it("prevents double initialization", () => {
    contract.init(NAME, PROPOSALS)

    expect(() => {
      contract.init(NAME, PROPOSALS)
    }).toThrow("Contract is already initialized")
  });

  it("requires title not to be blank", () => {
    expect(() => {
      contract.init("", PROPOSALS)
    }).toThrow("Museum name may not be blank")
  });

  it("requires a minimum balance", () => {
    expect(() => {
      contract.init(NAME, PROPOSALS)
    }).toThrow("Minimum account balance must be attached to initialize this contract (3 NEAR)")
  });

});
