/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import SkeletonLoader from './SkeletonLoader';
import { setCookies } from '../utils/cookies'
import { useRouter } from 'next/navigation';

// Fetch data from the API
export default function JobListingPage() {
  const route = useRouter();
  const [sortOption, setSortOption] = useState('Last Updated');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  const [apiUrl ,setUrl] = useState('https://orkiosk.com/admin/jobservice/get_jobs');
  console.log('isLoading: ', isLoading);

  const fetchJobs = async (url:any) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      setJobs([]);
      const data = await response.json();
      if (data.status == 1) {
        setJobs(data.result); // Assuming the API returns a `jobs` array
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data from the API
    fetchJobs('https://orkiosk.com/admin/jobservice/get_jobs');
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const colors = [
    'bg-[rgb(250,224,204)]',
    'bg-[rgb(212,246,237)]',
    'bg-[rgb(227,219,250)]',
    'bg-[rgb(223,243,254)]',
    'bg-[rgb(248,226,244)]',
    'bg-[rgb(236,239,244)]'
  ]; // Define your colors

  const [selectedCities, setSelectedCities] = useState<any>([]);
  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState<any>([]);
  const [selectedPost, setSelectedPost] = useState('');
  const [selectedJobTypes, setSelectedJobTypes] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedWorkMode, setSelectedWorkMode] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

  const cities = [
    'Ahmadabad',
    'Banglore',
    'Indore',
    'Delhi',
    'Haydrabad',
    'Mumbai',
    'Noida'
  ];

  const roles = [
    'Web Developer',
    'Designer',
    'Graphic Designer',
    'Web Designer',
    'Brand Manager',
    'Computer programmer',
    'Database Administrator',
    'Information Security Analyst',
    'Advertising and marketing',
    'Application Developer',
    'Finance',
    'Project manager',
    'Software engineer'
  ];

  const levels = ['Experience', 'Senior', 'Mid-Level', 'Junior'];

  const workModes = ['Remote', 'Onsite', 'Hybrid', 'Temporary', 'Freelance'];

  const jobTypes = ['Full-Time', 'Part-Time'];

  const salaryRanges = [
    '0 - 3 LPA',
    '3 - 5 LPA',
    '5 - 9 LPA',
    '9 - 12 LPA',
    '12 - 15 LPA',
    '15 - 20 LPA above'
  ];

  const handleCityChange = (city:any) => {
    setSelectedCities((prev: any) =>
      prev.includes(city) ? prev.filter((c:any) => c !== city) : [...prev, city]
    );
  };

  const handleSalaryRangeChange = (range : any) => {
    setSelectedSalaryRanges((prev: any) =>
      prev.includes(range) ? prev.filter((r :any) => r !== range) : [...prev, range]
    );
  };



  const searchFiltersBefore =async (url: string) : Promise<string> =>{
    if(selectedPost) {
    if (url.includes('?')) {
      url += `&post=${selectedPost}`;
     
    } else {
      url += `&post=${selectedPost}`;
     
    }
  }

  if(selectedWorkMode) {
    if (url.includes('?')) {
      url += `&work_location=${selectedWorkMode}`;
    } else {
      url += `&work_location=${selectedWorkMode}`;
    }
  }
  if(selectedJobTypes) {

    if (url.includes('?')) {
      url += `&employ_type=${selectedJobTypes}`;
    } else {
      url += `&employ_type=${selectedJobTypes}`;
    }
  }

  if(selectedLevel) {

    if (url.includes('?')) {
      url += `&experience=${selectedLevel}`;
    } else {
      url += `&experience=${selectedLevel}`;
    }
  }

  if(selectedTitle) {

    if (url.includes('?')) {
      url += `&title=${selectedTitle}`;
    } else {
      url += `&title=${selectedTitle}`;
    }
  }

    return url;
  }


  const applyFilterBefore = async (url: string): Promise<string> => {
    // let url = 'https://orkiosk.com/admin/jobservice/get_jobs';
    for (let i = 0; i < selectedCities.length; i++) {
      if (i === 0) {
        if (url.includes('?')) {
          url += `&city=${selectedCities[i]}`;
        } else {
          url += `?city=${selectedCities[i]}`;
        }
      } else {
        url += `,${selectedCities[i]}`;
      }
    }

    for (let i = 0; i < selectedSalaryRanges.length; i++) {
      if (i === 0) {
        if (url.includes('?')) {
          url += `&salary=${selectedSalaryRanges[i].split(['-'])[1].split(' ')[1]}`;
        } else {
          url += `?salary=${selectedSalaryRanges[i].split(['-'])[1].split(' ')[1]}`;
        }
      } else {
        url += `,${selectedSalaryRanges[i].split(['-'])[1].split(' ')[1]}`;
      }
    }

    // await setUrl(url);
    return url;
  };


    const applyFilter = async () => {
    let url = 'https://orkiosk.com/admin/jobservice/get_jobs'
    url = await applyFilterBefore(url);
    url = await searchFiltersBefore(url);
    if(url !== apiUrl) {
      setUrl(url);
      await fetchJobs(url);
    }
  };

  const handleClear = () => {
    const url = 'https://orkiosk.com/admin/jobservice/get_jobs';
    fetchJobs(url);
    setSelectedCities([]); // Clear all selections
    setSelectedSalaryRanges([]); // Clear all salary range selections
  };

  const sortedJobs: any = [...jobs].sort((a: any, b: any) => {
    if (sortOption === 'Highest Salary') {
      return (
        parseInt(b.salary.replace(/[^0-9]/g, '')) -
        parseInt(a.salary.replace(/[^0-9]/g, ''))
      );
    }
    if (sortOption === 'Alphabetical Order') {
      return a.title.localeCompare(b.title);
    }
    // Fix the typo and ensure the comparison is valid
    return new Date(b.post_date).getTime() - new Date(a.post_date).getTime();
  });
  

  const handleSelectChange = (event: any, type: any) => {
    // setSelectedValue(event.target.value);
    if (type === 'post') {
      setSelectedPost(event.target.value);
    }

    if (type === 'work_location') {
      setSelectedWorkMode(event.target.value);
    }

    if (type === 'experiance') {
      setSelectedLevel(event.target.value);
    }

    if (type === 'employ_type') {
      setSelectedJobTypes(event.target.value);
    }
  };
  return (
    <>
      <div className="bg-white">
        <Header />
        {/* Filters and Search */}
        <div className="bg-black pb-4 shadow-lg">
          <div className="mx-auto   justify-between  px-4 flex flex-wrap items-center gap-4 text-white">
            {/* Designer Dropdown */}
            <div className="relative flex items-center w-full md:w-1/6">
              <select
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-12 py-2 w-full text-sm appearance-none focus:ring focus:ring-blue-500 transition cursor-pointer"
                onChange={(e) => handleSelectChange(e, 'post')}
              >
                <option>Select Our Tech</option>
                {roles.map((city, index) => (
                  <option value={city} key={index}>
                    {city}
                  </option>
                ))}
              </select>
              <span className="absolute left-4 text-gray-400">🔍</span>
            </div>

            {/* Work Location Dropdown */}
            <div className="relative flex items-center w-full md:w-1/6">
              <select
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-12 py-2 w-full text-sm appearance-none focus:ring focus:ring-blue-500 transition cursor-pointer"
                onChange={(e) => handleSelectChange(e, 'work_location')}
              >
                <option>Select Our work Mode</option>
                {workModes.map((workMode, index) => (
                  <option key={index}>{workMode}</option>
                ))}
              </select>
              <span className="absolute left-4 text-gray-400">📍</span>
            </div>

            {/* Experience Dropdown */}
            <div className="relative flex items-center w-full md:w-1/6">
              <select
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-12 py-2 w-full text-sm appearance-none focus:ring focus:ring-blue-500 transition cursor-pointer"
                onChange={(e) => handleSelectChange(e, 'experiance')}
              >
                <option>Select Our Level</option>
                {levels.map((level, index) => (
                  <option key={index}>{level}</option>
                ))}
              </select>
              <span className="absolute left-4 text-gray-400">💼</span>
            </div>

            {/* Per Month Dropdown */}
            <div className="relative flex items-center w-full md:w-1/6">
              <select
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-12 py-2 w-full text-sm appearance-none focus:ring focus:ring-blue-500 transition cursor-pointer"
                onChange={(e) => handleSelectChange(e, 'employ_type')}
              >
                <option>Select Our Job Type</option>
                {jobTypes.map((jobType, index) => (
                  <option key={index}>{jobType}</option>
                ))}
              </select>
              <span className="absolute left-4 text-gray-400">🕒</span>
            </div>

            {/* Search Box */}
            <div className="relative flex items-center w-full space-x-2 md:w-1/4">
              <input
                type="text"
                onChange={(e) => setSelectedTitle(e.target.value)}
                placeholder="Search jobs here..."
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 w-full text-sm focus:ring focus:ring-blue-500 transition"
              />
              <div className="w-full md:w-auto btn-pry ">
                {' '}
                <button className="bg-[rgb(170,64,111)] text-white px-6 py-2 rounded-lg hover:bg-[rgb(83,61,139)] transition"
                onClick={applyFilter}
                >
                  Search
                </button>
              </div>
            </div>

            {/* Search Button */}
          </div>
        </div>
        {/* 
        <div className="relative mx-auto py-8 px-6">
          <span className="lg:hidden absolute top-4 left-4 bg-blue-600 text-white p-2 rounded">
            Filter`s
          </span>
          <button
            className="lg:hidden absolute top-4 left-4 bg-blue-600 text-white p-2 rounded"
            onClick={toggleSidebar}
          >
            {isSidebarVisible ? 'Close' : 'Menu'}
          </button>
        </div> */}
        {/* Main Content */}
        <main className=" mx-auto bg-gray-100 py-8 px-6">
          <div className="flex flex-col lg:flex-row gap-8 ">
            {/* Sidebar */}
            {/* Button to toggle sidebar on small devices */}

            {/* Sidebar */}
            <aside
              className={`${isSidebarVisible ? 'block' : 'hidden'} lg:block w-full lg:w-1/6 `}
            >
              {/* Filters Section */}
              <div className="bg-white p-6 shadow-md rounded-3xl border border-gray-400 sm:p-4 md:p-6 lg:p-8">
              <div className="mt-8 flex items-center justify-between space-x-2">
  <h2 className="text-xl font-bold mb-0">Filters</h2>
  <div className="space-1 cursor-pointer">
    <span
      className="bg-[rgb(170,64,111)] text-white rounded-full px-4 py-2 text-sm hover:bg-[rgb(83,61,139)]"
      onClick={applyFilter}
    >
      Apply
    </span>
    <span
      className="text-white bg-gray-600 rounded-full px-4 py-2 text-sm hover:bg-[rgb(83,61,139)]"
      onClick={handleClear}
    >
      Clear
    </span>
  </div>
</div>


                {/* City Filter */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">City</h3>
                  <ul className="space-y-3">
                    {cities.map((city, index) => (
                      <li key={index}>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="text-blue-600 rounded-sm focus:ring-blue-500"
                            checked={selectedCities.includes(city)}
                            onChange={() => handleCityChange(city)}
                          />
                          <span>{city}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Salary Range Filter */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Salary Range</h3>
                  <ul className="space-y-3">
                    {salaryRanges.map((range, index) => (
                      <li key={index}>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="text-blue-600 rounded-sm focus:ring-blue-500"
                            checked={selectedSalaryRanges.includes(range)}
                            onChange={() => handleSalaryRangeChange(range)}
                          />
                          <span className="text-sm">{range}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Job Listings */}
            <section className="flex-1 ">
              <div className="flex justify-between items-center mb-6">
                <h2 className="md:text-2xl text-black	 text-lg  font-bold">Recommended Jobs</h2>
                {/* <span className="text-sm text-gray-500">386 jobs found</span> */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 text-sm"
                  >
                    <option>Last Updated</option>
                    <option>Highest Salary</option>
                    <option>Alphabetical Order</option>
                  </select>
                </div>
              </div>

              {isLoading ? (
                <SkeletonLoader />
              ) : (
                <div
                  className={`grid grid-cols-1 md:grid-cols-3  xl:grid-cols-3 gap-6`}
                >
                  {/* Job Cards */}
                  {sortedJobs.map((job: any, index:any) => (
                    <div
                      key={index}
                      className={`rounded-3xl border border-gray-400 p-1.5 shadow-md p-1 flex flex-col justify-between  `}
                    >
                      <div
                        className={` ${colors[index % colors.length]} rounded-3xl p-6 h-full`}
                      >
                        <div
                          className={`flex justify-between items-center mb-4`}
                        >
                          <span className="text-xs rounded-3xl p-3 bg-white text-gray-500">
                            {moment(job.post_date).format('DD.MM.YYYY')}
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
                          <span className="text-xl text-black">{job.title}</span>
                          <div className="bg-white p-1 rounded-3xl">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 30 24"
                              className={`w-auto h-6 text-red-600`}
                            >
                              <text
                                x="8"
                                y="19"
                                fontSize="20"
                                fontFamily="Arial, sans-serif"
                                fill="#aa416f"
                              >
                                {job?.company_name[0]?.toUpperCase()}
                              </text>
                            </svg>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          {job.company_name} - {job.company_location}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {job?.tag
                            ?.split(',')
                            .splice(0, 3)
                            .map((tag:any, idx:any) => (
                              <span
                                key={idx}
                                className="text-xm border border-gray-400 rounded-3xl p-3 text-black "
                              >
                                {tag}
                              </span>
                            ))}
                        </div>
                      </div>
                      <div className="flex justify-between items-center m-4 mt-4">
                        <span className=" text-lg text-black">{job.salary} LPA</span>
                        <a
                          href="#"
                          className={` bg-[rgb(170,64,111)] text-white rounded-full px-4 py-2 text-sm hover:bg-[rgb(83,61,139)]`}
                          onClick={() => {
                            setCookies('job', JSON.stringify(job))
                            route.push(`/job-details`)
                          }}
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
