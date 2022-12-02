
import { colors, colorPad } from './color.js';

window.onload = function() {
    'use strict'

    // Initialize global variables

    let selectedBgColor = '';

    // Initialize
    const toggleBtnElement = document.getElementsByClassName('navbar-toggler')[0];
    const toolbarElement = document.getElementsByClassName('toolbar')[0];
    const sideToolbarElement = document.getElementsByClassName('sidetoolbar')[0];
    const sideModeElement = document.getElementsByClassName('sitemode')[0];
    const footerElement = document.getElementsByClassName('footercontainer')[0];
    const navbarElement = document.getElementsByClassName('navbar')[0];
    const root = document.querySelector(':root');
    const body = document.querySelector('body');
    const bgColorBtn = document.getElementById('backgroundColor');
    const bgColorInput = document.getElementById('inputcolor');
    const colorPicker = document.getElementsByClassName('colorPicker')[0];
    const footerZoom = document.getElementsByClassName('footer__action-zoom')[0]; 
    const footerNavigation = document.getElementsByClassName('footer__action-navigation')[0]; 

    // Launch the color pad to select the color
    bgColorBtn.addEventListener('click', () => {


        // If the color picker pad is open, close it 
        if ( colorPicker.style.display === "grid") {
            colorPicker.style.display = "none";
            return;
        }

        // If the color picker pad is close, opem it 
        const colorPickerPads = document.getElementsByClassName('colorPicker__pad');
        if (colorPickerPads && colorPicker) {
            colorPicker.style.display = "grid";
            colorPicker.style.backgroundColor = colors['--main-color'];
            Object.keys(colorPad).forEach((pad, index) => {
                colorPickerPads[index].style.backgroundColor = colorPad[pad];
                colorPickerPads[index].id = "pad_" + index.toString();
                colorPickerPads[index].setAttribute('title', pad);
                colorPickerPads[index].addEventListener('click', setSelectedBgColor);
            });
        }
    })

    // Get the input color code
    bgColorInput.addEventListener('input', () => {

    })


    sideModeElement.addEventListener('click', () => {
        const rootStyle = getComputedStyle(root);
        const mainColor = rootStyle.getPropertyValue('--main-color');
        const darkModeColor = rootStyle.getPropertyValue('--dark-mode-color');

        if (mainColor === darkModeColor) {
            
            root.style.setProperty('--main-color', colors['--main-color']);
            if (selectedBgColor ) {
                root.style.setProperty('--main-color', selectedBgColor);
            } 

            root.style.setProperty('--hover-color', colors['--hover-color']);
            root.style.setProperty('--border-color', colors['--border-color']);
            sideToolbarElement.style.backgroundColor = colors['--main-color'];
            toolbarElement.style.backgroundColor = colors['--main-color'];
            toggleBtnElement.style.backgroundColor = colors['--main-color'];
            footerZoom.style.backgroundColor = colors['--main-color'];
            footerNavigation.style.backgroundColor = colors['--main-color'];
            colorPicker.style.backgroundColor = colors['--main-color'];
        } else  {
            root.style.setProperty('--main-color', colors['--dark-mode-color']);

            if (selectedBgColor) {
                root.style.setProperty('--main-color', selectedBgColor);
            }
            
            root.style.setProperty('--hover-color', colors['--dark-mode-hover-color']);
            root.style.setProperty('--border-color', colors['--dark-mode-border-color']);
            colorPicker.style.backgroundColor = colors['--dark-mode-border-color'];
            sideToolbarElement.style.backgroundColor = colors['--dark-mode-color'];
            toggleBtnElement.style.backgroundColor = colors['--dark-mode-color'];
            toolbarElement.style.backgroundColor = colors['--dark-mode-color'];
            footerZoom.style.backgroundColor = colors['--dark-mode-color'];
            footerNavigation.style.backgroundColor = colors['--dark-mode-color'];
        }
    });


    toggleBtnElement.addEventListener('click', () => {
        if (sideToolbarElement.style.display === 'none' 
        || sideToolbarElement.style.display === undefined
        || sideToolbarElement.style.display === "") {
            sideToolbarElement.style.display = 'grid';
        } else  {
            sideToolbarElement.style.display = 'none';
        }
    })

    function RGBToHex(color) {

        if (color.length === 0) return;
        const leftIndex = color.indexOf('(');
        const rightIndex = color.indexOf(')');

        if (leftIndex > -1 && rightIndex > -1) {
           const rgb = color.slice(leftIndex + 1, rightIndex).split(',');

           let r = rgb[0].toString(16).trim();
           let g = rgb[1].toString(16).trim();
           let b = rgb[1].toString(16).trim();
         
           if (r.length === 1)
             r = "0" + r;
           if (g.length === 1)
             g = "0" + g;
           if (b.length === 1)
             b = "0" + b;
         
           return "#" + r + g + b;
        }

        return;
      }

      function setSelectedBgColor(event) {
        const selectedId = event.target.id.split('_')[1];
        if (selectedId) {
            Object.keys(colorPad).forEach((pad, index) => {
                if (index.toString() === selectedId) {
                    const rootStyle = getComputedStyle(root);
                    const mainColor = rootStyle.getPropertyValue('--main-color');
                    root.style.setProperty('--main-color', colorPad[pad]);


                    if (mainColor === colors['--dark-mode-color']) {
                        sideToolbarElement.style.backgroundColor = colors['--dark-mode-color'];
                        toggleBtnElement.style.backgroundColor = colors['--dark-mode-color'];
                        toolbarElement.style.backgroundColor = colors['--dark-mode-color'];
                        footerZoom.style.backgroundColor = colors['--dark-mode-color'];
                        footerNavigation.style.backgroundColor = colors['--dark-mode-color'];
                    } else {
                        sideToolbarElement.style.backgroundColor = colors['--main-color'];
                        toolbarElement.style.backgroundColor = colors['--main-color'];
                        toggleBtnElement.style.backgroundColor = colors['--main-color'];
                        footerZoom.style.backgroundColor = colors['--main-color'];
                        footerNavigation.style.backgroundColor = colors['--main-color'];
                    }
                }
            });
        }
      } 
}