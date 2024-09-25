import './header.css'

interface Props {
    name: string;
    playCost: number;
    backgroundColor: string;
    borderColor: string;
  }
  
  const Header: React.FC<Props> = ({ name, playCost, backgroundColor, borderColor }) => {
    return (
        <div className="headerRoot" 
        style={{
          '--background-color': (backgroundColor+'55'),
          '--border-color': borderColor 
        } as React.CSSProperties}>

          <span>Hello world</span>
        </div>
      );
    };
  
  export default Header;
  