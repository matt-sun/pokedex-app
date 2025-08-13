function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bottom-4 mx-4 mt-4 p-4 bg-pokemon-red rounded-2xl text-center">
      <p>Copyright ⓒ {currentYear}</p>
    </footer>
  );
}
export default Footer;
