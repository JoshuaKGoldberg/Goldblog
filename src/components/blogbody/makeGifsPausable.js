import Freezeframe from "freezeframe";

const isActivationEvent = ({ keyCode }) => [13, 32].includes(keyCode)

const prepareToBePausable = (image) => {
    const makePausable = () => {
        const freezer = new Freezeframe(image, {
            trigger: "click",
            responsive: false,
        });
        
        freezer.on('start', () => {
            image.focus();
        });

        image.addEventListener("keypress", event => {
            if (isActivationEvent(event)) {
                event.preventDefault();
                freezer.toggle();
                image.focus();
            }
        })

        image.removeEventListener("click", makePausable);
        image.removeEventListener("keypress", makePausableKeyPress);
    };

    const makePausableKeyPress = (event) => {
        if (isActivationEvent(event)) {
            event.preventDefault();
            makePausable(image);
        }
    };
    
    image.addEventListener("click", makePausable);
    image.addEventListener("keypress", makePausableKeyPress);
    image.setAttribute("aria-label", image.getAttribute("aria-label") + " (click to toggle animation)");
    image.setAttribute("tabIndex", 0);
};

const makeGifsPausable = () => {
    [...document.querySelectorAll("img[src*='.gif']")].forEach(
        prepareToBePausable
    );
};

export default makeGifsPausable;
