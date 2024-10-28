/**
 * @Created 2024-10-22
 * @Brief Utility function to calculate the difference between futureTime and currentTime.
 * @param futureTime - A string in ISO 8601 format.
 * @returns A formatted countdown string (D:HH:MM:SS).
 */
export const calculateCountdown = (futureTime: string): string => {
  const targetTime = new Date(futureTime).getTime();
  const currentTime = new Date().getTime();
  const timeDifference = targetTime - currentTime;

  if (timeDifference <= 0) {
    return "00:00:00"; 
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  ); 
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)); 
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  let countdownDisplay = "";

  if (days > 0) {
    countdownDisplay += `${days}:`;
  }

  countdownDisplay += `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return countdownDisplay; 
};
