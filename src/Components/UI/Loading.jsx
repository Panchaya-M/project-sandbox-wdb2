export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex space-x-2">
        <div className="dot-loading"></div>
        <div className="dot-loading delay-100" style={{ animationDelay: "0.1s" }}></div>
        <div className="dot-loading delay-200" style={{ animationDelay: "0.2s" }}></div>
      </div>
    </div>
  );
};
