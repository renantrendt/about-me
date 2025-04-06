import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, message, captchaToken, isDev } = body;

    // Validate inputs
    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      );
    }

    // Skip CAPTCHA verification in development mode
    if (!isDev) {
      // Verify CAPTCHA token
      if (!captchaToken) {
        return NextResponse.json(
          { error: 'CAPTCHA token is required' },
          { status: 400 }
        );
      }

      const captchaVerification = await verifyCaptcha(captchaToken);
      if (!captchaVerification.success) {
        return NextResponse.json(
          { error: 'CAPTCHA verification failed' },
          { status: 400 }
        );
      }
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or use SMTP details
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com', // Fallback for development
        pass: process.env.EMAIL_PASSWORD || 'your-app-password', // Fallback for development
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'renantrendt@gmail.com', // Your email address
      replyTo: email,
      subject: `Portfolio Contact Form: Message from ${email}`,
      text: message,
      html: `
        <div>
          <h3>New message from your portfolio contact form</h3>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    };

    // Send email (or simulate in development)
    if (isDev) {
      // Simulate sending in development
      console.log('DEV MODE - Email would be sent with:', mailOptions);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
    } else {
      // Actually send in production
      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

async function verifyCaptcha(token: string) {
  try {
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY || '6LdujQsrAAAAAOcSmWi34CEyR64vE3rZWnUBUXv1'}&response=${token}`,
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false };
  }
}
