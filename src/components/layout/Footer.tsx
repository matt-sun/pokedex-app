function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bottom-4 mx-4 mt-4 p-4 bg-pokemon-boston-red dark:bg-red-900 rounded-2xl text-center text-white dark:text-gray-200">
      <p>Copyright ⓒ {currentYear}</p>
    </footer>
  );
}
export default Footer;
