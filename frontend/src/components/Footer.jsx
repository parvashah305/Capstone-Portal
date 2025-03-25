import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-white text-blue-950 py-6 text-xl">
            <div className="container flex justify-between mx-auto text-center">
                <p className="font-semibold">&copy; PES University</p>
                <div className="flex gap-5 text-2xl">
                    <a target='_blank' href="https://www.facebook.com/pesuniversity"><FaFacebook /></a>
                    <a target='_blank' href="https://www.youtube.com/pesuniversity"><FaYoutube /></a>
                    <a target='_blank' href="https://www.linkedin.com/school/pesuniversity/"><FaLinkedin /></a>
                    <a target='_blank' href="https://twitter.com/pesuniversity"><FaTwitter /></a>
                    <a target='_blank' href="https://instagram.com/pesuniversity"><FaInstagram /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;