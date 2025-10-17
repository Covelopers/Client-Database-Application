// import { vi, describe, it, expect } from "vitest";
// import { GET } from "~/app/api/clients/search/route";
// import { db } from "~/server/db";

// vi.mock("~/server/db", () => ({
//     db: {
//         client: {
//             findMany: vi.fn(),
//         },
//     },
// }));

// const mockedDb = vi.mocked(db, true);

// describe("Clients API - SEARCH", () => {
//     it("returns clients matching the query", async () => {
//         const now = new Date();
//         const mockClients = [
//             {
//                 id: "1",
//                 fullName: "John Doe",
//                 email: "john@example.com",
//                 phoneNumber: "1234567890",
//                 address: "123 Main St",
//                 notes: "VIP client",
//                 createdAt: now,
//                 updatedAt: now,
//             },
//             {
//                 id: "2",
//                 fullName: "Jane Smith",
//                 email: "jane@example.com",
//                 phoneNumber: "9876543210",
//                 address: "456 Elm St",
//                 notes: "Returning client",
//                 createdAt: now,
//                 updatedAt: now,
//             },
//         ];

//         mockedDb.client.findMany.mockResolvedValue(mockClients);

//         const response = await GET(
//             new Request("http://localhost:3000/api/clients/search?query=john")
//         );
//         const json = await response.json();

//         expect(response.status).toBe(200);
//         expect(json).toEqual([
//             {
//                 ...mockClients[0],
//                 createdAt: mockClients[0].createdAt.toISOString(),
//                 updatedAt: mockClients[0].updatedAt.toISOString(),
//             },
//             {
//                 ...mockClients[1],
//                 createdAt: mockClients[1].createdAt.toISOString(),
//                 updatedAt: mockClients[1].updatedAt.toISOString(),
//             },
//         ]);

//         expect(mockedDb.client.findMany).toHaveBeenCalledWith({
//             where: {
//                 OR: [
//                     { fullName: { contains: "john", mode: "insensitive" } },
//                     { email: { contains: "john", mode: "insensitive" } },
//                     { phoneNumber: { contains: "john", mode: "insensitive" } },
//                 ],
//             },
//         });
//     });


//     it("handles missing query gracefully", async () => {
//         mockedDb.client.findMany.mockResolvedValue([]);

//         const response = await GET(
//             new Request("http://localhost:3000/api/clients/search")
//         );

//         const json = await response.json();

//         expect(response.status).toBe(200);
//         expect(Array.isArray(json)).toBe(true);
//         expect(mockedDb.client.findMany).toHaveBeenCalledWith({
//             where: {
//                 OR: [
//                     { fullName: { contains: "", mode: "insensitive" } },
//                     { email: { contains: "", mode: "insensitive" } },
//                     { phoneNumber: { contains: "", mode: "insensitive" } },
//                 ],
//             },
//         });
//     });

//     it("handles internal server errors", async () => {
//         mockedDb.client.findMany.mockRejectedValue(new Error("Database error"));

//         const response = await GET(
//             new Request("http://localhost:3000/api/clients/search?query=fail")
//         );

//         const json = await response.json();

//         expect(response.status).toBe(500);
//         expect(json.msg).toBe("Failed to get client information");
//     });
// });
