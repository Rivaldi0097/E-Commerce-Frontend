import "../styles/statusModal.css";
import close from "../assets/close.svg";

function StatusModal({
  status,
  setClose,
}: {
  status: string;
  setClose: Function;
}) {
  return (
    <>
      <div className="darkBg">
        <div className="modalBox">
          <div className="closeBox">
            <img
              src={close}
              className="closeIcon"
              onClick={() => {
                setClose();
              }}
            />
          </div>
          <h4 className="statusDiv">{status}</h4>
        </div>
      </div>
    </>
  );
}

export default StatusModal;
