import React, { useState } from "react";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import GameGrid from "./GameGrid";
import useFetchGames from "../hooks/useFetchGames";

function GamePage() {
  const [category, setCategory] = useState("top-rated");
  const [searchTerm, setSearchTerm] = useState("");

  const { games, loading } = useFetchGames(category, searchTerm);

  return (
    <>
      <TopNavbar category={category} setCategory={setCategory} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="container-fluid bg-dark text-light" style={{ marginTop: "56px", minHeight: "100vh" }}>
        <div className="row">
          {/* Sidebar */}
          <div className="col-12 col-md-3 mb-3 mb-md-0">
            <Sidebar setCategory={setCategory} />
          </div>
          {/* Main Content */}
          <div className="col-12 col-md-9">
            <GameGrid games={games} loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
}

export default GamePage;