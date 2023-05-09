import React, { useRef, useState } from "react";
import styles from "../styles/Header.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selected, setSelected] = useState(0);
  const router = useRouter();
  const navRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) return;

    const search = searchTerm;
    setSearchTerm("");
    setSearchResults([]);
    setSelected(0);
    router.push(`/search/${search}`);
  };

  const handleChange = async (value) => {
    setSearchTerm(value);
    setSelected(0);
    if (!value) {
      setSearchResults([]);
      return;
    }

    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=${value}`
    );
    const json = await res.json();
    setSearchResults([value, ...json.results.slice(0, 6)]);
  };

  const handleKeyDown = (key) => {
    if (!searchResults.length > 0) return;
    if (key !== "ArrowDown" && key !== "ArrowUp") return;

    let index = 0;
    if (key === "ArrowDown") {
      if (searchResults[selected + 1]) {
        setSelected((prev) => prev + 1);
        index = selected + 1;
      } else {
        setSelected(0);
        index = 0;
      }
    }

    if (key === "ArrowUp") {
      if (searchResults[selected - 1]) {
        setSelected((prev) => prev - 1);
        index = selected - 1;
      } else {
        setSelected(searchResults.length - 1);
        index = searchResults.length - 1;
      }
    }

    const itemName = searchResults[index]?.title;
    if (itemName) {
      setSearchTerm(itemName);
    } else {
      setSearchTerm(searchResults[0]);
    }
  };

  const showMenu = () => {
    const navMenu = navRef.current;
    navMenu.classList.toggle("show");
  };

  const removeMenu = (e)=> {
    if (e.target.classList.contains("nav__items")) return

    navRef.current.classList.remove("show")
  }
  
  return (
    <div className={styles.navContainer}>
      <header className={styles.nav}>
        <FiMenu className="nav__menu" onClick={() => showMenu()} />
        <div className="nav-container" ref={navRef} onClick={removeMenu}>
          <div className={`nav__items`} >
          <Link
              className="nav__item"
              id="popular"
              href={`/`}
              onClick={removeMenu}
            >
              Home
            </Link>
            <Link
              className="nav__item"
              id="popular"
              href={`/categories/popular`}
              onClick={removeMenu}
            >
              Popular
            </Link>
            <Link
              className="nav__item"
              id="upcoming"
              href="/categories/upcoming"
              onClick={removeMenu}
            >
              Upcoming
            </Link>
            <Link
              className="nav__item"
              id="top_rated"
              href="/categories/top_rated"
              onClick={removeMenu}
            >
              top Rated
            </Link>
          </div>
        </div>


        <form onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="search"
              className={`${styles.searchBox}`}
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e.key)}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 170)}
            />

            {searchResults.length > 0 && showResults && (
              <ul className="search-results-container">
                {searchResults.map((movie, i) => {
                  const movieId = movie.id ? movie.id : i;
                  const itemTitle = movie.title ? movie.title : movie;
                  const className =
                    i === selected
                      ? "search-item item-selected"
                      : "search-item";

                  return (
                    <li
                      key={movieId}
                      className={className}
                      onClick={() => {
                        setSearchResults([]);
                        setSearchTerm("");
                        setSelected(0);
                        router.push(`/search/${itemTitle}`);
                      }}
                    >
                      {itemTitle}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </form>
      </header>
    </div>
  );
};

export default Header;
