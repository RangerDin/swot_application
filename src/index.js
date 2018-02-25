import { h, render } from 'preact';

import App from 'components/App';

if (process.env.NODE_ENV === 'development') {
    require('preact/devtools');
}

const init = () => {
    render(<App />, document.body);
};

init();
