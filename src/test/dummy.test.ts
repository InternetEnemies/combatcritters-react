//this file is here to keep the CI happy when there are no tests, once tests are added this should be removed
import "react" // this is just so the isolated modules doesn't complain

it("should work", () => {
    expect(true).toBe(true);
})