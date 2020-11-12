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
    // document.querySelector('.projects-section').classList.add('projects-section--expanded')
    desktopTitlesAdd(e);
}
const projectContract = (e) => {
    e.target.parentElement.classList.remove('project-col--expand');
    e.target.parentElement.querySelector('.project-col__info-button').classList.add('project-col__info-button--hidden');
    // document.querySelector('.projects-section').classList.remove('projects-section--expanded')
    desktopTitlesRemove(e);
}
// hover functions
const hoverFunctionality = (hoverType) => {
    projectColumnContainer.addEventListener(hoverType, e => {

        hoverType === 'mouseover' 
            ? e.target.matches('.project-col__bg-colour') && document.querySelector('.projects-title').classList.add('projects-title--expanded')
            : document.querySelector('.projects-title').classList.remove('projects-title--expanded');

        if(e.target.matches('.project-col__bg-colour') && e.target.parentElement.classList.contains('project-col--closed')) {
            hoverType === "mouseover" 
                ? e.target.parentElement.querySelector('svg').classList.add('openIcon') 
                : e.target.parentElement.querySelector('svg').classList.remove('openIcon')
        } else if(e.target.matches('.project-col__bg-colour')) { 
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
        const closed = projectColumn.classList.contains('project-col--closed');
        // const desktopProjectTitles = document.querySelectorAll('.projects-section__project-title--desk');

        // *********************************************************************
        // this isnt quite correct - does it say if(!open && mediaQ.matches) ??
        // *********************************************************************
        // if(!open){

        // desktop
        if(!open && mediaQ.matches){
            // e.target.removeChild('.para');
            // console.log(document.querySelector('para'))
            
            // a column is open and remaining columns are closed but are now visible and can be clicked
            if(closed) {

                // don't need this
                // var paragraph = e.target.querySelector('.para');
                // paragraph ? paragraph.remove() : console.log('no para yet');


                wrapper.classList.add('open');
                projectColumnContainer.classList.add('project-columns--open');

                // projectColumns.forEach(col => (col.classList.remove('project-col--open')));
                projectColumns.forEach(col => (col.classList.remove('project-col--scroll')));
                projectColumns.forEach(col => (col.classList.add('project-col--regular')));
                projectColumns.forEach(col => {
                    // col.classList.add('project-col--closed');
                    col.scroll({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
                projectColumns.forEach(col => (col.querySelector('.project-col__svg').classList.remove('project-col__svg--hidden')));
                e.target.parentElement.querySelector('svg').classList.remove('openIcon') 
                // projectColumns.forEach(col => (col.querySelector('.project-col__bg-colour').classList.remove('project-col__bg-colour--mob-show')));

                
                // projectColumn.classList.remove('project-col--closed', 'project-col--expand', 'project-col--regular');
                // projectColumn.classList.add('project-col--open');
                // projectColumn.classList.remove('project-col--expand');
                // projectColumn.classList.remove('project-col--regular');
                // projectColumn.querySelector('.project-col__info-button').classList.remove('project-col__info-button--hidden'); 
                // projectColumn.querySelector('.project-col__svg').classList.add('project-col__svg--hidden'); 
                
                // desktopTitlesAdd(e);

                // setTimeout(() => {
                //     projectColumn.classList.add('project-col--scroll');
                // }, 750);

                //mob specific 
                // projectColumn.querySelector('.project-col__bg-colour').classList.add('project-col__bg-colour--mob-show'); 

            }

            document.querySelector('.projects-title').classList.add('projects-title--clicked')
            
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
            projectColumn.querySelector('.project-col__svg').classList.add('project-col__svg--hidden'); 
            
            desktopTitlesAdd(e);

            setTimeout(() => {
                projectColumn.classList.add('project-col--scroll');
            }, 750);

            //mob specific 
            projectColumns.forEach(col => (col.querySelector('.project-col__bg-colour').classList.remove('project-col__bg-colour--mob-show')));

            // these arent working
            projectColumn.querySelector('.project-col__bg-colour').classList.add('project-col__bg-colour--mob-show'); 
            projectColumn.querySelector('.project-col__project-title--mob').classList.add('project-col__project-title--mob--show')

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
            projectColumn.querySelector('.project-col__project-title--mob').classList.add('project-col__project-title--mob--show')

            // desktopProjectTitles.forEach(title => {
            //     console.log(title)
            //     if(e.target.parentElement.getAttribute('data-project') === title.getAttribute('data-project')) {
            //          title.classList.add('projects-section__project-title--desk--show')
            //     }
            // })

            setTimeout(() => {
                document.querySelector(`[data-project="${e.target.parentElement.getAttribute('data-project')}"]`).classList.add('projects-section__project-title--desk--show')
            }, 600);
            
            // projectColumn.scroll({
            //     top: 0,
            //     behavior: 'smooth'
            // }, console.log('scroll has been moved to the top'))
            // console.log(e.target.parentElement.getAttribute('data-project'))

            projectColumn.classList.remove('project-col--closed');
            // projectColumn.classList.add('project-col--open');
            
            
            projectColumn.querySelector('.project-col__bg-colour').classList.remove('project-col--expand');


            projectColumn.classList.remove('project-col--regular');
            projectColumn.querySelector('.project-col__info-button').classList.add('project-col__info-button--hidden'); 
            projectColumn.querySelector('.project-col__svg').classList.add('project-col__svg--hidden'); 

            document.querySelector('.projects-title').classList.add('projects-title--clicked')
            
            desktopTitlesAdd(e);
            
            setTimeout(() => {
                projectColumn.classList.add('project-col--open');
            }, 600);
            setTimeout(() => {
                projectColumn.classList.add('project-col--scroll');
            }, 750);
            // wrapper.classList.add('overflowHide');
            // delayed so doesn't jump
            // setTimeout(() => {
            // }, 2750);
        }
    } else {
        const projectColumn2 = e.target.parentElement.parentElement;
        const open = projectColumn2.classList.contains('project-col--open');
        if (!open && !mediaQ.matches){
            wrapper.classList.add('open');
            projectColumnContainer.classList.add('project-columns--open');

            projectColumns.forEach(col => (col.classList.remove('project-col--open')));
            projectColumns.forEach(col => (col.classList.add('project-col--closed')));
            document.querySelector('.bio-section__close-button').classList.add('bio-section__close-button--show');

            projectColumn2.querySelector('.project-col__bg-colour').classList.add('project-col__bg-colour--mob-show'); 
            projectColumn2.querySelector('.project-col__project-title--mob').classList.add('project-col__project-title--mob--show')

            // desktopProjectTitles.forEach(title => {
            //     console.log(title)
            //     if(e.target.parentElement.getAttribute('data-project') === title.getAttribute('data-project')) {
            //          title.classList.add('projects-section__project-title--desk--show')
            //     }
            // })

            setTimeout(() => {
                document.querySelector(`[data-project="${e.target.parentElement.getAttribute('data-project')}"]`).classList.add('projects-section__project-title--desk--show')
            }, 600);
            
            projectColumn2.scroll({
                top: 0,
                behavior: 'smooth'
            }, console.log('scroll has been moved to the top'))
            // console.log(e.target.parentElement.getAttribute('data-project'))

            projectColumn2.classList.remove('project-col--closed');
            // projectColumn.classList.add('project-col--open');
            
            
            projectColumn2.querySelector('.project-col__bg-colour').classList.remove('project-col--expand');


            projectColumn2.classList.remove('project-col--regular');
            projectColumn2.querySelector('.project-col__info-button').classList.add('project-col__info-button--hidden'); 
            projectColumn2.querySelector('.project-col__svg').classList.add('project-col__svg--hidden'); 

            document.querySelector('.projects-title').classList.add('projects-title--clicked')
            
            desktopTitlesAdd(e);
            
            setTimeout(() => {
                projectColumn2.classList.add('project-col--open');
            }, 600);
            setTimeout(() => {
                projectColumn2.classList.add('project-col--scroll');
            }, 750);
            // wrapper.classList.add('overflowHide');
            // delayed so doesn't jump
            // setTimeout(() => {
            // }, 2750);
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
                // wrapper.classList.remove('overflowHide');
                projectColumnContainer.classList.remove('project-columns--open');

                document.querySelector('.projects-title').classList.remove('projects-title--clicked')

                desktopProjectTitles.forEach(title => title.classList.remove('projects-section__project-title--desk--show'))
                col.querySelector('.project-col__bg-colour').classList.remove('project-col__bg-colour--mob-show'); 

                col.classList.remove('project-col--open');
                // col.style.height = ""
                col.classList.add('project-col--regular');
                col.scroll({
                    top: 0,
                    behavior: 'smooth'
                }, console.log('scroll has been moved to the top'))
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
            // wrapper.classList.remove('overflowHide');
            projectColumnContainer.classList.remove('project-columns--open');

            document.querySelector('.projects-title').classList.remove('projects-title--clicked')
            
            desktopProjectTitles.forEach(title => title.classList.remove('projects-section__project-title--desk--show'))
            

            col.querySelector('.project-col__bg-colour').classList.remove('project-col__bg-colour--mob-show'); 

            col.classList.remove('project-col--open');
            // col.style.height = ""
            col.classList.add('project-col--regular');
            col.scroll({
                top: 0,
                behavior: 'smooth'
               
            }, console.log('scroll has been moved to the top'))
            setTimeout(() => { 
                col.querySelector('.project-col__svg').classList.remove('project-col__svg--hidden');
            }, 300);
            setTimeout(() => { 
                col.querySelector('.project-col__project-title--mob').classList.remove('project-col__project-title--mob--show')
            }, 1000);

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


