/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../UI/Button";

const Title = ({ title }) => {
  return <h6 className="font-bold mb-4 md:mb-6">{title}</h6>;
};

const Paragraph = ({ text }) => {
  return <p className="mb-4 md:mb-6">{text}</p>;
};

function Footer() {
  const [email, setEmail] = useState("");

  {
    /* List from API */
  }
  const featuredProduct = [
    {
      name: "Men",
      link: "",
    },
    {
      name: "Ladies",
      link: "",
    },
    {
      name: "Shoes",
      link: "",
    },
    {
      name: "Accessories",
      link: "",
    },
  ];

  return (
    <footer className="bg-black text-white py-6">
      <div className="wrapper grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-[38px] 3xl:gap-[45px] mb-4 md:mb-4 text-center md:text-left">
        <div>
          <Title title="Featured product" />
          <ul>
            {featuredProduct.length
              ? featuredProduct.map((feature) => (
                  <li key={feature.name} className="text-subHeading mb-4">
                    <a href={feature.link}>{feature.name}</a>
                  </li>
                ))
              : null}
          </ul>
        </div>

        <div>
          <Title title="Register with us" />
          <Paragraph text="Sign up now and get 20% off your first purchase!" />

          <div className="flex justify-center md:justify-start">
            <Button
              text="Sign up now"
              icon="icons/chevron-right-circle.svg"
              className="bg-white text-black"
            />
          </div>
        </div>

        <div>
          <Title title="Customer services" />
          <Paragraph
            text="MBK Tower 20th Floor, 444, Phaya Thai Rd, Wang Mai, Pathum Wan,
            Bangkok 10330"
          />
          <Paragraph text="Email: jane.doe@realmail.com" />

          <form onSubmit={() => console.log("subscribe email: ", email)}>
            <div className="mb-4 md:mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full py-[17px] px-2.5 text-black placeholder:text-bodyText placeholder:text-black-500"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
