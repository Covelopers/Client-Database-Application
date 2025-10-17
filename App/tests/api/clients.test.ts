// import { vi, describe, it, expect, beforeEach } from "vitest";
// import { GET, POST } from "~/app/api/clients/route";
// import { db } from "~/server/db";

// // Single mock for db
// vi.mock("~/server/db", () => ({
//     db: {
//         client: {
//             findMany: vi.fn(),
//             create: vi.fn(),
//         },
//     },
// }));

// const mockedDb = vi.mocked(db, true);

// // Reset mocks before each test to avoid leaking data between tests
// beforeEach(() => {
//     mockedDb.client.findMany.mockReset();
//     mockedDb.client.create.mockReset();
// });


// //------------------------------------------- GET REQUEST TESTING----------------------------------------------------

// describe("Clients API - GET", () => {
//     it("returns up to 50 clients with all fields", async () => {
//         const now = new Date();

//         // Mock db response
//         mockedDb.client.findMany.mockResolvedValue([
//             {
//                 id: "ckx123abc",
//                 createdAt: now,
//                 updatedAt: now,
//                 fullName: "John Doe",
//                 email: "john@example.com",
//                 phoneNumber: "1234567890",
//                 address: "123 Main St",
//                 notes: "VIP client",
//             },
//             {
//                 id: "ckx456def",
//                 createdAt: now,
//                 updatedAt: now,
//                 fullName: "Jane Smith",
//                 email: null,
//                 phoneNumber: null,
//                 address: null,
//                 notes: null,
//             },
//         ]);

//         // Call GET handler
//         const response = await GET(new Request("http://localhost/api/clients"));
//         const json = await response.json();

//         expect(response.status).toBe(200);

//         expect(json.clients[0]).toEqual({
//             id: "ckx123abc",
//             createdAt: now.toISOString(),
//             updatedAt: now.toISOString(),
//             fullName: "John Doe",
//             email: "john@example.com",
//             phoneNumber: "1234567890",
//             address: "123 Main St",
//             notes: "VIP client",
//         });

//         expect(json.clients[1]).toEqual({
//             id: "ckx456def",
//             createdAt: now.toISOString(),
//             updatedAt: now.toISOString(),
//             fullName: "Jane Smith",
//             email: null,
//             phoneNumber: null,
//             address: null,
//             notes: null,
//         });

//         expect(mockedDb.client.findMany).toHaveBeenCalledWith({
//             take: 50,
//             skip: 0,
//             orderBy: { fullName: "asc" },
//         });
//     });
// });


// //------------------------------------------- POST REQUEST TESTING----------------------------------------------------

// describe("Clients API - POST", () => {
//     it("creates a new client successfully", async () => {
//         const now = new Date();
//         const clientData = {
//             fullName: "Alice Johnson",
//             email: "alice@example.com",
//             phoneNumber: "9876543210",
//             address: "456 Oak St",
//             notes: "New client",
//         };

//         mockedDb.client.create.mockResolvedValue({
//             id: "ckx789ghi",
//             createdAt: now,
//             updatedAt: now,
//             fullName: "Alice Johnson",
//             email: "alice@example.com",
//             phoneNumber: "9876543210",
//             address: "456 Oak St",
//             notes: "New client",
//         });

//         const response = await POST(
//             new Request("http://localhost/api/clients", {
//                 method: "POST",
//                 body: JSON.stringify(clientData),
//             })
//         );
//         const json = await response.json();

//         expect(response.status).toBe(200);
//         expect(json.newClient).toEqual({
//             id: "ckx789ghi",
//             createdAt: now.toISOString(),
//             updatedAt: now.toISOString(),
//             fullName: "Alice Johnson",
//             email: "alice@example.com",
//             phoneNumber: "9876543210",
//             address: "456 Oak St",
//             notes: "New client",
//         });

//         expect(mockedDb.client.create).toHaveBeenCalledWith({
//             data: clientData,
//         });
//     });

//     it("returns 400 if validation fails", async () => {
//         const invalidData = { email: "bob@example.com" };

//         const response = await POST(
//             new Request("http://localhost/api/clients", {
//                 method: "POST",
//                 body: JSON.stringify(invalidData),
//             })
//         );
//         const json = await response.json();

//         expect(response.status).toBe(400);
//         expect(json.msg).toBe("Validation failed");
//         expect(mockedDb.client.create).not.toHaveBeenCalled();
//     });

//     it("handles unique email constraint (P2002)", async () => {
//         const clientData = {
//             fullName: "Charlie Brown",
//             email: "existing@example.com",
//             phoneNumber: undefined,
//             address: undefined,
//             notes: undefined,
//         };

//         // Mock P2002 error
//         mockedDb.client.create.mockRejectedValue({
//             code: "P2002",
//             message: "Unique constraint failed",
//         });

//         const response = await POST(
//             new Request("http://localhost/api/clients", {
//                 method: "POST",
//                 body: JSON.stringify(clientData),
//             })
//         );
//         const json = await response.json();

//         expect(response.status).toBe(400);
//         expect(json.msg).toBe("Client email already used");
//     });

//     it("handles general server errors", async () => {
//         const clientData = {
//             fullName: "David Smith",
//             email: "david@example.com",
//             phoneNumber: undefined,
//             address: undefined,
//             notes: undefined,
//         };

//         mockedDb.client.create.mockRejectedValue(new Error("Database down"));

//         const response = await POST(
//             new Request("http://localhost/api/clients", {
//                 method: "POST",
//                 body: JSON.stringify(clientData),
//             })
//         );
//         const json = await response.json();

//         expect(response.status).toBe(500);
//         expect(json.msg).toBe("Failed to post client information");
//     });
// });