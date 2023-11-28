/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import logo from "../img/logo.png";
import user_icon from "../img/user.jpg";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import dropdown from "../img/arrowdown.svg";
import yellow from "../img/yellow.jpg";
import {
  FaPen,
  FaFileExport,
  FaUserAstronaut,
  FaQuestionCircle,
  FaSearch,
  FaHome,
} from "react-icons/fa";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [toggle, setToggle] = useState(false);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  const toggleDropdown = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className=" absolute w-full contrast-200 z-10 h-20 md:h-24 flex  justify-between bg-gradient-to-b from-black select-none">
      <img className=" w-30 md:w-56 -mt-5 -ml-[24px] md:-mt-8 mx-auto md:mx-0 -mr-[200px] "src={logo} alt="Movieflix-logo" />
      {/* {user && (
        <div className="flex">
          <img className="w-14 h-14 mt-6" alt="user_icon" src={user_icon} />
          <button className="text-white mb-8 " onClick={handleSignOut}>
            (Sign Out)
          </button>
        </div>
      )}
       */}
      {user && (
        <div className="md:-mt-0">
          <div className="flex ml-36 ">
            {showGptSearch && (
              <select
                className="hidden md:inline-block  p-2 -ml-20 text-sm   mr-3 mt-4 mb-3 rounded-lg  bg-slate-600 text-white"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((language) => (
                  <option key={language.identifier} value={language.identifier}>
                    {language.name}
                  </option>
                ))}
              </select>
            )}
            <button
              onClick={handleGptSearchClick}
              className="bg-purple-800 text-white md: text-normal m-3 md:pb-3 text-sm rounded-lg mt-4 mr-3 flex"
            >
              {showGptSearch?<FaHome className="md:mt-3 mt-1 mb-1 md:mb-0 md:ml-2 ml-1.5" /> : <FaSearch className="md:mt-3 mt-1 mb-1 md:mb-0 md:ml-2 ml-1.5"/>}
              <p className="md:mt-1.5 flex m-auto justify-center md:flex-none md:ml-2 ml-1 md:mr-2 mr-1.5">{showGptSearch? "Homepage" : "GPT Search"}</p>
            </button>
            <img
              onClick={toggleDropdown}
              className="w-6 h-6 md:w-10 md:h-10 mt-4 cursor-pointer rounded-lg"
              alt="user_icon"
              src={user_icon}
            />
            <img
              onClick={toggleDropdown}
              className="w-[12px] md:w-[16px] md:ml-[10px] ml-[5px] mr-[20px] md:mt-[15px] cursor-pointer"
              alt="⬇"
              src={dropdown}
            />
          </div>
          {toggle ? (
            <div className=" mr-2 ml-36 w-44 text-sm md:mt-4 border border-white rounded-lg">
              <div className="text-white bg-black  pl-10 rounded-t-lg font-semibold  ">
                <div className="pt-2 flex text-yellow-400">
                  <img
                    className="w-6  rounded-md -ml-8 mr-2"
                    alt="icon"
                    src={yellow}
                  />
                  {user.displayName}
                </div>
                <div className="pt-2 flex ">
                  <FaPen className="mt-1 w-4 -ml-6 mr-2" />
                  Manage Profile
                </div>
                <div className="pt-2 flex">
                  <FaFileExport className="mt-1 w-4 -ml-6 mr-2" />
                  Transfer Profile
                </div>
                <div className="pt-2 flex">
                  <FaUserAstronaut className="mt-1 w-4 -ml-6 mr-2" />
                  Account
                </div>
                <div className="pt-2 pb-2 flex">
                  <FaQuestionCircle className=" mt-1 w-4 -ml-6 mr-2" />
                  Help Centre
                </div>
              </div>
              <div className="bg-black text-white font-bold pb-1 px-10 border border-t-white rounded-b-lg">
                <button onClick={handleSignOut}>Sign Out</button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
