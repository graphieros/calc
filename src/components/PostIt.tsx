import "../styles/postit.css";
import { HistoryProps } from "../types/types";

const PostIt = ({ history, action, deleteHistory }: HistoryProps) => {
  return (
    <>
      <div className="overlay" onClick={action}></div>
      <div className="post-it">
        <div className="post-it-content">
          {!history.length ? (
            <span className="empty-calc">
              Faites un calcul !
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23M17,10H13V9H17V10Z"
                />
              </svg>
            </span>
          ) : (
            <></>
          )}
          <ul>
            {history.map((hist, i) => {
              return (
                <li key={`hist_${i}`} className="calc-record">
                  <span className="date">{hist.result ? hist.date : ""}</span>
                  <br />
                  <span className="calculations">
                    <svg viewBox="0 0 24 24" className="bullet">
                      <path
                        fill="currentColor"
                        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M19 19H5V5H19V19M6.2 7.7H11.2V9.2H6.2V7.7M13 15.8H18V17.3H13V15.8M13 13.2H18V14.7H13V13.2M8 18H9.5V16H11.5V14.5H9.5V12.5H8V14.5H6V16H8V18M14.1 10.9L15.5 9.5L16.9 10.9L18 9.9L16.6 8.5L18 7.1L16.9 6L15.5 7.4L14.1 6L13 7.1L14.4 8.5L13 9.9L14.1 10.9Z"
                      />
                    </svg>
                    {hist.result ? hist.calc : ""}
                  </span>
                  <span className="calculations">
                    {hist.result ? " = " : ""}
                  </span>
                  <span className="calculations">
                    {hist.result ? hist.result : ""}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <button className="close-button" onClick={action}>
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
            />
          </svg>
        </button>
        {history.length ? (
          <button className="erase-history-button" onClick={deleteHistory}>
            Effacer tout
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default PostIt;
