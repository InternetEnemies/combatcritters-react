import Card from 'components/Card';

function App() {
  return (
    <div className="App">
      <Card 
        rarity="epic"
        name="UglyMan, the Hideous Hero" 
        playCost={69}
        imagePath="assets/images/cardImage.jpeg" 
        abilities={[1, 2, 3]}
        type="critter"
        description="Uglyman, once shunned for his grotesque appearance, now defends the weak with unmatched strength, proving beauty isn’t everything." 
        hp={35}
        damage={10}
      />
    </div>
  );
}

export default App;
