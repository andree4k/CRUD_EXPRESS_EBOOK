const backToTop = document.querySelector('.back-to-top')

backToTop.addEventListener('click', () => {
  // window.scroll(0,0)
  window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
})

window.addEventListener('scroll', () => {
  if(window.scrollY > 650) {
    backToTop.classList.add("back-to-top--show")
  } else {
    backToTop.classList.remove("back-to-top--show")
  }
})