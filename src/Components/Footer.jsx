import { useState } from "react";
import Button from "./Button";

function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="bg-black text-white py-6">
      <div className="wrapper grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-[38px] 3xl:gap-[45px] mb-4 md:mb-4 text-center md:text-left">
        <div>
          <h6 className="text-h6Bold xxl:text-h5Bold mb-4 md:mb-6">
            Featured product
          </h6>
          <ul>
            {/* List from API */}
            <li className="text-subHeading mb-4">
              <a href="">Men</a>
            </li>
            <li className="text-subHeading mb-4">
              <a href="">Ladies</a>
            </li>
            <li className="text-subHeading mb-4">
              <a href="">Shoes</a>
            </li>
            <li className="text-subHeading mb-4">
              <a href="">Accessories</a>
            </li>
          </ul>
        </div>

        <div>
          <h6 className="text-h6Bold xxl:text-h5Bold mb-4 md:mb-6">
            Register with us
          </h6>
          <p className="text-bodyText mb-4 md:mb-6">
            Sign up now and get 20% off your first purchase!
          </p>
          <div className="flex justify-center md:justify-start">
            <Button
              text="Sign up now"
              icon="icons/chevron-right-circle.svg"
              className="bg-white text-black"
            />
          </div>
        </div>

        <div>
          <h6 className="text-h6Bold xxl:text-h5Bold mb-4 md:mb-6">
            Customer services
          </h6>
          <p className="text-bodyText mb-4 md:mb-6">
            MBK Tower 20th Floor, 444, Phaya Thai Rd, Wang Mai, Pathum Wan,
            Bangkok 10330
          </p>
          <p className="text-bodyText mb-4 md:mb-6">
            Email: jane.doe@realmail.com
          </p>

          <form onSubmit={() => console.log("subscribe email: ", email)}>
            <div className="mb-4 md:mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full py-[17px] px-2.5 text-black placeholder:text-bodyText placeholder:text-black-500"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </div>
            <div className="flex justify-center md:justify-start">
              <Button
                type="submit"
                text="Subscribe"
                className="bg-limeGreen-700 text-black"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="wrapper flex flex-col md:flex-row justify-between items-center gap-1">
        <p className="text-caption text-black-500">
          Copyright © 2024 All rights reserved for all contents.
        </p>
        <div className="flex items-center gap-2">
          <p className="text-caption text-black-500">Powered By</p>
          <div>
            <img
              className="h-[18px] w-auto"
              src="images/skooldio1.png"
              alt="description of image"
            />
          </div>
          <div className="h-[18px] border-l border-black-500"></div>
          <div>
            <img
              className="h-[18px] w-auto"
              src="images/web-dev1.png"
              alt="description of image"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
