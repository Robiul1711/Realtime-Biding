import React, { useState } from "react";
import Title from "../common/Title";
import { Minus, Plus } from "lucide-react";
import FilterSection from "./FilterSection";

const FilterCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedOptions1, setCheckedOptions1] = useState({});
  const [checkedOptions2, setCheckedOptions2] = useState({});
  const [checkedOptions3, setCheckedOptions3] = useState({});
  const [checkedOptions4, setCheckedOptions4] = useState({});
  const [checkedOptions5, setCheckedOptions5] = useState({});
  const [checkedOptions6, setCheckedOptions6] = useState({});
  const [checkedOptions7, setCheckedOptions7] = useState({});
  const [checkedOptions8, setCheckedOptions8] = useState({});
  const [checkedOptions9, setCheckedOptions9] = useState({});
  const [checkedOptions10, setCheckedOptions10] = useState({});
  const [checkedOptions11, setCheckedOptions11] = useState({});

  const [selectedText, setSelectedText] = useState("");

  const subtexts = [
    "CCG Individual Cards",
    "CCG Sealed Packs",
    "CCG Supplies & Accessories",
    "CCG Mix Card Lots",
  ];

  const handleSelect = (text) => {
    setSelectedText(text);
  };

  const handleOption1Change = (value) => {
    setCheckedOptions1((prev) => ({ ...prev, [value]: !prev[value] }));
  };

  const handleOption2Change = (value) => {
    setCheckedOptions2((prev) => ({ ...prev, [value]: !prev[value] }));
  };
  const handleOption3Change = (value) => {
    setCheckedOptions3((prev) => ({ ...prev, [value]: !prev[value] }));
  };
  const handleOption4Change = (value) => {
    setCheckedOptions4((prev) => ({ ...prev, [value]: !prev[value] }));
  };
  const handleOption5Change = (value) => {
    setCheckedOptions5((prev) => ({ ...prev, [value]: !prev[value] }));
  };
  const handleOption6Change = (value) => {
    setCheckedOptions6((prev) => ({ ...prev, [value]: !prev[value] }));
  };
  const handleOption7Change = (value) => {
    setCheckedOptions7((prev) => ({ ...prev, [value]: !prev[value] }));
  };
  const handleOption8Change = (value) => {
    setCheckedOptions8((prev) => ({ ...prev, [value]: !prev[value] }));
  };
  const handleOption9Change = (value) => {
    setCheckedOptions9((prev) => ({ ...prev, [value]: !prev[value] }));
  };
  const handleOption10Change = (value) => {
    setCheckedOptions10((prev) => ({ ...prev, [value]: !prev[value] }));
  };
  const handleOption11Change = (value) => {
    setCheckedOptions11((prev) => ({ ...prev, [value]: !prev[value] }));
  };

  const filterOptions1 = [
    { label: "No", value: "no" },
    { label: "Yes", value: "yes" },
    { label: "Not Specified", value: "tot specified" },
  ];

  const filterOptions2 = [
    { label: "Base Set", value: "Base Set" },
    { label: "Sword & Shield", value: "Sword & Shield" },
    { label: "Scarlet & Violet", value: "Scarlet & Violet" },
    { label: "Team Rocket", value: "1to3" },
    { label: "Promo Cards", value: "1to3" },
    { label: "Crown Zenith", value: "1to3" },
    { label: "Fossil", value: "1to3" },
    { label: "Abyss Rising", value: "1to3" },
  ];

  const filterOptions3 = [
    { label: "Black Star Promot", value: "Base Set" },
    { label: "Common", value: "Sword & Shield" },
    { label: "Holo Rare", value: "Scarlet & Violet" },
    { label: "Secret Rare", value: "1to3" },
    { label: "Ultra Rare", value: "1to3" },
    { label: "Rare", value: "1to3" },
  ];
  const filterOptions4 = [
    { label: "Bandai", value: "Base Set" },
    { label: "McDonald’s", value: "Sword & Shield" },
    { label: "Nintendo", value: "Scarlet & Violet" },
    { label: "The Pokemon Company", value: "1to3" },
    { label: "Topps", value: "1to3" },
    { label: "Wizards of the Coast", value: "1to3" },
    { label: "Unbranded", value: "1to3" },
  ];

  const filterOptions5 = [
    { label: "Black Star Promot", value: "Base Set" },
    { label: "Common", value: "Sword & Shield" },
    { label: "Holo Rare", value: "Scarlet & Violet" },
    { label: "Secret Rare", value: "1to3" },
    { label: "Ultra Rare", value: "1to3" },
    { label: "Rare", value: "1to3" },
  ];
  const filterOptions6 = [
    { label: "Reversal", value: "Base Set" },
    { label: "Pikachu", value: "Sword & Shield" },
    { label: "Charizard", value: "Scarlet & Violet" },
    { label: "Blastoise", value: "1to3" },
    { label: "Eevee", value: "1to3" },
  ];
  const filterOptions7 = [
    { label: "Near Mint or better", value: "Base Set" },
    { label: "Lightly Played", value: "Sword & Shield" },
    { label: "Moderately Played", value: "Scarlet & Violet" },
    { label: "Heavily Played", value: "1to3" },
    { label: "Not Specified", value: "1to3" },
  ];
  const filterOptions8 = [
    { label: "Basic", value: "Base Set" },
    { label: "Champion", value: "Sword & Shield" },
    { label: "In Training", value: "Scarlet & Violet" },
    { label: "Mega", value: "1to3" },
    { label: "Rookie", value: "1to3" },
    { label: "Stage 1", value: "1to3" },
  ];
  const filterOptions9 = [
    { label: "Free Returns", value: "Base Set" },
    { label: "Returns Accepted", value: "Sword & Shield" },
    { label: "Authorized Seller", value: "Scarlet & Violet" },
    { label: "Completed Items", value: "1to3" },
  ];
  const filterOptions10 = [
    { label: "Under $4,000", value: "Base Set" },
    { label: "$4,000 to 20,000", value: "Sword & Shield" },
    { label: "Over $20,000", value: "Scarlet & Violet" },
  ];
  const filterOptions11 = [
    { label: "Near Mint or better", value: "Base Set" },
    { label: "Lightly Played", value: "Sword & Shield" },
    { label: "Moderately Played", value: "Scarlet & Violet" },
    { label: "Heavily Played", value: "1to3" },
    { label: "Not Specified", value: "1to3" },
  ];

  return (
    <div className="space-y-4">
      <div className="border border-[#D0D0D0] p-5 rounded-lg">
        {/* Header Toggle */}
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h2 className="text-xl font-semibold text-[#1E1E1E]">Category</h2>
          {isOpen ? (
            <Minus size={22} className="transition duration-400" />
          ) : (
            <Plus size={22} className="transition duration-400" />
          )}
        </div>

        {/* Dropdown Content */}
        <div
          className={`overflow-hidden space-y-4 transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          {/* All */}
          <h3
            onClick={() => handleSelect("All")}
            className={`font-semibold text-[17px] cursor-pointer transition ${
              selectedText === "All" ? "text-[#1E40AF]" : "text-[#424242]"
            }`}
          >
            All
          </h3>

          {/* Category Group */}
          <div>
            <h3
              onClick={() => handleSelect("Collectible Card Games")}
              className={`font-semibold text-[17px] cursor-pointer transition ${
                selectedText === "Collectible Card Games"
                  ? "text-[#1E40AF]"
                  : "text-[#424242]"
              }`}
            >
              Collectible Card Games
            </h3>

            <div className="space-y-2 ml-4 font-medium my-2">
              {subtexts.map((text, index) => (
                <p
                  key={index}
                  onClick={() => handleSelect(text)}
                  className={`cursor-pointer transition-colors duration-200 ${
                    selectedText === text
                      ? "text-[#1E40AF] font-semibold"
                      : "text-[#424242]"
                  }`}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>

          {/* Other Main Categories */}
          <h3
            onClick={() => handleSelect("Collectibles")}
            className={`font-semibold text-[17px] cursor-pointer transition ${
              selectedText === "Collectibles"
                ? "text-[#1E40AF]"
                : "text-[#424242]"
            }`}
          >
            Collectibles
          </h3>

          <h3
            onClick={() => handleSelect("Sport Mem, Cards & Consoles")}
            className={`font-semibold text-[17px] cursor-pointer transition ${
              selectedText === "Sport Mem, Cards & Consoles"
                ? "text-[#1E40AF]"
                : "text-[#424242]"
            }`}
          >
            Sport Mem, Cards & Consoles
          </h3>
        </div>
      </div>
      <FilterSection
        title="Graded"
        options={filterOptions1}
        checkedOptions={checkedOptions1}
        onChange={handleOption1Change}
      />
      <FilterSection
        title="Set"
        options={filterOptions2}
        checkedOptions={checkedOptions2}
        onChange={handleOption2Change}
      />
      <FilterSection
        title="Rarity"
        options={filterOptions3}
        checkedOptions={checkedOptions3}
        onChange={handleOption3Change}
      />
      <FilterSection
        title="Manufacturer"
        options={filterOptions4}
        checkedOptions={checkedOptions4}
        onChange={handleOption4Change}
      />
      <FilterSection
        title="Card Type"
        options={filterOptions5}
        checkedOptions={checkedOptions5}
        onChange={handleOption5Change}
      />
      <FilterSection
        title="Card Name"
        options={filterOptions6}
        checkedOptions={checkedOptions6}
        onChange={handleOption6Change}
      />
      <FilterSection
        title="Card Condition"
        options={filterOptions7}
        checkedOptions={checkedOptions7}
        onChange={handleOption7Change}
      />
      <FilterSection
        title="Stage"
        options={filterOptions8}
        checkedOptions={checkedOptions8}
        onChange={handleOption8Change}
      />
      <FilterSection
        title="Show results for"
        options={filterOptions9}
        checkedOptions={checkedOptions9}
        onChange={handleOption9Change}
      />
      <FilterSection
        title="Price"
        options={filterOptions10}
        checkedOptions={checkedOptions10}
        onChange={handleOption10Change}
      />
      <FilterSection
        title="Condition"
        options={filterOptions11}
        checkedOptions={checkedOptions11}
        onChange={handleOption11Change}
      />
      <div>
        <button className="w-full text-center bg-[#00A1FF] hover:bg-[#00a2fff4] text-white py-3 rounded-xl cursor-pointer">
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterCard;
