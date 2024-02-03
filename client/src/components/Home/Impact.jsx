import { features } from "../../constants/Home";
import styles, { layout } from "../../style";
import Button from "./Button";

const FeatureCard = ({ icon, title, content, index }) => (
  <div
    className={`flex flex-row p-6 rounded-[20px] ${
      index !== features.length - 1 ? "mb-6" : "mb-0"
    } feature-card`}
  >
    <div
      className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-gray-200`}
    >
      <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-bold text-gray-600 text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const Impact = () => (
  <section id="features" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h3 className={styles.heading2}>
        Our Impact : Transforming <br className="sm:block hidden" />
        <span style={{ color: "cyan" }}>Lives</span>
        <span style={{ marginRight: "0.5rem" }}>,</span>
        <span style={{ color: "" }}>Changing</span>
        <span style={{ marginRight: "0.5rem" }}></span>
        <span style={{ color: "cyan" }}>Society</span>.
      </h3>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        With just a small gesture of support, we are striving to create a
        significant transformation in the lives of those we touch and the
        society we influence.
      </p>

      <Button styles={`mt-10`} text="Get started" />
    </div>

    <div className={`${layout.sectionImg} flex-col`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </div>
  </section>
);

export default Impact;
