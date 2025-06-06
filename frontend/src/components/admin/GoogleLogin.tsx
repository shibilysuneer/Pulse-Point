import google from '../../assets/google.png'

const GoogleLogin = () => {
  return (
   <div className='flex border mt-4 p-2 cursor-pointer'>
        <img src={google} className='w-6 h-6' />
        <button type='button' 
        // onClick={handleGoogle} 
        className='font-semibold ml-12 text-black'>
          Continue with Google
          </button>
    </div>
  )
}

export default GoogleLogin;
