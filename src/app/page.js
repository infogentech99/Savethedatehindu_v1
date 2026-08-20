import Image from "next/image";
import ScratchCard from "./components/ScratchCard";
import MarriageCountdown from "./components/MarriageCountdown";
import Carousel from "./components/Carousel";
export default function Home() {
  return (
    <>
      <div
        className="bg-[url('/assets/save_bg.webp')]
    bg-cover bg-no-repeat bg-top md:bg-center w-full overflow-hidden relative"
      >
        <div className="md:pb-50 lg:pb-30 relative z-10 pb-24 ">
          <div className="flex justify-between ">
            <img
              src="/assets/element1.png"
              alt="element1"
              className="md:h-100 h-50"
            />
            <div className="md:block hidden">
              <img
                src="/assets/element3.png"
                alt="element3"
                className="mt-80 "
              />
              <h2 className="text-[#C2AB00] md:text-xl text-[14x] text-center font-jacques-francois mt-10">
                CLICK TO OPEN
              </h2>
            </div>
            <img
              src="/assets/element2.png"
              alt="element2"
              className="md:h-100 h-50"
            />
          </div>
          <div className="md:hidden flex flex-col justify-center items-center">
            <img
              src="/assets/element3.png"
              alt="element3"
              className="mt-10 h-50"
            />

            <h2 className="text-[#C2AB00] text-[14px] text-center font-jacques-francois mt-10">
              CLICK TO OPEN
            </h2>
          </div>
          <div className="flex justify-center md:mt-50 mt-30">
            <h2 className="text-[#A25000] md:text-2xl text-6xl  lg:text-8xl text-end font-katibeh leading-12 md:leading-16">
              Save <br /> <span className="md:text-6xl text-4xl">the</span> <br /> Date
            </h2>
          </div>
          <div>
            <h2 className="text-[#A25000] md:text-2xl text-[17px] text-center font-jacques-francois mt-18">
              To Celebrate The Wedding Of
            </h2>
          </div>

          <div className=" flex justify-center items-center text-center md:gap-30 gap-6">
            <h2 className="text-[#A25000] md:text-2xl text-[17px] text-center font-jacques-francois mt-18 uppercase">
              SUShmita singh
            </h2>
            <h2 className="text-[#A25000] md:text-2xl text-[17px] text-center font-jacques-francois mt-18 uppercase">
              and
            </h2>
            <h2 className="text-[#A25000] md:text-2xl text-[17px] text-center font-jacques-francois mt-18 uppercase">
              RAJ Malhotra
            </h2>
          </div>
          <div className="flex justify-center items-center">
            <hr className="w-30 mt-18 border-1 border-[#A25000]" />
          </div>

          <div className="flex justify-between  md:mt-20 mt-40">
            <img src="/assets/element4.png" alt="element1" className="md:h-100 h-40" />
            <div className="md:ml-50 w-full mb-50">
              <ScratchCard/>
              <h2 className="text-[#A25000] md:text-2xl text-[17px] text-center font-jacques-francois  mt-8">
                Scratch To Discover The Date
              </h2>
            </div>
            <img src="/assets/element5.png" alt="element2" className="md:h-100 h-30" />
          </div>

          <div className="flex justify-center  md:mt-20 md:px-40 px-5 mt-0">
            <img src="/assets/venue.png" alt="venue" className="" />
          </div>

          <div className=" w-full mt-30">
            <h2 className="text-[#A25000] md:text-2xl text-[17px] text-center font-jacques-francois  mt-8">
              The Celebration At
            </h2>
            <h2 className="text-[#A25000] md:text-4xl text-[17px] text-center font-jacques-francois  mt-8 uppercase">
              Neemrana Fort-Palace
            </h2>
            <br />
            <br />
            {/* <hr className="w-30 mt-18 border-1 border-[#A25000]" /> */}
            <h2 className="text-[#A25000] md:text-2xl text-[17px] text-center font-jacques-francois  mt-8">
              Save The Date
            </h2>

            <div className="w-75 mx-auto">
              <h2 className="text-[#A25000] md:text-4xl text-[20px] text-center font-jacques-francois mt-8 uppercase border-2 flex justify-center items-center py-5 rounded-[6px]">
                26 June, 2026
              </h2>
            </div>

            <div className="flex justify-center  mt-10 md:px-40">
              <a
                href="#"
                className="text-[#A25000] underline md:text-sm text-[14px]  text-center font-cormorant"
                target="_blank"
              >
                See the route
              </a>
            </div>

            <div className="flex justify-center  mt-10 px-40">
              <img src="/assets/arrow.png" alt="venue" className="" />
            </div>
          </div>
        </div>
      </div>
      <MarriageCountdown />
      <Carousel />
    </>
  );
}
