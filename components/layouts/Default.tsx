/* eslint-disable react/react-in-jsx-scope */

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
export default Default;
