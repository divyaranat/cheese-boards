const { User, Board, Cheese } = require("./index.js");
const { sequelize } = require("./db.js")

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

    test("User can have many Boards", async() => {
        const testUser = await User.create({
            name: "Divya Ranat",
            email: "divyaranat@email.com"
        });
        const testBoard1 = await Board.create({
            type: "Wood",
            description: "Round",
            rating: 7
        });
        const testBoard2 = await Board.create({
            type: "Metal",
            description: "Square",
            rating: 9
        });

        await testUser.addBoards([testBoard1, testBoard2]);
        const foundBoards = await testUser.getBoards();

        const foundUser = await testBoard1.getUser();
        //Why is this null??
        console.log(foundUser)

        expect(testUser instanceof User).toBe(true);
        expect(testBoard1 instanceof Board).toBe(true);
        expect(testBoard2 instanceof Board).toBe(true);
        expect(foundBoards[0].type).toBe("Wood");
        expect(foundBoards[1].type).toBe("Metal");
        expect(await testUser.countBoards()).toBe(2);
        //expect(foundUser[0].name).toBe("Divya");
    })

    test("Board can have many Cheese", async() => {
        const testBoard = await Board.create({
            type: "Wood",
            description: "Round",
            rating: 7
        });
        const testCheese1 = await Cheese.create({
            title: "Cheddar",
            description: "Yellow"
        });
        const testCheese2 = await Cheese.create({
            title: "Swiss",
            description: "Holey"
        });

        await testBoard.addCheeses([testCheese1, testCheese2]);
        const foundCheeses = await testBoard.getCheeses();
        
        expect(testBoard instanceof Board).toBe(true);
        expect(testCheese1 instanceof Cheese).toBe(true);
        expect(testCheese2 instanceof Cheese).toBe(true);
        expect(await testBoard.countCheeses()).toBe(2);
        expect(foundCheeses[0].title).toBe("Cheddar");
        expect(foundCheeses[1].title).toBe("Swiss");
    })

    test("Cheese can have many Board", async() => {
        const testBoard1 = await Board.create({
            type: "Wood",
            description: "Round",
            rating: 7
        });
        const testBoard2 = await Board.create({
            type: "Metal",
            description: "Square",
            rating: 9
        });
        const testCheese = await Cheese.create({
            title: "Cheddar",
            description: "Yellow"
        });

        await testCheese.addBoards([testBoard1, testBoard2]);
        const foundBoards = await testCheese.getBoards();
        
        expect(testBoard1 instanceof Board).toBe(true);
        expect(testBoard2 instanceof Board).toBe(true);
        expect(testCheese instanceof Cheese).toBe(true);
        expect(await testCheese.countBoards()).toBe(2);
        expect(foundBoards[0].type).toBe("Wood");
        expect(foundBoards[1].type).toBe("Metal");
    })

    test("Board can be loaded with Cheese", async() => {
        const testBoard = await Board.create({
            type: "Wood",
            description: "Round",
            rating: 7
        });
        const testCheese1 = await Cheese.create({
            title: "Cheddar",
            description: "Yellow"
        });
        const testCheese2 = await Cheese.create({
            title: "Swiss",
            description: "Holey"
        });

        await testBoard.addCheeses([testCheese1, testCheese2]);

        const foundBoard = await Board.findOne({
            include: Cheese
        })

        expect(foundBoard.Cheeses[0].title).toBe("Cheddar");
        expect(foundBoard.Cheeses[1].title).toBe("Swiss");
    });

    test("User can be loaded with Board", async() => {
        const testUser = await User.create({
            name: "Divya Ranat",
            email: "divyaranat@email.com"
        });
        const testBoard1 = await Board.create({
            type: "Wood",
            description: "Round",
            rating: 7
        });
        const testBoard2 = await Board.create({
            type: "Metal",
            description: "Square",
            rating: 9
        });

        await testUser.addBoards([testBoard1, testBoard2]);

        const foundUser = await User.findOne({ include: Board });

        expect(foundUser.Boards[0].type).toBe("Wood");
        expect(foundUser.Boards[1].type).toBe("Metal");
    })

    test("Cheese can be loaded with Board", async() => {
        const testBoard1 = await Board.create({
            type: "Wood",
            description: "Round",
            rating: 7
        });
        const testBoard2 = await Board.create({
            type: "Metal",
            description: "Square",
            rating: 9
        });
        const testCheese = await Cheese.create({
            title: "Cheddar",
            description: "Yellow"
        });

        await testCheese.addBoards([testBoard1, testBoard2]);

        const foundCheese = await Cheese.findOne({ include: Board });

        expect(foundCheese.Boards[0].type).toBe("Wood");
        expect(foundCheese.Boards[1].type).toBe("Metal");
    })
})