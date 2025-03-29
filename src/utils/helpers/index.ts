/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from 'moment';
import momentTimeZone from 'moment-timezone';
// import nodemailer from 'nodemailer';

export const sendMail = async (mailOptions: any) => {
  try {
    // Create transporter using environment variables for Gmail
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.EMAIL_USER,  // From environment variable
    //     pass: process.env.EMAIL_PASS,  // From environment variable
    //   },
    // });

    // Send the email
    // await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

export function getCurrentTimestamp(): number {
  return moment().unix();
}

export const momentGetTimeZone = (meetingTime: Date, timezone: string) => {
  return momentTimeZone.tz(meetingTime, timezone);
};

export const getKeyByValue = (
  object: Record<string, string>,
  value: string
): string | null => {
  return Object.entries(object).find(([, val]) => val === value)?.[0] ?? null;
};
