const assert = require("assert");
const { remoteMathService, answerCallback } = require("../exercise-1/exercise-1");

describe("Exercise 1", function () {
  describe("Remote Math Service", async function () {
    it("should return 'correct' when we pass a function in asking it to add 1 + 2", async function () {
      const response = await remoteMathService(answerCallback);
      assert.equal(response.result, "correct");
    });
  });
});
