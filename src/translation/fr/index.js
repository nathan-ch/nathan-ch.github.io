import home from './home.json';
import about from './about.json';


const fr = {
    ...home,...about //On concatène tous nos objets JSON fr un seul
};

export default fr;
