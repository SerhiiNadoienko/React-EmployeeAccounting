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
            ],
            term:'',
            filter:'all'
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

   searchEmp=(items,term)=> {
        if(term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term)> -1
        })
   }

   onUpdateSearch =(term)=> {
    this.setState({term:term});
   }
    
   filterPost = (items, filter) => {
    switch (filter) {
        case 'star':
            return items.filter(item=> item.star);
        case 'moreThen1000':
            return items.filter(item=> item.salary > 1000);
        default:
            return items
    }
   }

   onFilterSelect =(filter) => {
     this.setState({filter});
   }
    
    render() {
       const {data, term, filter}=this.state;

       const employees = this.state.data.length;
       const increased = this.state.data.filter(item=>item.increase).length;
        const visibleData = this.filterPost( this.searchEmp(data, term), filter);
        return (
           
            //дали класс app потому что его застилизовали по центру 
            <div className="app">
                <AppInfo employees={employees}
                increased={increased}/>
    
                <div className='search-panel'>
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <Appfilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployersList 
                data={visibleData}
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