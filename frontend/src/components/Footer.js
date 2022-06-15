import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";
import { fab } from '@fortawesome/free-brands-svg-icons'
import * as AiIcons from 'react-icons/ai';
import { Facebook,Twitter,Google,Instagram,Linkedin,Github,House,Envelope,Phone,Printer } from 'react-bootstrap-icons';




import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
   

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Jupiter Apparels
              </h6>
              <p>
                Jupiter Apparels is a multinational corporation with over 1000
                employees. Currently the branches of Jupiter are at Sri Lanka,
                Bangladesh and Pakistan
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="#!" className="text-reset">
                  Angular
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  React
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Vue
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Laravel
                </a>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Social Media</h6>
              <p>
                <a href="#!" className="text-reset">
                  <Facebook /> Jupiter
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  <Twitter/> Jupiter21
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  <Instagram /> Jupiter21
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  <Linkedin />Jupiter
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
              <House /> Colombo
              </p>
              <p>
              <Envelope />
                  jupiter@example.com
              </p>
              <p>
              <Phone /> + 01 234 567 88
              </p>
              <p>
               <Printer/> + 01 234 567 89
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2022 Copyright:All Rights Reserved
        
      </div>
    </MDBFooter>
  );
}
