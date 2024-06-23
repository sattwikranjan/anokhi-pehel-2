import React, { useState, useEffect } from 'react';
import HomePageLayout from "../../components/Home/HomePageLayout";
import axios from 'axios';
import { BASE_URL, SERVER_URL } from '../../Service/helper';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {  ROLES, branch24, branch25 } from '../../constants/Dashboard';
import { instagram, linkedin } from '../../assets/Home';
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
const Team = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;
  const [users, setUsers] = useState([]);
  const [alum, setAlum] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response =  await axios.get(`${BASE_URL}/teamList`) 
        const filteredUsers = response.data.filter(user => 
          user.role === ROLES.FINAL_YEAR_COORDINATOR
        );
        setUsers(filteredUsers);
        const filteredAlum = response.data.filter(user => 
          user.role === ROLES.ALUMNI);
        setAlum(filteredAlum)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Calculate the indices for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  // Calculate total pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '10%',
        }
      }
    ]
  };


  return (
    <HomePageLayout>
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
          <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
              Our Team
            </h2>
            <h3 className="mb-4 text-2xl tracking-tight text-gray-900">
            Final year Coordinators
            </h3>
          </div>
          <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {currentUsers.map((user)=>
            (user.role === ROLES.FINAL_YEAR_COORDINATOR &&
              <div key={user._id} className="text-center text-gray-500 transition ease-in-out delay-150 cursor-pointer hover:-translate-y-2 hover:scale-110 duration-500 ">
              <img
                className="mx-auto mb-4 w-36 h-36 rounded-full object-cover"
                src={`${SERVER_URL}/images/${user?.photo}`}
                alt="Coordinator Avatar"
              />
              <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">
                <a href="#">{user.name}</a>
              </h3>
              
              <p>
              {user.regnumber && user.regnumber.length >= 5 && branch25[user.regnumber[4]]
                ? branch25[user.regnumber[4]].branch
                : "Branch not found"}
            </p>
              <ul className="flex justify-center mt-4 space-x-4">
              <li>
                  <a
                    href={user.socialMedia?.linkedin ? `https://www.linkedin.com/in/${user.socialMedia.linkedin}` : '#'}
                    className="text-[#0077b5] hover:text-gray-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={linkedin} />
                  </a>
                </li>
                <li>
                  <a
                    href={user.socialMedia?.instagram ? `https://www.instagram.com/${user.socialMedia.instagram}` : '#'}
                    className="text-[#39569c] hover:text-gray-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={instagram} />
                  </a>
                </li>
                
              </ul>
            </div>
            )
            )}
            
          </div>
          {/* Pagination controls */}
        <div className="flex justify-center mt-8">
        <button
            onClick={handlePreviousPage}
            className={`px-3 py-2 border rounded  'bg-white'}`}
          >
            <GoArrowLeft/>
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-2 border rounded ${
                currentPage === index + 1 ? 'bg-gray-300' : 'bg-white'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            className={`px-3 py-2 border rounded 'bg-white'}`}
          >
            <GoArrowRight/>
          </button>
        </div>
        </div>   
      </section>
      <section className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <h2 className="mb-4 text-4xl tracking-tight text-gray-900">
            Alumni
        </h2>
        <Slider {...settings}>
              {alum.map((alum) => (
               ((alum.role=="Alumni" ) && 
              <div key={alum._id} className="text-center text-gray-500 pt-4">
              <img
                className="mx-auto mb-4 w-36 h-36 rounded-full object-cover"
                src={`${SERVER_URL}/images/${alum?.photo}`}
                alt="Alumni Avatar"
              />
              <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">
                <a href="#">{alum.name}</a>
              </h3>
              <p>{branch24[alum.regnumber[4]].branch}</p>
              </div>
              )))}
            </Slider>
      </section>
    </HomePageLayout>
  );
};

export default Team;
