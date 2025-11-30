 import ProtectedRoute from '@/components/ProtectedRoute'
 import Link from 'next/link'

 export default function Home() {
   return (
     <ProtectedRoute>
       <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4">
         <div>
             <img className='size-[129px] bg-pink-100 p-4 mx-auto rounded-full' src="/logo.svg"/>
           </div>
         <h1 className="text-2xl  font-bold my-5 text-center text-slate-600 mb-8">
           Séraphin & Juliana Wedding
         </h1>
          <div className="text-gray-600">
            
          </div>

          {/* Couple Photo */}
        <div className="my-4 relative">
          <div className="inline-block overflow-hidden">
            <div className="relative w-64 h-64 mx-auto">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('/couple.webp')",
                  clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)"
                }}
              />
             
            </div>
          </div>
          <img src="/assets/center.png" alt="Bottom Right Flower" className="absolute rotate-[-45deg] top-[50%] translate-y-[-10%] right-[50%] translate-x-[50%] w-[170px]" />
        </div>
        
         <div className="grid rounded-full mt-8 gap-4 w-full max-w-md">
        
           <Link 
             href="/admin" 
             className="bg-black text-xl hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-full text-center transition duration-200"
           >
             Gestion d'invitations
           </Link>
          
        
         </div>

         <div className="mt-12 text-center text-gray-600">
      
         </div>
       </div>
     </ProtectedRoute>
   )
 }


