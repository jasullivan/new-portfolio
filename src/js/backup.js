const openWrapper = document.querySelector('.wrapper');
const bioSection = document.querySelector('.bio-section');
const projectSection = document.querySelector('.projects-section');
const projectColumnContainer = document.querySelector('.project-columns');
const projectColumns = document.querySelectorAll('.project-col');

const projectsCloseButtons = document.querySelectorAll('.projects-section__close');
const mobProjectsCloseButtons = document.querySelectorAll('.mob-projects-section__close');

const desktopProjectTitles = document.querySelectorAll('.projects-section__project-title--desk');
// const mobProjectTitles = document.querySelectorAll('.projects-section__project-title--mob');
 
// const projectTitle = document.querySelector('.projects-section__project-title');
// console.log(document.querySelector('.projects-section__project-title').getAttribute('data-project'))
projectColumns.forEach(col => {
  col.addEventListener('mouseenter', e => {
    const open = col.classList.contains('project-col--open');
    const expanded = col.classList.contains('project-col--expand');
    if(!expanded && !open) {
        projectColumns.forEach(col => (col.classList.remove('project-col--expand')));
        col.classList.add('project-col--expand');
        // col.classList.remove('project-col--minimised');
        
        desktopProjectTitles.forEach(title => {
            if(title.getAttribute('data-project') === col.getAttribute('data-project')) {
                desktopProjectTitles.forEach(title => (title.classList.remove('projects-section__project-title--desk--show')));
                title.classList.add('projects-section__project-title--desk--show');
            }
        })
        col.querySelector('.project-col__info-button').classList.remove('project-col__info-button--hidden'); 
    }
  })
  col.addEventListener('mouseleave', e => {
    const open = col.classList.contains('project-col--open');
    const expanded = col.classList.contains('project-col--expand');
    if(expanded && !open){
        projectColumns.forEach(col => (col.classList.remove('project-col--expand')));
        col.classList.remove('project-col--expand');
        // col.classList.add('project-col--minimised');
        

        desktopProjectTitles.forEach(title => {
            if(title.getAttribute('data-project') === col.getAttribute('data-project')) {
                desktopProjectTitles.forEach(title => (title.classList.remove('projects-section__project-title--desk--show')));
                title.classList.remove('projects-section__project-title--desk--show');
            }
        });

        col.querySelector('.project-col__info-button').classList.add('project-col__info-button--hidden'); 
    } 
  })
  col.addEventListener('click', e => {
    const open = col.classList.contains('project-col--open');
    if(!open){
        openWrapper.classList.add('open');
        projectColumnContainer.classList.add('project-columns--open');
        projectColumns.forEach(col => (col.classList.remove('project-col--open')));
        projectColumns.forEach(col => (col.classList.add('project-col--closed')));
        col.classList.remove('project-col--closed');
        col.classList.add('project-col--open');
        col.classList.remove('project-col--expand');
        col.classList.remove('project-col--regular');
        col.addEventListener('scroll', event => {
            console.log(col.scrollTop)
        })

        desktopProjectTitles.forEach(title => {
            if(title.getAttribute('data-project') === col.getAttribute('data-project')) {
                desktopProjectTitles.forEach(title => (
                    title.classList.remove('projects-section__project-title--desk--show')));
                    title.classList.add('projects-section__project-title--desk--show');
            }
        });

        setTimeout(() => {
            col.querySelector('.project-col__info-button').classList.add('project-col__info-button--hidden'); 
            col.querySelector('.project-col__svg').classList.add('project-col__svg--hidden'); 
        }, 100);
        setTimeout(() => {
            col.classList.add('project-col--scroll');
            console.log('heeeelllloooooo')
        }, 1000);
    }
  })
    projectsCloseButtons.forEach(closeButton => {
        closeButton.addEventListener('click', e => {
            const open = col.classList.contains('project-col--open');
            if(open){
                openWrapper.classList.remove('open');
                console.log('was open desk')
                projectColumnContainer.classList.remove('project-columns--open');
                desktopProjectTitles.forEach(title => title.classList.remove('projects-section__project-title--desk--show'))

                col.classList.remove('project-col--open');
                col.classList.add('project-col--regular');
                col.scroll({
                    top: 0,
                    behavior: 'smooth'
                })
                col.classList.remove('project-col--scroll');

                projectColumns.forEach(col => (col.classList.remove('project-col--open')));
                projectColumns.forEach(col => (col.classList.remove('project-col--closed')));

                setTimeout(() => { 
                    col.querySelector('.project-col__svg').classList.remove('project-col__svg--hidden');
                }, 100);
            }
        })
    })
    // mobProjectsCloseButtons.forEach(mobCloseButton => {
    //     console.log('forEach mob')
    //     mobCloseButton.addEventListener('click', e => {
    //         console.log('click mob')
    //         const open = col.classList.contains('project-col--open');
    //         if(open){
    //             console.log('was open mob')
    //             document.querySelector('.project-columns').classList.remove('project-columns--open');
    //             desktopProjectTitles.forEach(title => title.classList.remove('projects-section__project-title--desk--show'))

    //             col.classList.remove('project-col--open');
    //             col.classList.add('project-col--regular');
    //             col.scroll({
    //                 top: 0,
    //                 behavior: 'smooth'
    //             })
    //             col.classList.remove('project-col--scroll');

    //             projectColumns.forEach(col => (col.classList.remove('project-col--open')));
    //             projectColumns.forEach(col => (col.classList.remove('project-col--closed')));

    //             setTimeout(() => { 
    //                 col.querySelector('.project-col__svg').classList.remove('project-col__svg--hidden');
    //             }, 100);
    //         }
    //     })
    // })
})