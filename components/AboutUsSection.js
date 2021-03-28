import styles from '../styles/AboutUsSection.module.css';
import SectionHeading from './SectionHeading';

function AboutUsSection() {
    return (
        <div className={styles['about-us-section']}>
            <SectionHeading>About Us</SectionHeading>
            <div className={styles['about-us-card']}>
                <p className={styles['about-us-content']}>
                    Web development is the work involved in developing a Web
                    site for the Internet (World Wide Web) or an intranet (a
                    private network). A more comprehensive list of tasks to
                    which Web development commonly refers, may include Web
                    engineering, Web design, Web content development, client
                    liaison, client-side/server-side scripting, Web server and
                    network security configuration, and e-commerce development.
                    Among Web professionals, "Web development" usually refers to
                    the main non-design aspects of building Web sites: writing
                    markup and coding. Web development may use content
                    management systems (CMS) to make content changes easier and
                    available with basic technical skills.
                </p>
            </div>
        </div>
    );
}

export default AboutUsSection;
