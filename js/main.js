console.log(React);
console.log(ReactDOM);

var dress_list = [
	{
		name: "parasha",
		style: "коктейльное",
		season: "весна-лето",
		brand: "ray",
		image: "img/dress1.jpg",
		price: 14000,
		size: ['35 ', '37 ', '39 ', '41 ']	
	},
	{
		name: "topolya",
		style: "коктейльное",
		season: "зима-осень",
		brand: "estaline",
		image: "img/dress2.jpg",
		price: 10000,
		size: ['35 ', '37 ', '39 ', '41 ']
	},
	{
		name: "opaa",
		style: "вечернее",
		season: "весна-лето",
		brand: "ladyform",
		image: "img/dress3.jpg",
		price: 15990,
		size: ['35 ', '37 ', '39 ', '41 ']	
	},
	{	
		name: "diadema",
		style: "этно",
		season: "зима-осень",
		brand: "panas",
		image: "img/dress1.jpg",
		price: 90900,
		size: ['35 ', '37 ', '39 ', '41 ']
	},
    {
	    name: "wonderdris",
		style: "спортивный",
		season: "зима-осень",
		brand: "dejavu",
		image: "img/dress2.jpg",
		price: 90900,
		size: ['35 ', '37 ', '39 ', '41 ']
	},
    {	
		name: "insidehole",
		style: "ретро",
		season: "зима-осень",
		brand: "ertu",
		image: "img/dress3.jpg",
		price: 90900,
		size: ['35 ', '37 ', '39 ', '41 ']
	}
];

var category = {
    'style': ["вечернее", "коктейльные", "выпускные", "этно", "ретро", "спортивный", "пляжный", "диско", "эко"],
    'brand': ["estaline", "ladyform", "greencountry", "efectiv", "ray", "dejavu", "panas", "ertu", "malenkie"],
    'season': ["весна-лето", "зима-осень"],
};

var order = {
	orderName: [],
	orderPrice: []
};

var View = React.createClass({
	
	onAddToCart: function() {},
	
	getInitialState: function() {
		return{
			order: this.props.order,
			orderName: order.orderName,
			orderPrice: order.orderPrice		
		}
	},
	
	priceClick: function() {
		this.props.onAddToCart(
			this.props.data.name,
			this.props.data.price
		);
	},

	render: function() {
		var	image = this.props.data.image,
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
						{price}p </a>
						<size>{size}</size>
				</div>	
				<p className = "name">{name}</p> 
				<p className = "more">{style} {brand}</p>
				<p className = "season"> {season} </p>
			</div>
		)	
	}
});

var DressList = React.createClass({
	
	addToCart: function(name, price) {
		this.props.onAddToCart(
			name,
			price
		);
	},

	render: function() {

        var category = this.props.category;
        var value = this.props.value;
		var data = this.props.data;
		var self = this

		var dressTemplate = data.map(function(item, index) {

            if (category != '' && value != '' && item[category] != value) {
                return false;
            }

			return (
				<li key = {index} >
					<View data = {item} onAddToCart = {self.addToCart} />	
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

var Orders = React.createClass({
	
    render: function() {

        return(
            <li data-order = {this.props.order}>
			{this.props.value}</li>
        )
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

var Nav = React.createClass({
	
	cartClick: function() {
		
	},

    handleUserClick: function(category, value) {

        this.props.onUserChange(
            category,
            value
        );
    },

    render: function() {
		var order = this.props.order;
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
		var orderName = order.orderName.map(function(item, index) { 
			return(
				<Orders data-order = "orderName"
			   	value = {item}	
				key = {index}  />	
			)
		});
		var orderPrice = order.orderPrice.map(function(item, index) {
			return(
				<Orders data-order = "orderPrice"
				value = {item}
				key = {index} />
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
							{orderName}{orderPrice}<br/>
                            <li><a href = "#" >оформить</a></li>
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
	
	addToCart: function(name, price) {
		order.orderName.push(name);
		order.orderPrice.push(price);
			this.setState({
				order: order
			});
	},
	
	render: function() { 	
		return (
			<div className = "app">
                <Nav order = {order} 
				category={category} 
				onUserChange={this.handleRender} />
                <article>
                    <DressList data = {dress_list} 
					category={category}
				    category={this.state.category} 
				    value={this.state.value} 	
					order = {order} 
					order = {this.state.order}
					onAddToCart = {this.addToCart} />
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
