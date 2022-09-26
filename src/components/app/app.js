import { Component } from 'react'

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import Appfilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css'; 

class App extends  Component {
    constructor(props) {
        super(props);
        this.state= {
            data:[
                {name:'John S', salary:800,  increase:false, star:false, id:1},
                {name:'Nestor V', salary:3000, increase:false, star:false, id:2},
                {name:'Bill K', salary:5000, increase:false, star:false, id:3}
            ]
        }
        this.maxId=4;
    }
     
    //позволяет получить id и выдает только нужные элементы 
    deleteItem =(id)=> {
        this.setState(({data})=> {
      
         return {
                data: data.filter(item=> item.id !==id)
            }
        })
    }

    addItem=(name,salary)=> {
        const newItem= {
            name,
            salary,
            increase:false,
            star:false,
            id:this.maxId++
        }
        this.setState(({data})=> {
            const newArr=[...data, newItem];

            return{
                data:newArr
            }
        })
    }
  
    onToggleProp=(id, prop )=> {
        this.setState(({data})=> ({
            data: data.map(item=> {
                if (item.id ===id) {
                    return {...item, [prop]:!item[prop]}
                }
                return item;
            })
        }))
    }

   
    
    render() {
       const employees = this.state.data.length;
       const increased = this.state.data.filter(item=>item.increase).length;

        return (
            
            //дали класс app потому что его застилизовали по центру 
            <div className="app">
                <AppInfo employees={employees}
                increased={increased}/>
    
                <div className='search-panel'>
                    <SearchPanel/>
                    <Appfilter/>
                </div>
    
                <EmployersList 
                data={this.state.data}
                //передаем сюда проперти внутри которого метод
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}
               />                
                <EmployersAddForm onAdd={this.addItem}/> 
            </div>
        )
    }
}

export default App;