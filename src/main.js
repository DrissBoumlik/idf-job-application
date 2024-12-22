import { initParticlesJS, initDarkMode, getMyAge, animatedWelcome } from "./scripts/functions";
import 'lazysizes';

try {    
    initDarkMode('.toggle-dark-mode')
    initParticlesJS()
    animatedWelcome()
    document.getElementById('myage').innerHTML = getMyAge();
} catch (error) {
    console.log(error);
}