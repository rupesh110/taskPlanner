import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Homepage from "../homepage/Homepage";

export default function Dashboard() {
  const [homepages, setHomepages] = useState(() => {
    const localHomepages = JSON.parse(localStorage.getItem('homepages') || '[]');
    return localHomepages;
  });
  const [homepageName, setHomepageName] = useState("To do List");
  const [visibleHomepages, setVisibleHomepages] = useState({});

  useEffect(() => {
    const initialVisibility = homepages.reduce(
      (acc, homepage) => ({ ...acc, [homepage.id]: false }),
      {}
    );
    setVisibleHomepages(initialVisibility);
  }, [homepages]);

  useEffect(() => {
    localStorage.setItem('homepages', JSON.stringify(homepages));
  }, [homepages]);

  const handleHomepageClick = (homepageId) => {
    setVisibleHomepages((prevVisible) => {
      const updatedVisibility = {};
      for (const id in prevVisible) {
        updatedVisibility[id] = id === homepageId;
      }
      return updatedVisibility;
    });
  };

  const handleAddHomepage = () => {
    if (homepageName.trim() !== '') {
      const newHomepage = {
        name: homepageName,
        id: Date.now().toString(), // Create a unique id using Date.now()
      };
      setHomepages((prevHomepages) => [
        ...prevHomepages,
        newHomepage,
      ]);
      setVisibleHomepages((prevVisible) => ({
        ...prevVisible,
        [newHomepage.id]: false, // Set the initial visibility state to false
      }));
      setHomepageName("To do List"); // Reset the name after adding the Homepage
    }
  };

  const handleNameChange = (event) => {
    setHomepageName(event.target.value);
  };

  return (
    <div className="container" >

      <div className="addHomepage">
          <input
            type="text"
            id="homepageNameInput"
            value={homepageName}
            onChange={handleNameChange}

          />
          <button onClick={handleAddHomepage} >Add Homepage</button>
        </div>
      <div >
     

        <div className="dashboardButton">
          {homepages.map((homepage) => (
            <button
              className={`homepageButton ${visibleHomepages[homepage.id] ? "active-button" : ""}`}
              key={homepage.id}
              onClick={() => handleHomepageClick(homepage.id)}
            >
              {homepage.name}
            </button>
          ))}
        </div>
        {homepages.map((homepage, index) => (
          visibleHomepages[homepage.id] && (
            <div key={index} className="boxStyle">
              <button
                className="deleteList"
                onClick={() =>
                  setHomepages(homepages.filter((homepage, i) => i !== index))
                }
              >
                Delete List
              </button>
              <Homepage name={homepage.name} id={homepage.id} /> {/* Use the name property to render the homepage */}
            </div>
          )
        ))}
      </div>
    </div>
  );
}
