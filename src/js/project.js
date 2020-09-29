const wrapper = document.querySelector('.wrapper');
const bioSection = document.querySelector('.bio-section');
const projectSection = document.querySelector('.projects-section');
const projectColumnContainer = document.querySelector('.project-columns');
const projectColumns = document.querySelectorAll('.project-col');

// const projectsCloseButton = document.querySelector('.projects-section__close-button');
const projectsCloseButtons = document.querySelectorAll('.projects-section__close-button');
const mobCloseButton = document.querySelector('.bio-section__close-button');
const desktopProjectTitles = document.querySelectorAll('.projects-section__project-title--desk');

// add and remove title for desktop
const desktopTitlesAdd = (e) => {
    desktopProjectTitles.forEach(title => {
        if(title.getAttribute('data-project') === e.target.parentElement.getAttribute('data-project')) {
            desktopProjectTitles.forEach(title => (title.classList.remove('projects-section__project-title--desk--show')));
            title.classList.add('projects-section__project-title--desk--show');

            setTimeout(() => {
                e.target.parentElement.classList.contains('project-col--open') && 
                title.querySelector('.projects-section__close-button').classList.add('projects-section__close-button--show');
            }, 2000);
            
        }
    })
}
const desktopTitlesRemove = (e) => {
    desktopProjectTitles.forEach(title => {
        if(title.getAttribute('data-project') === e.target.parentElement.getAttribute('data-project') && 
            !e.target.parentElement.classList.contains('project-col--open')) {
            desktopProjectTitles.forEach(title => (title.classList.remove('projects-section__project-title--desk--show')));
            title.classList.remove('projects-section__project-title--desk--show');
        }
    })
}
// expand and contract project columns
const projectExpand = (e) => {
    e.target.parentElement.classList.add('project-col--expand');
    e.target.parentElement.querySelector('.project-col__info-button').classList.remove('project-col__info-button--hidden');
    desktopTitlesAdd(e);
}
const projectContract = (e) => {
    e.target.parentElement.classList.remove('project-col--expand');
    e.target.parentElement.querySelector('.project-col__info-button').classList.add('project-col__info-button--hidden');
    desktopTitlesRemove(e);
}
// hover functions
const hoverFunctionality = (hoverType) => {
    projectColumnContainer.addEventListener(hoverType, e => {
        if(e.target.matches('.project-col__bg-colour')) { 
            const colsClosed = !e.target.parentElement.classList.contains('project-col--expand') && !e.target.parentElement.classList.contains('project-col--open');
            colsClosed ? projectExpand(e) : projectContract(e);
        }
    })
}
hoverFunctionality('mouseover');
hoverFunctionality('mouseout');
// hover functions ends

