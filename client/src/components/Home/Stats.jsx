import CountUp from "react-countup";
import { stats } from "../../constants/Home";
import styles from "../../style";

const Stats = () => (
  <section className={`${styles.flexCenter} flex-row flex-wrap sm:mb-10 mb-2`}>
    {stats.map((stat) => (
      <div
        key={stat.id}
        className={`flex-1 flex flex-col justify-center items-center m-3 border-2 border-black p-3 rounded-lg`} // Center content and make the box larger
      >
        <h4 className="font-poppins font-extrabold xs:text-[45px] text-[35px] xs:leading-[55px] leading-[45px] text-gray-900 text-center">
          <CountUp start={0} end={stat.value} duration={2.75} />+ {/* Bolder text */}
        </h4>

        <p className="font-poppins font-extrabold xs:text-[22px] text-[18px] xs:leading-[28px] leading-[24px] text-gray-900 uppercase text-center mt-2">
          {stat.title} {/* Bolder and centered title */}
        </p>
      </div>
    ))}
  </section>
);

export default Stats;
