import { SessionProvider } from "../components/SessionProvider";
import Sidebar from "../components/Sidebar";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import "../styles/globals.css";
import { getServerSession } from 'next-auth';
import Login from "../components/Login";
import ClientProvider from "../components/ClientProvider";
import Providers from '../components/Providers';
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  const session = await getServerSession(authOptions); 
  console.log(session);
  return (
    <html>
      {/* <head /> */}
            
           
      <body>
      <Providers>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) 
            :( 
        <div className="flex">
          {/* Sidebar */}
          <div className="max-w-xs h-screen overflow-y-auto bg-[#202123] md:min-w-[20rem]">
          <Sidebar />
          </div>
                {/* Client Provider Notification */}

             <ClientProvider />   
          <div className="bg-[#343541] flex-1">{children}</div>
            </div>
           )}
          </SessionProvider>
          </Providers>  
      </body>
        
       
    </html>
  );
}
