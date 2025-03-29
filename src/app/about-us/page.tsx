"use client"
import useConutryCode from '@/hooks/useConutryCode';
import React from 'react';
import Header from '../Header';

const AboutUs = () => {
  const country = useConutryCode();
  return (
    <div className="bg-white text-gray-800">

<Header />

      {/* Header Section */}
      <header className="bg-black text-white py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-4 text-lg">We are on a mission to connect talented individuals with their dream jobs.</p>
        </div>
      </header>

      {/* Mission and Vision Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600">
              At JobAtLast, our mission is simple: to help individuals find their dream job and support companies
              in discovering the perfect candidate. We aim to revolutionize the job search process with seamless
              solutions, innovative tools, and personalized support.
            </p>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
            <p className="text-lg text-gray-600">
              We envision a world where career growth is accessible to everyone, where companies can find top
              talent efficiently, and where job seekers are empowered to thrive in the workplace. Our goal is to
              provide unmatched resources that simplify the recruitment journey for both employers and candidates.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-lg rounded-xl">
              <h3 className="text-2xl font-semibold mb-4">Integrity</h3>
              <p className="text-lg text-gray-600">
                We are committed to honesty and transparency in all our interactions, creating trust between job seekers and employers.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-xl">
              <h3 className="text-2xl font-semibold mb-4">Innovation</h3>
              <p className="text-lg text-gray-600">
                We embrace creativity and innovation, continuously developing new tools and approaches to improve the job search experience.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-xl">
              <h3 className="text-2xl font-semibold mb-4">Excellence</h3>
              <p className="text-lg text-gray-600">
                We strive for excellence in everything we do, ensuring high-quality service for both job seekers and employers alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      {/* <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <img
              src="/team-member1.jpg"
              alt="Team Member 1"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p className="text-gray-600">CEO & Founder</p>
          </div>
          <div className="text-center">
            <img
              src="/team-member2.jpg"
              alt="Team Member 2"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Jane Smith</h3>
            <p className="text-gray-600">Chief Technology Officer</p>
          </div>
          <div className="text-center">
            <img
              src="/team-member3.jpg"
              alt="Team Member 3"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Robert Brown</h3>
            <p className="text-gray-600">Head of Marketing</p>
          </div>
        </div>
      </section> */}

      {/* Footer Section */}
      <footer className="bg-black text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Job At Last. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
