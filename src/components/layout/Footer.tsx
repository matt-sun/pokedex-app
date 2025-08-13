function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bottom-4 mx-4 mt-4 p-4 bg-pokemon-boston-red rounded-2xl text-center text-white">
      <p>Copyright ⓒ {currentYear}</p>
    </footer>
  );
}
export default Footer;
