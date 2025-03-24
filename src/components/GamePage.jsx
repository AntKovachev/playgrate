import React, { useState } from "react";
import TopNavbar from "./TopNavbar";
import GameGrid from "./GameGrid";
import useFetchGames from "../hooks/useFetchGames";

function GamePage() {
  const [category, setCategory] = useState("top-rated");
  const [searchTerm, setSearchTerm] = useState("");

  const { games, loading } = useFetchGames(category, searchTerm);

  return (
    <>
      <TopNavbar category={category} setCategory={setCategory} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <GameGrid games={games} loading={loading} />
    </>
  );
}

export default GamePage;
