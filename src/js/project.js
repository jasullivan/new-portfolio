const wrapper = document.querySelector('.wrapper');
const bioSection = document.querySelector('.bio-section');
const projectSection = document.querySelector('.projects-section');
const projectColumnContainer = document.querySelector('.project-columns');
const projectColumns = document.querySelectorAll('.project-col');

const projectsCloseButtons = document.querySelectorAll('.projects-section__close-button');
const mobCloseButton = document.querySelector('.bio-section__close-button');
// const desktopProjectTitles = document.querySelectorAll('.projects-section__project-title--desk');

// add and remove title for desktop
// const desktopTitlesAdd = (e) => {
//     desktopProjectTitles.forEach(title => {
//         if(title.getAttribute('data-project') === e.target.parentElement.getAttribute('data-project')) {

            // e.target.parentElement.querySelector('.project-col__project-title--mob').classList.add('project-col__project-title--mob--show');

            // setTimeout(() => {
            //     e.target.parentElement.classList.contains('project-col--open') && 
            //     title.querySelector('.projects-section__close-button').classList.add('projects-section__close-button--show');
                
            // }, 2000);
            
//         }
//     })
// }
// const desktopTitlesRemove = (e) => {
//     desktopProjectTitles.forEach(title => {
//         if(title.getAttribute('data-project') === e.target.parentElement.getAttribute('data-project') && 
//             !e.target.parentElement.classList.contains('project-col--open')) {
//             desktopProjectTitles.forEach(title => (title.classList.remove('projects-section__project-title--desk--show')));
//             title.classList.remove('projects-section__project-title--desk--show');

//             e.target.parentElement.querySelector('.project-col__project-title--mob').classList.remove('project-col__project-title--mob--show');
//         }
//     })
// }
// expand and contract project columns
const projectExpand = (e) => {
    const eTargetParent = e.target.parentElement;
    eTargetParent.classList.add('project-col--expand');
    eTargetParent.querySelector('.project-col__info-button').classList.remove('project-col__info-button--hidden');

    eTargetParent.querySelector('.project-col__project-title').classList.add('project-col__project-title--show');
    
    
    // document.querySelector('.projects-section').classList.add('projects-section--expanded')
    // desktopTitlesAdd(e);
}
const projectContract = (e) => {
    e.target.parentElement.classList.remove('project-col--expand');
    e.target.parentElement.querySelector('.project-col__info-button').classList.add('project-col__info-button--hidden');
    
    if(!e.target.parentElement.classList.contains('project-col--open')) {
        e.target.parentElement.querySelector('.project-col__project-title').classList.remove('project-col__project-title--show');
    }

    // desktopTitlesRemove(e);
}
// hover functions
const hoverFunctionality = (hoverType) => {
    projectColumnContainer.addEventListener(hoverType, e => {

        if(e.target.matches('.project-col__bg-colour') && e.target.parentElement.classList.contains('project-col--closed')) {
            hoverType === "mouseover" 
                ? e.target.parentElement.querySelector('.project-col__svg').classList.add('openIcon') 
                : e.target.parentElement.querySelector('.project-col__svg').classList.remove('openIcon')

        } else if(e.target.matches('.project-col__bg-colour')) { 
            const colsClosed = !e.target.parentElement.classList.contains('project-col--expand') && !e.target.parentElement.classList.contains('project-col--open');
            colsClosed ? projectExpand(e) : projectContract(e);
        }
    })
}
hoverFunctionality('mouseover');
hoverFunctionality('mouseout');
// hover functions ends

//info button
const info = document.querySelector('.bio-info');
const infoContent = document.querySelector('.bio-info__content');
info.addEventListener('click', e => {
    if(e.target.matches('.bio-info__button')) { 
        infoContent.classList.contains('bio-info__content--show') 
            ? infoContent.classList.remove('bio-info__content--show') 
            : infoContent.classList.add('bio-info__content--show') 
    }
});
// info button ends

