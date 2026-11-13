import React, { useState } from "react";
import arrowIcon from "../images/icon-arrow.svg";

export default function SearchBar({
  onSubmit,
}: {
  onSubmit: (input: string) => void;
}) {
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string>("")

  function isValidIp(input: string): boolean {
    const parts = input.split(".");
    if (parts.length !== 4) return false;
    return parts.every((p) => /^\d{1,3}$/.test(p) && Number(p) <= 255);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    if (!isValidIp(e.target.value)) {
      setError('Incorrect input: please set valid IP address')
    } else {
      setError('')
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(search);
    console.log("subbmitted");
    console.log(search);
  }

  return (
    <div>
      <h1 className="text-2xl font-medium text-white">IP Address Tracker</h1>
      <form
        className="mx-auto flex w-full max-w-xl"
        id="ip-search"
        onSubmit={handleSubmit}
      >
        <input
          id="ip-input"
          type="text"
          className="ip-input"
          placeholder="Search for any IP address or domain"
          onChange={handleChange}
          value={search}
        />
        <button
          type="submit"
          className="search-btn volume-btn"
          aria-label="Search"
        >
          <img src={arrowIcon} alt="Submit Form" className="w-3 h-3.5 block" />
        </button>
      </form>
      <p>{error}</p>
    </div>
  );
}
