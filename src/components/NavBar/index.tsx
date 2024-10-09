import "./navBar.css";
import ProfileButton from "components/ProfileButton"; 

const NavBar: React.FC = () => {

  return (
    <div className="navBarRoot">
      <ProfileButton
        hasNotifications={true}
        notificationCount={1}
      />
    </div>
  );
};

export default NavBar;
