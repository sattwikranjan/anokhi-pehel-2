import styles from "../../style";
import { study,class1 } from "../../assets/Home";
import Contribute from "./Contribute";

const Hero = () => {
  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <div className="flex flex-row items-center py-[6px] px-4 bg-gray-200 rounded-[10px] mb-2">
          <p className={`${styles.paragraph}`}>सुनहरे सपनों का कल ✌️</p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 अपना font-semibold ss:text-[72px] text-[52px] text-gray-800 ss:leading-[100.8px] leading-[75px]">
          अपना😍<br className="sm:block hidden" />{" "}
            <span className="text-gradient">Anokhi पहल</span>{" "}
          </h1>
          {/* <div className="ss:flex md:mr-4 mr-0">
            <Contribute />
          </div> */}
        </div>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Anokhi Pehel is an initiative taken by the students of MNNIT to help
          the children of the economically weaker sections of the society by
          providing them an education in the best possible way.
        </p>
      </div>

      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
      >
        <img
          src={class1}
          alt="billing"
          className="w-[100%] h-[100%] relative z-[5] md:mr-10"
        />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

      {/* <div className={`ss:hidden ${styles.flexCenter}`}>
        <Contribute />
      </div> */}
    </section>
  );
};

export default Hero;
