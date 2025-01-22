const showSmallLoader = () => {
  const loader = document.getElementById("sm-loader");
  if (!loader) return;
  loader.style.visibility = "visible";
  loader.style.opacity = "1";
};

const hideSmallLoader = () => {
  const loader = document.getElementById("sm-loader");
  if (!loader) return;
  loader.style.visibility = "hidden";
  loader.style.opacity = "0";
};

export { showSmallLoader, hideSmallLoader };
