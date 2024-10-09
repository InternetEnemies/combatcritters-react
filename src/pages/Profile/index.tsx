import React from "react";
import NavBar from "components/NavBar";
import "./profile.css";
import FeatureDeck from "components/FeatureDeck";

const Profile: React.FC = () => {

  return (
    <div className="profileRoot">
      <NavBar />
      <div className="profileContainer">
        <FeatureDeck/>
        </div>
    </div>
  );
};

export default Profile;
