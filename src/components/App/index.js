import { h } from 'preact';
import { DragDropContext } from 'preact-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import 'normalize.css';

import style from './style';
import Main from 'components/Main';
import Menu from 'components/Menu';
import Footer from 'components/Footer';

const App = () => (
    <div className={style.app}>
        <Menu />
        <Main />
        <Footer />
    </div>
);

export default DragDropContext(HTML5Backend)(App);
