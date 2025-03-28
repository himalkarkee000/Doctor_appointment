import { assets } from "../assets/assets"


const Contact = () => {
  return (
    <>
    <div className='text-center text-2xl pt-10 text-gray-500'>
      <p>CONTACT <span className='text-gray-700 font-medium'>US</span></p>
    </div>
    <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-small">

      <img className="w-full max-w-[360px]" src={assets.contact_image} alt="" />
      <div className="w-2/4 flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">Our OFFICE</p>
          <p className="text-gray-500">54709 Willms Station <br />
          Suite 350, Washington, USA</p>
          <p className="text-gray-500">Tel: (415) 555‑0132<br/>Email: greatstackdev@gmail.com</p>
          <p className="font-semibold text-lg text-gray-600">Careers at PRESCRIPTO</p>
          <p className="text-gray-500">Learn more about our teams and job openings.</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
          Explore Jobs
          </button>
      </div>
    </div>
      
    </>
  )
}

export default Contact
