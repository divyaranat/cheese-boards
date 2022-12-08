const { User } = require("./User.js");
const { Board } = require("./Board.js");
const { Cheese } = require("./Cheese.js");
const { sequelize, Sequelize } = require("./db.js")

describe("Cheese Board Tests", () => {

    beforeEach(async() => {
        await sequelize.sync({ force: true });
    });
    
    test("Can add data to User", async () => {
        const testUser = await User.create({
            name: "Divya Ranat",
            email: "divyaranat@email.com"
        });
        const foundUser = await User.findOne()
        expect(testUser instanceof User).toBe(true);
        expect(foundUser.name).toBe("Divya Ranat");
        expect(foundUser.email).toBe("divyaranat@email.com");
    });

    test("Can add data to Board", async () => {
        const testBoard = await Board.create({
            type: "Wood",
            description: "Round",
            rating: 7
        });
        const foundBoard = await Board.findOne();
        expect(testBoard instanceof Board).toBe(true);
        expect(foundBoard.type).toBe("Wood");
        expect(foundBoard.description).toBe("Round");
        expect(foundBoard.rating).toBe(7);
    })

    test("Can add data to Cheese", async () => {
        const testCheese = await Cheese.create({
            title: "Cheddar",
            description: "Yellow"
        });
        const foundCheese = await Cheese.findOne();
        expect(testCheese instanceof Cheese).toBe(true);
        expect(foundCheese.title).toBe("Cheddar");
        expect(foundCheese.description).toBe("Yellow");
    })
})