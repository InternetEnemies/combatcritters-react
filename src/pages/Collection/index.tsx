import './collection.css'
import NavBar from 'components/NavBar';
  
const Collection: React.FC = () => {
    return (
        <div className="collectionRoot">
            <NavBar/>
            <div className="cardsDecksContainer"></div>
        </div>
    );
};


export default Collection;
  