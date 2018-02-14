import React, { Component } from 'react';
import './Pagination.css'


class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starter:1,
            minusEnabled:false,
            plusEnabled:true

        };

    }


    minusClick = () => {
        if (this.state.starter === 1) {
            this.setState({minusEnabled: true})
        }
        else {
            this.setState({starter:this.state.starter-10})
        }
    }

    localClick = (aaa) => {

        this.props.onPageClick(aaa);
    }

    plusClick = () => {


        if (Math.ceil(this.props.totalCount / this.props.npp) - this.state.starter < 10) {
            this.setState({plusEnabled: false})
        }
        else {
            this.setState({starter:this.state.starter+10})
        }
    }


    render() {

        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(this.props.totalCount / this.props.npp); i++) {
            pageNumbers.push(i);
        }

        let pages = [];


        pages.push(<p className="pager"
                        onClick={() => {this.minusClick()}}>
            -
        </p>)

        let shift = 10;

        if (Math.ceil(this.props.totalCount / this.props.npp) - this.state.starter < 10){
            shift = Math.ceil(this.props.totalCount / this.props.npp) - this.state.starter +1;
        }

        for (let y = this.state.starter; y < this.state.starter + shift ; y++){
            pages.push(<p className="pager"
                      onClick={() => {this.localClick(y)}}>
                {y}
            </p>)

        }

        pages.push(<p className="pager"

                      onClick={() => {this.plusClick()}}>
            +
        </p>)

        console.log(pages);
        return (
            <div key={this.props.currentPage} className="paginator pagination">
                {pages}
            </div>
        );
    }
}




export default Pagination;