import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend('re_Zw91QHzS_5vgPu83mVRhh8znRH4DgzJXb');

export async function POST(request: Request) {
  try {
    const { name, email, company, projectDetails } = await request.json();

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'oskarfranttiglen@gmail.com',
      subject: `New Project Enquiry from ${name}`,
      html: `
        <h2>New Project Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <h3>Project Details:</h3>
        <p>${projectDetails}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}