// click functions
projectColumnContainer.addEventListener('click', e => {
    if(e.target.matches('.project-col__bg-colour')) { 
        const projectColumn = e.target.parentElement;
        const open = projectColumn.classList.contains('project-col--open');
        const closed = projectColumn.classList.contains('project-col--closed');

        // desktop
        if(!open && mediaQ.matches){
            
            // a column is open and remaining columns are closed but are now visible and can be clicked
            if(closed) {

                wrapper.classList.add('open');
                projectColumnContainer.classList.add('project-columns--open');

                // projectColumns.forEach(col => (col.classList.remove('project-col--open')));
                projectColumns.forEach(col => (col.classList.remove('project-col--scroll')));
                projectColumns.forEach(col => {
                    col.classList.add('project-col--regular');
                    col.querySelector('.project-col__project-title').classList.remove('project-col__project-title--show');
                    col.querySelector('.project-col__close-button').classList.remove('project-col__close-button--show');
                });
                projectColumns.forEach(col => {
                    // col.classList.add('project-col--closed');
                    col.scroll({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
                projectColumns.forEach(col => (col.querySelector('.project-col__svg').classList.add('project-col__svg--hold')));
                e.target.parentElement.querySelector('.project-col__svg').classList.remove('openIcon') 
            }
            
            document.querySelector('.bio-section__close-button').classList.add('bio-section__close-button--show');

            wrapper.classList.add('open');
            projectColumnContainer.classList.add('project-columns--open');

            projectColumns.forEach(col => (col.classList.remove('project-col--open')));
            projectColumns.forEach(col => (col.classList.add('project-col--closed')));

            projectColumn.classList.remove('project-col--closed');
            projectColumn.classList.add('project-col--open');
            projectColumn.classList.remove('project-col--expand');
            projectColumn.classList.remove('project-col--regular');
            projectColumn.querySelector('.project-col__info-button').classList.add('project-col__info-button--hidden'); 
            // projectColumn.querySelector('.project-col__svg').classList.add('project-col__svg--hidden'); 

            e.target.parentElement.querySelector('.project-col__svg').classList.remove('project-col__svg--hold');
            e.target.parentElement.querySelector('.project-col__close-button').classList.add('project-col__close-button--show');
            
            // desktopTitlesAdd(e);

            setTimeout(() => {
                projectColumn.classList.add('project-col--scroll');
                projectColumn.querySelector('.project-col__project-title').classList.add('project-col__project-title--show')
            }, 750);

            //mob specific 
            projectColumns.forEach(col => (col.querySelector('.project-col__bg-colour').classList.remove('project-col__bg-colour--mob-show')));

            // these arent working
            projectColumn.querySelector('.project-col__bg-colour').classList.add('project-col__bg-colour--mob-show'); 

        // mobile
        } else if (!open && !mediaQ.matches){
            wrapper.classList.add('open');
            projectColumnContainer.classList.add('project-columns--open');

            projectColumns.forEach(col => (col.classList.remove('project-col--open')));
            projectColumns.forEach(col => {
                col.classList.add('project-col--closed');
            });
            document.querySelector('.bio-section__close-button').classList.add('bio-section__close-button--show');
           
            // *******************************
            // **********Scroll on mob - especially mob header **********
            // *******************************
            // setTimeout(() => {
                window.scroll({ top: 0, left: 0, behavior: 'smooth' });
            // },50);
            // *******************************
            // **********Scroll on mob - especially mob header **********
            // *******************************

            // shut info button
            infoContent.classList.contains('bio-info__content--show') 
            && infoContent.classList.remove('bio-info__content--show') 
            // shut info button ends

            e.target.parentElement.querySelector('.project-col__svg').classList.remove('project-col__svg--hold');
            e.target.parentElement.querySelector('.project-col__close-button').classList.add('project-col__close-button--show');

            setTimeout(() => {
                // document.querySelector(`[data-project="${e.target.parentElement.getAttribute('data-project')}"]`).classList.add('projects-section__project-title--desk--show');
                projectColumn.querySelector('.project-col__project-title').classList.add('project-col__project-title--show');
                projectColumn.querySelector('.project-col__bg-colour').classList.add('project-col__bg-colour--mob-show'); 
            }, 600);

            projectColumn.classList.remove('project-col--closed');
            
            projectColumn.querySelector('.project-col__bg-colour').classList.remove('project-col--expand');


            projectColumn.classList.remove('project-col--regular');
            projectColumn.querySelector('.project-col__info-button').classList.add('project-col__info-button--hidden'); 
            // projectColumn.querySelector('.project-col__svg').classList.add('project-col__svg--hidden'); 
            
            // desktopTitlesAdd(e);
            
            setTimeout(() => {
                projectColumn.classList.add('project-col--open');
            }, 600);
            setTimeout(() => {
                projectColumn.classList.add('project-col--scroll');
            }, 750);
        }
    } 
})

// mobile close button
mobCloseButton.addEventListener('click', e => {
    if(e.target.matches('.bio-section__close-button img')) { 
        e.target.parentElement.classList.remove('bio-section__close-button--show');
        projectColumns.forEach(col => {
            const open = col.classList.contains('project-col--open');
            if(open){
                wrapper.classList.remove('open');
                // wrapper.classList.remove('overflowHide');
                projectColumnContainer.classList.remove('project-columns--open');
                closeButtons.forEach(closeButton => {
                    closeButton.classList.remove('project-col__close-button--show');
                })
                infoContent.classList.contains('bio-info__content--show') 
                && infoContent.classList.remove('bio-info__content--show') 
                // shut info button ends
                
                // desktopProjectTitles.forEach(title => title.classList.remove('projects-section__project-title--desk--show'))
                

                col.querySelector('.project-col__bg-colour').classList.remove('project-col__bg-colour--mob-show'); 

                col.classList.remove('project-col--open');
                // col.style.height = ""
                col.classList.add('project-col--regular');
                col.scroll({
                    top: 0,
                    behavior: 'smooth'
                
                }, console.log('scroll has been moved to the top'))
                // setTimeout(() => { 
                //     col.querySelector('.project-col__svg').classList.remove('project-col__svg--hidden');
                // }, 300);
                setTimeout(() => { 
                    col.querySelector('.project-col__project-title').classList.remove('project-col__project-title--show')
                }, 1000);

                projectColumns.forEach(col => {
                    col.classList.remove('project-col--scroll');
                    col.classList.remove('project-col--open');
                    col.classList.remove('project-col--closed');
                });
                
                
            } 
        })
    }
})
// mobile close button ends
var mediaQ = window.matchMedia("(min-width: 1000px)") 

