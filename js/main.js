if ("serviceWorker" in navigator) {
    window.addEventListener("load", e => {
        navigator.serviceWorker
            .register("../sw.js")
            .then(reg => console.log("Service Worker: Registered"))
            .catch(err => console.log(`Service Worker: Error ${err}`))
    });
}