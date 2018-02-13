import React, {Component} from 'react';
import './BottleCard.css'

class BottleCard extends Component{

    CurrencyFormatted = (amount) => {

        var i = parseFloat(amount);
        if(isNaN(i)) { i = 0.00; }
        var minus = '';
        if(i < 0) { minus = '-'; }
        i = Math.abs(i);
        i = parseInt((i + .005) * 100,10);
        i = i / 100;
        var s = String(i);
        if(s.indexOf('.') < 0) { s += '.00'; }
        if(s.indexOf('.') === (s.length - 2)) { s += '0'; }
        s = minus + s;
        return s;
    };


    render() {

        return (
           <div className="BottleMain">
               <div className="LeftB">
                   <img src={this.props.title.raw.tpthumbnailuri} alt={this.props.title.Title}/>
               </div>
               <div className="RightB">
                   <a href={this.props.title.ClickUri} target="_blank"><p>{this.props.title.raw.tpnomdebouteille}</p></a>
                   <p>{this.props.title.raw.tpcoteexpertsplitgroup}</p>
                   <p> {this.props.title.raw.tpcepagenomsplitgroup ? this.props.title.raw.tpcepagenomsplitgroup.split(/;/).join(" ") : " "}</p>
                   <p className="price">{this.CurrencyFormatted(this.props.title.raw.tpprixnum)}</p>
                   <p>{this.props.title.raw.tppays}</p>
                   <p>{this.props.title.raw.tpregion}</p>
               </div>
           </div>
        )
    }

}

export default BottleCard;

