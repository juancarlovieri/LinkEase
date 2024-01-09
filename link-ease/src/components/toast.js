export default function Toast({ message, onClose }) {
  return (
    <div className="toast">
      {message}
      <button onClick={onClose}>&times;</button>
    </div>
  );
}
