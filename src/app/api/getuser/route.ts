import User from "@/app/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    await dbConnect();
    const res = await req.json();
    try {
        const users: any = await User.findOne({ email: res.email });
        if (users.password == res.password)
            return NextResponse.json(users);
        else return NextResponse.error()
    } catch (err: any) {
        console.log(err.message);
    }
}
