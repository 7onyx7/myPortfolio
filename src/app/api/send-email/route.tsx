import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const { name, email, subject, message } = await request.json();

        // Basic validation
        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        // Sanitize inputs (basic)
        const sanitizedName = name.trim();
        const sanitizedEmail = email.trim().toLowerCase();
        const sanitizedSubject = subject.trim();
        const sanitizedMessage = message.trim().replace(/\n/g, '<br>');

        // Check if required environment variables are set
        if (!process.env.FROM_EMAIL || !process.env.CONTACT_EMAIL) {
            console.error('Missing environment variables: FROM_EMAIL or CONTACT_EMAIL');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const { data, error } = await resend.emails.send({
            from: process.env.FROM_EMAIL as string,
            to: process.env.CONTACT_EMAIL as string,
            subject: `Portfolio Contact: ${sanitizedSubject}`,
            html: `
              <p><strong>Name:</strong> ${sanitizedName}</p>
              <p><strong>Email:</strong> ${sanitizedEmail}</p>
              <p><strong>Message:</strong></p>
              <p>${sanitizedMessage}</p>
            `,
        });

        if (error) {
            console.error('Resend API error:', error);
            return NextResponse.json({ error: 'Failed to send email. Please try again later.' }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (err) {
        console.error('Email send error:', err);
        return NextResponse.json({ error: 'An error occurred while sending your message. Please try again later.' }, { status: 500 });
    }
} 