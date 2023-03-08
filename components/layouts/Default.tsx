/* eslint-disable react/react-in-jsx-scope */
import Protected from "../HOC/Protected";

function Default({ children }: any) {
  return (
    <>
      <div className="app-wrapper">
        <div>
          <h1>header</h1>
        </div>
        <div>sidebar</div>
        {children}
      </div>
    </>
  );
}
export default Protected(Default);
