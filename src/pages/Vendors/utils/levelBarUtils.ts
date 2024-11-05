import { IVendorReputation } from "combatcritters-ts";

/**
 * @Created 2024-11-05
 * @Brief Utility function to calculate the progress from the current vendor level to the next
 *        vendor level.
 * @param reputation - The  vendor's reputation.
 * @returns A number between 0-100.
 */
export const calcRepProgress = (reputation: IVendorReputation): number => {
  return (
    ((reputation.current_xp - reputation.prev_level_xp) /
      (reputation.next_level_xp - reputation.prev_level_xp)) *
    100
  );
};
