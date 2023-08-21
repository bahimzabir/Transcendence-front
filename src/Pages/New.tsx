import {
    BsFillBellFill,
    BsFillChatLeftTextFill,
    BsFillPersonFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import Apollo from "../assets/Apollo.jpg";

import "./New.css";
import { useEffect, useRef, useState } from "react";

// array of user with just image to work with for testing purposes only

const New = () => {
    const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(
        null
    );
    const [isNavExpanded, setIsNavExpanded] = useState<boolean>(false);

    const handleCardClick = (index: number) => {
        if (index === expandedCardIndex) {
            setExpandedCardIndex(null);
            setIsNavExpanded(false);
        } else {
            if (!isNavExpanded) {
                setIsNavExpanded(true);
            }
            setExpandedCardIndex(index);
            scrollToCard(index);
        }
    };

    const scrollToCard = (index: number) => {
        const outer = document.querySelector(".nav") as HTMLElement;
        const target = document.querySelectorAll(".card")[index] as HTMLElement;

        const containerWidth = outer.offsetWidth;
        const targetWidth = 300;
        const targetIndex = index;
        const leftScreenOffset = (containerWidth - targetWidth) / 2;
        const leftSiblingOffset = (target.offsetWidth + 10) * targetIndex;
        const scrollValue = leftSiblingOffset - leftScreenOffset;

        outer.scrollTo({
            left: Math.max(0, scrollValue),
            behavior: "smooth",
        });
    };

    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const [hoveredButton, setHoveredButton] = useState(null);
    const [activeButton, setActiveButton] = useState(null);
    const mouseEnter = (buttonId: any) => {
        setHoveredButton(buttonId);
    };
    const mouseLeave = () => {
        setHoveredButton(null);
    };
    const handleButtonClick = (buttonId: any) => {
        setActiveButton(buttonId === activeButton ? null : buttonId);
    };

    // const contentRef = useRef<HTMLDivElement | null>(null);

    // useEffect(() => {
    //     const handleDocumentClick = (event: MouseEvent) => {
    //         if (
    //             contentRef.current &&
    //             !contentRef.current.contains(event.target as Node)
    //         )
    //             setActiveButton(null);
    //     };

    //     document.addEventListener("click", handleDocumentClick);

    //     return () => {
    //         document.removeEventListener("click", handleDocumentClick);
    //     };
    // }, []);

    return (
        <div className="mb-10">
            <div className="first-container h-[4vw] container-1 mt-10 mx-10 px-10 flex justify-between items-center">
                <h2 className="font-black lowercase font-satoshi text-[.8vw] tracking-wider">
                    spinfrenzy
                </h2>
                <div className="flex gap-14">
                    <button
                        onMouseEnter={() => mouseEnter(0)}
                        onMouseLeave={mouseLeave}
                        onClick={() => handleButtonClick(0)}
                    >
                        <BsFillChatLeftTextFill className="hover:scale-110 text-[.8vw]" />
                        {hoveredButton == 0 && (
                            <div className="absolute transform translate-y-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-3 py-2 bg-black font-bold font-satoshi text-[.6vw]">
                                messages
                            </div>
                        )}
                        {activeButton == 0 && (
                            <div className="absolute transform translate-y-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-3 py-2 bg-black font-bold font-satoshi text-[.6vw]">
                                Additional content for Notifications
                            </div>
                        )}
                    </button>
                    <button
                        onMouseEnter={() => mouseEnter(1)}
                        onMouseLeave={mouseLeave}
                        onClick={() => handleButtonClick(1)}
                    >
                        <BsFillBellFill className="hover:scale-110 text-[.8vw]" />
                        {hoveredButton == 1 && (
                            <div className="absolute transform translate-y-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-3 py-2 bg-black font-bold font-satoshi text-[.6vw]">
                                notifications
                            </div>
                        )}
                        {activeButton == 1 && (
                            <div className="absolute transform translate-y-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-3 py-2 bg-black font-bold font-satoshi text-[.6vw]">
                                Additional content for Notifications
                            </div>
                        )}
                    </button>
                    <button
                        onMouseEnter={() => mouseEnter(2)}
                        onMouseLeave={mouseLeave}
                        onClick={() => handleButtonClick(2)}
                    >
                        <BsFillPersonFill className="hover:scale-110 text-[.8vw]" />
                        {hoveredButton == 2 && (
                            <div className="absolute transform translate-y-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-3 py-2 bg-black font-bold font-satoshi text-[.6vw]">
                                profile
                            </div>
                        )}
                        {activeButton == 2 && (
                            <div className="absolute transform translate-y-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-3 py-2 bg-black font-bold font-satoshi text-[.6vw]">
                                Additional content for Notifications
                            </div>
                        )}
                    </button>
                </div>
            </div>
            <div className="flex">
                <div className="friends-container container-1 mt-5 py-5 ml-10 flex flex-col w-[5vw] max-h-[98vh] justify-start items-center gap-5 overflow-y-scroll no-scrollbar overflow-hidden">
                    <button
                        className="friend-btn absolute hover:scale-105"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img
                            className="w-[2.5vw] h-[2.5vw] rounded-full"
                            src={Apollo}
                            alt="friend-pic"
                        />
                        <span className="rounded-full bg-green-400 w-[0.5vw] h-[0.5vw] absolute top-0 right-0"></span>
                        {isHovered && (
                            <div className="absolute top-1/2 left-[3vw] -translate-y-1/2 whitespace-nowrap rounded-lg px-3 py-2 bg-black font-bold font-satoshi text-[.6vw]">
                                yagnaou
                            </div>
                        )}
                    </button>
                </div>
                <div className="w-full">
                    <div className="flex gap-5 h-[50vh]">
                        <div className="second-container container-1 mt-5 ml-5 py-10 px-10 w-1/2 pb-20">
                            <h2 className="font-bold font-satoshi uppercase text-[.8vw]">
                                Play a Game
                            </h2>
                            <div className="handler flex justify-center items-center w-full h-full mt-10">
                                <nav
                                    className={`no-scrollbar nav${
                                        isNavExpanded ? " nav--expanded" : ""
                                    } gap-3`}
                                >
                                    <Link to="/game">
                                        <div
                                            className={`card${
                                                expandedCardIndex === 0
                                                    ? " card--expanded"
                                                    : ""
                                            } flex justify-center items-center`}
                                            onMouseEnter={() =>
                                                handleCardClick(0)
                                            }
                                        >
                                            <p className="font-bold font-satoshi lowercase text-[.8vw]">
                                                EASY
                                            </p>
                                        </div>
                                    </Link>
                                    <Link to="/game">
                                        <div
                                            className={`card${
                                                expandedCardIndex === 1
                                                    ? " card--expanded"
                                                    : ""
                                            } flex justify-center items-center`}
                                            onMouseEnter={() =>
                                                handleCardClick(1)
                                            }
                                        >
                                            <p className="font-bold font-satoshi lowercase text-[.8vw]">
                                                Medium
                                            </p>
                                        </div>
                                    </Link>
                                    <Link to="/game">
                                        <div
                                            className={`card${
                                                expandedCardIndex === 2
                                                    ? " card--expanded"
                                                    : ""
                                            } flex justify-center items-center`}
                                            onMouseEnter={() =>
                                                handleCardClick(2)
                                            }
                                        >
                                            <p className="font-bold font-satoshi lowercase text-[.8vw]">
                                                Hard
                                            </p>
                                        </div>
                                    </Link>
                                </nav>
                            </div>
                        </div>
                        <div className="third-container container-1 mt-5 mr-10 p-10 w-1/2 overflow-y-scroll no-scrollbar">
                            <h2 className="font-bold font-satoshi uppercase text-[.8vw]">
                                live games
                            </h2>
                            <div className="game-div mt-10 flex justify-between container-1 py-2 px-8 items-center">
                                <div className="profile flex items-center gap-5">
                                    <img
                                        className="ppic rounded-full w-[2vw] h-[2vw]"
                                        src={Apollo}
                                        alt="profile-pic"
                                    />
                                    <h2 className="username font-medium font-satoshi text-[.8vw]">
                                        username
                                    </h2>
                                </div>
                                <h1 className="vs font-black font-satoshi text-4xl">
                                    VS
                                </h1>
                                <div className="profile flex items-center gap-5">
                                    <h2 className="username font-medium font-satoshi text-[.8vw]">
                                        username
                                    </h2>
                                    <img
                                        className="ppic rounded-full w-[2vw] h-[2vw]"
                                        src={Apollo}
                                        alt="profile-pic"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 h-[50vh]">
                        <div className="forth-container container-1 mt-5 ml-5 p-10 w-1/2 overflow-y-scroll no-scrollbar">
                            <h2 className="font-bold font-satoshi uppercase text-[.8vw]">
                                popular public channels
                            </h2>
                            <div className="channel-div mt-10 flex justify-between container-1 py-2 px-8 items-center">
                                <div className="flex items-center gap-5">
                                    <img
                                        className="rounded-full w-[2vw] h-[2vw]"
                                        src={Apollo}
                                        alt="channel-pic"
                                    />
                                    <div className="flex flex-col items-start">
                                        <h2 className="font-medium font-satoshi lowercase text-[.8vw]">
                                            name of the channel
                                        </h2>
                                        <h3 className="font-normal font-satoshi lowercase text-[.7vw]">
                                            42 members
                                        </h3>
                                    </div>
                                </div>
                                <button className="container-1 px-8 py-2 uppercase font-bold hover:scale-105 hover:cursor-pointer">
                                    join
                                </button>
                            </div>
                        </div>
                        <div className="forth-container container-1 mt-5 mr-10 p-10 w-1/2 overflow-y-scroll no-scrollbar">
                            <h2 className="font-bold font-satoshi uppercase text-[.8vw]">
                                leaderboard
                            </h2>
                            <div className="person-div mt-10 flex justify-between container-1 py-2 px-8 items-center">
                                <div className="flex items-center gap-5">
                                    <h1 className="font-black font-satoshi mr-3">
                                        1
                                    </h1>
                                    <img
                                        className="rounded-full w-[2vw] h-[2vw]"
                                        src={Apollo}
                                        alt="channel-pic"
                                    />
                                    <div className="flex flex-col">
                                        <h2 className="font-medium font-satoshi lowercase text-[.8vw]">
                                            username
                                        </h2>
                                        <div className="flex gap-10">
                                            <h3 className="font-normal font-satoshi lowercase text-[.7vw]">
                                                games won: 24
                                            </h3>
                                            <h1 className="font-black font-satoshi">
                                                /
                                            </h1>
                                            <h3 className="font-normal font-satoshi lowercase text-[.7vw]">
                                                games losses: 12
                                            </h3>
                                            <h1 className="font-black font-satoshi">
                                                /
                                            </h1>
                                            <h3 className="font-normal font-satoshi lowercase text-[.7vw]">
                                                draws: 6
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default New;
