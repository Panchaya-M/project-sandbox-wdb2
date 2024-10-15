import { Layouts } from "./Components";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <Layouts>
      <HomePage />
    </Layouts>
  );
}

export default App;

// function HomePage() {
//   return (
//     <div>
//       <h1>HomePage</h1>
//     </div>
//   );
// }

// function ProductPage() {
//   return (
//     <div>
//       <h1>ProductPage</h1>
//     </div>
//   );
// }

// export default () => {
//   // return <ProductPage />;

//   return <HomePage />;
// };

// export default () => {
//   const [pageId, setPageId] = useState(1);

//   function navigate(pageId) {
//     setPageId(pageId);
//   }

//   function renderPage() {
//     switch (pageId) {
//       case 1:
//         return <Page1 />;
//       case 2:
//         return <Page2 />;
//       default:
//         return <div>Not found</div>;
//     }
//   }

//   return (
//     <div className="p-8 m-8 border-2 border-red-900">
//       <div className="mb-4">
//         <button className="px-4 bg-cyan-500 mx-2" onClick={() => navigate(1)}>
//           Page 1
//         </button>
//         <button className="px-4 bg-cyan-500 mx-2" onClick={() => navigate(2)}>
//           Page 2
//         </button>
//         <button className="px-4 bg-cyan-500 mx-2" onClick={() => navigate(3)}>
//           Page 3
//         </button>

//         <div>Current page ID: {pageId}</div>
//       </div>

//       {renderPage()}
//     </div>
//   );
// };
