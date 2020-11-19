const closeButtons = document.querySelectorAll('.project-col__close-button');
const cols = document.querySelectorAll('.project-col');
console.log(cols, ' cols')
closeButtons.forEach(closeButton => {
    console.log(closeButton)
    closeButton.addEventListener('click', e => {
        console.log('close button clicked')
        e.target.parentElement.querySelector('.project-col__close-button').classList.remove('project-col__close-button--show');

        wrapper.classList.remove('open');
        projectColumnContainer.classList.remove('project-columns--open');

        
        cols.forEach(col => {
            col.querySelector('.project-col__bg-colour').classList.remove('project-col__bg-colour--mob-show'); 
            col.querySelector('.project-col__project-title--mob').classList.remove('project-col__project-title--mob--show')

            col.classList.remove('project-col--closed');
            col.classList.remove('project-col--scroll');
            col.classList.remove('project-col--open');
            col.classList.add('project-col--regular');
            col.scroll({
                top: 0,
                behavior: 'smooth'
            })
            setTimeout(() => { 
                col.querySelector('.project-col__svg').classList.remove('project-col__svg--hidden');
            }, 300);
        })
    })
})