/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { sendMail } from '@/utils/helpers';
import React, { useState } from 'react';
import Header from '../Header';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    comment: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // const handleFileChange = (e) => {
  //   const { name, files } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: files[0]
  //   });
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Construct the mail options
    const mailOptions = {
      from: formData.email,
      to: 'youremail@gmail.com', // Your email
      subject: `Contact Form Submission from ${formData.name}`,
      text: `
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Message: ${formData.comment}
      `
    };

    try {
      await sendMail(mailOptions); // Call sendMail with the constructed mailOptions
      alert('Your message has been sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        resume: null,
        comment: ''
      }); // Reset form fields
    } catch (err) {
      console.error(err);
      alert('Failed to send email. Please try again later.');
    }
  };

  return (
    <div className="bg-white text-gray-800">
      <Header />

      {/* Header Section */}
      <header className="bg-black text-white py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-4 text-lg">
            We’d love to hear from you! Please fill out the form below.
          </p>
        </div>
      </header>

      {/* Contact Form Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-lg font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your Full Name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-lg font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your Email Address"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-lg font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your Phone Number"
              />
            </div>

            {/* Comment */}
            <div>
              <label
                htmlFor="comment"
                className="block text-lg font-medium mb-2"
              >
                Your Message
              </label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows={4}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your Message"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-black text-white font-semibold rounded-md shadow-lg hover:bg-gray-900 transition duration-200"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-black text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Job At Last. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;
