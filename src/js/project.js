const bioSection = document.querySelector('.bio-section');
const projectSection = document.querySelector('.projects-section');

const projectColumns = document.querySelectorAll('.project-col');
const projectTitles = document.querySelectorAll('.projects-section__project-title');

// const projectTitle = document.querySelector('.projects-section__project-title');
// console.log(document.querySelector('.projects-section__project-title').getAttribute('data-project'))
projectColumns.forEach(col => {
  col.addEventListener('mouseenter', e => {
    const expanded = col.classList.contains('project-col--expand');
    if(!expanded) {
        projectColumns.forEach(col => (col.classList.remove('project-col--expand')));
        col.classList.add('project-col--expand');

        projectTitles.forEach(title => {
            if(title.getAttribute('data-project') === col.getAttribute('data-project')) {
                projectTitles.forEach(title => (title.classList.remove('projects-section__project-title--show')));
                title.classList.add('projects-section__project-title--show');
            }
        })
        // setTimeout(() => {
            col.querySelector('.project-col__info-button').classList.remove('project-col__info-button--hidden'); 
        // }, 100);
        
    }
  })
  col.addEventListener('mouseleave', e => {
    const expanded = col.classList.contains('project-col--expand');
    if(expanded){
        projectColumns.forEach(col => (col.classList.remove('project-col--expand')));
        col.classList.remove('project-col--expand');

        projectTitles.forEach(title => {
            if(title.getAttribute('data-project') === col.getAttribute('data-project')) {
                projectTitles.forEach(title => (title.classList.remove('projects-section__project-title--show')));
                title.classList.remove('projects-section__project-title--show');
            }
        });

        col.querySelector('.project-col__info-button').classList.add('project-col__info-button--hidden'); 
    } 
  })
  col.addEventListener('click', e => {
    const open = col.classList.contains('project-col--open');
    if(open){
        projectColumns.forEach(col => (col.classList.remove('project-col--open')));
        projectColumns.forEach(col => (col.classList.remove('project-col--closed')));
        col.classList.remove('project-col--open');
        col.classList.add('project-col--expand');
        bioSection.classList.remove('bio-section--narrow');
        projectSection.classList.remove('projects-section--wide');

        // projectTitles.forEach(title => {
        //     if(title.getAttribute('data-project') === col.getAttribute('data-project')) {
        //         projectTitles.forEach(title => (
        //             title.classList.remove('projects-section__project-title--show')));
        //             title.classList.remove('projects-section__project-title--show');
        //     }
        // });
        setTimeout(() => {
            col.querySelector('.project-col__info-button').classList.remove('project-col__info-button--hidden'); 
            col.querySelector('.project-col__svg').classList.remove('project-col__svg--hidden');
        }, 100);
    } else {
        projectColumns.forEach(col => (col.classList.remove('project-col--open')));
        projectColumns.forEach(col => (col.classList.add('project-col--closed')));
        col.classList.remove('project-col--closed');
        col.classList.add('project-col--open');
        col.classList.remove('project-col--expand');
        bioSection.classList.add('bio-section--narrow');
        projectSection.classList.add('projects-section--wide');

        projectTitles.forEach(title => {
            if(title.getAttribute('data-project') === col.getAttribute('data-project')) {
                projectTitles.forEach(title => (
                    title.classList.remove('projects-section__project-title--show')));
                    title.classList.add('projects-section__project-title--show');
            }
        });
        setTimeout(() => {
            col.querySelector('.project-col__info-button').classList.add('project-col__info-button--hidden'); 
            col.querySelector('.project-col__svg').classList.add('project-col__svg--hidden'); 
        }, 100);
    }
  })
})
