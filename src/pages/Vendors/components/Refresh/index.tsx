/**
 * @Created 2024-10-22
 * @Brief Countdown component.
 */
import "./refresh.css";
import { IVendor } from "combatcritters-ts";
import useCountdownRefresh from "pages/Vendors/hooks/useCountdownRefresh";

interface RefreshProps {
  vendor: IVendor | null;
  onVendorRefresh?: () => void;
  style?: React.CSSProperties;
}

const Refresh: React.FC<RefreshProps> = ({ vendor, onVendorRefresh, style }) => {
  const { countdown } = useCountdownRefresh(vendor, onVendorRefresh);
  return (
    <div className="refreshRoot" style={{...style}}>
      <svg
        className="refreshIcon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M18.3 35.2C26.5 20.4 45.2 15 60 23.1c9.8 5.4 15.8 15.8 15.8 26.8l6.2-6.2c.8-.8 2-.8 2.8 0 .8.8.8 2 0 2.8l-9.6 9.6c-.4.4-.9.6-1.4.6-.5 0-1-.2-1.4-.6l-10-10c-.8-.8-.8-2 0-2.8.8-.8 2-.8 2.8 0l6.5 6.5c-.1-9.5-5.3-18.5-13.8-23.2-6.2-3.4-13.4-4.3-20.3-2.3s-12.5 6.5-16 12.7c-3.4 6.2-4.3 13.4-2.3 20.3 2 6.8 6.5 12.5 12.7 16 6.2 3.4 13.4 4.3 20.3 2.3 6.8-2 12.5-6.5 16-12.7.5-1 1.7-1.3 2.7-.8 1 .5 1.3 1.8.8 2.7-4 7.2-10.5 12.4-18.4 14.7-2.8.8-5.7 1.2-8.6 1.2-5.1 0-10.2-1.3-14.8-3.8-7.2-4-12.4-10.5-14.7-18.4-1.9-7.9-.9-16.2 3-23.3z" />
        <path d="M45.2 29.6c1.1 0 2 .9 2 2V50c0 .5-.2 1-.6 1.4l-8.8 8.8c-.4.4-.9.6-1.4.6s-1-.2-1.4-.6c-.8-.8-.8-2 0-2.8l8.3-8.3V31.6c-.1-1.1.8-2 1.9-2z" />
      </svg>

      <span>{countdown}</span>
    </div>
  );
};

export default Refresh;
