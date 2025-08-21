import { getUserById } from "../../src/repositories/user.repository";
import { prisma } from "../../src/db/db";

jest.mock("../../src/db/db", () => ({
    prisma: {
        user: { findUnique: jest.fn() }
    }
}));

describe("user.repository", () => {
    it("getUserById should call prisma.user.findUnique with correct ID", async () => {
        await getUserById("123");
        expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: { id: "123" },
            select: { id: true, firstName: true, lastName: true }
        });
    });
});
