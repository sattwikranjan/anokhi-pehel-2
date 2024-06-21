import React, { useState, useEffect } from 'react';
import HomePageLayout from "../../components/Home/HomePageLayout";
import axios from 'axios';
import { BASE_URL, SERVER_URL } from '../../Service/helper';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {  branch24, branch25 } from '../../constants/Dashboard';

const Team = () => {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response =  await axios.get(`${BASE_URL}/teamList`) 
        console.log(response.data)
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const settings = {
    dots: true,
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
            {users.map((user)=>
            ((user.role=="Final Year Coordinator" || user.role=="Admin") &&
              <div key={user._id} className="text-center text-gray-500 transition ease-in-out delay-150 cursor-pointer hover:-translate-y-2 hover:scale-110 duration-500">
              <img
                className="mx-auto mb-4 w-36 h-36 rounded-full"
                src={`${SERVER_URL}/images/${user?.photo}`}
                alt="Bonnie Avatar"
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
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11.75 20h-2.5v-11h2.5v11zm-1.25-12.268c-.819 0-1.482-.663-1.482-1.482s.663-1.482 1.482-1.482 1.482.663 1.482 1.482-.663 1.482-1.482 1.482zm14.25 12.268h-2.5v-5.675c0-1.352-.026-3.094-1.884-3.094-1.885 0-2.173 1.471-2.173 2.992v5.777h-2.5v-11h2.404v1.502h.034c.334-.631 1.15-1.293 2.368-1.293 2.53 0 3 1.666 3 3.836v6.955z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href={user.socialMedia?.instagram ? `https://www.instagram.com/${user.socialMedia.instagram}` : '#'}
                    className="text-[#39569c] hover:text-gray-900"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                      fillRule="evenodd"
                      d="M7.75 2h8.5C19.2 2 22 4.8 22 8.25v8.5C22 19.2 19.2 22 16.25 22h-8.5C4.8 22 2 19.2 2 16.25v-8.5C2 4.8 4.8 2 7.75 2zm0 1.5A4.75 4.75 0 0 0 3 8.25v8.5A4.75 4.75 0 0 0 7.75 21.5h8.5A4.75 4.75 0 0 0 21 16.75v-8.5A4.75 4.75 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM18 5.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0z"
                      clipRule="evenodd"
                    />
                    </svg>
                  </a>
                </li>
                
              </ul>
            </div>
            )
            )}
            
          </div>
        </div>   
      </section>
      <section className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <h2 className="mb-4 text-4xl tracking-tight text-gray-900">
            Alumni
        </h2>
        <Slider {...settings}>
              {users.map((alum) => (
               ((alum.role=="Alumni" ) && 
              <div key={alum._id} className="text-center text-gray-500 transition ease-in-out delay-150 cursor-pointer hover:-translate-y-2 hover:scale-110 duration-500">
              <img
                className="mx-auto mb-4 w-36 h-36 rounded-full"
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
