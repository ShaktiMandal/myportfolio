import { colors, colorPad, colorsWithDarkMode } from "./color.js";

window.onload = function () {
  "use strict";

  // Initialize global variables

  let selectedBgColor = "";
  let isDarkModeSelected = false;

  // Initialize
  const toggleBtnElement = document.getElementsByClassName("navbar-toggler")[0];
  const toolbarElement = document.getElementsByClassName("toolbar")[0];
  const sideToolbarElement = document.getElementsByClassName("sidetoolbar")[0];
  const sideModeElement = document.getElementsByClassName("sitemode")[0];
  const footerElement = document.getElementsByClassName("footercontainer")[0];
  const navbarElement = document.getElementsByClassName("navbar")[0];
  const root = document.querySelector(":root");
  const body = document.querySelector("body");
  const bgColorBtn = document.getElementById("backgroundColor");
  const bgColorInput = document.getElementById("inputcolor");
  const colorPicker = document.getElementsByClassName("colorPicker")[0];
  const footerZoom = document.getElementsByClassName("footer__action-zoom")[0];
  const footerNavigation = document.getElementsByClassName(
    "footer__action-navigation"
  )[0];
  const increaseZoomElement =
    document.getElementsByClassName("increase-zoom")[0];
  const decreaseZoomElement =
    document.getElementsByClassName("decrease-zoom")[0];
  const incrementSpanValue = document.getElementsByClassName("zoom")[0];
  const rolesElement = document.getElementsByClassName("roles")[0];

  // Add animation for home section

  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        const profileElement =
          document.getElementsByClassName("profile-pic")[0];
        const descriptionElement =
          document.getElementsByClassName("description")[0];
        if (entry.isIntersecting) {
          profileElement.classList.add("profile__pic-animation");
          descriptionElement.classList.add("description__animation");
        } else {
          profileElement.classList.remove("profile__pic-animation");
          descriptionElement.classList.remove("description__animation");
        }
      });
    },
    { threshold: 0.32 }
  );

  io.observe(document.getElementsByClassName("first__section-content")[0]);

  const updateFontSize = (isIncrement) => {
    const currentBodyFontSize = getComputedStyle(body);
    if (currentBodyFontSize) {
      let updatedFontSize;
      const fontSize = currentBodyFontSize.font.split(" ");
      const currentFont = fontSize[0].substring(0, fontSize[0].length - 2);
      //const current = incrementSpanValue.textContent;

      // Calculate updated font size after event increment
      // Consider, 20% increment each time

      if (isIncrement) {
        updatedFontSize =
          parseFloat(currentFont) + Math.ceil(parseInt(currentFont) / 5);
      } else {
        updatedFontSize =
          parseFloat(currentFont) - Math.ceil(parseInt(currentFont) / 5);
      }

      root.style.setProperty("--default-font-size", `${updatedFontSize}px`);
    }
  };

  const onIncreaseFontSize = () => {
    updateFontSize(true);
  };

  const onDecreaseFontSize = () => {
    updateFontSize(false);
  };

  increaseZoomElement.addEventListener("click", onIncreaseFontSize);
  decreaseZoomElement.addEventListener("click", onDecreaseFontSize);

  // Launch the color pad to select the color
  bgColorBtn.addEventListener("click", () => {
    // If the color picker pad is open, close it
    if (colorPicker.style.display === "grid") {
      colorPicker.style.display = "none";
      return;
    }

    // If the color picker pad is close, opem it
    const colorPickerPads = document.getElementsByClassName("colorPicker__pad");
    if (colorPickerPads && colorPicker) {
      colorPicker.style.display = "grid";
      colorPicker.style.backgroundColor = colors["--main-color"];
      Object.keys(colorPad).forEach((pad, index) => {
        colorPickerPads[index].style.backgroundColor = colorPad[pad];
        colorPickerPads[index].id = "pad_" + index.toString();
        colorPickerPads[index].setAttribute("title", pad);
        colorPickerPads[index].addEventListener("click", setSelectedBgColor);
      });
    }
  });

  // Get the input color code
  bgColorInput.addEventListener("input", (event) => {
    if (event && event.keyCode === 8 && event.target.value.length) {
      return;
    }
  });

  const setTheAppWithBgColor = () => {
    const colorName = "darkWith" + selectedBgColor;

    // Both color from the picker and dark mode selected
    if (selectedBgColor && isDarkModeSelected) {
      root.style.setProperty("--main-color", colorsWithDarkMode[colorName]);
    }
    // Just color selected from the picker
    if (selectedBgColor && isDarkModeSelected === false) {
      root.style.setProperty("--main-color", colorPad[selectedBgColor]);
    }
    // No dark mode and no selected color so default background
    if (selectedBgColor === "" && isDarkModeSelected === false) {
      root.style.setProperty("--main-color", colors["--main-color"]);
    }
    // Just dark mode selected so dark background
    if (selectedBgColor === "" && isDarkModeSelected === true) {
      root.style.setProperty("--main-color", colors["--dark-mode-color"]);
    }

    // Change others background when color theme change and
    // selected color
    if (
      (selectedBgColor && isDarkModeSelected === false) ||
      (selectedBgColor === "" && isDarkModeSelected === false)
    ) {
      root.style.setProperty("--hover-color", colors["--hover-color"]);
      root.style.setProperty("--border-color", colors["--border-color"]);
      root.style.setProperty("--text-color", colors["--text-color"]);
      sideToolbarElement.style.backgroundColor = colors["--main-color"];
      toolbarElement.style.backgroundColor = colors["--main-color"];
      toggleBtnElement.style.backgroundColor = colors["--main-color"];
      footerZoom.style.backgroundColor = colors["--main-color"];
      footerNavigation.style.backgroundColor = colors["--main-color"];
      colorPicker.style.backgroundColor = colors["--main-color"];
    }

    if (
      (selectedBgColor && isDarkModeSelected) ||
      (selectedBgColor === "" && isDarkModeSelected)
    ) {
      root.style.setProperty(
        "--hover-color",
        colors["--dark-mode-hover-color"]
      );
      root.style.setProperty(
        "--border-color",
        colors["--dark-mode-border-color"]
      );
      root.style.setProperty("--text-color", colors["--dark-mode-text-color"]);
      colorPicker.style.backgroundColor = colors["--dark-mode-border-color"];
      sideToolbarElement.style.backgroundColor = colors["--dark-mode-color"];
      toggleBtnElement.style.backgroundColor = colors["--dark-mode-color"];
      toolbarElement.style.backgroundColor = colors["--dark-mode-color"];
      footerZoom.style.backgroundColor = colors["--dark-mode-color"];
      footerNavigation.style.backgroundColor = colors["--dark-mode-color"];
    }
  };

  sideModeElement.addEventListener("click", () => {
    const rootStyle = getComputedStyle(root);

    if (isDarkModeSelected) {
      isDarkModeSelected = false;
      // Default background color
      root.style.setProperty("--main-color", colors["--main-color"]);
      setTheAppWithBgColor();
    } else {
      isDarkModeSelected = true;
      // Default darkmode backgroundcolor
      root.style.setProperty("--main-color", colors["--dark-mode-color"]);
      setTheAppWithBgColor();
    }
  });

  toggleBtnElement.addEventListener("click", () => {
    if (
      sideToolbarElement.style.display === "none" ||
      sideToolbarElement.style.display === undefined ||
      sideToolbarElement.style.display === ""
    ) {
      sideToolbarElement.style.display = "grid";
    } else {
      sideToolbarElement.style.display = "none";
    }
  });

  function RGBToHex(color) {
    if (color.length === 0) return;
    const leftIndex = color.indexOf("(");
    const rightIndex = color.indexOf(")");

    if (leftIndex > -1 && rightIndex > -1) {
      const rgb = color.slice(leftIndex + 1, rightIndex).split(",");

      let r = rgb[0].toString(16).trim();
      let g = rgb[1].toString(16).trim();
      let b = rgb[1].toString(16).trim();

      if (r.length === 1) r = "0" + r;
      if (g.length === 1) g = "0" + g;
      if (b.length === 1) b = "0" + b;

      return "#" + r + g + b;
    }

    return;
  }

  function setBodyBgColor(color, index) {
    const colorName = "darkWith" + color.trim();
    if (isDarkModeSelected) {
      root.style.setProperty("--main-color", colorsWithDarkMode[colorName]);
      return;
    }

    root.style.setProperty("--main-color", colorPad[color]);
  }

  function setSelectedBgColor(event) {
    const selectedId = event.target.id.split("_")[1];
    if (selectedId) {
      const colorPickers = document.getElementsByClassName("colorPicker__pad");
      console.log([...colorPickers]);
      // Remove previously selected color border
      [...colorPickers].forEach((item) => {
        if (item.classList.contains("colorPicker__pad-active")) {
          item.classList.remove("colorPicker__pad-active");
        }
      });
      Object.keys(colorPad).forEach((pad, index) => {
        // if (event.target.classList.contains('colorPicker__pad-active'))
        // {
        //     event.target.classList.remove('colorPicker__pad-active')
        // }

        if (index.toString() === selectedId) {
          const rootStyle = getComputedStyle(root);
          const mainColor = rootStyle.getPropertyValue("--main-color");
          selectedBgColor = pad;
          event.target.classList.add("colorPicker__pad-active");
          bgColorBtn.style.backgroundColor = colorPad[pad];
          setBodyBgColor(pad, index);

          if (mainColor === colors["--dark-mode-color"] || isDarkModeSelected) {
            sideToolbarElement.style.backgroundColor =
              colors["--dark-mode-color"];
            toggleBtnElement.style.backgroundColor =
              colors["--dark-mode-color"];
            toolbarElement.style.backgroundColor = colors["--dark-mode-color"];
            footerZoom.style.backgroundColor = colors["--dark-mode-color"];
            footerNavigation.style.backgroundColor =
              colors["--dark-mode-color"];
          } else {
            sideToolbarElement.style.backgroundColor = colors["--main-color"];
            toolbarElement.style.backgroundColor = colors["--main-color"];
            toggleBtnElement.style.backgroundColor = colors["--main-color"];
            footerZoom.style.backgroundColor = colors["--main-color"];
            footerNavigation.style.backgroundColor = colors["--main-color"];
          }
        }
      });
    }
  }

  // Tab action 

  const tabList = document.getElementsByClassName('tab');
const onClickTab = (index) => {
  console.log('Print tab index', index);
  const childrens = tabList[0].children;
  const tabContents = document.getElementsByClassName('content');
  if (tabContents?.length) {
    Object.keys(tabContents).forEach((tabContent, contentIndex) => {
      console.log('Print content index', contentIndex);
      if (index !== contentIndex) {
        tabContents[contentIndex].style.display = 'none';
        childrens[contentIndex].classList.remove('selected-tab');
      } else {
        childrens[contentIndex].classList.add('selected-tab');
        tabContents[contentIndex].style.display = 'block';
      }
    });
  }
};

if (tabList) {
  const childrens = tabList[0].children;
  if (childrens.length) {
    Object.keys(childrens).forEach((key, index) => {
      childrens[key].addEventListener('click', () => {
        onClickTab(index);
      });
    });
  }
}
};
