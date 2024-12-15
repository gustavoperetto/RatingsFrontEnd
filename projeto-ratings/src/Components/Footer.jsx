import React from "react";
import "./Footer.css";

function Footer() {

    return (
        <div className="footer">
            <div className="footer-left">
                <h3>Customer Service</h3>
                <span> Service hours: <br />
                    8:00 AM to 8:00 PM - Monday to Friday, <br />
                    9:00 AM to 3:00 PM - Saturday, <br />
                    Brasília Time Zone (Except Sundays and holidays) <br />
                    Address: <br />
                    Carlos Gomes, 1321 - 9th floor - Downtown <br />
                    Joinville/SC - ZIP: 89220-000
                </span>
            </div>
            <div className="footer-right">
                <div className="footer-social">
                    <a href="#"><img src="facebook.png" alt="Facebook" className="social-icon" /></a>
                    <a href="#"><img src="instagram.png" alt="Instagram" className="social-icon" /></a>
                    <a href="#"><img src="twitter.png" alt="Twitter" className="social-icon" /></a>
                </div>
                <div className="footer-copy">
                    &copy; 2024 Ratings. <br />All rights reserved.
                </div>
            </div>
        </div>
    );
}

export default Footer;
