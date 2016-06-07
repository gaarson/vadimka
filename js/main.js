console.log(React);
console.log(ReactDOM);

var dress_list = [
	{
		id: 0,
		name: "parasha",
		style: "коктейльное",
		season: "весна-лето",
		brand: "ray",
		image: "img/dress1.jpg",
		price: "14000р",
		size: ['35 ', '37 ', '39 ', '41 ']	
	},
	{
		id: 1,
		name: "topolya",
		style: "коктейльное",
		season: "зима-осень",
		brand: "estaline",
		image: "img/dress2.jpg",
		price: "10000р",
		size: ['35 ', '37 ', '39 ', '41 ']
	},
	{	
		id: 2,
		name: "opaa",
		style: "вечернее",
		season: "весна-лето",
		brand: "ladyform",
		image: "img/dress3.jpg",
		price: "15990р",
		size: ['35 ', '37 ', '39 ', '41 ']	
	},
	{	
		id: 3,
		name: "diadema",
		style: "этно",
		season: "зима-осень",
		brand: "panas",
		image: "img/dress1.jpg",
		price: "90900р",
		size: ['35 ', '37 ', '39 ', '41 ']
	},
    {
		id: 4,
	    name: "wonderdris",
		style: "спортивный",
		season: "зима-осень",
		brand: "dejavu",
		image: "img/dress2.jpg",
		price: "90900р",
		size: ['35 ', '37 ', '39 ', '41 ']
	},
    {	
		id: 5,
		name: "insidehole",
		style: "ретро",
		season: "зима-осень",
		brand: "ertu",
		image: "img/dress3.jpg",
		price: "90900р",
		size: ['35 ', '37 ', '39 ', '41 ']
	}
];

var order_list = [
	{
		clientID: 1,
		name: "LALALA",
		mail: "gaarson666@gmail.com",
		dresses: [ 4, 5, 1 ]	
	}
];

var View = React.createClass({
	
	render: function() {
		var id = this.props.data.id,
			image = this.props.data.image,
			price = this.props.data.price,
			size = this.props.data.size,
			brand = this.props.data.brand,
			season = this.props.data.season,
			style = this.props.data.style,
			name = this.props.data.name;
	
		return(
			<div className = "dress">	
				<div className = "image">
					<img className = "img" src = {image} />
						<a href = "#"
							onClick = {this.priceClick}
							className = "priceClick" >
						{price}</a>
						<size>{size}</size>
				</div>	
				<p className = "name">{name}</p> 
				<p className = "more">{style} {brand}</p>
				<p className = "season"> {season} </p>
			</div>
		)	
	}
});

var DressScroll = React.createClass({
	
	getInitialState: function() {
		return {
			centerDress: 1,		
			leftSide: 0,
			rightSide: 2
		};
	},
	
	rightClick: function(e) {
		e.preventDefault();
		this.setState({
			leftSide: ++this.state.leftSide,
			centerDress: ++this.state.centerDress,
			rightSide: ++this.state.rightSide
		});
	},

	leftClick: function(e) {
		e.preventDefault();
		this.setState({
			leftSide: --this.state.leftSide,
			centerDress: --this.state.centerDress,
			rightSide: --this.state.rightSide
		});
	},

	render: function () {
		var data = this.props.data;
		var leftSide = data.map (function(item, index) {
			index = this.state.leftSide;
			return (
				<div key = {index}>
					<View data = {item} />
				</div>	
			)
		});
		var rightSide = data.map(function(item, index) {
			index = this.state.rightSide;
			return (
				<div key = {index}>
					<View data = {item} />
				</div>	
			)
		});
		var listTemplate = data.map (function(item, index) {
			index = this.centerDress;
			return (
				<div key = {index} className = "scroll">
					<View data = {item} />
				</div> 
			)
		});	
		
		return(
			<div className = "scrollList">
				{leftSide}
				{listTemplate}
				{rightSide}
			</div>	
		)	
	}
});

var DressList = React.createClass({

	render: function() {

        var category = this.props.category;
        var value = this.props.value;
		var data = this.props.data;

		var dressTemplate = data.map(function(item, index) {

            if (category != '' && value != '' && item[category] != value) {

                return false;
            }

			return (
				<li key = {index} >
					<View data = {item} />
				</li>
			)	
		});        	
			
		return (
			<ul className = "list">	
				{dressTemplate}
			</ul>
		);
	}		
});

var Li = React.createClass({

    handleClick: function() {

        console.log(this);

        this.props.onUserClick(
            this.props['data-category'],
            this.props.value
        );
    },

    render: function() {

        return(
            <li><a href="#" 
			data-category={this.props.category} 
			onClick={this.handleClick}>
			{this.props.value} 
			</a><br/></li>
        )
    }
});

var category = {
    'style': ["вечернее", "коктейльные", "выпускные", "этно", "ретро", "спортивный", "пляжный", "диско", "эко"],
    'brand': ["estaline", "ladyform", "greencountry", "efectiv", "ray", "dejavu", "panas", "ertu", "malenkie"],
    'season': ["весна-лето", "зима-осень"]
};

var Nav = React.createClass({

    handleUserClick: function(category, value) {

        this.props.onUserChange(
            category,
            value
        );
    },

    render: function() {

        var category = this.props.category;
        var self = this;
        var Style = category.style.map(function(item ,index){
            return(
                <Li data-category="style" 
				value={item}
				key={index} 
				onUserClick={self.handleUserClick} />
            )
        });
        var Brand = category.brand.map(function(item, index) {
            return(
                <Li data-category="brand" 
				value={item} 
				key={index} 
				onUserClick={self.handleUserClick} />
            )
        });
        var Season = category.season.map(function(item, index) {
            return(
                <Li data-category="season"
				value={item} 
				key={index} 
				onUserClick={self.handleUserClick} />
            )
        });

        return(
            <nav>
                <ul id="ddmenu">
                    <li>
                        <a href="#">стиль</a>
                        <ul>
                            {Style}
                        </ul>
                    </li>
                    <li><a href="#">бренд</a>
                        <ul>
                            {Brand} 
                        </ul>
                    </li>
                    <li><a href="#">сезон</a>
                        <ul>
                            {Season}
                        </ul>
                    </li>
                    <li>
                        <a href="#" id = "basket">заказ</a>
                        <ul>
                            <li><a href = "#" id = "basketList" className = "basketList">1</a></li><br/>
                            <li><a href = "#" id = "form">оформить</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        )
    }
});

var App = React.createClass({

    getInitialState: function() {

        return {
            category: '',
            value: ''
        }
    },

    handleRender: function(category, value) {

        this.setState({
            category: category,
            value: value
        });
    },

	render: function() { 	
		return (
			<div className = "app">
                <Nav category={category} onUserChange={this.handleRender} />
                <article>
                    <DressList data = {dress_list} category={category} category={this.state.category} value={this.state.value} />
                </article>
			</div>
		)
	}
});

ReactDOM.render(
	<App />,
	document.getElementById('app')
);


$(document).ready(function(){
    $('a').on('click', function(e){
        e.preventDefault();
    });

    $('#ddmenu li').hover(function () {
        clearTimeout($.data(this,'timer'));
        $('ul',this).stop(true,true).slideDown(200);
    }, function () {
        $.data(this,'timer', setTimeout($.proxy(function() {
            $('ul',this).stop(true,true).slideUp(200);
        }, this), 100));
    });
});
