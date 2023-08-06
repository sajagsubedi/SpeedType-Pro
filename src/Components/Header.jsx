export default function Header() {
  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <span className="ml-3 text-xl">SpeedType Pro</span>
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 text-white">Home</a>
          <a className="mr-5 hover:text-white">About</a>
          <a className="mr-5 hover:text-white">Contact</a>
        </nav>
      </div>
    </header>
  );
}
