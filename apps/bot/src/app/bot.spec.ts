import { bot } from "./bot";

describe("bot", () => {
    it("should work", () => {
        expect(bot()).toEqual("bot");
    });
});
