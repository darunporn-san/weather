"use client";

import { useEffect, useState } from "react";

interface ICountry {
  country: string;
  cities: string[];
}

const Search = ({
  search = "",
  setSearch,
  handleSelectWeathers
}: {
  search: string;
  setSearch: (search: string) => void;
  handleSelectWeathers:(name:string | null,countryName:string | null,type:string) => void;
}) => {
  const [countryList, setCountryList] = useState<ICountry[]>([]);
  const [searchList, setSearchList] = useState<ICountry[]>([]);
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then((res) => res.json())
      .then((res) => setCountryList(res.data));
  }, []);
  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
    let findInCountryList = [];
    findInCountryList = countryList
      .map((item: any) => {
        const cityMatches = item.cities.filter((city: any) =>
          city.toLowerCase().includes(e.target.value.toLowerCase())
        );
        const countryMatch = item.country
          .toLowerCase()
          .includes(e.target.value.toLowerCase());

        return {
          country: item.country,
          cities: cityMatches,
          countryMatch: countryMatch,
        };
      })
      .filter((item) => item.countryMatch || item.cities.length > 0);

    setSearchList(findInCountryList as any);
  };

  const handleSelectWeather = (city: string | null,country:string | null, type: string) => {
    handleSelectWeathers(city,country, type);
    setSearchList([])
  };
  return (
    <div>
      <form className="form">
        <label htmlFor="search">
          <input
            className="input"
            type="text"
            placeholder="Search Country"
            id="search"
            value={search}
            onChange={handleSearchChange}
          />
          <div className="fancy-bg"></div>
          <div className="search">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr"
            >
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
          </div>
          <button className="close-btn" type="reset" onClick={()=>setSearch('')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </label>
      </form>
      {search?.length === 0 ? (
        <></>
      ) : searchList?.length > 0 ? (
        <div className="max-h-64 overflow-y-auto bg-red-100  dropdown" >
          {searchList?.map((result: any, index: number) => (
            <div key={index}>
              <h3
                className={`${
                  result.countryMatch &&
                  "cursor-pointer  hover:bg-[#f0f0f0] py-2"
                } pl-5`}
                onClick={()=>handleSelectWeather(null,result.country,'country')}
              >
                {result.country}
              </h3>
              {!result.countryMatch && result.cities.length > 0 && (
                <ul>
                  {result.cities.map((city: any, idx: number) => (
                    <li key={idx} className="pl-9 py-1" onClick={()=>handleSelectWeather(city,result.country,'city')}>
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ) : (
        // <p>No matches found</p>
        <div className="max-h-64 overflow-y-auto bg-red-100  dropdown py-2 pl-5">
          No matches found
        </div>
      )}
    </div>
  );
};
export default Search;
