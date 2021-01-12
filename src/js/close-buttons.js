const closeButtons = document.querySelectorAll('.project-col__close-button');
const cols = document.querySelectorAll('.project-col');
const mobCloseButton = document.querySelector('.bio-section__close-button');

closeButtons.forEach(closeButton => {
    // console.log(closeButton)
    closeButton.addEventListener('click', e => {
        // if(e.target.matches('.project-col__close-button img')) {
            // console.log(e.target, ' e.target')
            e.target.parentElement.querySelector('.project-col__close-button').classList.remove('project-col__close-button--show');
            
            mobCloseButton.classList.remove('bio-section__close-button--show');

            wrapper.classList.remove('open');
            projectColumnContainer.classList.remove('project-columns--open');

            
            cols.forEach(col => {
                col.querySelector('.project-col__bg-colour').classList.remove('project-col__bg-colour--mob-show'); 
                col.querySelector('.project-col__project-title').classList.remove('project-col__project-title--show')

                col.classList.remove('project-col--closed');
                col.classList.remove('project-col--scroll');
                col.classList.remove('project-col--open');
                col.classList.add('project-col--regular');
                col.classList.add('project-col--hold');
                col.scroll({
                    top: 0,
                    behavior: 'smooth'
                })
                setTimeout(() => { 
                    col.querySelector('.project-col__svg').classList.add('project-col__svg--hold');
                }, 300);
                setTimeout(() => { 
                    col.classList.remove('project-col--hold');
                }, 500);
            })
        // }
    })
})


// test for scroll opne on mob
// document.addEventListener('scroll', event => {
//     console.log(window.scrollY)
//   })
// function myFunction() {
//     var testDiv = document.querySelector('.project-col[data-project]');
//     console.log(testDiv.offsetTop, ' testDiv.offsetTop');
// }
// myFunction();

