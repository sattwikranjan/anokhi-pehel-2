import styles from "../../style";
import React from "react";
import HomePageLayout from "../../components/Home/HomePageLayout";
import {Antyodaya2k23} from "../../assets/Home"; // Make sure this path is correct

const Antodaya = () => (
  <HomePageLayout>
    <div
      className={`bg-primary ${styles.flexStart}`}
      style={{
        backgroundImage: `url(${Antyodaya2k23})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 0.9, // Adjust the opacity as needed
      }}
    >
      <div className="bg-black bg-opacity-50 w-full h-full p-10">
        <div className={`${styles.boxWidth}`}>
          {/* Antyodaya Section */}
          <div className="container m-auto md:my-12 p-2 lg:px-40">
            <div className="justify-center items-center text-center md:p-4 p-2 lg:text-4xl font-medium text-3xl text-white">
              Antyodaya
            </div>
            <p className="text-center mt-4 text-lg text-white">
              Antyodaya is the annual festival of <strong>Anokhi Pehel</strong>,
              a community-driven initiative aimed at empowering children from
              marginalized communities. The event provides an incredible
              platform for these children to showcase their talents, interact
              with students from over 30 schools, and compete in a variety of
              cultural, educational, science, and art events. It is a
              celebration of creativity, learning, and community spirit,
              allowing students to overcome barriers, learn new skills, and gain
              confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  </HomePageLayout>
);

export default Antodaya;
