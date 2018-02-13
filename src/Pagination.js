import React, { Component } from 'react';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }


    localClick = (aaa) => {
        this.props.onPageClick(aaa);
    }



    render() {

        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(this.props.totalCount / this.props.npp); i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="paginator">

                {pageNumbers.map(number =>
                    <p className="pager"
                       key={number}
                       id={number}
                       onClick={() => {this.localClick(number)}}
                    >
                        {number}
                    </p>

                )}

            </div>
        );
    }
}




export default Pagination;