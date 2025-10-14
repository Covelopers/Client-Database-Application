import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient()

// There is only one query that accepts string
const searchSchema = z.object({
    query: z.string().optional()
});
// To run use this GET request : http://localhost:3000/api/clients/search?query=whatever_you_want_to_type

export const GET = async (req: NextRequest) => {
    try {
        // Here the backend get the url, and takes the param after http://localhost:3000/api/clients/search?query=
        const url = new URL(req.url);

        //This makes sure that if theres not query ?? then it will be a empty string instead of null
        const queryParams = url.searchParams.get("query") ?? "";

        const parseResult = searchSchema.safeParse({ query: queryParams });
        if (!parseResult.success) {
            return NextResponse.json({ error: parseResult.error.errors }, { status: 400 });
        }
        const { query } = parseResult.data

        // This finds all of the data in the following columns that is LIKE (contains) the query written by the user
        const clients = await prisma.client.findMany({
            where: {
                OR: [
                    { fullName: { contains: query, mode: "insensitive" } },
                    { email: { contains: query, mode: "insensitive" } },
                    { phoneNumber: { contains: query, mode: "insensitive" } },
                ],
            },
        });

        return NextResponse.json(clients);
    }
    catch (error: any) {
        return NextResponse.json({ msg: 'Failed to get client information', error: error.message }, { status: 500 });
    }

}