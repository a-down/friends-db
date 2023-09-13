


export default function({message, type}) {
  
  return (
    <>
      {type === 'success' && (
        <div className="bg-green-100 border border-green-200 rounded-md text-green-400 text-center text-xs py-1 px-2 font-sans font-semibold">
          <p>{message}</p>
        </div>
      )}

      {type === 'error' && (
        <div className="bg-red-100 border border-red-200 rounded-md text-red-400 text-center text-xs py-1 px-2 font-sans font-semibold">
          <p>{message}</p>
        </div>
      )}

    </>
  )
}