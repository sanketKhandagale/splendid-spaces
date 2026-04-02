import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { otp, token } = await req.json();

    if (!otp || !token) {
      return NextResponse.json(
        { success: false, message: "OTP and token required" },
        { status: 400 }
      );
    }

    const decoded: any = jwt.verify(token, process.env.OTP_SECRET!);

    if (decoded.otp !== otp) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP" },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, email: decoded.email });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: "OTP expired or invalid" },
      { status: 401 }
    );
  }
}
