import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend('');

export async function POST(request: Request) {
  try {
    const { name, email, company, projectDetails } = await request.json();
    
    // Get the current date and format it
    const date = new Date().toLocaleDateString('en-AU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    await resend.emails.send({
      from: 'enquiries@oskarfranttiglen.com',
      to: 'oskarfranttiglen@gmail.com',
      subject: `New Project Enquiry from ${name}${company ? ` - ${company}` : ''}`,
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
                background-color: #ffffff;
                color: #333333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                text-align: center;
                padding: 20px 0;
                border-bottom: 1px solid #eaeaea;
              }
              .logo {
                font-size: 24px;
                font-weight: bold;
                color: #333333;
              }
              .content {
                padding: 20px 0;
              }
              .field {
                margin-bottom: 20px;
              }
              .label {
                font-weight: bold;
                color: #666666;
                text-transform: uppercase;
                font-size: 12px;
                letter-spacing: 1px;
              }
              .value {
                margin-top: 5px;
                padding: 10px;
                background-color: #f5f5f5;
                border-radius: 4px;
              }
              .footer {
                text-align: center;
                padding: 20px 0;
                border-top: 1px solid #eaeaea;
                font-size: 12px;
                color: #666666;
              }
              .badge {
                display: inline-block;
                padding: 4px 8px;
                background-color: #007bff;
                color: white;
                border-radius: 12px;
                font-size: 12px;
                margin-top: 8px;
              }
              .timestamp {
                color: #666666;
                font-size: 14px;
                margin-bottom: 16px;
              }
              .contact-info {
                background-color: #f8f9fa;
                border-radius: 8px;
                padding: 16px;
                margin: 20px 0;
                border-left: 4px solid #007bff;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">Oskar Frantti Glen</div>
                <div>Full Stack Web Developer</div>
                <div class="badge">New Enquiry</div>
              </div>
              
              <div class="content">
                <div class="timestamp">Received on ${date}</div>
                <h2 style="color: #007bff;">New Project Enquiry</h2>
                
                <div class="contact-info">
                  <div class="field">
                    <div class="label">From</div>
                    <div class="value">${name}</div>
                  </div>
                  
                  <div class="field">
                    <div class="label">Email</div>
                    <div class="value"><a href="mailto:${email}" style="color: #4285f4;">${email}</a></div>
                  </div>
                  
                  ${company ? `
                  <div class="field">
                    <div class="label">Company</div>
                    <div class="value">${company}</div>
                  </div>
                  ` : ''}
                </div>

                <div class="field">
                  <div class="label">Project Details</div>
                  <div class="value" style="white-space: pre-wrap;">${projectDetails}</div>
                </div>

                <div class="field">
                  <div class="label">Quick Actions</div>
                  <div class="value">
                    <a href="mailto:${email}?subject=Re: Your Project Enquiry" style="color: #4285f4; display: block; margin-bottom: 8px;">↪ Reply to ${name}</a>
                    <a href="https://calendar.google.com/calendar/u/0/r/eventedit?text=Meeting+with+${encodeURIComponent(name)}${company ? `+from+${encodeURIComponent(company)}` : ''}&details=${encodeURIComponent(projectDetails)}" style="color: #4285f4; display: block;">📅 Schedule Meeting</a>
                  </div>
                </div>
              </div>
              
              <div class="footer">
                <p>📍 Melbourne, Australia</p>
                <p>Building Real Products for Real Clients, Not Just More Projects</p>
                <p style="font-size: 11px; margin-top: 16px;">This enquiry was sent through your portfolio website</p>
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