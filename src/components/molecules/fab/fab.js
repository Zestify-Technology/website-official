import { FaWhatsapp } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import { MdForum } from "react-icons/md";

const FAB = () => {
  return (
    <>
      <div className="fab fixed right-4 bottom-14  lg:bottom-20 lg:right-9 z-[9999]">
        {/* a focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
        <div
          tabIndex={0}
          role="button"
          className="btn outline-none btn-lg btn-circle bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 backdrop-blur-md  text-white hover:scale-105 transition"
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z" />
          </svg>
        </div>

        {/* close button should not be focusable so it can close the FAB when clicked. It's just a visual placeholder */}
        <div className="fab-close">
          Close <span className="btn btn-circle btn-lg">✕</span>
        </div>

        {/* buttons that show up when FAB is open */}
        <div>
          WhatsApp{" "}
          <button className="btn btn-lg btn-circle bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500">
            <FaWhatsapp size={24} />
          </button>
        </div>
        <div>
          Zestify AI{" "}
          <button className="btn btn-lg btn-circle bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="12" r="3" fill="white" />
            </svg>
          </button>
        </div>
        <div>
          Community{" "}
          <button className="btn btn-lg btn-circle bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500">
            <MdForum size={24} />
          </button>
        </div>
      </div>
    </>
  );
};

export default FAB;
