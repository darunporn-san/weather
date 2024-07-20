"use client";
import CardList from "@/components/card-list";
import Search from "@/components/search";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface ICardList {
  name: string| null;
  countryName:string | null;
  type: string;
}
export default function Home() {
  const [chooseList, setChooseList] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  // console.log('search',search)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("position", position);
      // setLat(position.coords.latitude);
      // setLong(position.coords.longitude);
    });

    console.log("Latitude is:", lat);
    console.log("Longitude is:", long);
  }, [lat, long]);

  const handleSelectWeather = (
    name: string | null,
    countryName: string | null,
    type: string
  ) => {
    console.log(`Selected ${type}: ${name}`);
    setChooseList((prevChooseList: any) => [...prevChooseList, { name,countryName, type }]);
    setSearch("");
  };

  console.log("chao", chooseList);

  return (
    <div className="center-screen p-10 flex">
      <div className="w-1/4 border-r-2 relative">
        <Search
          search={search}
          setSearch={setSearch}
          handleSelectWeathers={handleSelectWeather}
        />
        <div className="card-list overflow-y-auto">
          {chooseList?.map((choose: ICardList) => (
            <CardList detail={choose} />
          ))}
        </div>
      </div>
      <div className="w-3/4 px-10"></div>
    </div>
  );
}
