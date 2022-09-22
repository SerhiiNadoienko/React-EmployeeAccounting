import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import Appfilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css'; 

function App() {

    const data = [
        {name:'John S', salary:800,  increase:false, id:1},
        {name:'John S', salary:3000, increase:true, id:2},
        {name:'John S', salary:5000, increase:false, id:3}
    ];

    return (
        //дали класс app потому что его застилизовали по центру 
        <div className="app">
            <AppInfo/>

            <div className='search-panel'>
                <SearchPanel/>
                <Appfilter/>
            </div>

            <EmployersList data={data}/>
            <EmployersAddForm/>
        </div>
    )
}

export default App;