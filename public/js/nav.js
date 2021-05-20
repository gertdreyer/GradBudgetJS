// eslint-disable-next-line no-unused-vars
const makeNavActive = () => {
    let navelements = document.getElementsByClassName("nav-item");
    for (let i of navelements) {
        if (i.children[0].href == window.location) {
            i.children[0].classList.add("active");
        }
    }
};
