import styles from "../../style";
import React from "react";
import HomePageLayout from "../../components/Home/HomePageLayout";
import { connectWithUs } from "../../assets/Home";
const App = () => (
  <HomePageLayout>
    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        
      <div className="container m-auto md:my-12 p-2 lg:px-40">
      <div className="justify-center items-center text-center md:p-4 p-2 lg:text-4xl font-medium text-3xl">
            Back To School Program
            
          </div>
                   
          <div className="flex mb-8 md:mb-12 px-3 justify-center">
          
          </div>
          <div className="text-gray-600 body-font w-full">
            <div className=" w-full p-1 hover:text-white">
              <div className=" ">
                <h1 className="md:text-3xl text-2xl font-medium title-font text-gray-900 title-font mb-2 text-center italic ">
                Empowering Every Child’s Right to Education
                </h1>
                <p className="leading-relaxed p-4 md:p-8 lg:p-12 font-base md:font-medium text-center hover:text-stone-100 sm:text-xl text-base">
                The Back to School Program is a transformative initiative dedicated to reintegrating children into the education system, specifically targeting those who have dropped out due to financial, social, or family-related challenges. Our goal is to provide these children with the support they need to overcome barriers to education, ensuring that no child is left behind.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container m-auto md:my-12 p-2 lg:px-40">
          <div className="justify-center items-center text-center md:p-4 p-2 lg:text-4xl font-medium text-3xl">
          Our Comprehensive Approach
          </div>
          <div className="flex mb-8 md:mb-12 px-3 justify-center">
            <div className="w-16 h-1 rounded-full bg-teal-500 inline-flex"></div>
          </div>
          {/* <div className="text-gray-600 body-font w-full flex justify-center"> */}
          <div className="text-gray-600 body-font lg:flex lg:justify-center">
            <div className=" w-full p-1 hover:text-white">
              <div className="border-2 border-teal-200 p-2 h-full rounded-2xl bg-stone-50 hover:bg-gray-400 shadow-inner ">
                <h1 className="md:text-3xl text-2xl font-medium title-font text-gray-900 title-font mb-2 text-center italic ">
                Admission Assistance
                </h1>
                <p className="leading-relaxed p-4 md:p-8 lg:p-6 font-base md:font-medium text-center hover:text-stone-100 sm:text-xl text-base">
                  "We work closely with schools to streamline the enrollment process for dropouts, ensuring a smooth return to the classroom."
                </p>
              </div>
            </div>
            <div className=" w-full p-1 hover:text-white">
              <div className="border-2 border-teal-200 p-2 h-full rounded-2xl bg-stone-50 hover:bg-gray-400 shadow-inner ">
                <h1 className="md:text-3xl text-2xl font-medium title-font text-gray-900 title-font mb-2 text-center italic ">
                Financial Aid
                </h1>
                <p className="leading-relaxed p-4 md:p-8 lg:p-6 font-base md:font-medium text-center hover:text-stone-100 sm:text-xl text-base">
                "We provide  uniforms, textbooks, and other essential resources to make education accessible for underprivileged children."
                </p>
              </div>
            </div>
            <div className=" w-full p-1 hover:text-white">
              <div className="border-2 border-teal-200 p-2 h-full rounded-2xl bg-stone-50 hover:bg-gray-400 shadow-inner ">
                <h1 className="md:text-3xl text-2xl font-medium title-font text-gray-900 title-font mb-2 text-center italic ">
                Counseling and Mentorship
                </h1>
                <p className="leading-relaxed p-4 md:p-8 lg:p-6 font-base md:font-medium text-center hover:text-stone-100 sm:text-xl text-base">
                  "We believe in holistic development, offering emotional and psychological support to children, helping them regain confidence and motivation to pursue their dreams."
                </p>
              </div>
            </div>
          </div>

          

          
          
        </div>
      </div>

      
    </div>
    
      
  </HomePageLayout>
);

export default App;
