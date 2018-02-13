import React, { Component } from 'react';
import SearchForm from './SearchForm';
import MultiS from './MultiS';
import Pagination from './Pagination';
import './App.css'
import BottleCard from './BottleCard';
import api from './api';


class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            bottles: [],
            totalCount:0,
            sortCriteria: "Relevancy",
            msgs:[],
            msgs2:[],
            zero:0,
            name:"",
            resultsPage:1,
            groups:[]
        };
    }

    componentWillMount(){
        this.fetchBottles();
    }

    searcher = (word) => {
        this.setState({name:word,resultsPage:1});
        this.fetchBottles(this.state.msgs + " " +this.state.msgs2 + " " + word,this.state.sortCriteria,this.state.zero);
    }

    changeSort = (event) => {
        this.setState({sortCriteria : event.target.value,resultsPage:1});
        this.fetchBottles(this.state.msgs + " " +this.state.msgs2 + " " + this.state.name,event.target.value,this.state.zero);

        event.preventDefault();
    }

    getSelected = (gets) => {
        let prepend = "@tppays=(";
        if (gets) {
            this.setState({msgs: prepend + gets + ")"})
        }
        else {
            this.setState({msgs: ""})
        }

    }


    getSelected2 = (gets) => {
        let prepend = "@tpprixbande=(";

        if (gets) {
            this.setState({msgs2: prepend + gets + ")"})
        }
        else {
            this.setState({msgs2: ""})
        }

    }

    fetchBottles = (aa,bb,cc) => {


        api.getBottleList(aa,bb,cc)
            .then(res => {
                const { groupByResults, results, totalCount } = res.body;
                console.log(res.body);
                this.setState({groups: groupByResults, bottles: results, totalCount:totalCount});


            })
            .catch(console.error);
    }


    showOnlyRated = () => {
        this.setState({bottles : this.state.bottles.filter(xxx => Boolean(xxx.raw.tpcoteexpertsplitgroup))} )
    }

    pageClick = (bbb) => {
        this.setState({resultsPage : bbb});
        let fr = (bbb-1) * 20;
        this.fetchBottles(this.state.msgs + " " + this.state.msgs2 + " " + this.state.name,this.state.sortCriteria,fr);
    }



    render(){


        const arrayer = [];

        let {bottles,groups} = this.state;


        for (let i =0;i<groups.length;i++){

            let arr = groups[i].values;

            arrayer[i] = arr.map(function(gg){
                return  {label:gg.lookupValue +" ("+gg.numberOfResults+")", value: "\"" + gg.value + "\""}
            } )
        }


        return (
            <div className="App">

                <SearchForm onSubmit={this.searcher}/>

                <div className="sortbox">
                    <p className="sortP">Sort by</p>
                    <select className="selector" onChange={this.changeSort}>

                        <option value="Relevancy">Relevancy</option>
                        <option value="@tpprixnum ascending">Price (Low to High)</option>
                        <option value="@tpprixnum descending">Price (High to Low)</option>
                        <option value="DateDescending">Date (Newest First)</option>
                        <option value="nosort">Random</option>
                    </select>
                </div>

                <div className="multis" >
                    <MultiS optns={arrayer[1]} ph="Please select countries..." onSender={this.getSelected}/>
                    <MultiS optns={arrayer[0]} ph="Please select price range..." onSender={this.getSelected2}/>
                </div>


                <button onClick={this.showOnlyRated}>Show Only Rated (on page {this.state.resultsPage})</button>


                <h4>{this.state.totalCount} results</h4>


                <div className="searchResults">

                    {this.state.totalCount === 0 && this.state.resultsPage > 1 ? <p>You've exceeded the maximum number of returned results (1000/page 50).</p>  : ""}

                    {bottles.map((b,i) =>
                        <div className="card" key={i}>
                            <BottleCard
                                title={b}
                            />
                        </div>
                    )}


                </div>

                <div className="pager">
                    <p>Page {this.state.resultsPage} of {Math.ceil(this.state.totalCount / 20)} </p>
                    <Pagination totalCount={this.state.totalCount} npp="20" onPageClick={this.pageClick} />
                </div>
            </div>
        )
    }
};

export default App;
