import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, nationality, slot, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL || "inquire@ashandmoss.com";

    if (resend) {
      await resend.emails.send({
        from: "Ash & Moss <noreply@ashandmoss.com>",
        to: [contactEmail],
        replyTo: [email],
        subject: `Inquiry — Ash & Moss`,
        text: `
Name: ${name}
Email: ${email}
Nationality: ${nationality || "Not specified"}
Preferred Slot: ${slot || "Not specified"}

Message:
${message}
        `.trim(),
      });
    } else {
      console.log("RESEND_API_KEY not set. Inquiry received:", {
        name,
        email,
        nationality,
        slot,
        message,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Inquiry error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
