import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  const changeLanguage = (lng: string) => {
    if (i18n.changeLanguage) {
      setLoading(true);
      i18n.changeLanguage(lng).then(() => {
        setLoading(false);
      });
    }
  };

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center text-white">
      <h1 className="text-lg font-bold">Building App</h1>
      <div>
        <button
          onClick={() => changeLanguage("ar")}
          className="mr-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "جاري التحميل..." : "العربية"}
        </button>
        <button
          onClick={() => changeLanguage("en")}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "Loading..." : "English"}
        </button>
      </div>
    </header>
  );
};

export default Header;
