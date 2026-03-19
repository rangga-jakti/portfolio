import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message is too short." },
        { status: 400 }
      );
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["miranggajakti@gmail.com"],
      replyTo: email,
      subject: `New message from portfolio — ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body style="margin:0;padding:0;background:#080A0F;font-family:'Outfit',Arial,sans-serif;">
            <div style="max-width:560px;margin:40px auto;background:#0D1117;border:1px solid #21262D;border-radius:12px;overflow:hidden;">
              
              <!-- Header bar -->
              <div style="height:3px;background:linear-gradient(90deg,transparent,#00FFE0,transparent);"></div>
              
              <!-- Header -->
              <div style="padding:28px 32px 20px;border-bottom:1px solid #21262D;">
                <p style="margin:0 0 4px;font-family:monospace;font-size:11px;color:#00FFE0;letter-spacing:2px;text-transform:uppercase;">
                  New Portfolio Message
                </p>
                <h1 style="margin:0;font-size:20px;font-weight:700;color:#E6EDF3;">
                  ${name} sent you a message
                </h1>
              </div>

              <!-- Body -->
              <div style="padding:24px 32px;">
                <!-- Name -->
                <div style="margin-bottom:16px;">
                  <p style="margin:0 0 4px;font-family:monospace;font-size:10px;color:#484F58;text-transform:uppercase;letter-spacing:1px;">From</p>
                  <p style="margin:0;font-size:15px;color:#E6EDF3;font-weight:600;">${name}</p>
                </div>

                <!-- Email -->
                <div style="margin-bottom:16px;">
                  <p style="margin:0 0 4px;font-family:monospace;font-size:10px;color:#484F58;text-transform:uppercase;letter-spacing:1px;">Email</p>
                  <a href="mailto:${email}" style="margin:0;font-size:15px;color:#00FFE0;text-decoration:none;">${email}</a>
                </div>

                <!-- Divider -->
                <div style="height:1px;background:#21262D;margin:20px 0;"></div>

                <!-- Message -->
                <div>
                  <p style="margin:0 0 8px;font-family:monospace;font-size:10px;color:#484F58;text-transform:uppercase;letter-spacing:1px;">Message</p>
                  <div style="background:#161B22;border:1px solid #21262D;border-radius:8px;padding:16px;">
                    <p style="margin:0;font-size:15px;color:#8B949E;line-height:1.7;white-space:pre-wrap;">${message}</p>
                  </div>
                </div>

                <!-- Reply button -->
                <div style="margin-top:24px;text-align:center;">
                  <a
                    href="mailto:${email}?subject=Re: Your message to Mirangga's portfolio"
                    style="display:inline-block;padding:12px 28px;background:#00FFE0;color:#080A0F;font-weight:700;font-size:14px;text-decoration:none;border-radius:6px;letter-spacing:0.3px;"
                  >
                    Reply to ${name}
                  </a>
                </div>
              </div>

              <!-- Footer -->
              <div style="padding:16px 32px;border-top:1px solid #21262D;text-align:center;">
                <p style="margin:0;font-family:monospace;font-size:10px;color:#484F58;">
                  Sent from mirangga.vercel.app · Portfolio Contact Form
                </p>
              </div>

              <!-- Bottom bar -->
              <div style="height:2px;background:linear-gradient(90deg,transparent,#FFB800,transparent);"></div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully!", id: data?.id },
      { status: 200 }
    );

  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
