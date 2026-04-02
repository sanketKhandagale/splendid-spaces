import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email required" },
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // create signed token (valid for 5 minutes)
    const token = jwt.sign(
      { email, otp },
      process.env.OTP_SECRET!,
      { expiresIn: "5m" }
    );

    // send OTP via Brevo
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: {
          email: process.env.BREVO_SENDER_EMAIL,
          name: process.env.BREVO_SENDER_NAME,
        },
        to: [{ email }],
        subject: "Your OTP for Budget Calculation",
        htmlContent: `
          <h2>Your OTP is <b>${otp}</b></h2>
          <p>Valid for 5 minutes.</p>
        `,
      }),
    });

    return NextResponse.json({ success: true, token });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
