import particlesJson from '../plugins/particles/particles.min.json';
import gsap from "gsap";

function initParticlesJS() {
    try {
        if (document.querySelector('#particles-js')) {
            window.particlesJS('particles-js', particlesJson);
        }
    } catch (error) {
        console.error(error);
    }
}

function animatedWelcome() {
    try {
        const textElement = document.querySelector("#greeting");
        const textContent = "Hi Alicea & Hiring Team 👋";
        textElement.textContent = "";
        const words = textContent.split(" ");
        const textSplitted = { words: [], chars: [] };
        words.forEach((word, index) => {
            const divWord = document.createElement("div");
            divWord.className = "word d-inline-block";
            if (index > 0) {
                divWord.className += " ms-2"
            }
            textElement.appendChild(divWord);
            if (isEmoji(word)) {
                const divChar = document.createElement("div");
                divChar.textContent = word;
                divChar.className = "char d-inline-block";
                divWord.appendChild(divChar);
                textSplitted.chars.push(divChar);
            }
            else {
                word.split("").forEach((char) => {
                    const divChar = document.createElement("div");
                    divChar.textContent = char;
                    divChar.className = "char d-inline-block";
                    divWord.appendChild(divChar);
                    textSplitted.chars.push(divChar);
                });
            }
            textSplitted.words.push(divWord);
        });
        gsap.fromTo(textSplitted.chars, {
            scale: 2.5,
            opacity: 0
        }, {
            scale: 1,
            opacity: 1,
            stagger: .05,
            duration: 1.3,
            ease: "power4.out"
        });
    } catch (error) {
        console.log(error);
    }
}

function isEmoji(char) {
    const emojiRegex = /[\p{Emoji}]/gu; // Unicode range for emojis
    return emojiRegex.test(char);
}

function initDarkMode(selector) {
    document.querySelector(selector)
        .addEventListener('click', function (event) {
            try {
                const _this = event.target.closest(selector);
                _this.classList.add('pushed');
                setTimeout(() => _this.classList.remove('pushed'), 300);

                toggleDarkMode(
                    document.body,
                    { darkmode: 'dark-mode', lightmode: 'light-mode' },
                    { name: 'mode', darkmodeValue: 'dark', lightmodeValue: 'light' }
                );
            } catch (error) {
                console.log(error);
            }
    });
}

function toggleDarkMode(element, classes, cookieData) {
    if (element.classList.contains(classes.lightmode)) {
        element.classList.add(...classes.darkmode.split(' '));
        element.classList.remove(...classes.lightmode.split(' '));
        // setCookie(cookieData.name, cookieData.darkmodeValue);
    } else {
        element.classList.remove(...classes.darkmode.split(' '));
        element.classList.add(...classes.lightmode.split(' '));
        // setCookie(cookieData.name, cookieData.lightmodeValue);
    }
}

function getMyAge() {
    return ((new Date()).getFullYear() - 1989);
}

export { initParticlesJS, initDarkMode, getMyAge, animatedWelcome };
