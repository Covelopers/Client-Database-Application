import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient()

const idSchema = z.string().min(1, "id is required");


// To run this GET request  http://localhost:3000/api/clients/the_id_of_the_client
export const GET = async (req: NextRequest, context: { params: { id: string } }) => {
    try {

        const parsed = idSchema.safeParse(context.params.id);
        if (!parsed.success) {
            return NextResponse.json({ msg: "Validation failed" }, { status: 400 });
        }
        const id = parsed.data;

        // If the details can't be found then a failed message will be sent with status 404
        const details = await prisma.client.findUnique({ where: { id: id } })
        if (!details) {
            return NextResponse.json({ msg: 'Failed to find client information' }, { status: 404 });
        }

        return NextResponse.json({ details });

    }
    catch (error: any) {
        return NextResponse.json({ msg: 'Failed to get client information', error: error.message }, { status: 500 });
    }

}