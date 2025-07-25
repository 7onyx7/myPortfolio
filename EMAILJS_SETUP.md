# EmailJS Setup Guide

This guide will help you set up EmailJS to make your contact form functional.

## Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Once logged in, you'll be taken to the dashboard

## Step 2: Create an Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down the **Service ID** (you'll need this later)

### For Gmail Setup:
1. Select Gmail
2. Click **Connect Account**
3. Authorize EmailJS to access your Gmail
4. Your service will be created with a Service ID

## Step 3: Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template content:

**Subject:** Portfolio Contact: {{subject}}

**Content:**
```
Hi Romeo,

You have received a new message from your portfolio contact form.

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

Best regards,
Your Portfolio Contact Form
```

4. Save the template and note down the **Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (also called User ID)
3. Copy this key

## Step 5: Update Environment Variables

Update your `.env.local` file with your actual EmailJS credentials:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_actual_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_actual_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

## Step 6: Test Your Setup

1. Start your development server: `npm run dev`
2. Navigate to your contact form
3. Fill out the form and submit
4. Check your email to see if you received the message

## Template Variables Used

The following variables are sent from your contact form to the email template:

- `{{from_name}}` - The sender's name
- `{{from_email}}` - The sender's email
- `{{subject}}` - The message subject
- `{{message}}` - The message content
- `{{to_name}}` - Your name (hardcoded as "Romeo")

## Troubleshooting

### Common Issues:

1. **Environment variables not working:**
   - Make sure your `.env.local` file is in the root directory
   - Restart your development server after updating the file
   - Ensure variable names start with `NEXT_PUBLIC_`

2. **Template not found:**
   - Double-check your Template ID
   - Make sure the template is published (not in draft)

3. **Service not found:**
   - Verify your Service ID
   - Ensure the email service is properly connected

4. **Emails not being sent:**
   - Check the browser console for errors
   - Verify your Public Key is correct
   - Make sure your email service is properly authenticated

### Rate Limits

EmailJS free plan includes:
- 200 emails per month
- Rate limit protection

For production use, consider upgrading to a paid plan for higher limits.

## Security Notes

- The Public Key is safe to expose in frontend code
- Never expose your Private Key in frontend code
- EmailJS handles the secure email sending on their servers
- All credentials are environment variables and won't be committed to git
