import Card from 'components/Card';
import Collection from 'pages/Collection';

// function App() {
//   return (
//     <div className="App">
//       <Card 
//         id={1}
//         rarity="rare"
//         name="UglyMan, the Hideous Hero" 
//         playCost={69}
//         imagePath="assets/images/cardImage.jpeg" 
//         abilities={[0, 1, 2]}
//         type="critter"
//         description="Uglyman, once shunned for his grotesque appearance, now defends the weak with unmatched strength, proving beauty isn’t everything." 
//         hp={35}
//         damage={10}
//         cardCount={3}
//       />
//     </div>
//   );
// }

// import React, { useEffect } from "react";
// import { ClientSingleton } from "./ClientSingleton"; // Adjust the path if necessary

// function App() {
//   const client = ClientSingleton.getInstance();

//   useEffect(() => {
//     // Function to log in, called once when the component mounts
//     const loginUser = async () => {
//       try {
//         await client.login("kevin", "1234"); // Replace with real credentials
//         console.log("We're logged in baby");
//       } catch (error) {
//         console.error("Failed to log in:", error);
//       }
//     };

//     loginUser();
//   }, [client]);

//   return (
//     <div className="App">
//       <Collection />
//     </div>
//   );
// }

// export default App;

function App() {
  return (
    <div className="App">
      <Collection/>
    </div>
  );
}

export default App;
