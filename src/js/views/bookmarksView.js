import icons from 'url:../../img/icons.svg'
import previewView from './previewView'
import View from './View'

class bookmarksView extends View {
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
    _message = '';
    _parentElement = document.querySelector('.bookmarks__list');


    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }
    _generateMarkup() {    
        return this._data.map(
            result => 
            previewView.render(result,false))
            .join('');

    }  
}

export default new bookmarksView();