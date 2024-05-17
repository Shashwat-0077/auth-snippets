//! Resend have a limit of :
//! Per Day : 100 mails
//! Per Months : 3000 mails

//! resend does not allow vercel of heroku links, you should own a ".com" domain to use resend

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    // change the email,
    // or the users will get local hosts links 🙂🙂🙂
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm you email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email</p>`,
    });
};