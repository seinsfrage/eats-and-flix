var React = require('react');
var helpers = require("./utils/helpers");



var Main = React.createClass({
	getInitialState: function() {
		return {
			showSearchBar: true,
			showRestaurants: false,
			showMovies: false,
			showMap: false
		};
	},
	setMainState: function(params) {
		this.setState(params);
	},
	getFnColWidth: function() {
		// if (this.state.lastNameSelect == true) {
		// 	return "col-xs-12 col-sm-6 col-md-6 col-lg-6";
		// };
		// if (this.state.lastNameSelect == false) {
		// 	return "col-xs-12 col-sm-12 col-md-12 col-lg-12";
		// };
	},
	getLnColWidth: function() {
		// if (this.state.firstNameSelect == true) {
		// 	return "col-xs-12 col-sm-6 col-md-6 col-lg-6";
		// };
		// if (this.state.firstNameSelect == false) {
		// 	return "col-xs-12 col-sm-12 col-md-12 col-lg-12";
		// };
	},
	shouldComponentUpdate: function() {
		// console.log("shouldComponentUpdate: Main");
		return true;
	},
	// If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {
  },
	render: function() {
		// var fnColWidth = this.getFnColWidth();
		// var lnColWidth = this.getLnColWidth();
		return (
			  <div className="container-fluid wrap">

			    <div className="jumbotron text-center">
			      <img src="images/bletter2.png"/>
			    </div>

			    <form className="form-inline row">
				    <div className="info well col-xs-12">
				        <input className="form-control" type="text" name="city" placeholder="Enter City (ex: New York)" id="city-input"/>

				        <input className="form-control" type="text" name="state" placeholder="Enter State (ex: North Carolina)" id="state-input"/>

				        <input className="form-control" type="number" name="zipcode" placeholder="Enter Zip (ex: 29076)" id="zip-input"/>

				        <input className="form-control" type="date" format="mm/dd/yyyy" placeholder="Enter Date of Plans (mm/dd/yyyy)" id="date-input"/>

				        <button className="help btn" role="button">?<span id="help"></span></button>
				        
				        <input type='submit' className='btn btn-default' id='submit-button' value='Submit'/>
				    </div>
			    </form>

			    <div id='content-area'>
			      <div className='row'>
			        <div className='col-sm-6 col-md-4'>
			          <h2 className="panel panel-heading text-center">Restaurants</h2>

			          <div id="foodDisplay"></div>
			        </div> 

			        <div className='col-sm-6 col-md-push-4 col-lg-4'>
			          <h2 className="panel panel-heading text-center">Movies in Theaters</h2>
			          <div id="movieDisplay"></div>
			        </div>

			        <div className='col-xs-12 col-md-4 col-md-pull-4'>
			          <div id='map-container'>
			            <div id='map'></div>
			          </div>
			        </div>  

			      </div>

			      <div id='directions-box' className='row'>
			        <div id='directionsPanel' className='col-lg-6'></div>
			      </div>

			    </div>

			</div>
		);
	}
});

module.exports = Main;