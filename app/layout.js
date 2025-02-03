import './globals.css';
import ThemeToggle from './components/ThemeToggle'; 
import Footer from './components/Footer';  

export const metadata = {
  title: 'Task Management',
  description: 'A simple task management app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="bg-white dark:bg-black text-black dark:text-white">
        <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <ThemeToggle />
        </header>
        <main className="container mx-auto p-6">{children}</main>
        <Footer />  
      </body>
    </html>
  );
}
