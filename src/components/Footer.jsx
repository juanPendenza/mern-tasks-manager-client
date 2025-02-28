import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="sticky bottom-0 flex justify-center p-4 items-center h-16 bg-transparent backdrop-blur-sm overflow-hidden">
      <div className="flex flex-col justify-center items-center">
        <Link
          to={"https://github.com/juanPendenza"}
          target="_blank"
          className="text-[#7f7f7f]"
        >
          Juan Pablo Pendenza
        </Link>
        <p className="text-[#7f7f7f]">@2025</p>
      </div>
    </div>
  );
}

export default Footer;
