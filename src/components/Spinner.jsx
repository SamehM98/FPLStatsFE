import { MoonLoader } from 'react-spinners';

function Spinner() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <MoonLoader color="#3652d6" size={150} />
    </div>
  );
}

export default Spinner;
