import React, { useState } from "react";
import TopNavbar from "./TopNavbar";
import GameGrid from "./GameGrid";
import useFetchGames from "../hooks/useFetchGames";
import { Pagination } from "react-bootstrap";

function GamePage() {
  const [category, setCategory] = useState("top-rated");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 9;

  const { games, loading } = useFetchGames(category, searchTerm);

  const totalPages = Math.ceil(games.length / gamesPerPage);
  const currentGames = games.slice((currentPage - 1) * gamesPerPage, currentPage * gamesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <TopNavbar category={category} setCategory={setCategory} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <GameGrid games={currentGames} loading={loading} />

      <Pagination>
        <Pagination.Prev onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)} />
      </Pagination>
    </>
  );
}

export default GamePage;
