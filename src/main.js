import { initParticlesJS, initDarkMode, animatedWelcome } from "./scripts/functions";
import 'lazysizes';

try {    
    initDarkMode('.toggle-dark-mode')
    initParticlesJS()
    animatedWelcome()
} catch (error) {
    console.log(error);
}