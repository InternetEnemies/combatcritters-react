/**
 * @Created 2024-10-17
 * @Brief Popup displaying the contents of an opened pack.
 */
import React from "react";
import "./../../styles/sharedWager.css";

interface UserWagerProps {
}

const UserWager: React.FC<UserWagerProps> = ({

}) => {



  return (
    <div className="sharedWagerRoot">
        <span>Your Wagered Items</span>
        <div className="sharedWageredItems"></div>
    </div>
  );
};

export default UserWager;
