import React from 'react'

function Error() {
  return (
      <div className=" flex flex-col items-center content-center pt-20">     
        <h4 className="self-center text-9xl text-red-400 font-bold"> 404</h4>
        <h3 className="self-center text-5xl font-bold text-gray-600 my-3">Oops!</h3>
        <p className="self-center text-2xl">Page not found</p>
    </div>
  );
}

export default Error