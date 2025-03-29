'use client';
import moment from 'moment';
import { useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import { getCookieByName } from '../../utils/cookies'
// Fetch data from the API
export default function JobListingPage() {

  const [jobDetails] = useState<any | undefined>(getCookieByName('job') && JSON.parse(getCookieByName('job')|| ''))
  console.log('jobDetails: ', jobDetails);



  return (
    <>
      <div className="bg-white">
        <Header />
        
        <main className=" mx-auto bg-gray-100 py-8">
            {jobDetails && (
              <section className="px-4 md:px-12">
                <div
                  className={`rounded-3xl bg-white border border-gray-400 shadow-md p-1 flex flex-col justify-between `}
                >
                  <div className={` rounded-3xl p-6`}>
                    <div className={`flex justify-between items-center mb-4`}>
                      <span className="text-xs rounded-3xl p-3 bg-white text-gray-500">
                        {moment(jobDetails?.post_date).format('DD.MM.YYYY')}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 text-white"
                      >
                        <path d="M6 2a2 2 0 0 0-2 2v18l8-5.333L20 22V4a2 2 0 0 0-2-2H6z" />
                      </svg>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl text-black">{jobDetails?.title}</span>
                      <div className="bg-white -100  items-center rounded-3xl">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 30 24"
                          className={`w-auto h-8  bg-[rgb(170,64,111)] rounded-full`}
                        >
                          <text
                            x="8"
                            y="19"
                            fontSize="20"
                            className="rounded-3xl"
                            fontFamily="Arial, sans-serif"
                            fill="white"
                          >
                            {jobDetails?.company_name && jobDetails?.company_name[0]?.toUpperCase()}
                          </text>
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {jobDetails?.company_name} -{' '}
                      {jobDetails?.company_location}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {jobDetails?.tag && jobDetails?.tag?.split(',').map((tag:any, idx:any) => (
                        <span
                          key={idx}
                          className="text-xm text-black border border-gray-400 rounded-3xl p-3 "
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6">
                      <h3 className="text-2xl text-black font-semibold">
                        Gob Description
                      </h3>
                      <p className="text-gray-700 mt-4">
                        {jobDetails?.description}
                      </p>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-2xl text-black font-semibold">
                        {' '}
                        Notice Time :
                        <span className="text-gray-700 mt-4">
                          {' '}
                          {jobDetails?.notice}
                        </span>
                      </h3>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-2xl text-black font-semibold">Skills :</h3>
                      <ul className="list-disc ml-6 mt-4 text-gray-700">
                        {jobDetails?.skills
                          .split(',')
                          ?.map((req:any, idx:any) => <li key={idx}>{req}</li>)}
                      </ul>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-2xl text-black font-semibold">
                        Key Responsibilities
                      </h3>
                      <p className="text-gray-700 mt-4">
                        {jobDetails?.key_res}
                      </p>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-2xl text-black font-semibold">Requirements</h3>
                      <ul className="list-disc ml-6 mt-4 text-gray-700">
                        {jobDetails?.requirements}
                      </ul>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-2xl text-black font-semibold">Benefits</h3>
                      <ul className="list-disc ml-6 mt-4 text-gray-700">
                        {jobDetails?.benefits}
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-between items-center m-4 mt-4">
                    <span className=" text-lg text-black">{jobDetails?.salary} LPA</span>
                    <a
                      href={jobDetails.link}
                      className={` bg-[rgb(170,64,111)] text-white rounded-full px-4 py-2 text-sm hover:bg-[rgb(83,61,139)]`}
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </section>
            )}
        </main>
        <Footer />
      </div>
    </>
  );
}