// click functions
projectColumnContainer.addEventListener('click', e => {
    if(e.target.matches('.project-col__bg-colour')) { 
        const projectColumn = e.target.parentElement;
        const open = projectColumn.classList.contains('project-col--open');

        // *********************************************************************
        // this isnt quite correct - does it say if(!open && mediaQ.matches) ??
        // *********************************************************************
        // if(!open){

        // desktop
        if(!open && mediaQ.matches){
            wrapper.classList.add('open');
            projectColumnContainer.classList.add('project-columns--open');

            projectColumns.forEach(col => (col.classList.remove('project-col--open')));
            projectColumns.forEach(col => (col.classList.add('project-col--closed')));

            projectColumn.classList.remove('project-col--closed');
            projectColumn.classList.add('project-col--open');
            projectColumn.classList.remove('project-col--expand');
            projectColumn.classList.remove('project-col--regular');
            projectColumn.querySelector('.project-col__info-button').classList.add('project-col__info-button--hidden'); 
            projectColumn.querySelector('.project-col__svg').classList.add('project-col__svg--hidden'); 
            
            desktopTitlesAdd(e);

            setTimeout(() => {
                projectColumn.classList.add('project-col--scroll');
            }, 750);

            //mob specific 
            projectColumn.querySelector('.project-col__bg-colour').classList.add('project-col__bg-colour--mob-show'); 

        // *********************************************************************
        // this isnt quite correct - does it say if(open && !mediaQ.matches) ??
        // *********************************************************************

        // mobile
        } else if (!open && !mediaQ.matches){
            wrapper.classList.add('open');
            projectColumnContainer.classList.add('project-columns--open');

            projectColumns.forEach(col => (col.classList.remove('project-col--open')));
            projectColumns.forEach(col => (col.classList.add('project-col--closed')));
            document.querySelector('.bio-section__close-button').classList.add('bio-section__close-button--show');

            projectColumn.querySelector('.project-col__bg-colour').classList.add('project-col__bg-colour--mob-show'); 


            projectColumn.classList.remove('project-col--closed');
            // projectColumn.classList.add('project-col--open');
            projectColumn.classList.remove('project-col--expand');
            projectColumn.classList.remove('project-col--regular');
            projectColumn.querySelector('.project-col__info-button').classList.add('project-col__info-button--hidden'); 
            projectColumn.querySelector('.project-col__svg').classList.add('project-col__svg--hidden'); 
            
            desktopTitlesAdd(e);
            
            setTimeout(() => {
                projectColumn.classList.add('project-col--open');
            }, 600);
            setTimeout(() => {
                projectColumn.classList.add('project-col--scroll');
            }, 750);
wrapper.classList.add('overflowHide');
            // delayed so doesn't jump
            setTimeout(() => {
                
            }, 2750);
        }
    }
})
// desktop close button
projectColumns.forEach(col => {
    projectsCloseButtons.forEach(closeButton => {
        closeButton.addEventListener('click', e => {
            const open = col.classList.contains('project-col--open');
            if(open){
                wrapper.classList.remove('open');
                wrapper.classList.remove('overflowHide');
                projectColumnContainer.classList.remove('project-columns--open');

                desktopProjectTitles.forEach(title => title.classList.remove('projects-section__project-title--desk--show'))

                col.querySelector('.project-col__bg-colour').classList.remove('project-col__bg-colour--mob-show'); 

                col.classList.remove('project-col--open');
                // col.style.height = ""
                col.classList.add('project-col--regular');
                col.scroll({
                    top: 0,
                    behavior: 'smooth'
                })
                setTimeout(() => { 
                    col.querySelector('.project-col__svg').classList.remove('project-col__svg--hidden');
                }, 300);

                projectColumns.forEach(col => {
                    col.classList.remove('project-col--scroll');
                    col.classList.remove('project-col--open');
                    col.classList.remove('project-col--closed');
                });
                
                closeButton.classList.remove('projects-section__close-button--show');
            } 
        })
    })
})
// desktop close button ends
// mobile close button
mobCloseButton.addEventListener('click', e => {
    e.target.classList.remove('bio-section__close-button--show');
    projectColumns.forEach(col => {
        const open = col.classList.contains('project-col--open');
        if(open){
            wrapper.classList.remove('open');
            wrapper.classList.remove('overflowHide');
            projectColumnContainer.classList.remove('project-columns--open');

            desktopProjectTitles.forEach(title => title.classList.remove('projects-section__project-title--desk--show'))

            col.querySelector('.project-col__bg-colour').classList.remove('project-col__bg-colour--mob-show'); 

            col.classList.remove('project-col--open');
            // col.style.height = ""
            col.classList.add('project-col--regular');
            col.scroll({
                top: 0,
                behavior: 'smooth'
            })
            setTimeout(() => { 
                col.querySelector('.project-col__svg').classList.remove('project-col__svg--hidden');
            }, 300);

            projectColumns.forEach(col => {
                col.classList.remove('project-col--scroll');
                col.classList.remove('project-col--open');
                col.classList.remove('project-col--closed');
            });
            
            
        } 
    })
})
// mobile close button ends
var mediaQ = window.matchMedia("(min-width: 1000px)") 