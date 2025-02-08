import "./notis.css";
import { createPortal } from "react-dom";

// Svgs
import IconNotification from "../../../assets/svgs/notis/IconNotification";
import { useGlobalState } from "../../utils/GlobalState";
import { useEffect } from "react";
import { ITypeNotification } from "../../interfaces/ITypeNotification";

import { useState } from "react";

export default function NotificationPop() {
  const { notis, setNotis } = useGlobalState();
  const [displayedNotis, setDisplayedNotis] = useState<ITypeNotification[]>([]);

  useEffect(() => {
    setDisplayedNotis(notis);

    if (notis.length === 0) return;
    let index = notis.length - 1;
    const timer = setTimeout(() => {
      index--;
      setDisplayedNotis((prevNotis) => prevNotis.slice(0, index));
      setNotis([...notis.slice(1)]);
    }, 3000);

    return () => clearTimeout(timer);
  }, [notis, setNotis]);

  return createPortal(
    <section className="notification-pop">
      {displayedNotis.map((noti, index) => (
        <div className={`notification-pop-content`} key={index}>
          <div className="notification-pop-icon">
            <div className="notification-pop-icon-content">
              <IconNotification />
              <p>System Notifications</p>

              <div className="notification-pop-icon-type">
                <span className={`${noti.type == 'success' ? 'n-s-type-success' : noti.type == 'error' ? 'n-s-type-error' : 'n-s-type-warning'}`}>{noti.type == 'success' ? 'OK' : noti.type == 'error' ? 'Error' : 'Warning'}</span>
              </div>

            </div>

            <div className="noti-content-loading">
                {noti.options.isLoading && <div className="notification-pop-loading"></div>}
            </div>
          </div>

          <div className="notification-pop-text">
            <p>{noti.message}</p>
          </div>
        </div>
      ))}
    </section>,
    document.getElementById("notification-pop")!
  );
}
