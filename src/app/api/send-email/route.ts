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
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Project Enquiry</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: #1a1a1a;
                color: #ffffff;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                text-align: center;
                padding: 20px 0;
                border-bottom: 1px solid #333;
              }
              .logo {
                font-size: 24px;
                font-weight: bold;
                color: #ffffff;
              }
              .content {
                padding: 20px 0;
              }
              .field {
                margin-bottom: 20px;
              }
              .label {
                font-weight: bold;
                color: #4285f4;
                text-transform: uppercase;
                font-size: 12px;
                letter-spacing: 1px;
              }
              .value {
                margin-top: 5px;
                padding: 10px;
                background-color: #2a2a2a;
                border-radius: 4px;
              }
              .footer {
                text-align: center;
                padding: 20px 0;
                border-top: 1px solid #333;
                font-size: 12px;
                color: #888;
              }
              .highlight {
                color: #4285f4;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">Oskar Frantti Glen</div>
                <div>Full Stack Web Developer</div>
              </div>
              
              <div class="content">
                <h2 style="color: #4285f4;">New Project Enquiry</h2>
                
                <div class="field">
                  <div class="label">From</div>
                  <div class="value">${name}</div>
                </div>
                
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value">${email}</div>
                </div>
                
                ${company ? `
                <div class="field">
                  <div class="label">Company</div>
                  <div class="value">${company}</div>
                </div>
                ` : ''}
                
                <div class="field">
                  <div class="label">Project Details</div>
                  <div class="value">${projectDetails}</div>
                </div>
              </div>
              
              <div class="footer">
                <p>📍 Melbourne, Australia</p>
                <p>Building Real Products for Real Clients, Not Just More Projects</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}