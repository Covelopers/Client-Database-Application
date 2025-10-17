// import { describe, it, expect, vi } from "vitest";
// import { GET } from "~/app/api/clients/[id]/route";
// import { db } from "~/server/db";

// vi.mock("~/server/db", () => ({
//     db: {
//         client: {
//             findUnique: vi.fn(),
//         },
//     },
// }));

// const mockedDb = vi.mocked(db, true);

// describe("Clients API - GET /api/clients/[id]", () => {
//     it("returns client details when found", async () => {
//         const now = new Date();
//         const mockClient = {
//             id: "abc123",
//             fullName: "John Doe",
//             email: "john@example.com",
//             phoneNumber: "1234567890",
//             address: "123 Main St",
//             notes: "VIP client",
//             createdAt: now,
//             updatedAt: now,
//         };

//         mockedDb.client.findUnique.mockResolvedValue(mockClient);

//         const response = await GET(
//             new Request("http://localhost:3000/api/clients/abc123"),
//             { params: Promise.resolve({ id: "abc123" }) } // <-- mimic your handler style
//         );

//         const json = await response.json();

//         expect(response.status).toBe(200);
//         expect(json.details).toEqual({
//             ...mockClient,
//             createdAt: mockClient.createdAt.toISOString(),
//             updatedAt: mockClient.updatedAt.toISOString(),
//         });

//         expect(mockedDb.client.findUnique).toHaveBeenCalledWith({
//             where: { id: "abc123" },
//         });
//     });

//     it("returns 400 if id validation fails", async () => {
//         const response = await GET(
//             new Request("http://localhost:3000/api/clients/"),
//             { params: Promise.resolve({ id: "" }) }
//         );

//         const json = await response.json();
//         expect(response.status).toBe(400);
//         expect(json.msg).toBe("Validation failed");
//     });

//     it("returns 404 if client not found", async () => {
//         mockedDb.client.findUnique.mockResolvedValue(null);

//         const response = await GET(
//             new Request("http://localhost:3000/api/clients/unknown"),
//             { params: Promise.resolve({ id: "unknown" }) }
//         );

//         const json = await response.json();
//         expect(response.status).toBe(404);
//         expect(json.msg).toBe("Failed to find client information");
//     });

//     it("returns 500 if db throws error", async () => {
//         mockedDb.client.findUnique.mockRejectedValue(new Error("Database error"));

//         const response = await GET(
//             new Request("http://localhost:3000/api/clients/xyz"),
//             { params: Promise.resolve({ id: "xyz" }) }
//         );

//         const json = await response.json();
//         expect(response.status).toBe(500);
//         expect(json.msg).toBe("Failed to get client information");
//     });
// });
