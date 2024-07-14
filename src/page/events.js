function onResize() {
    document.body.style.setProperty('--lingchair-window-width', window.innerWidth + "px")
    document.body.style.setProperty('--lingchair-window-height', window.innerHeight + "px")
}
onResize()
window.addEventListener('resize', onResize)
