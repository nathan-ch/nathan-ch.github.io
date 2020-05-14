import home from './home.json';
import about from './about.json';


const en = {
    ...home,...about //On concatène tous nos objets JSON en un seul
};

export default en;
