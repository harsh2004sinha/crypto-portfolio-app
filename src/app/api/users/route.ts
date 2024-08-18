import User from "@/app/models/User"
import dbConnect from "@/lib/dbConnect"
import { NextResponse } from "next/server"

export async function POST(req: any) {
    await dbConnect()
    const payload = await req.json()
    let user = new User(payload)

    try {
        const res = await user.save()
        return NextResponse.json(res)
    }
    catch (err: any) {
        console.log(err.message)
    }
}