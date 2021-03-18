import styles from '../styles/AboutUsSection.module.css';
import SectionHeading from './SectionHeading';

function AboutUsSection() {
    return (
        <div className={styles['about-us-section']}>
            <SectionHeading>About Us</SectionHeading>
            <div className={styles['about-us-card']}>
                <p className={styles['about-us-content']}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras quis venenatis mi, quis tristique urna. Nulla vulputate
                    est nisl, sit amet efficitur enim maximus et. Maecenas
                    faucibus commodo ante, sit amet ultrices nisi consectetur
                    ut. Praesent mollis est quam, sit amet bibendum neque
                    placerat nec. Aliquam lobortis ipsum leo, vulputate congue
                    augue maximus id. Phasellus id ipsum massa. Aliquam eget
                    sollicitudin est. Cras vitae lacus vel velit pulvinar
                    malesuada. Praesent congue risus mauris, nec consectetur dui
                    faucibus ac. Etiam pharetra orci at nisl egestas convallis.
                </p>
            </div>
        </div>
    );
}

export default AboutUsSection;
