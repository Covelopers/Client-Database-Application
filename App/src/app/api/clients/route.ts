import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

//This get request gets ALL of the clients from the client database

// To run use this get reques: http://localhost:3000/api/clients
export const GET = async (req: Request) => {
    try {
        const clients = await prisma.client.findMany();
        return NextResponse.json({ clients });
    }
    catch (error: any) {
        return NextResponse.json({ msg: 'Failed to retrieve clients', error: error.message }, { status: 500 });
    }
};