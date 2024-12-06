import React from "react";
import "./Footer.css";

function Footer() {

    return (
        <div className="footer">
            <div className="footer-left">
                <h3>Atendimento</h3>
                <span>
                    Horário de atendimento:
                    <br />
                    08:00 às 20:00 - Segunda a Sexta,
                    <br />
                    09:00 às 15:00 - Sabado,
                    <br />
                    horário de Brasília
                    (Exceto domingo e feriados)
                    <br />
                    Endereço:
                    <br />
                    Rua Carlos Gomes, 1321 -
                    9° andar - Centro
                    <br />
                    Joinville/SC - CEP: 89220-000
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
