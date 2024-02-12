import HomePageLayout from "../../components/Home/HomePageLayout";

const Blog = () => {
  return (
    <HomePageLayout>
      <section className="bg-white ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900">
              Our Blog
            </h2>
            {/* <p className="font-light text-gray-500 sm:text-xl ">
              We use an agile approach to test assumptions and connect with the
              needs of your audience early and often.
            </p> */}
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="p-6 bg-gray-100 rounded-lg border border-gray-300 shadow-md hover:bg-gray-200">
              <div className="flex justify-between items-center mb-5 text-gray-500">
                <span className="bg-gray-600 text-gray-100 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                  <svg
                    className="mr-1 w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                  </svg>
                  Anokhi Pehel
                </span>
                <span className="text-sm">14 days ago</span>
              </div>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                <a href="#">Celebrating हिन्दी दिवस</a>
              </h2>
              <p className="mb-5 font-normal text-gray-900">
                हिंदी मात्र एक भाषा नहीं एक संस्कार है, केवल इतिहास नहीं बल्कि
                सुनहरा भविष्य भी है | आज की और आने वाले पीढ़ी को इस भाषा का
                महत्व बताते हुए अनोखी पहल के बच्चो ने हिंदी दिवस पर अपनी कला का
                प्रदर्शन किया और अनेक कार्यक्रमों में हिस्सा लिया जैसे कि
                प्रश्नोत्तरी, निबंध लेखन, चित्रकारी और कविता लेखन कला के माध्यम
                से उन्होंने हिंदी के वैश्विक महत्व को भी दर्शाया |
              </p>
              <div className="flex justify-between items-center">
                {/* <div className="flex items-center space-x-4">
                  <img
                    className="w-7 h-7 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                    alt="Jese Leos avatar"
                  />
                  <span className="font-medium">Jese Leos</span>
                </div> */}
                <a
                  href="#"
                  className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                >
                  Read more
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
            </article>
            <article className="p-6 bg-gray-100 rounded-lg border border-gray-300 shadow-md hover:bg-gray-200">
              <div className="flex justify-between items-center mb-5 text-gray-500">
                <span className="bg-gray-600 text-gray-100 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
                  <svg
                    className="mr-1 w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                      clip-rule="evenodd"
                    ></path>
                    <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
                  </svg>
                  Anokhi Pehel
                </span>
                <span className="text-sm">14 days ago</span>
              </div>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                <a href="#">
                  Participation in Avishkar, the annual techfest of MNNIT
                  Allahabad
                </a>
              </h2>
              <p className="mb-5 font-normal text-gray-900">
                Avishkar 2019 was marked with the inclusion of young and bright
                students from more than 20 schools in Prayagraj, as they were
                given a taste of engineering alongwith an idea about how things
                work in an engineering college. The students participated in a
                science quiz followed by a workshop on robotics.
              </p>
              <div className="flex justify-between items-center">
                {/* <div className="flex items-center space-x-4">
                  <img
                    className="w-7 h-7 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                    alt="Bonnie Green avatar"
                  />
                  <span className="font-medium">Bonnie Green</span>
                </div> */}
                <a
                  href="#"
                  className="inline-flex items-center font-medium text-primary-600 hover:underline"
                >
                  Read more
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </HomePageLayout>
  );
};

export default Blog;
