import { study3 } from "../../assets/Home";
import styles, { layout } from "../../style";
import Button from "./Button";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Your contribution <br className="sm:block hidden" />
        makes the world better!
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Arcu tortor, purus in mattis at sed integer faucibus. Aliquet quis
        aliquet eget mauris tortor.ç Aliquet ultrices ac, ametau.
      </p>

      <Button styles={`mt-10`} text="Contribute Now!" />
    </div>

    <div className={layout.sectionImg}>
      <iframe
        className="w-full h-64 lg:h-80 aspect-auto lg:aspect-video px-8"
        src="https://www.youtube.com/embed/NxMhckSJEP4?rel=0"
        title="Anokhi Pehel"
        allowFullScreen=""
      ></iframe>
      {/* <img src={study3} alt="billing" className="w-[100%] h-[100%]" /> */}
    </div>
  </section>
);

export default CardDeal;
