import { h } from 'preact';
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

export default App;
