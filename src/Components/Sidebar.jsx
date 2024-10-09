// function Sidebar() {
//   // return <h1 className="text-h6Bold">Sidebar jaa test test test test</h1>;
//   return (
//     <div className="w-[321px] h-screen rounded-r-[16px] bg-black text-white">
//       <div className="mt-[20px]">
//         <h1 className="text-2xl font-bold mb-6">Home</h1>
//         <ul className="space-y-4">
//           <li className="hover:bg-gray-800 p-2 rounded">Men</li>
//           <li className="hover:bg-gray-800 p-2 rounded">Women</li>
//           <li className="hover:bg-gray-800 p-2 rounded">Kids</li>
//           <li className="hover:bg-gray-800 p-2 rounded">Shoes</li>
//           <li className="hover:bg-gray-800 p-2 rounded">Accessories</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

function Sidebar() {
  // return <h1 className="text-h6Bold">Sidebar jaa test test test test</h1>;
  return (
    <aside
      id="sidebar"
      className="fixed top-0 left-0 z-40 w-[321px] h-screen rounded-r-[16px] bg-black-700 text-white"
      aria-label="Sidebar"
    >
      <div className="h-full pt-[20px]  bg-gray-50 dark:bg-gray-800">
        <ul className="font-medium flex flex-col space-y-2 px-[32px]">
          <li className="flex items-center h-[48px]">
            <span class="w-full">Home</span>
          </li>
          <li className="flex items-center h-[48px]  justify-between">
            <span>Men</span>
            <a href="#">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M23.3995 20.5655L17.5562 26.4085C17.1965 26.7683 17.196 27.3502 17.5546 27.7089C17.9158 28.0701 18.4955 28.0669 18.8551 27.7073L25.3458 21.2166C25.3462 21.2163 25.3464 21.216 25.3466 21.2158C25.3469 21.2154 25.3472 21.2152 25.3475 21.215C25.5278 21.0346 25.6173 20.7998 25.617 20.5652C25.6161 20.3299 25.5265 20.0953 25.3475 19.9161C25.3472 19.9159 25.3469 19.9156 25.3466 19.9153C25.3464 19.915 25.3462 19.9148 25.3458 19.9145L18.8551 13.4235C18.4954 13.0638 17.9133 13.0632 17.5546 13.4219C17.1935 13.7831 17.1967 14.3629 17.5562 14.7223L23.3995 20.5655Z"
                  fill="#222222"
                />
              </svg>
            </a>
          </li>
          <li className="flex items-center h-[48px]  justify-between">
            <span>Women</span>
            <a href="#">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M23.3995 20.5655L17.5562 26.4085C17.1965 26.7683 17.196 27.3502 17.5546 27.7089C17.9158 28.0701 18.4955 28.0669 18.8551 27.7073L25.3458 21.2166C25.3462 21.2163 25.3464 21.216 25.3466 21.2158C25.3469 21.2154 25.3472 21.2152 25.3475 21.215C25.5278 21.0346 25.6173 20.7998 25.617 20.5652C25.6161 20.3299 25.5265 20.0953 25.3475 19.9161C25.3472 19.9159 25.3469 19.9156 25.3466 19.9153C25.3464 19.915 25.3462 19.9148 25.3458 19.9145L18.8551 13.4235C18.4954 13.0638 17.9133 13.0632 17.5546 13.4219C17.1935 13.7831 17.1967 14.3629 17.5562 14.7223L23.3995 20.5655Z"
                  fill="#222222"
                />
              </svg>
            </a>
          </li>
          <li className="flex items-center h-[48px]  justify-between">
            <span>Kids</span>
            <a href="#">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M23.3995 20.5655L17.5562 26.4085C17.1965 26.7683 17.196 27.3502 17.5546 27.7089C17.9158 28.0701 18.4955 28.0669 18.8551 27.7073L25.3458 21.2166C25.3462 21.2163 25.3464 21.216 25.3466 21.2158C25.3469 21.2154 25.3472 21.2152 25.3475 21.215C25.5278 21.0346 25.6173 20.7998 25.617 20.5652C25.6161 20.3299 25.5265 20.0953 25.3475 19.9161C25.3472 19.9159 25.3469 19.9156 25.3466 19.9153C25.3464 19.915 25.3462 19.9148 25.3458 19.9145L18.8551 13.4235C18.4954 13.0638 17.9133 13.0632 17.5546 13.4219C17.1935 13.7831 17.1967 14.3629 17.5562 14.7223L23.3995 20.5655Z"
                  fill="#222222"
                />
              </svg>
            </a>
          </li>
          <li className="flex items-center h-[48px]  justify-between">
            <span>Shoes</span>
            <a href="#">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M23.3995 20.5655L17.5562 26.4085C17.1965 26.7683 17.196 27.3502 17.5546 27.7089C17.9158 28.0701 18.4955 28.0669 18.8551 27.7073L25.3458 21.2166C25.3462 21.2163 25.3464 21.216 25.3466 21.2158C25.3469 21.2154 25.3472 21.2152 25.3475 21.215C25.5278 21.0346 25.6173 20.7998 25.617 20.5652C25.6161 20.3299 25.5265 20.0953 25.3475 19.9161C25.3472 19.9159 25.3469 19.9156 25.3466 19.9153C25.3464 19.915 25.3462 19.9148 25.3458 19.9145L18.8551 13.4235C18.4954 13.0638 17.9133 13.0632 17.5546 13.4219C17.1935 13.7831 17.1967 14.3629 17.5562 14.7223L23.3995 20.5655Z"
                  fill="#222222"
                />
              </svg>
            </a>
          </li>
          <li className="flex items-center h-[48px]  justify-between">
            <span>Accessories</span>
            <a href="#">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M23.3995 20.5655L17.5562 26.4085C17.1965 26.7683 17.196 27.3502 17.5546 27.7089C17.9158 28.0701 18.4955 28.0669 18.8551 27.7073L25.3458 21.2166C25.3462 21.2163 25.3464 21.216 25.3466 21.2158C25.3469 21.2154 25.3472 21.2152 25.3475 21.215C25.5278 21.0346 25.6173 20.7998 25.617 20.5652C25.6161 20.3299 25.5265 20.0953 25.3475 19.9161C25.3472 19.9159 25.3469 19.9156 25.3466 19.9153C25.3464 19.915 25.3462 19.9148 25.3458 19.9145L18.8551 13.4235C18.4954 13.0638 17.9133 13.0632 17.5546 13.4219C17.1935 13.7831 17.1967 14.3629 17.5562 14.7223L23.3995 20.5655Z"
                  fill="#222222"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
