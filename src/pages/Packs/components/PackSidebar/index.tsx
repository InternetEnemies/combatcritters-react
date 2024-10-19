/**
 * @Created 2024-10-17
 * @Brief Sidebar popup component that appears when a pack is clicked. This component displays
 *        the setlist of a pack and provides the open pack button.
 */

import { IPack } from "combatcritters-ts";
import "./packSidebar.css";
import { ICard } from "combatcritters-ts";
import Button from "components/Button";
import Card from "components/Card";
import { useEffect, useState } from "react";

interface PackSidebarProps {
  pack: IPack | null;
  setPack: (pack: IPack | null) => void;
  openPack: (pack: IPack) => Promise<void>; //Callback so the parent can update the packs on open.
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

const PackSidebar: React.FC<PackSidebarProps> = ({
  pack,
  setPack,
  openPack,
  isVisible,
  setIsVisible,
}) => {
  const [setList, setSetList] = useState<ICard[]>([]); //Set list of a pack.

  /*
    When a new pack is selected, update the set list to reflect that.
  */
  useEffect(() => {
    const fetchSetList = async () => {
      if (pack) {
        try {
          const newSetList = await pack.getSetList();
          setSetList(newSetList);
        } catch (error) {
          console.log(`Error fetching set list from ${pack.name}: ${error}`);
        }
      } else {
        setSetList([]);
      }
    };
    fetchSetList();
  }, [pack]);

  /*
     Close the sidebar and set the selected pack to null when the user clicks off
     the sidebar.
   */
  const handleOverlayClick = () => {
    setIsVisible(false);
    setPack(null);
  };

  return (
    <>
      <div
        className="overlay"
        style={{ display: isVisible ? "block" : "none" }}
        onClick={handleOverlayClick}
      ></div>
      <div
        className={`packSidebarRoot ${isVisible ? "visible" : "notVisible"}`}
      >
        {pack ? (
          <>
            <h2 className="packTitle">{pack.name} Set List</h2>
            <div className="setListGridContainer">
              <hr className="separator" />
              <div className="setListGrid">
                {setList.map((card, index) => {
                  return <Card card={card} key={index} />;
                })}
              </div>
              <hr className="separator" />
            </div>

            <div className="buttonWrapper">
              <Button
                text="Open Pack"
                onClick={async () => await openPack(pack)}
              />
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default PackSidebar;
