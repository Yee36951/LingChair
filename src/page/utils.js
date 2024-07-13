function showErrorImage(src, alt) {
    if (!this.loadFailed) {
        this.loadFailed = true
        this.src = src
    } else {
        this.alt = alt
    }
}

export {
    showErrorImage,
}